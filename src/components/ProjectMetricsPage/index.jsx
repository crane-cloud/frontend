import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import getProjectCPU, { clearProjectCPU } from '../../redux/actions/projectCPU';
import PeriodSelector from '../Period';
import getProjectMemory from '../../redux/actions/projectMemory';
import LineChartComponent from '../LineChart';
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import MetricsCard from "../MetricsCard";
import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";
import "./ProjectMetricsPage.css";

class ProjectMetricsPage extends React.Component {
  constructor(props) {
    super(props);

    this.getProjectName = this.getProjectName.bind(this);
    this.getProjectDescription = this.getProjectDescription.bind(this);
  }

  componentDidMount() {
    const {
        match: { params },
        getProjectCPU,
        clearProjectCPU,
      } = this.props;
    const { projectID } = params;
    const { getProjectMemory } = this.props;
    getProjectMemory(projectID, {});
    clearProjectCPU();
    getProjectCPU(projectID, {});
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

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

  getProjectDescription(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).description;
  }

  render() {
    const {
      match: { params },
      projects,
    } = this.props;

    const { projectID, userID } = params;
    const projectDetails = {
      name: this.getProjectName(projectID),
      description: this.getProjectDescription( projectID),
    };

    localStorage.setItem("project", JSON.stringify(projectDetails));
    const formattedMetrics = this.formatMetrics(projectID);

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(params.projectID)}
              params={params}
              description={this.getProjectName(params.projectID)}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              storageLink={`/users/${userID}/projects/${projectID}/storage/`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Project Metrics" />
            </div>
            <div className="ContentSection">
              <div className="TopCardsSection">
                <MetricsCard icon={<MetricIcon />} title="CPU">
                  <LineChartComponent preview lineDataKey="uv" data={formattedMetrics}/>
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="MEMORY">
                  <LineChartComponent preview lineDataKey="uv" />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="NETWORK">
                  <LineChartComponent preview lineDataKey="uv" />
                </MetricsCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectMetricsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  // metrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectCPU: PropTypes.func.isRequired,
  clearProjectCPU: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { 
    isFetchingMemory,
    memoryMetrics,
    memoryMessage
  } = state.projectMemoryReducer;
  const {
    isFetchingCPU,
    cpuMetrics,
    cpuMessage,
  } = state.projectCPUReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetchingMemory,
    isFetchingCPU,
    memoryMetrics,
    cpuMetrics,
    memoryMessage,
    cpuMessage
  };
};

const mapDispatchToProps = {
  getProjectCPU,
  clearProjectCPU,
  getProjectMemory
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMetricsPage);
