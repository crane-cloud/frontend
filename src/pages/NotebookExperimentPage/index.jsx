import React, { useEffect, useState } from "react";
import styles from "./NotebookExperimentPage.module.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { handleGetRequest } from "../../apis/apis";
import PrimaryButton from "../../components/PrimaryButton";
import Modal from "../../components/Modal";
import BlackInputText from "../../components/BlackInputText";
import {
  useAppExperimentList,
  useExperimentCreate,
  useExperimentDelete,
} from "../../hooks/useNotebookExperiments";
import tellAge from "../../helpers/ageUtility.js";
import Spinner from "../../components/Spinner/index.js";
import NotebookExperimentRunsPage from "../NotebookExperimentRunsPage/index.jsx";
import { useSelector } from "react-redux";

const NotebookExperimentPage = () => {
  const { appID } = useParams();
  const user = useSelector((state) => state.user);

  const location = useLocation();

  const [app, setApp] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [viewExperimentRuns, setViewExperimentRuns] = useState(false);

  // modals
  const [spin, setSpin] = useState(false);
  const [createExperimentModal, setCreateExperimentModal] = useState(false);
  const [editExperimentModal, setEditExperimentModal] = useState(false);
  const [deleteExperimentModal, setDeleteExperimentModal] = useState(false);

  // create an experiment
  const createExperimentMutation = useExperimentCreate(app.alias, user.data.id);

  // fetch experiments
  const { data: experiments, isLoading } = useAppExperimentList(app.alias);

  // delete an experiment
  const deleteExperimentMutation = useExperimentDelete(
    selectedExperiment?.experiment_id
  );

  // event handlers
  const handleRowClick = (experimentId) => {
    console.log("here", experimentId);
    // setSelectedExperimentRun(runId);
  };

  const handleSelectRow = (row) => {
    console.log("selected", row.experiment_id);
    setSelectedExperiment(row);
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row.experiment_id)
        ? prevSelected.filter((rowId) => rowId !== row.experiment_id)
        : [...prevSelected, row.experiment_id]
    );
  };

  const handleCreateExperiment = () => {
    try {
      createExperimentMutation.mutate();
    } catch (error) {
      console.error("Error creating experiment:", error);
    }
  };

  const handleDeleteSelectedExperiment = async () => {
    if (!selectedExperiment) return;

    setSpin(true);
    try {
      deleteExperimentMutation.mutate();
      setSpin(false);
      setDeleteExperimentModal(false);
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

  return (
    <>
      {!viewExperimentRuns ? (
        <DashboardLayout
          name={appInfo.name}
          header={"Notebook Experiments"}
          appCategory={"notebook"}
          showBtn
          buttontext="+ create experiment"
          btnAction={handleCreateExperiment}
        >
          <div className={styles.AppMetricsPage}>
            <div className={styles.Container}>
              <>
                {isLoading ? (
                  <tbody>
                    <tr className="TableLoading">
                      <td className="TableTdSpinner">
                        <div className="SpinnerWrapper">
                          <Spinner size="big" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
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
                              onClick={() => setEditExperimentModal(true)}
                              disabled={selectedRows.length === 0}
                            >
                              + Create new run
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
                              Delete experiment
                            </PrimaryButton>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="ResourcesTable">
                      <table className="UsersTable">
                        <thead className="uppercase">
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  setSelectedRows(
                                    e.target.checked
                                      ? experiments?.map(
                                          (row) => row.experiment_id
                                        )
                                      : []
                                  )
                                }
                                checked={
                                  selectedRows.length === experiments?.length &&
                                  experiments?.length > 0
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
                        {isLoading ? (
                          <tbody>
                            <tr className="TableLoading">
                              <td className="TableTdSpinner">
                                <div className="SpinnerWrapper">
                                  <Spinner size="big" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {experiments?.map((row, index) => (
                              <tr
                                key={index}
                                className={{
                                  ...styles.tableCell,
                                  ...(index % 2 === 0 ? styles.rowHover : {}),
                                }}
                                onClick={(e) => {
                                  if (e.target.tagName !== "INPUT") {
                                    handleRowClick(row.experiment_id);
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
                        )}
                      </table>
                    </div>
                  </>
                )}
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
