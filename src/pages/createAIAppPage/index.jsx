import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReactComponent as JupyterNoteBookApp } from "../../assets/images/jupyter_notebook.svg";
import { ReactComponent as TrainedAIAppIcon } from "../../assets/images/trained_model.svg";
// import { ReactComponent as FilesIcon } from "../../assets/images/files.svg";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./createAIAppPage.module.css";
import { getProjectCurrentProject } from "../../helpers/projectName";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Modal from "../../components/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Checkbox from "../../components/Checkbox";
import BlackInputText from "../../components/BlackInputText";
import Select from "../../components/Select";
import { useAppDeployment } from "../../hooks/useAppDeploymentMutation";
import { useMutation } from "@tanstack/react-query";
import { validateName } from "../../helpers/validation";
import Feedback from "../../components/Feedback";
import Spinner from "../../components/Spinner";
import { replicaSetOptions } from "../../helpers/dateConstants";
import aiCategoriesClassification from "./aiCategoriesClassification";
import PillsSelector from "../../components/PillSelectComponent";
import DockerfilePreviewComponent from "../../components/dockerFilePreview";

const CreateAIAppPage = () => {
  const { projectID } = useParams();
  const [formLevel, setFormLevel] = useState(0);
  const history = useHistory();
  //jupyter notebook
  const [jupyterNotebookChecked, setJupyterNotebookChecked] = useState(false);
  const [trainedModelChecked, setTrainedModelChecked] = useState(false);
  const [imageConfirmationCheckbox, setImageConfirmationCheckbox] =
    useState(false);
  const [openJupyterNotebookModel, setOpenJupyterNotebookModel] =
    useState(false);
  const [jupiterNoteBookName, setJupiterNoteBookName] = useState("");
  const [validationError, setValidationError] = useState("");

  //  form level 5
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [replicas, setReplicas] = useState(1);
  const [entryCommand, setEntryCommand] = useState("");
  const [port, setPort] = useState(80);
  const [environmentVariables, setEnvironmentVariables] = useState([
    { name: "", value: "" },
  ]);
  const [isPrivateImage, setIsPrivateImage] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [server, setServer] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [deploymentFeedback, setDeploymentFeedback] = useState("");

  const {
    isSuccess: deploymentSuccess,
    error: deploymentError,
    isPending: deploymentPending,
    mutate: deployApp,
  } = useMutation({
    mutationFn: useAppDeployment,
  });

  //form level 3
  const [trainedModelSubCategory, setTrainedModelSubCategory] = useState();

  // form level 2
  const [trainedModelCategory, setTrainedModelCategory] = useState();
  const [unavailableCategory, setUnavailableCategory] = useState();

  const { projects } = useSelector((state) => ({
    projects: state?.userProjectsReducer?.projects,
  }));

  const projectDetails = getProjectCurrentProject(projects, projectID);

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(projectDetails));
  }, [projectDetails]);

  const handleAddEnvVariable = (e) => {
    e.preventDefault();
    setEnvironmentVariables([...environmentVariables, { name: "", value: "" }]);
  };

  const handleRemoveEnvVariable = (index) => {
    const newEnvVars = environmentVariables.filter((_, i) => i !== index);
    setEnvironmentVariables(newEnvVars);
  };

  const handleEnvVariableChange = (index, field, value) => {
    const newEnvVars = environmentVariables.map((envVar, i) =>
      i === index ? { ...envVar, [field]: value } : envVar
    );
    setEnvironmentVariables(newEnvVars);
  };
  const handleJupyterNotebookDeployment = async () => {
    if (!jupiterNoteBookName) {
      setValidationError("Please enter a name for the app");
    }
    if (validateName(jupiterNoteBookName) === false) {
      setValidationError("Name should start with a letter");
    } else if (validateName(name) === "false_convention") {
      setValidationError(
        "Name may only contain letters,numbers,dot and a hypen -"
      );
    } else if (name.length > 27) {
      setValidationError("Name may not exceed 27 characters");
    }
    const data = {
      name: jupiterNoteBookName,
      is_notebook: true,
      projectID: projectID,
    };
    await deployApp(data);
  };

  useEffect(() => {
    if (deploymentSuccess) {
      history.push(`/projects`);
    }
  }, [deploymentSuccess]);

  const handleCreateAIApp = () => {
    if (!name || !imageUrl) {
      setDeploymentFeedback("App name & Image URI are required");
    } else if (validateName(name) === false) {
      setDeploymentFeedback("Name should start with a letter");
    } else if (validateName(name) === "false_convention") {
      setDeploymentFeedback( "Name may only contain letters, numbers, dot (.) and a hypen (-)");
    } else if (name.length > 27) {
      setDeploymentFeedback("Name may not exceed 27 characters");
    } else if (port && !/^[0-9]*$/.test(port)) {
      setDeploymentFeedback("Port should be an integer");
    } else if (
      isPrivateImage &&
      (!email || !username || !regPassword || !server)
    ) {
      setDeploymentFeedback("please provide all the registry information");
    } else {
      const environmentVariablesObject = environmentVariables.reduce(
        (acc, curr) => {
          if (curr.name && curr.value) {
            acc[curr.name] = curr.value;
          }
          return acc;
        },
        {}
      );
      let appInfo = {
        command: entryCommand,
        env_vars: environmentVariablesObject,
        image: imageUrl,
        name,
        projectID: projectID,
        private_image: false,
        replicas,
        is_ai: true,
      };
      if (port) {
        appInfo = { ...appInfo, port: parseInt(port, 10) };
      }
      if (isPrivateImage) {
        appInfo = {
          ...appInfo,
          docker_email: email,
          docker_username: username,
          docker_password: regPassword,
          docker_server: server,
          private_image: true,
        };
      }
      deployApp(appInfo);
    }
  };

  return (
    <DashboardLayout name={projectDetails?.name} header="Create AI App">
      {formLevel === 5 && (
        <div style={{ marginBottom: "1rem" }} className="SectionTitle">
          Deploying a trained model
        </div>
      )}
      <div
        className={
          formLevel === 2
            ? styles.deployTrainedModelForm
            : styles.createAIAppContentContainer
        }
      >
        {formLevel === 0 && (
          <>
            <div className="SectionTitle">Project Metrics</div>
            <div className={styles.createAIAppTabletContainer}>
              <Checkbox
                isBlack
                isChecked={jupyterNotebookChecked}
                onClick={() => {
                  setJupyterNotebookChecked(!jupyterNotebookChecked);
                  setTrainedModelChecked(false);
                }}
              />
              <JupyterNoteBookApp />
              <div className={styles.CreateAIAppGuidingTextContainer}>
                <div className={styles.CreateAIAppGuidingTextTitle}>
                  Start a Jupyter Notebook environment
                </div>
                <div className={styles.CreateAIAppGuidingTextSubTitle}>
                  Automatically deploy a Jupyter Notebook application.
                </div>
              </div>
            </div>
            <div className={styles.createAIAppTabletContainer}>
              <Checkbox
                isBlack
                isChecked={trainedModelChecked}
                onClick={() => {
                  setTrainedModelChecked(!trainedModelChecked);
                  setJupyterNotebookChecked(false);
                }}
              />
              <TrainedAIAppIcon />
              <div className={styles.CreateAIAppGuidingTextContainer}>
                <div className={styles.CreateAIAppGuidingTextTitle}>
                  Deploy a trained model
                </div>
                <div className={styles.CreateAIAppGuidingTextSubTitle}>
                  Make your trained model accessible as a web service.
                </div>
              </div>
            </div>
          </>
        )}
        {formLevel === 1 && (
          <>
            <div className="SectionTitle">Deploy a trained model</div>
            <div className={styles.createAIAppTrainedModelGetStartedContainer}>
              <div
                style={{ marginTop: "1rem" }}
                className={`${styles.CreateAIAppGuidingTextTitle}`}
              >
                Getting Started
              </div>
              <ol className={styles.CreateAIAppGuidingTextSubTextContainer}>
                <li>
                  Getting Started Ensure your Dockerfile uses one of these base
                  images: Node, or Python. This base image is essential as it
                  provides the necessary environment for your AI model within
                  the Docker container.
                </li>
                <li>
                  {" "}
                  Name your containerized image using this format:
                  base-image/your-model-name:latest. Start with the base image
                  (node, or python), followed by a unique model name, and end
                  with :latest. For example: node/my-model:latest. This ensures
                  your image is correctly formatted and easily identifiable for
                  deployment.
                </li>
              </ol>
              <div
                className={styles.createAIAppTrainedModelConfirmationContainer}
              >
                <Checkbox
                  isBlack
                  isChecked={imageConfirmationCheckbox}
                  onClick={() => {
                    setImageConfirmationCheckbox(!imageConfirmationCheckbox);
                  }}
                />
                <div>
                  I confirm that my image follows the required format and uses
                  one of the specified base images.
                </div>
              </div>
            </div>
          </>
        )}
        {/* category selection */}
        {formLevel === 2 && (
          <>
            <div className="SectionTitle">Deploy a trained model</div>
            <div className={styles.createAIAppTrainedModelGetStartedContainer}>
              <div
                style={{ marginTop: "1rem" }}
                className={`${styles.CreateAIAppGuidingTextTitle}`}
              >
                Choose modal category
              </div>
              <form className={styles.categoriesSelectionContainerForm}>
                <label>Category</label>
                <Select
                  placeholder="Select a model category"
                  options={aiCategoriesClassification}
                  onChange={(selectedOption) => {
                    if (selectedOption.available) {
                      setTrainedModelCategory(selectedOption);
                      setUnavailableCategory(null);
                    } else {
                      setUnavailableCategory(selectedOption.name);
                      setTrainedModelCategory(null);
                    }
                  }}
                />
                {unavailableCategory && (
                  <Feedback
                    type="error"
                    onClose={() => {
                      setUnavailableCategory(null);
                    }}
                    message={unavailableCategory + ": is not available yet"}
                  />
                )}
              </form>
            </div>
          </>
        )}
        {/* subcategory selection */}
        {formLevel === 3 && (
          <>
            <div className="SectionTitle">Deploy a trained model</div>
            <div className={styles.createAIAppTrainedModelGetStartedContainer}>
              <div
                style={{ marginTop: "1rem" }}
                className={`${styles.CreateAIAppGuidingTextTitle}`}
              >
                Choose model sub category
              </div>

              {trainedModelCategory && (
                <form className={styles.categoriesSelectionContainerForm}>
                  <PillsSelector
                    options={trainedModelCategory.subCategories}
                    selectedOptionCallBack={(selectedOption) => {
                      setTrainedModelSubCategory(selectedOption);
                    }}
                  />
                </form>
              )}
            </div>
          </>
        )}
        {/* Dockerfile*/}
        {formLevel === 4 && (
          <>
            <div className="SectionTitle">Deploy a trained model</div>
            <div className={styles.createAIAppTrainedModelGetStartedContainer}>
              <div
                style={{ marginTop: "1rem" }}
                className={`${styles.CreateAIAppGuidingTextTitle}`}
              >
                Generated Dockerfile
              </div>
              <DockerfilePreviewComponent
                selectedDependencies={trainedModelSubCategory.pyRequirements}
              />
            </div>
          </>
        )}
        {formLevel === 5 && (
          <>
            <form>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Image URL
                  </div>
                  <div>The image published on a container registry.</div>
                </label>
                <BlackInputText
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="python/my-model:latest"
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Name
                  </div>
                  <div>A unique name for your deployment.</div>
                </label>
                <BlackInputText
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a unique name for your deployment"
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Replicas
                  </div>
                  <div>
                    The number of identical copies (replicas) for your
                    deployment.
                  </div>
                </label>
                <div className={styles.formGroupSelect}>
                  <Select
                    placeholder="Number of Replicas - defaults to 1"
                    options={replicaSetOptions}
                    onChange={(selectedOption) =>
                      setReplicas(selectedOption.value)
                    }
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Entry Command
                  </div>
                  <div>
                    This command is responsible for starting your deployment.
                  </div>
                </label>
                <BlackInputText
                  name="entryCommand"
                  value={entryCommand}
                  onChange={(e) => setEntryCommand(e.target.value)}
                  placeholder="poetry run uvicorn main:app"
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Private Image
                  </div>
                  <div>
                    If the image is private, Please fill the registry credential
                    fields.
                  </div>
                </label>
                <div className={styles.PrivateImageCheckField}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Checkbox
                      isBlack
                      onClick={() => {
                        setIsPrivateImage(!isPrivateImage);
                      }}
                      isChecked={isPrivateImage}
                    />
                    &nbsp; Private Image
                  </div>
                  {isPrivateImage && (
                    <div className={styles.PrivateImageTabContainer}>
                      <BlackInputText
                        required
                        placeholder="Username"
                        name="username"
                        value={username}
                        className={styles.PrivatImageInputField}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />

                      <BlackInputText
                        required
                        placeholder="Email"
                        name="email"
                        className={styles.PrivatImageInputField}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />

                      <BlackInputText
                        required
                        placeholder="Password"
                        name="password"
                        type={"password"}
                        value={regPassword}
                        onChange={(e) => {
                          setRegPassword(e.target.value);
                        }}
                      />

                      <BlackInputText
                        required
                        placeholder="docker.io"
                        name="server"
                        value={server}
                        onChange={(e) => {
                          setServer(e.target.value);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>
                  <div
                    className={styles.CreateAIAppGuidingTextTitle}
                    style={{ fontSize: "1rem" }}
                  >
                    Port
                  </div>
                  <div>
                    Specify the port for incoming connections to your Docker
                    container.
                  </div>
                </label>
                <BlackInputText
                  name="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port (Optional) - defaults to 80"
                />
              </div>
              <div className={styles.EnvsformGroup}>
                <div
                  style={{
                    marginBottom: "1rem",
                  }}
                  className="SectionTitle"
                >
                  Environment Variables
                </div>
                {environmentVariables.map((envVar, index) => (
                  <div key={index} className={styles.envVarRow}>
                    <BlackInputText
                      name="envName"
                      value={envVar.name}
                      onChange={(e) =>
                        handleEnvVariableChange(index, "name", e.target.value)
                      }
                      placeholder="Name"
                    />
                    <BlackInputText
                      name="envValue"
                      value={envVar.value}
                      onChange={(e) =>
                        handleEnvVariableChange(index, "value", e.target.value)
                      }
                      placeholder="Value"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveEnvVariable(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className={styles.envVarActions}>
                  <PrimaryButton color="primary" onClick={handleAddEnvVariable}>
                    + Add
                  </PrimaryButton>
                  {/* <PrimaryButton color='black' onClick={(e) => {e.preventDefault()} } ><FilesIcon/> Add from env file</PrimaryButton> */}
                </div>
              </div>
              {deploymentFeedback && (
                <Feedback
                  type="error"
                  onClose={() => {
                    setDeploymentFeedback("");
                  }}
                  message={deploymentFeedback}
                />
              )}
              {deploymentError && (
                <Feedback
                  type="error"
                  message={"Failed to deploy app, Please try again later"}
                />
              )}
            </form>
          </>
        )}

        <div className={styles.createAIAppActionButtonsContainer}>
          <PrimaryButton
            color="primary"
            onClick={() => {
              if (formLevel === 1) {
                history.push(`/projects/${projectID}/dashboard`);
              } else {
                setFormLevel(formLevel - 1);
              }
            }}
          >
            {formLevel === 1 ? "Close" : "Back"}
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              if (jupyterNotebookChecked) {
                setOpenJupyterNotebookModel(true);
              }
              if (trainedModelChecked && formLevel < 5) {
                setFormLevel(formLevel + 1);
              }
              if (formLevel === 5) {
                handleCreateAIApp();
              }
            }}
            disabled={
              (formLevel === 0 &&
                !trainedModelChecked &&
                !jupyterNotebookChecked) ||
              (formLevel === 1 && !imageConfirmationCheckbox) ||
              (formLevel === 2 && !trainedModelCategory) ||
              (formLevel === 3 && !trainedModelSubCategory) || 
              (formLevel === 5 && deploymentPending)
            }
          >
            {formLevel === 5 ? deploymentPending ? <Spinner /> : "Deploy" : "Continue"}
          </PrimaryButton>
        </div>
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
                    handleJupyterNotebookDeployment();
                  }}
                  disabled={
                    !jupyterNotebookChecked ||
                    jupiterNoteBookName === "" ||
                    deploymentPending
                  }
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
      </div>
    </DashboardLayout>
  );
};

CreateAIAppPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string,
    }),
  }),
};

export default CreateAIAppPage;
