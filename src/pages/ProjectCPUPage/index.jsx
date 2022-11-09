import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import SideBar from "../../components/SideBar";
import "./ProjectCPUPage.css";
import getProjectCPU, { clearProjectCPU } from "../../redux/actions/projectCPU";
import MetricsCard from "../../components/MetricsCard";
import PeriodSelector from "../../components/Period";
import LineChartComponent from "../../components/LineChart";
import {
  formatCPUMetrics,
  getCurrentTimeStamp,
  subtractTime,
} from "../../helpers/formatMetrics";
import { getProjectName } from "../../helpers/projectName";

class ProjectCPUPage extends React.Component {
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

    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchCPU = this.fetchCPU.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getProjectCPU,
      clearProjectCPU,
    } = this.props;
    const { projectID } = params;
    clearProjectCPU();
    getProjectCPU(projectID, { step: "2h" });
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
      this.fetchCPU();
    }
  }

  fetchCPU() {
    const { time } = this.state;
    const {
      match: { params },
      getProjectCPU,
      clearProjectCPU,
    } = this.props;
    const { projectID } = params;

    clearProjectCPU();
    getProjectCPU(projectID, time);
  }

  render() {
    const {
      match: { params },
      isFetchingCPU,
      cpuMetrics,
      projects,
    } = this.props;
    const { projectID } = params;
    const { period } = this.state;

    const formattedMetrics = formatCPUMetrics(projectID, cpuMetrics, period);

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={getProjectName(projects, projectID)}
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
              <InformationBar header="CPU" />
            </div>
            <div className="ContentSection SmallContainer">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectCPUPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isFetchingCPU: PropTypes.bool.isRequired,
  cpuMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectCPU: PropTypes.func.isRequired,
  clearProjectCPU: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = (state) => {
  const { isFetchingCPU, cpuMetrics, cpuMessage } = state.projectCPUReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetchingCPU,
    cpuMetrics,
    cpuMessage,
  };
};

const mapDispatchToProps = {
  getProjectCPU,
  clearProjectCPU,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCPUPage);
