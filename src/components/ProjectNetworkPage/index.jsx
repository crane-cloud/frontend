import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InformationBar from '../InformationBar';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import './ProjectNetworkPage.css';
import getProjectNetwork, { clearProjectNetwork } from '../../redux/actions/projectNetwork';
import MetricsCard from '../MetricsCard';
import PeriodSelector from '../Period';
import LineChartComponent from '../LineChart';

class ProjectNetworkPage extends React.Component {
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
    this.fetchNetwork = this.fetchNetwork.bind(this);
    // this.bytesToMegabytes = this.bytesToMegabytes.bind(this);
  }

  componentDidMount() {
    const { match: { params }, getProjectNetwork, clearProjectNetwork } = this.props;
    const { projectID } = params;
    clearProjectNetwork();
    getProjectNetwork(projectID, {});
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

//   bytesToMegabytes(bytes) {
//     return bytes / 1000000;
//   }

  formatMetrics(projectID) {
    const { metrics } = this.props;
    const found = metrics.find((metric) => metric.project === projectID);
    const networkData = [];

    if (found !== undefined) {
      if (found.metrics.length > 0) {
        found.metrics.forEach((metric) => {
          const newMetricObject = {
            time: this.translateTimestamp(metric.timestamp),
            network: metric.value
          };

          networkData.push(newMetricObject);
        });
      } else {
        networkData.push({ time: 0, network: 0 });
        networkData.push({ time: 0, network: 0 });
      }
    }
    return networkData;
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

    this.fetchNetwork(period);
  }

  // this function gets the 'end' timestamp
  subtractTime(endTimestamp, days) {
    return new Date(endTimestamp - (days * 24 * 60 * 60)).getTime();
  }

  fetchNetwork(period) {
    const { time } = this.state;
    const { match: { params }, getProjectNetwork, clearProjectNetwork } = this.props;
    const { projectID } = params;

    clearProjectNetwork();

    if (period === '1d') {
      getProjectNetwork(projectID, {});
    } else {
      getProjectNetwork(projectID, time);
    }
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
                header="Network"
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
                  <LineChartComponent yLabel="Network (KBs)" xLabel="Time" lineDataKey="network" data={formattedMetrics} />
                )}
              </MetricsCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectNetworkPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectNetwork: PropTypes.func.isRequired,
  clearProjectNetwork: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = (state) => {
  const { isFetching, metrics, message: metricsMessage } = state.projectNetworkReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetching,
    metrics,
    metricsMessage
  };
};

const mapDispatchToProps = {
  getProjectNetwork,
  clearProjectNetwork
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNetworkPage);
