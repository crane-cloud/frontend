import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import getProjectCPU, { clearProjectCPU } from "../../redux/actions/projectCPU";
import getProjectMemory from "../../redux/actions/projectMemory";
import getProjectNetwork from "../../redux/actions/projectNetwork";
import LineChartComponent from "../../components/LineChart";
import MetricsCard from "../../components/MetricsCard";
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
import { getProjectCurrentProject } from "../../helpers/projectName";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Select from "../../components/Select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProjectDashboardPage = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch();
  const history =  useHistory();

  const {
    projects,
    memoryMetrics,
    cpuMetrics,
    networkMetrics,
    credits,
  } = useSelector((state) => ({
    projects: state?.userProjectsReducer?.projects,
    memoryMetrics: state?.projectMemoryReducer?.memoryMetrics,
    cpuMetrics: state?.projectCPUReducer?.cpuMetrics,
    networkMetrics: state?.projectNetworkReducer?.networkMetrics,
    credits: state?.userCreditsReducer?.credits,
  }));

  useEffect(() => {
    dispatch(getProjectMemory(projectID, {}));
    dispatch(clearProjectCPU());
    dispatch(getProjectCPU(projectID, {}));
    dispatch(getProjectNetwork(projectID, {}));
  }, [dispatch, projectID]);

  const getMemoryMetrics = useCallback(() => {
    return formatMemoryMetrics(projectID, memoryMetrics);
  }, [projectID, memoryMetrics]);

  const getCPUMetrics = useCallback(() => {
    return formatCPUMetrics(projectID, cpuMetrics);
  }, [projectID, cpuMetrics]);

  const getNetworkMetrics = useCallback(() => {
    return formatNetworkMetrics(projectID, networkMetrics);
  }, [projectID, networkMetrics]);

  const projectDetails = getProjectCurrentProject(projects, projectID);

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(projectDetails));
  }, [projectDetails]);

  return (
    <DashboardLayout
      credits={credits}
      name={projectDetails?.name}
      header="Project Dashboard"
    >
      <div className="SectionTitle">Project Metrics</div>
      <div className="MetricCardsSection">
        <MetricsCard icon={<CPUIcon />} title="CPU" className="CardDimensions">
          <LineChartComponent
            lineDataKey="cpu"
            preview
            data={getCPUMetrics()}
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
            data={getMemoryMetrics()}
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
            data={getNetworkMetrics()}
          />
        </MetricsCard>
      </div>
      <div className="SectionTitle ProjectDashboardTitleSection">
        <div className="">Project Apps</div>
        <div className="NewAppSelectButtonClass">
          <Select
            className="NewAppSelectPlaceHolder"
            options={[
              { id: "1", name: "Regular App" },
              { id: "2", name: "AI App" },
            ]}
            placeholder="+ Deploy App"
            onChange={(e) => {
              if (e.name === "Regular App") {
                history.push(`/projects/${projectID}/apps?initialOpenModal=true`);
              } else if (e.name === "AI App") {
                history.push(`/projects/${projectID}/ai-apps`);
              }
            }}
          />
        </div>
      </div>
      <AppsList
        params={{ projectID }}
        word=""
        message="You have no apps currently, please go to Apps section on the sidebar to create one"
      />
    </DashboardLayout>
  );
};

ProjectDashboardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string,
    }),
  }),
};

export default ProjectDashboardPage;
