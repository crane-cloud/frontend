import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './ProjectMemoryPage.css';
import getProjectMemory, { clearProjectMemory } from '../../redux/actions/projectMemory';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
import LineChartComponent from '../LineChart';

class ProjectMemoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: this.getCurrentTimeStamp(),
        step: ''
      }
    };

    this.getCurrentTimeStamp = this.getCurrentTimeStamp.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.subtractTime = this.subtractTime.bind(this);
    this.fetchMemory = this.fetchMemory.bind(this);
    this.bytesToMegabytes = this.bytesToMegabytes.bind(this);
  }

  componentDidMount() {
    const { match: { params }, getProjectMemory, clearProjectMemory } = this.props;
    const { projectID } = params;
    clearProjectMemory();
    getProjectMemory(projectID, {});
  }

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

  getCurrentTimeStamp() {
    return new Date().getTime() / 1000;
  }

  translateTimestamp(timestamp) {
    const timestampMillisecond = timestamp * 1000; // convert timestamp to milliseconds
    const dateObject = new Date(timestampMillisecond); // create a date object out of milliseconds
    return dateObject.toLocaleString();
  }

  bytesToMegabytes(bytes) {
    return bytes / 1000000;
  }

  formatMetrics(projectID) {
    const { metrics } = this.props;
    const found = metrics.find((metric) => metric.project === projectID);
    const memoryData = [];

    if (found !== undefined) {
      if (found.metrics.length > 0) {
        found.metrics.forEach((metric) => {
          const newMetricObject = {
            time: this.translateTimestamp(metric.timestamp),
            memory: this.bytesToMegabytes(metric.value)
          };

          memoryData.push(newMetricObject);
        });
      } else {
        memoryData.push({ time: 0, memory: 0 });
        memoryData.push({ time: 0, memory: 0 });
      }
    }
    return memoryData;
  }

  async handlePeriodChange(period) {
    let days;
    let step;
    if (period === '1d') {
      days = 1;
      step = '2h';
    } else if (period === '7d') {
      days = 7;
      step = '1d';
    } else if (period === '1m') {
      days = 30;
      step = '1d';
    } else if (period === '3m') {
      days = 90;
      step = '7d';
    } else if (period === '1y') {
      days = 365;
      step = '1m';
    }

    const startTimeStamp = await this.subtractTime(this.getCurrentTimeStamp(), days);

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        step,
      }
    }));

    this.fetchMemory();
  }

  // this function gets the 'end' timestamp
  subtractTime(endTimestamp, days) {
    return new Date(endTimestamp - (days * 24 * 60 * 60)).getTime();
  }

  fetchMemory() {
    const { time } = this.state;
    const { match: { params }, getProjectMemory, clearProjectMemory } = this.props;
    const { projectID } = params;

    clearProjectMemory();
    getProjectMemory(projectID, time);
  }

  render() {
    const { match: { params }, isFetching } = this.props;
    const { projectID, userID } = params;

    const formattedMetrics = this.formatMetrics(projectID);

    return (
      <div className="Page">
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projectID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Memory"
              />
            </div>
            <div className="ContentSection">
              <MetricsCard
                className="MetricsCardGraph"
                title={<PeriodSelector onChange={this.handlePeriodChange} />}
              >
                {isFetching ? (
                  <div className="ContentSectionSpinner">
                    <Spinner />
                  </div>
                ) : (
                  <LineChartComponent yLabel="Memory(MBs)" xLabel="Time" lineDataKey="memory" data={formattedMetrics} />
                )}
              </MetricsCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectMemoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectMemory: PropTypes.func.isRequired,
  clearProjectMemory: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = (state) => {
  const { isFetching, metrics, message: metricsMessage } = state.projectMemoryReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetching,
    metrics,
    metricsMessage
  };
};

const mapDispatchToProps = {
  getProjectMemory,
  clearProjectMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemoryPage);
