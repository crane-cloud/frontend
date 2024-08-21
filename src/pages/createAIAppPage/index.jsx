import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReactComponent as JupyterNoteBookApp } from "../../assets/images/jupyter_notebook.svg";
import { ReactComponent as TrainedAIAppIcon } from "../../assets/images/trained_model.svg";
import { ReactComponent as FilesIcon } from "../../assets/images/files.svg";
import PrimaryButton from "../../components/PrimaryButton";
import styles from "./createAIAppPage.module.css";
import { getProjectCurrentProject } from "../../helpers/projectName";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Modal from "../../components/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Checkbox from "../../components/Checkbox";
import BlackInputText from "../../components/BlackInputText";
import Select from "../../components/Select";

const replicaOptions = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ];

const CreateAIAppPage = () => {
  const { projectID } = useParams();
  const [formLevel, setFormLevel] = useState(0);
  const history = useHistory();
  const [jupyterNotebookChecked, setJupyterNotebookChecked] = useState(false);
  const [trainedModelChecked, setTrainedModelChecked] = useState(false);
  const [imageConfirmationCheckbox, setImageConfirmationCheckbox] =
    useState(false);
  const [openJupyterNotebookModel, setOpenJupyterNotebookModel] =
    useState(false);
  const [jupiterNoteBookName, setJupiterNoteBookName] = useState("");
 //  form level 2
 const [imageUrl, setImageUrl] = useState("");
 const [name, setName] = useState("");
 const [replicas, setReplicas] = useState(1);
 const [entryCommand, setEntryCommand] = useState("");
 const [port, setPort] = useState(80);
 const [environmentVariables, setEnvironmentVariables] = useState([{ name: "", value: "" }]);


  const { projects } = useSelector((state) => ({
    projects: state?.userProjectsReducer?.projects,
  }));

  const projectDetails = getProjectCurrentProject(projects, projectID);

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(projectDetails));
  }, [projectDetails]);

  const handleAddEnvVariable = (e) => {
    e.preventDefault()
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


  return (
    <DashboardLayout name={projectDetails?.name} header="Create AI App">
       {formLevel === 2  && <div style={{ marginBottom:'1rem'}} className="SectionTitle">Deploying a trained model</div>}
      <div className={formLevel === 2 ? styles.deployTrainedModelForm : styles.createAIAppContentContainer}>
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
        {formLevel === 2 && (
          <>
           
            <form >
              <div className={styles.formGroup}>
                <label>
                    <div className={styles.CreateAIAppGuidingTextTitle} style={{fontSize:'1rem'}}>Image URL</div>
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
                    <div className={styles.CreateAIAppGuidingTextTitle} style={{fontSize:'1rem'}}>Name</div>
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
                    <div className={styles.CreateAIAppGuidingTextTitle} style={{fontSize:'1rem'}} >Replicas</div>
                    <div>The number of identical copies (replicas) for your deployment.</div>
                </label>
                <div className={styles.formGroupSelect}>
                <Select
                placeholder="Number of Replicas - defaults to 1"
                options={replicaOptions}
                onChange={(selectedOption) =>
                  setReplicas(selectedOption.value)
                }
              />
              </div>
              </div>
              <div className={styles.formGroup}>
                <label>
                    <div className={styles.CreateAIAppGuidingTextTitle} style={{fontSize:'1rem'}} >Entry Command</div>
                    <div>This command is responsible for starting your deployment.</div>
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
                    <div className={styles.CreateAIAppGuidingTextTitle} style={{fontSize:'1rem'}} >Port</div>
                    <div>Specify the port for incoming connections to your Docker container.</div>
                </label>
                <BlackInputText
                  name="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port (Optional) - defaults to 80"
                />
              </div>
              <div className={styles.EnvsformGroup}>
                <div style={{
                    marginBottom: '1rem'
                }} className="SectionTitle">Environment Variables</div>
                {environmentVariables.map((envVar, index) => (
                  <div key={index} className={styles.envVarRow}>
                    <BlackInputText
                      name="envName"
                      value={envVar.name}
                      onChange={(e) => handleEnvVariableChange(index, "name", e.target.value)}
                      placeholder="Name"
                    />
                    <BlackInputText
                      name="envValue"
                      value={envVar.value}
                      onChange={(e) => handleEnvVariableChange(index, "value", e.target.value)}
                      placeholder="Value"
                    />
                    <button type="button" onClick={() => handleRemoveEnvVariable(index)}>
                      Delete
                    </button>
                  </div>
                ))}
                <div className={styles.envVarActions}>
                  <PrimaryButton color='primary' onClick={handleAddEnvVariable}>+ Add</PrimaryButton>
                  {/* <PrimaryButton color='black' onClick={(e) => {e.preventDefault()} } ><FilesIcon/> Add from env file</PrimaryButton> */}
                </div>
              </div>
            </form>
          </>
        )}
        <div className={styles.createAIAppActionButtonsContainer}>
          <PrimaryButton
            color="primary"
            onClick={() => {
              if(formLevel ===2){
                setFormLevel(1)
              }else{
                history.push(`/projects/${projectID}/dashboard`);
              }
              
            }}
          >
            {formLevel ===2 ? "Back" :"Close"}
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              if (formLevel === 0 && trainedModelChecked) {
                setFormLevel(1);
              }  else if (formLevel === 1 && imageConfirmationCheckbox) {
                setFormLevel(2);
              } else if (formLevel === 2 && imageConfirmationCheckbox) {
                 alert("not implemented yet");
              }
              if (jupyterNotebookChecked) {
                setOpenJupyterNotebookModel(true);
              }
            }}
            disabled={
              (formLevel === 0 &&
                !trainedModelChecked &&
                !jupyterNotebookChecked) ||
              (formLevel === 1 && !imageConfirmationCheckbox)
            }
          >
            {formLevel===2 ? "Deploy" :"Continue"}
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
              <label >Name *</label>
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
                  onClick={() => {
                    alert("not implemented yet");
                  }}
                  disabled={ (!jupyterNotebookChecked || jupiterNoteBookName==="" ) 
                  }
                >
                  Create
                </PrimaryButton>
              </div>
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
