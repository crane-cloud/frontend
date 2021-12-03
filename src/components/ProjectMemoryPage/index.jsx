import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InformationBar from "../InformationBar";
import Header from "../Header";
import Spinner from "../Spinner";
import SideBar from "../SideBar";
import "./ProjectMemoryPage.css";
import getProjectMemory, {
  clearProjectMemory,
} from "../../redux/actions/projectMemory";
import MetricsCard from "../MetricsCard";
import PeriodSelector from "../Period";
import LineChartComponent from "../LineChart";
import {
  formatMemoryMetrics,
  getCurrentTimeStamp,
  subtractTime,
} from "../../helpers/formatMetrics";

class ProjectMemoryPage extends React.Component {
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
    this.fetchMemory = this.fetchMemory.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getProjectMemory,
      clearProjectMemory,
    } = this.props;
    const { projectID } = params;
    clearProjectMemory();
    getProjectMemory(projectID, { step: "2h" });
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
      getProjectMemory,
      clearProjectMemory,
    } = this.props;
    const { projectID } = params;

    clearProjectMemory();
    getProjectMemory(projectID, time);
  }

  render() {
    const {
      match: { params },
      isFetchingMemory,
      memoryMetrics,
    } = this.props;
    const { projectID } = params;
    const { period } = this.state;

    const formattedMetrics = formatMemoryMetrics(
      projectID,
      memoryMetrics,
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
              <InformationBar header="Memory" />
            </div>
            <div className="ContentSection SmallContainer">
              <MetricsCard
                className="MetricsCardGraph"
                title={<PeriodSelector onChange={this.handlePeriodChange} />}
              >
                {isFetchingMemory ? (
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectMemoryPage.propTypes = {
  isFetchingMemory: PropTypes.bool.isRequired,
  memoryMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectMemory: PropTypes.func.isRequired,
  clearProjectMemory: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { isFetchingMemory, memoryMetrics, memoryMessage } =
    state.projectMemoryReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetchingMemory,
    memoryMetrics,
    memoryMessage,
  };
};

const mapDispatchToProps = {
  getProjectMemory,
  clearProjectMemory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMemoryPage);
