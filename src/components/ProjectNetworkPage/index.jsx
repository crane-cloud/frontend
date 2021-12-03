import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InformationBar from "../InformationBar";
import Header from "../Header";
import Spinner from "../Spinner";
import SideBar from "../SideBar";
import "./ProjectNetworkPage.css";
import getProjectNetwork, {
  clearProjectNetwork,
} from "../../redux/actions/projectNetwork";
import MetricsCard from "../MetricsCard";
import PeriodSelector from "../Period";
import LineChartComponent from "../LineChart";
import {
  formatNetworkMetrics,
  getCurrentTimeStamp,
  subtractTime,
} from "../../helpers/formatMetrics";

class ProjectNetworkPage extends React.Component {
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

    this.getProjectName = this.getProjectName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchNetwork = this.fetchNetwork.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getProjectNetwork,
      clearProjectNetwork,
    } = this.props;
    const { projectID } = params;
    clearProjectNetwork();
    getProjectNetwork(projectID, { step: "2h" });
  }

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

  getDateCreated() {
    const {
      match: { params },
      projects,
    } = this.props;
    const { projectID } = params;
    return projects.find((project) => project.id === projectID).date_created;
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
      step = "7d";
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
      this.fetchNetwork();
    }
  }

  fetchNetwork() {
    const { time } = this.state;
    const {
      match: { params },
      getProjectNetwork,
      clearProjectNetwork,
    } = this.props;
    const { projectID } = params;

    clearProjectNetwork();

    getProjectNetwork(projectID, time);
  }

  render() {
    const {
      match: { params },
      isFetchingNetwork,
      networkMetrics,
    } = this.props;
    const { projectID } = params;
    const { period } = this.state;

    const formattedMetrics = formatNetworkMetrics(
      projectID,
      networkMetrics,
      period
    );

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projectID)}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/projects/${projectID}/metrics`}
              cpuLink={`/projects/${projectID}/cpu/`}
              memoryLink={`/projects/${projectID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Network" />
            </div>
            <div className="ContentSection SmallContainer">
              <MetricsCard
                className="MetricsCardGraph"
                title={<PeriodSelector onChange={this.handlePeriodChange} />}
              >
                {isFetchingNetwork ? (
                  <div className="ContentSectionSpinner">
                    <Spinner />
                  </div>
                ) : (
                  <LineChartComponent
                    yLabel="Network (KBs)"
                    xLabel="Time"
                    xDataKey="time"
                    lineDataKey="network"
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

ProjectNetworkPage.propTypes = {

  isFetchingNetwork: PropTypes.bool.isRequired,
  networkMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectNetwork: PropTypes.func.isRequired,
  clearProjectNetwork: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { isFetchingNetwork, networkMetrics, networkMessage } =
    state.projectNetworkReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetchingNetwork,
    networkMetrics,
    networkMessage,
  };
};

const mapDispatchToProps = {
  getProjectNetwork,
  clearProjectNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNetworkPage);
