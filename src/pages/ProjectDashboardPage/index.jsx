import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getProjectCPU, { clearProjectCPU } from "../../redux/actions/projectCPU";
import getProjectMemory from "../../redux/actions/projectMemory";
import getProjectNetwork from "../../redux/actions/projectNetwork";
import LineChartComponent from "../../components/LineChart";
import MetricsCard from "../../components/MetricsCard";
// import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";

import { ReactComponent as CPUIcon } from "../../assets/images/cpu.svg";
import { ReactComponent as NetworkIcon } from "../../assets/images/wifi.svg";
import { ReactComponent as MemoryIcon } from "../../assets/images/hard-drive.svg";
import "./ProjectDashboardPage.css";
import {
  formatCPUMetrics,
  formatMemoryMetrics,
  formatNetworkMetrics,
} from "../../helpers/formatMetrics";
import AppsList from "../../components/AppsList";
import {
  getProjectCurrentProject,
} from "../../helpers/projectName";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

class ProjectDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.getMemoryMetrics = this.getMemoryMetrics.bind(this);
    this.getCPUMetrics = this.getCPUMetrics.bind(this);
    this.getNetworkMetrics = this.getNetworkMetrics.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
      getProjectCPU,
      clearProjectCPU,
    } = this.props;
    const { projectID } = params;
    const { getProjectMemory, getProjectNetwork } = this.props;
    getProjectMemory(projectID, {});
    clearProjectCPU();
    getProjectCPU(projectID, {});
    getProjectNetwork(projectID, {});
  }

  getMemoryMetrics() {
    const { projectID } = this.props.match.params;
    const { memoryMetrics } = this.props;
    const results = formatMemoryMetrics(projectID, memoryMetrics);
    return results;
  }

  getCPUMetrics() {
    const { projectID } = this.props.match.params;
    const { cpuMetrics } = this.props;
    const results = formatCPUMetrics(projectID, cpuMetrics);
    return results;
  }

  getNetworkMetrics() {
    const { projectID } = this.props.match.params;
    const { networkMetrics } = this.props;
    const results = formatNetworkMetrics(projectID, networkMetrics);
    return results;
  }

  render() {
    const {
      match: { params },
      projects,
      credits,
    } = this.props;

    const { projectID } = params;
    const projectDetails = {...getProjectCurrentProject(projects, projectID)}
    
    localStorage.setItem("project", JSON.stringify(projectDetails));
    const formattedMemoryMetrics = this.getMemoryMetrics();
    const formattedCPUMetrics = this.getCPUMetrics();
    const formattedNetworkMetrics = this.getNetworkMetrics();

    return (
      <DashboardLayout
        credits={credits}
        name={projectDetails?.name}
        header="Project Dashboard"
      >
        <div className="SectionTitle">Project Metrics</div>
        <div className="MetricCardsSection">
          <MetricsCard
            icon={<CPUIcon />}
            title="CPU"
            className="CardDimensions"
          >
            <LineChartComponent
              lineDataKey="cpu"
              preview
              data={formattedCPUMetrics}
            />
          </MetricsCard>
          <MetricsCard
            icon={<MemoryIcon />}
            title="MEMORY"
            className="CardDimensions"
          >
            <LineChartComponent
              lineDataKey="memory"
              preview
              data={formattedMemoryMetrics}
            />
          </MetricsCard>
          <MetricsCard
            icon={<NetworkIcon />}
            title="NETWORK"
            className="CardDimensions"
          >
            <LineChartComponent
              lineDataKey="network"
              preview
              data={formattedNetworkMetrics}
            />
          </MetricsCard>
        </div>
        <div className="SectionTitle">Project Apps</div>
        <AppsList
          params={params}
          word=""
          message="You have no apps currently, please go to Apps section on the sidebar to create one"
        />
      </DashboardLayout>
    );
  }
}

ProjectDashboardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string,
    }),
  }),
  getProjectCPU: PropTypes.func,
  clearProjectCPU: PropTypes.func,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
};

export const mapStateToProps = (state) => {
  const { isFetchingMemory, memoryMetrics, memoryMessage } =
    state.projectMemoryReducer;
  const { isFetchingCPU, cpuMetrics, cpuMessage } = state.projectCPUReducer;
  const { isFetchingNetwork, networkMetrics, networkMessage } =
    state.projectNetworkReducer;
  const { projects } = state.userProjectsReducer;
  const { credits } = state.userCreditsReducer;
  return {
    projects,
    isFetchingMemory,
    isFetchingCPU,
    memoryMetrics,
    cpuMetrics,
    memoryMessage,
    cpuMessage,
    isFetchingNetwork,
    networkMetrics,
    networkMessage,
    credits,
  };
};

const mapDispatchToProps = {
  getProjectCPU,
  clearProjectCPU,
  getProjectMemory,
  getProjectNetwork,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDashboardPage);
