import React, { useEffect, useRef, useState } from "react";
import styles from "./NotebookExperimentPage.module.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { handleGetRequest } from "../../apis/apis";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import {
  useAppExperimentList,
  useExperimentCreate,
  useExperimentDelete,
} from "../../hooks/useNotebookExperiments";
import tellAge from "../../helpers/ageUtility.js";
import Spinner from "../../components/Spinner/index.js";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import NotebookExperimentRunsPage from "../NotebookExperimentRunsPage/index.jsx";
import { useSelector } from "react-redux";

const NotebookExperimentPage = () => {
  const { appID } = useParams();
  const codeRef = useRef(null);
  const user = useSelector((state) => state.user);

  const location = useLocation();

  const [app, setApp] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [viewExperimentRuns, setViewExperimentRuns] = useState(false);

  // modals
  const [spin, setSpin] = useState(false);
  const [openNewRun, setOpenNewRun] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const [copySuccess, setCopySuccess] = useState(false);
  const [deleteExperimentModal, setDeleteExperimentModal] = useState(false);

  // create an experiment
  const createExperimentMutation = useExperimentCreate(app.alias, user.data.id);

  // fetch experiments
  const {
    data: experiments,
    isLoading,
    refetch,
  } = useAppExperimentList(app.alias);

  // delete an experiment
  const deleteExperimentMutation = useExperimentDelete(
    selectedExperiment?.experiment_id
  );

  // event handlers

  const handleSelectRow = (row) => {
    setSelectedExperiment(row);
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row.experiment_id)
        ? prevSelected.filter((rowId) => rowId !== row.experiment_id)
        : [...prevSelected, row.experiment_id]
    );
  };

  const handleCreateExperiment = () => {
    setSpin(true);
    try {
      createExperimentMutation.mutate();
      setSpin(false);
    } catch (error) {
      console.error("Error creating experiment:", error);
    }
  };

  const handleDeleteSelectedExperiment = async () => {
    setSpin(true);
    try {
      deleteExperimentMutation.mutate();
      setSpin(false);
      setSelectedRows([]);
      setSelectedExperiment("");
      setDeleteExperimentModal(false);
      refetch();
    } catch (error) {
      console.error("Error deleting experiment:", error);
    }
  };

  const getAppInfo = () => {
    if (!app) return null;
    return {
      name: app.name,
      status: app.app_running_status,
      url: app.url,
      age: app.age,
      alias: app.alias,
      image: app.image,
      port: app.port,
      disable: app.disabled,
    };
  };

  useEffect(() => {
    handleGetRequest(`/apps/${appID}`)
      .then((response) => {
        setApp(response.data.data.apps);
      })
      .catch((error) => {
        console.error(error?.response?.data?.message);
      });
  }, [appID]);

  const appInfo = getAppInfo();

  // Code to copy
  const exampleCode = `!pip install mlflow
import mlflow
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from mlflow.tracking import MlflowClient

# Connect to MLflow server and set experiment
mlflow.set_tracking_uri("https://mlflow.ahumain.cranecloud.io")
mlflow.set_experiment(experiment_id="${selectedExperiment.experiment_id}")

# Enable automatic logging
mlflow.autolog()

# Load and prepare data
db = load_diabetes()
X_train, X_test, y_train, y_test = train_test_split(db.data, db.target)

# Create and train models
rf = RandomForestRegressor(n_estimators=100, max_depth=6, max_features=3)
rf.fit(X_train, y_train)

# Use the model to make predictions on the test dataset
predictions = rf.predict(X_test)`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(exampleCode)
      .then(() => {
        setCopySuccess(true);
        // Reset success message after 2 seconds
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  };

  return (
    <>
      {!viewExperimentRuns ? (
        <DashboardLayout
          name={appInfo.name}
          header={"Notebook Experiments"}
          appCategory={"notebook"}
          showBtn
          buttontext={spin ? <Spinner /> : "+ create experiment"}
          btnAction={handleCreateExperiment}
        >
          <div className={styles.AppMetricsPage}>
            <div className={styles.Container}>
              <>
                <div className={styles.Header}>
                  <div className={styles.RightDashboardButtons}>
                    {selectedRows.length > 1 && (
                      <>
                        <PrimaryButton
                          color="red"
                          // onClick={() => setDeleteExperimentRunsModal(true)}
                          disabled={selectedRows.length === 0}
                        >
                          Delete experiments
                        </PrimaryButton>
                      </>
                    )}

                    {selectedRows.length === 1 && (
                      <>
                        <PrimaryButton
                          color="primary-outline"
                          onClick={() => setOpenNewRun(true)}
                          disabled={selectedRows.length === 0}
                        >
                          + Add new run
                        </PrimaryButton>
                        <PrimaryButton
                          color="primary"
                          onClick={() => setViewExperimentRuns(true)}
                          disabled={selectedRows.length === 0}
                        >
                          View experiment runs
                        </PrimaryButton>
                        <PrimaryButton
                          color="red"
                          onClick={() => setDeleteExperimentModal(true)}
                          disabled={selectedRows.length === 0}
                        >
                          {spin ? <Spinner /> : "Delete experiment"}
                        </PrimaryButton>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={
                    isLoading
                      ? "ResourcesTable LoadingResourcesTable"
                      : "ResourcesTable"
                  }
                >
                  {isLoading ? (
                    <div className="TableLoading">
                      <div className="SpinnerWrapper">
                        <Spinner size="big" />
                      </div>
                    </div>
                  ) : experiments && experiments.length > 0 ? (
                    <table className="UsersTable">
                      <thead className="uppercase">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setSelectedRows(
                                  e.target.checked
                                    ? experiments.map(
                                        (row) => row.experiment_id
                                      )
                                    : []
                                )
                              }
                              checked={
                                selectedRows.length === experiments.length &&
                                experiments.length > 0
                              }
                            />
                          </th>
                          <th>Name</th>
                          <th>Created</th>
                          <th>Last Updated</th>
                          <th>Artifact Location</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {experiments.map((row, index) => (
                          <tr
                            key={index}
                            className={{
                              ...styles.tableCell,
                              ...(index % 2 === 0 ? styles.rowHover : {}),
                              "cursor-pointer": true,
                              "selected-row": selectedRows.includes(
                                row.experiment_id
                              ),
                            }}
                            onClick={(e) => {
                              if (e.target.tagName !== "INPUT") {
                                handleSelectRow(row);
                              }
                            }}
                          >
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(
                                  row.experiment_id
                                )}
                                onChange={() => handleSelectRow(row)}
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>{tellAge(row.creation_time)}</td>
                            <td>{tellAge(row.last_update_time)}</td>
                            <td>{row.artifact_location}</td>
                            <td>
                              {row.lifecycle_stage === "active" ? (
                                <span className="current-label">
                                  {row.lifecycle_stage}
                                </span>
                              ) : (
                                <span className="error-label">
                                  {row.lifecycle_stage}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    !isLoading &&
                    experiments?.length === 0 &&
                    experiments !== undefined && (
                      <div className={styles.NoResourcesMessageSection}>
                        <div className={styles.NoResourcesMessage}>
                          You haven't created any experiments yet.
                        </div>
                        <br />
                        <div className={styles.NoResourcesMessage}>
                          Click the &nbsp;{" "}
                          <ButtonPlus
                            className={styles.ButtonPlusSmall}
                            onClick={handleCreateExperiment}
                          />{" "}
                          &nbsp; button to create one.
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            </div>
          </div>

          <Modal
            showModal={deleteExperimentModal}
            onClickAway={() => {
              setDeleteExperimentModal(false);
            }}
          >
            <div className="ModalContainer">
              <h2>Are you sure you want to delete this experiment ?</h2>
              <div className="ModalActions">
                <PrimaryButton
                  color="primary"
                  onClick={() => {
                    setDeleteExperimentModal(false);
                  }}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => {
                    handleDeleteSelectedExperiment();
                  }}
                >
                  {spin ? <Spinner /> : "Delete"}
                </PrimaryButton>
              </div>
            </div>
          </Modal>

          <Modal
            showModal={openNewRun}
            onClickAway={() => {
              setOpenNewRun(false);
            }}
          >
            <h2 className="ModalTitle">Add New Run to Notebook</h2>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === "instructions" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "example" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("example")}
              >
                Example test run
              </button>
            </div>
            <div className={styles.content}>
              {activeTab === "instructions" && (
                <div className={styles.keySteps}>
                  <h3>Key steps to connect to MLflow:</h3>
                  <ol>
                    <li>
                      <code>!pip install mlflow</code> - Install the MLflow
                      package
                    </li>
                    <li>
                      <code>import mlflow</code> - Import the MLflow library
                    </li>
                    <li>
                      <code>from mlflow.tracking import MlflowClient</code> -
                      Import tracking client
                    </li>
                    <li>
                      <code>
                        mlflow.set_tracking_uri("https://mlflow.ahumain.cranecloud.io")
                      </code>{" "}
                      - Connect to our MLflow server
                    </li>
                    <li>
                      <code>
                        mlflow.set_experiment(experiment_id="
                        {selectedExperiment.experiment_id}")
                      </code>{" "}
                      - This is dynamically set based on selected experiment
                    </li>
                    <li>
                      <code>mlflow.autolog()</code> - Enable automatic logging
                      of parameters and metrics
                    </li>
                  </ol>
                </div>
              )}

              {activeTab === "example" && (
                <div className={styles.codeContainer}>
                  <div className={styles.codeHeader}>
                    <span>Python</span>
                    <button
                      className={`${styles.copyButton} ${
                        copySuccess ? styles.copySuccess : ""
                      }`}
                      onClick={copyToClipboard}
                      aria-label="Copy code to clipboard"
                    >
                      <span className={styles.copyText}>
                        {copySuccess ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <pre>
                    <code ref={codeRef}>{exampleCode}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="ModalActions">
              <PrimaryButton
                color="primary"
                onClick={() => {
                  setOpenNewRun(false);
                }}
              >
                Close
              </PrimaryButton>
            </div>
          </Modal>
        </DashboardLayout>
      ) : (
        <>
          <NotebookExperimentRunsPage
            appInfo={appInfo}
            experiment={selectedExperiment}
            path={location.pathname}
            setViewExperimentRuns={setViewExperimentRuns}
          />
        </>
      )}
    </>
  );
};

export default NotebookExperimentPage;
