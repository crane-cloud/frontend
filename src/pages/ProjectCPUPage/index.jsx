import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner";
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
import DashboardLayout from "../../components/Layouts/DashboardLayout";
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
      showErrorMessage: false,
      dateError: "",
    };
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.fetchCPU = this.fetchCPU.bind(this);
    this.getDateCreated = this.getDateCreated.bind(this);
  }

  /*componentDidMount() {
    const {
      match: { params },
      getProjectCPU,
      clearProjectCPU,
    } = this.props;
    const { projectID } = params;
    clearProjectCPU();
    getProjectCPU(projectID, { step: "2h" });
  }*/
  componentDidMount() {
    const {
      match: { params },
      getProjectCPU,
      clearProjectCPU,
    } = this.props;
    const { projectID } = params;
    clearProjectCPU();
  
    const endTimeStamp = getCurrentTimeStamp(); // Set the end date to the current timestamp
  
    this.setState({
      time: {
        start: 0,
        end: endTimeStamp,
        step: "2h", // You can adjust the default step value here if needed
      },
    });
  
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
    let endTimeStamp;
  
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
  
    this.setState({ period });
  
    if (period === "all") {
      startTimeStamp = await Date.parse(this.getDateCreated());
      endTimeStamp = getCurrentTimeStamp();
    } else if (period === "custom" && customTime !== null) {
      startTimeStamp = customTime.start;
      endTimeStamp = customTime.end;
      const { start, end } = customTime;
      if (end <= start) {
        this.setState({
          showErrorMessage: true,
          dateError: "End date must be greater than start date.",
        });
        return; // Exit the function early to prevent further processing
      } else {
        this.setState({
          showErrorMessage: false,
          dateError: "",
        });
      }
    } else {
      startTimeStamp = await subtractTime(getCurrentTimeStamp(), days);
      endTimeStamp = getCurrentTimeStamp();
    }
  
    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        start: startTimeStamp,
        end: endTimeStamp,
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
      <DashboardLayout
        name={getProjectName(projects, projectID)}
        header="Project CPU"
      >
        <MetricsCard
          className="MetricsCardGraph"
          title={
            <div className="PeriodContainer">
              <PeriodSelector onChange={this.handlePeriodChange} />
              {this.state.showErrorMessage && (
                <div className="ErrorMessage"> {this.state.dateError}</div>
              )}
            </div>
          }
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
ProjectCPUPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
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
