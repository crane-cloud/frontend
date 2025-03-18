import React, { useEffect, useCallback, useState } from "react";
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
import Modal from "../../components/Modal";
import styles from "../../pages/createAIAppPage/createAIAppPage.module.css";
import BlackInputText from "../../components/BlackInputText";
import PrimaryButton from "../../components/PrimaryButton";
import Feedback from "../../components/Feedback";
import Spinner from "../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useMlDeployment } from "../../hooks/useAppDeploymentMutation";
import { validateName } from "../../helpers/validation";

const ProjectDashboardPage = () => {
  const { projectID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { projects, memoryMetrics, cpuMetrics, networkMetrics, credits } =
    useSelector((state) => ({
      projects: state?.userProjectsReducer?.projects,
      memoryMetrics: state?.projectMemoryReducer?.memoryMetrics,
      cpuMetrics: state?.projectCPUReducer?.cpuMetrics,
      networkMetrics: state?.projectNetworkReducer?.networkMetrics,
      credits: state?.userCreditsReducer?.credits,
    }));

  const [openJupyterNotebookModel, setOpenJupyterNotebookModel] =
    useState(false);
  const [jupiterNoteBookName, setJupiterNoteBookName] = useState("");
  const [aiModelName, setAiModelName] = useState("");
  const [aiModelUri, setAiModelUri] = useState("");
  const [aiModelServer, setAiModelServer] = useState("");
  const [aiModelApiType, setAiModelApiType] = useState("");
  const [openDeployModel, setOpenDeployModel] = useState(false);
  const [validationError, setValidationError] = useState("");

  const {
    isSuccess: deploymentSuccess,
    error: deploymentError,
    isPending: deploymentPending,
    mutate: deployMLApp,
  } = useMutation({
    mutationFn: useMlDeployment,
  });

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

  const handleAIDeployment = () => {
    if (!jupiterNoteBookName || !aiModelName) {
      setValidationError("Please enter a name for the app");
    }
    if (
      validateName(jupiterNoteBookName) === false ||
      validateName(aiModelName) === false
    ) {
      setValidationError("Name should start with a letter");
    } else if (
      validateName(jupiterNoteBookName) === "false_convention" ||
      validateName(aiModelName) === "false_convention"
    ) {
      setValidationError(
        "Name may only contain letters,numbers,dot and a hypen -"
      );
    } else if (jupiterNoteBookName.length > 27 || aiModelName.length > 27) {
      setValidationError("Name may not exceed 27 characters");
    }

    // notebook data
    const notebookData = {
      name: jupiterNoteBookName,
      is_notebook: true,
      projectID: projectID,
    };

    // AI model data
    const modelData = {
      api_type: aiModelApiType,
      is_modal: true,
      is_notebook: false,
      model_image_uri: aiModelUri,
      model_server: aiModelServer,
      name: aiModelName,
      projectID: projectID,
    };

    deployMLApp(aiModelName !== "" ? modelData : notebookData);
  };

  useEffect(() => {
    if (deploymentSuccess) {
      setOpenJupyterNotebookModel(false);
      setOpenDeployModel(false);
      window.location.reload();
    }
  }, [deploymentSuccess]);

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
            // className="NewAppSelectPlaceHolder"
            options={[
              { id: "1", name: "Regular App" },
              { id: "2", name: "Jupyter Notebook" },
              { id: "3", name: "Deploy AI Model" },
            ]}
            placeholder="+ Create App"
            onChange={(e) => {
              if (e.name === "Regular App") {
                history.push(
                  `/projects/${projectID}/apps?initialOpenModal=true`
                );
              } else if (e.name === "Jupyter Notebook") {
                setOpenJupyterNotebookModel(true);
              } else if (e.name === "Deploy AI Model") {
                setOpenDeployModel(true);
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

      <Modal
        showModal={openJupyterNotebookModel}
        onClickAway={() => {
          setOpenJupyterNotebookModel(false);
        }}
      >
        <div className={styles.createAIAppJupyterNotebookModalContainer}>
          <h2 className={styles.createAIAppJupyterNotebookModalTitle}>
            Create Jupyter Notebook
          </h2>
          <form className={styles.createAIAppJupyterNotebookModalForm}>
            <label>Name *</label>
            <BlackInputText
              name={"jupiterNoteBookName"}
              value={jupiterNoteBookName}
              onChange={(e) => {
                setJupiterNoteBookName(e.target.value);
              }}
              placeholder="Enter your notebook name"
            />
            <div className={styles.createAIAppActionButtonsContainer}>
              <PrimaryButton
                color="primary"
                onClick={() => {
                  setOpenJupyterNotebookModel(false);
                }}
              >
                Close
              </PrimaryButton>
              <PrimaryButton
                onClick={(e) => {
                  e.preventDefault();
                  handleAIDeployment();
                }}
                disabled={jupiterNoteBookName === "" || deploymentPending}
              >
                {deploymentPending ? <Spinner /> : "Create"}
              </PrimaryButton>
            </div>
            {validationError && (
              <Feedback type="error" message={validationError} />
            )}
            {deploymentError && (
              <Feedback
                type="error"
                message={"Failed to deploy notebook, Please try again later"}
              />
            )}
          </form>
        </div>
      </Modal>

      <Modal
        showModal={openDeployModel}
        onClickAway={() => {
          setOpenDeployModel(false);
        }}
      >
        <div className={styles.createAIAppJupyterNotebookModalContainer}>
          <h2 className={styles.createAIAppJupyterNotebookModalTitle}>
            Deploy AI model
          </h2>
          <form className={styles.createAIAppJupyterNotebookModalForm}>
            <label>Name *</label>
            <BlackInputText
              name={"modelName"}
              value={aiModelName}
              onChange={(e) => {
                setAiModelName(e.target.value);
              }}
              placeholder="Enter your model name"
              className={styles.InputStyles}
            />

            <label>Model Image URI *</label>
            <BlackInputText
              name={"modelImageUri"}
              value={aiModelUri}
              onChange={(e) => {
                setAiModelUri(e.target.value);
              }}
              placeholder="Enter your model image URI"
            />

            <label>Model Server *</label>
            <Select
              options={[
                { id: "1", name: "SKLEARN_SERVER" },
                { id: "2", name: "TENSORFLOW_SERVER" },
                { id: "3", name: "XGBOOST_SERVER" },
                { id: "4", name: "MLFLOW_SERVER" },
                { id: "5", name: "TRITON_SERVER" },
                { id: "6", name: "TEMPO_SERVER" },
                { id: "7", name: "HUGGINGFACE_SERVER" },
                { id: "8", name: "CUSTOM_INFERENCE_SERVER" },
              ]}
              placeholder="Select your model server"
              onChange={(selected) => {
                setAiModelServer(selected.name);
              }}
            />

            <label>Model API type *</label>
            <Select
              options={[{ id: "1", name: "REST" }]}
              placeholder="Select your model API type"
              onChange={(selected) => {
                setAiModelApiType(selected.name);
              }}
            />

            <div className={styles.createAIAppActionButtonsContainer}>
              <PrimaryButton
                color="primary"
                onClick={() => {
                  setOpenJupyterNotebookModel(false);
                }}
              >
                Close
              </PrimaryButton>
              <PrimaryButton
                onClick={(e) => {
                  e.preventDefault();
                  handleAIDeployment();
                }}
                disabled={aiModelName === "" || deploymentPending}
              >
                {deploymentPending ? <Spinner /> : "Deploy"}
              </PrimaryButton>
            </div>
            {validationError && (
              <Feedback type="error" message={validationError} />
            )}
            {deploymentError && (
              <Feedback
                type="error"
                message={"Failed to deploy notebook, Please try again later"}
              />
            )}
          </form>
        </div>
      </Modal>
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
