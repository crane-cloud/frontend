import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getProjectCPU, { clearProjectCPU } from "../../redux/actions/projectCPU";
import getProjectMemory from "../../redux/actions/projectMemory";
import getProjectNetwork from "../../redux/actions/projectNetwork";
import LineChartComponent from "../LineChart";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import MetricsCard from "../MetricsCard";
import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";
import "./ProjectDashboardPage.css";
import {
  formatCPUMetrics,
  formatMemoryMetrics,
  formatNetworkMetrics,
} from "../../helpers/formatMetrics";
import AppsList from "../AppsList";
import {getProjectName, getProjectDescription} from "../../helpers/projectName"

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
      projects
    } = this.props;

    const { projectID } = params;
    const projectDetails = {
      name: getProjectName(projects, projectID),
      description: getProjectDescription(projects, projectID),
    };

    localStorage.setItem("project", JSON.stringify(projectDetails));
    const formattedMemoryMetrics = this.getMemoryMetrics();
    const formattedCPUMetrics = this.getCPUMetrics();
    const formattedNetworkMetrics = this.getNetworkMetrics();

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={getProjectName(projects, params.projectID)}
              params={params}
              description={getProjectName(projects, params.projectID)}
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
              <InformationBar header="Project Dashboard" />
            </div>
            <div className="ProjectContentSection SmallContainer">
              <h3>Project Metrics</h3>
              <div className="MetricCardsSection">
                <MetricsCard
                  icon={<MetricIcon />}
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
                  icon={<MetricIcon />}
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
                  icon={<MetricIcon />}
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
              <h3>Project Apps</h3>
              <AppsList
                params={params}
                word=""
                message="You have no apps currently, please go to Apps section on the sidebar to create one"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectDashboardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getProjectCPU: PropTypes.func.isRequired,
  clearProjectCPU: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { isFetchingMemory, memoryMetrics, memoryMessage } =
    state.projectMemoryReducer;
  const { isFetchingCPU, cpuMetrics, cpuMessage } = state.projectCPUReducer;
  const { isFetchingNetwork, networkMetrics, networkMessage } =
    state.projectNetworkReducer;
  const { projects } = state.userProjectsReducer;
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
