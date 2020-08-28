import React from "react";
import PropTypes from "prop-types";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import MetricsCard from "../MetricsCard";
import { ReactComponent as MetricIcon } from "../../assets/images/resource-icon.svg";
import "./ProjectMetricsPage.css";
import LineChartComponent from "../LineChart";

class ProjectMetricsPage extends React.Component {

  render() {
    const {
      match: { params },
      projects,
    } = this.props;

    const { projectID, userID } = params;
    const projectDetails = {
      name: this.getProjectName(projects, params.projectID),
      description: this.getProjectDescription(projects, params.projectID),
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
              name={this.getProjectName(projects, params.projectID)}
              params={params}
              description={this.getProjectName(projects, params.projectID)}
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
                  <LineChartComponent preview lineDataKey="uv" data={} />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" data={} />
                </MetricsCard>
                <MetricsCard icon={<MetricIcon />} title="Memory">
                  <LineChartComponent preview lineDataKey="uv" data={} />
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
    }).isRequired,
  }).isRequired,
};

export default ProjectMetricsPage;
