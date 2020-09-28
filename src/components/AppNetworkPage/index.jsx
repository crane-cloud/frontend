import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InformationBar from "../InformationBar";
import Header from "../Header";
import Spinner from "../Spinner";
import SideBar from "../SideBar";
import "./AppNetworkPage.css";
import getAppNetwork, { clearAppNetwork } from "../../redux/actions/appNetwork";
import MetricsCard from "../MetricsCard";
import PeriodSelector from "../Period";
import LineChartComponent from "../LineChart";
import { formatAppNetworkMetrics, getCurrentTimeStamp, subtractTime } from '../../helpers/formatMetrics';

class AppNetworkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: this.getCurrentTimeStamp(),
        step: "",
      },
    };

    this.getCurrentTimeStamp = this.getCurrentTimeStamp.bind(this);
    this.getAppName = this.getAppName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.subtractTime = this.subtractTime.bind(this);
    this.fetchNetwork = this.fetchNetwork.bind(this);
    this.bytesToMegabytes = this.bytesToMegabytes.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getAppNetwork,
      clearAppNetwork,
    } = this.props;
    const { projectID, appID } = params;

    clearAppNetwork();
    getAppNetwork(projectID, appID, {});
  }

  getAppName(id) {
    const { apps } = this.props;
    return apps.apps.find((app) => app.id === id).name;
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

  formatMetrics(appID) {
    const { metrics } = this.props;
    const found = metrics.find((metric) => metric.app === appID);
    const memoryData = [];

    if (found !== undefined) {
      if (found.metrics.length > 0) {
        found.metrics.forEach((metric) => {
          const newMetricObject = {
            time: this.translateTimestamp(metric.timestamp),
            memory: this.bytesToMegabytes(metric.value),
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
    if (period === "1d") {
      days = 1;
      step = "2h";
    } else if (period === "7d") {
      days = 7;
      step = "1d";
    } else if (period === "1m") {
      days = 30;
      step = "1d";
    } else if (period === "3m") {
      days = 90;
      step = "7d";
    } else if (period === "1y") {
      days = 365;
      step = "1m";
    }

    const startTimeStamp = await this.subtractTime(
      this.getCurrentTimeStamp(),
      days
    );

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        step,
      },
    }));

    this.fetchNetwork();
  }

  // this function gets the 'end' timestamp
  subtractTime(endTimestamp, days) {
    return new Date(endTimestamp - days * 24 * 60 * 60).getTime();
  }

  fetchNetwork() {
    const { time } = this.state;
    const {
      match: { params },
      getAppNetwork,
      clearAppNetwork,
    } = this.props;
    const { projectID, appID } = params;

    clearAppNetwork();
    getAppNetwork(projectID, appID, time);
  }

  render() {
    const {
      match: { params },
      isFetching,
    } = this.props;
    const { projectID, appID, userID } = params;

    const formattedMetrics = this.formatMetrics(appID);

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getAppName(appID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/apps/${appID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Network" />
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
                  <LineChartComponent
                    yLabel="Network(MBs)"
                    xLabel="Time"
                    lineDataKey="memory"
                    data={formattedMetrics}
                  />
                )}
              </MetricsCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppNetworkPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getAppNetwork: PropTypes.func.isRequired,
  clearAppNetwork: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    metrics,
    appNetworkMessage,
  } = state.appNetworkReducer;
  const { apps } = state.appsListReducer;
  return {
    apps,
    isFetching,
    metrics,
    appNetworkMessage,
  };
};

const mapDispatchToProps = {
  getAppNetwork,
  clearAppNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNetworkPage);
