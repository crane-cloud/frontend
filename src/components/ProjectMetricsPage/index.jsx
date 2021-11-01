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
import "./ProjectMetricsPage.css";
import {
  formatCPUMetrics,
  formatMemoryMetrics,
  formatNetworkMetrics,
} from "../../helpers/formatMetrics";

class ProjectMetricsPage extends React.Component {
  constructor(props) {
    super(props);

    this.getProjectName = this.getProjectName.bind(this);
    this.getProjectDescription = this.getProjectDescription.bind(this);
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

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

  getProjectDescription(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).description;
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
    } = this.props;

    const { projectID } = params;
    const projectDetails = {
      name: this.getProjectName(projectID),
      description: this.getProjectDescription(projectID),
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
              name={this.getProjectName(params.projectID)}
              params={params}
              description={this.getProjectName(params.projectID)}
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
              <InformationBar header="Project Metrics" />
            </div>
            <div className="ContentSection">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMetricsPage);
