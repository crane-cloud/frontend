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
      start: this.getCurrentTimeStamp(),
      end: 0,
      step: 0
    };

    this.getCurrentTimeStamp = this.getCurrentTimeStamp.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
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
    return new Date().getTime();
  }

  translateTimestamp(timestamp) {
    const timestampMillisecond = timestamp * 1000; // convert timestamp to milliseconds
    const dateObject = new Date(timestampMillisecond); // create a date object out of milliseconds
    return dateObject.toLocaleString();
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
            memory: metric.value
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

  render() {
    const { match: { params }, isFetching } = this.props;
    const { projectID } = params;

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
              allMetricsLink={`/users/${params.userID}/projects/${params.projectID}/metrics/`}
              cpuLink={`/users/${params.userID}/projects/${params.projectID}/cpu/`}
              memoryLink={`/users/${params.userID}/projects/${params.projectID}/memory/`}
              storageLink={`/users/${params.userID}/projects/${params.projectID}/storage/`}
              networLink={`/users/${params.userID}/projects/${params.projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Memory"
              />
            </div>
            <div className="ContentSection">
              {isFetching ? (
                <div className="ContentSectionSpinner">
                  <Spinner />
                </div>
              ) : (
                <MetricsCard className="MetricsCardGraph" title={<PeriodSelector onChange={() => { }} />}>
                  <LineChartComponent yLabel="Memory(bytes)" xLabel="Time" lineDataKey="memory" data={formattedMetrics} />
                </MetricsCard>
              )}
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
