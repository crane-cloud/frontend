import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
import getAppMemory, { clearAppMemory } from "../../redux/actions/appMemory";
import MetricsCard from "../../components/MetricsCard";
import PeriodSelector from "../../components/Period";
import LineChartComponent from "../../components/LineChart";
import {
  formatAppMemoryMetrics,
  getCurrentTimeStamp,
  subtractTime,
} from "../../helpers/formatMetrics";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

class AppMemoryPage extends React.Component {
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
    this.fetchMemory = this.fetchMemory.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getAppMemory,
      clearAppMemory,
    } = this.props;
    const { projectID, appID } = params;

    clearAppMemory();
    getAppMemory(projectID, appID, { step: "2h" });
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
      this.fetchMemory();
    }
  }

  fetchMemory() {
    const { time } = this.state;
    const {
      match: { params },
      getAppMemory,
      clearAppMemory,
    } = this.props;
    const { projectID, appID } = params;

    clearAppMemory();
    getAppMemory(projectID, appID, time);
  }

  render() {
    const {
      match: { params },
      isFetchingAppMemory,
      appMemoryMetrics,
    } = this.props;
    const { appID } = params;
    const { period } = this.state;

    const formattedMetrics = formatAppMemoryMetrics(
      appID,
      appMemoryMetrics,
      period
    );

    return (
      <DashboardLayout header="App Memory" name={this.getAppName(appID)}>
        <MetricsCard
          className="MetricsCardGraph"
          title={<PeriodSelector onChange={this.handlePeriodChange} />}
        >
          {isFetchingAppMemory ? (
            <div className="ContentSectionSpinner">
              <Spinner />
            </div>
          ) : (
            <LineChartComponent
              yLabel="Memory(MBs)"
              xLabel="Time"
              xDataKey="time"
              lineDataKey="memory"
              data={formattedMetrics}
            />
          )}
        </MetricsCard>
      </DashboardLayout>
    );
  }
}

AppMemoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appID: PropTypes.string,
      userID: PropTypes.string,
    }),
  }),
  isFetchingAppMemory: PropTypes.bool,
  appMemoryMetrics: PropTypes.arrayOf(PropTypes.shape({})),
  getAppMemory: PropTypes.func,
  clearAppMemory: PropTypes.func,
};

export const mapStateToProps = (state) => {
  const { isFetchingAppMemory, appMemoryMetrics, appMemoryMessage } =
    state.appMemoryReducer;
  const { apps } = state.appsListReducer;
  return {
    apps,
    isFetchingAppMemory,
    appMemoryMetrics,
    appMemoryMessage,
  };
};

const mapDispatchToProps = {
  getAppMemory,
  clearAppMemory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMemoryPage);
