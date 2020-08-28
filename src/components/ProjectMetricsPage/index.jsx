import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import getProjectCPU, { clearProjectCPU } from '../../redux/actions/projectCPU';
import PeriodSelector from '../Period';
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
    clearProjectCPU();
    getProjectCPU(projectID, {});
  }

  getProjectName(id) {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  }

  getProjectDescription(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.description;
  }

  render() {
    const {
      match: { params },
      projects,
    } = this.props;

    const { projectID, userID } = params;
    const projectDetails = {
      name: this.getProjectName(params.projectID),
      description: this.getProjectDescription( params.projectID),
    };

    localStorage.setItem("project", JSON.stringify(projectDetails));

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
                  <LineChartComponent preview lineDataKey="uv" />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
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
  metrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getProjectCPU: PropTypes.func.isRequired,
  clearProjectCPU: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const {
    isFetching,
    metrics,
    message: metricsMessage,
  } = state.projectCPUReducer;
  const { projects } = state.userProjectsReducer;
  return {
    projects,
    isFetching,
    metrics,
    metricsMessage,
  };
};

const mapDispatchToProps = {
  getProjectCPU,
  clearProjectCPU,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMetricsPage);
