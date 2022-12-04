import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  formatAppCPUMetrics,
  getCurrentTimeStamp,
  subtractTime,
} from "../../helpers/formatMetrics";
import LineChartComponent from "../../components/LineChart";
import MetricsCard from "../../components/MetricsCard";
import PeriodSelector from "../../components/Period";
import getAppCPU, { clearAppCPU } from "../../redux/actions/appCPU";
import Spinner from "../../components/Spinner";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

export class AppCpuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        start: 0,
        end: getCurrentTimeStamp(),
        step: "",
      },
      period: "1d",
    };

    this.getAppName = this.getAppName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchCpu = this.fetchCpu.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getAppCPU,
      clearAppCPU,
    } = this.props;
    const { projectID, appID } = params;
    clearAppCPU();
    getAppCPU(projectID, appID, { step: "2h" });
  }

  getAppName(id) {
    const { apps } = this.props;
    return apps?.apps.find((app) => app.id === id).name;
  }

  getDateCreated() {
    const {
      match: { params },
      apps,
    } = this.props;
    const { appID } = params;
    return apps?.apps.find((app) => app.id === appID).date_created;
  }

  async handlePeriodChange(period, customTime = null) {
    let days;
    let step;
    let startTimeStamp;
    let endTimeStamp = getCurrentTimeStamp();

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
    } else if (period === "custom") {
      step = "1d";
    }

    this.setState({ period }); // this period state will be used to format x-axis values accordingly

    if (period === "all") {
      startTimeStamp = await Date.parse(this.getDateCreated());
      step = "1d"; // TODO: make dynamic depending on the all-time metrics
    } else if (period === "custom" && customTime !== null) {
      startTimeStamp = customTime.start;
      endTimeStamp = customTime.end;
    } else {
      startTimeStamp = await subtractTime(getCurrentTimeStamp(), days);
    }

    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        end: endTimeStamp,
        start: startTimeStamp,
        step,
      },
    }));

    if (endTimeStamp > startTimeStamp) {
      this.fetchCpu();
    }
  }

  fetchCpu() {
    const { time } = this.state;
    const {
      match: { params },
      getAppCPU,
      clearAppCPU,
    } = this.props;
    const { projectID, appID } = params;

    clearAppCPU();
    getAppCPU(projectID, appID, time);
  }

  render() {
    const {
      match: { params },
      isFetchingCPU,
      appCPUMetrics,
    } = this.props;
    const { appID } = params;
    const { period } = this.state;

    const formattedMetrics = formatAppCPUMetrics(appID, appCPUMetrics, period);

    return (
      <DashboardLayout name={this.getAppName(appID)} header="App CPU">
        <MetricsCard
          className="MetricsCardGraph"
          title={<PeriodSelector onChange={this.handlePeriodChange} />}
        >
          {isFetchingCPU ? (
            <div className="ContentSectionSpinner">
              <Spinner />
            </div>
          ) : (
            <LineChartComponent
              yLabel="CPU(cores)"
              xLabel="Time"
              xDataKey="time"
              lineDataKey="cpu"
              data={formattedMetrics}
            />
          )}
        </MetricsCard>
      </DashboardLayout>
    );
  }
}

AppCpuPage.propTypes = {
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     appID: PropTypes.string.isRequired,
  //     userID: PropTypes.string.isRequired,
  //   }).isRequired,
  // }).isRequired,
  isFetchingCPU: PropTypes.bool.isRequired,
  appCPUMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getAppCPU: PropTypes.func.isRequired,
  clearAppCPU: PropTypes.func.isRequired,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = (state) => {
  const { isFetchingCPU, appCPUMetrics, cpuMessage } = state.appCpuReducer;
  const { apps } = state.appsListReducer;
  return { apps, isFetchingCPU, appCPUMetrics, cpuMessage };
};

export const mapDispatchToProps = {
  getAppCPU,
  clearAppCPU,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCpuPage);
