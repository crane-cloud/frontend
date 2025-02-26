import React, { useEffect, useState } from "react";
import styles from "./NotebookExperimentRunsPage.module.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { handleGetRequest } from "../../apis/apis";
import PrimaryButton from "../../components/PrimaryButton";
import NotebookExperimentDetailsPage from "../NotebookRunDetailsPage/index.jsx";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import BlackInputText from "../../components/BlackInputText";
import {
  useExperimentRunDelete,
  useExperimentRuns,
} from "../../hooks/useNotebookExperiments";
import tellAge from "../../helpers/ageUtility.js";
import { calculateDuration } from "../../helpers/durationUtility.js";
import Spinner from "../../components/Spinner/index.js";

const NotebookExperimentRunsPage = ({
  appInfo,
  experiment,
  path,
  setViewExperimentRuns,
}) => {
  console.log("app", appInfo);
  console.log("anha", experiment);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedExperimentRun, setSelectedExperimentRun] = useState("");
  const [viewRunDetails, setViewRunDetails] = useState(false);

  // modals
  const [spin, setSpin] = useState(false);
  const [deleteExperimentRunsModal, setDeleteExperimentRunsModal] =
    useState(false);

  // fetch runs for an experiment
  const { data: experimentRuns, isLoading: isLoadingRuns } = useExperimentRuns(
    experiment.experiment_id
  );

  console.log("runnns", experimentRuns);

  // delete runs for an experiment
  const deleteRunsMutation = useExperimentRunDelete();

  // event handlers
  const handleRowClick = (runId) => {
    // setSelectedExperimentRun(runId);
  };

  const handleSelectRow = (id) => {
    setSelectedExperimentRun(id);
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  //   const handleSelectRow = (id) => {
  //     setSelectedRows((prevSelected) =>
  //       prevSelected.includes(id)
  //         ? prevSelected.filter((rowId) => rowId !== id)
  //         : [...prevSelected, id]
  //     );
  //   };

  //   const handleDeleteSelected = async () => {
  //     if (selectedRows.length === 0) return;

  //     setSpin(true);
  //     try {
  //       await Promise.all(
  //         selectedRows.map((id) => deleteRunsMutation.mutateAsync(id))
  //       );
  //       setSpin(false);
  //       setDeleteExperimentRunsModal(false);
  //       setSelectedRows([]);
  //     } catch (error) {
  //       console.error("Error deleting experiment runs:", error);
  //     }
  //   };

  return (
    <>
      {!viewRunDetails ? (
        <>
          <DashboardLayout
            name={appInfo.name}
            header={
              <span>
                <Link
                  className="breadcrumb"
                  style={{ marginRight: "4px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setViewExperimentRuns(false);
                  }}
                  to={path}
                >
                  {experiment.name}
                </Link>
                / runs
              </span>
            }
            appCategory={"notebook"}
          >
            <div className={styles.AppMetricsPage}>
              <div className={styles.Container}>
                <div className={styles.Header}>
                  <div className={styles.RightDashboardButtons}>
                    {selectedRows.length > 1 && (
                      <>
                        <PrimaryButton
                          color="red"
                          // onClick={() => setDeleteExperimentRunsModal(true)}
                          disabled={selectedRows.length === 0}
                        >
                          Delete runs
                        </PrimaryButton>
                      </>
                    )}

                    {selectedRows.length === 1 && (
                      <>
                        <PrimaryButton
                          color="primary"
                          onClick={() => setViewRunDetails(true)}
                          disabled={selectedRows.length === 0}
                        >
                          View run details
                        </PrimaryButton>
                        <PrimaryButton
                          color="primary"
                          onClick={() => setViewRunDetails(true)}
                          disabled={selectedRows.length === 0}
                        >
                          Download run artifacts
                        </PrimaryButton>
                        <PrimaryButton
                          color="primary-outline"
                          // onClick={() => setDeleteExperimentRunsModal(true)}
                          disabled={selectedRows.length === 0}
                        >
                          Update Run
                        </PrimaryButton>
                        <PrimaryButton
                          color="red"
                          // onClick={() => setDeleteExperimentRunsModal(true)}
                          disabled={selectedRows.length === 0}
                        >
                          Delete run
                        </PrimaryButton>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={
                    isLoadingRuns
                      ? "ResourcesTable LoadingResourcesTable"
                      : "ResourcesTable"
                  }
                >
                  <table className="UsersTable">
                    <thead className="uppercase">
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              setSelectedRows(
                                e.target.checked
                                  ? experimentRuns?.map((row) => row.run_id)
                                  : []
                              )
                            }
                            checked={
                              selectedRows.length === experimentRuns?.length &&
                              experimentRuns?.length > 0
                            }
                          />
                        </th>
                        <th>Run Name</th>
                        <th>Created</th>
                        <th>Duration</th>
                        <th>Artifacts</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    {isLoadingRuns ? (
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
                        {experimentRuns?.map((row, index) => (
                          <tr
                            key={index}
                            className={{
                              ...styles.tableCell,
                              ...(index % 2 === 0 ? styles.rowHover : {}),
                            }}
                            onClick={(e) => {
                              if (e.target.tagName !== "INPUT") {
                                handleRowClick(row.run_id);
                              }
                            }}
                          >
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(row.run_id)}
                                onChange={() => handleSelectRow(row.run_id)}
                              />
                            </td>
                            <td>{row.run_name}</td>
                            <td>{tellAge(row.start_time)}</td>
                            <td>
                              {calculateDuration(
                                row?.start_time,
                                row?.end_time
                              )}
                            </td>
                            <td>{row.artifact_uri}</td>
                            <td>
                              {row.status === "FINISHED" ? (
                                <span className="current-label">FINISHED</span>
                              ) : (
                                <span className="error-label">FAILED</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  {!isLoadingRuns &&
                    experimentRuns?.length === 0 &&
                    experimentRuns !== undefined && (
                      <div className={styles.noDataSection}>
                        <p>No runs have been logged yet!</p>
                      </div>
                    )}
                  {!isLoadingRuns && experimentRuns === undefined && (
                    <div className={styles.noDataSection}>
                      <p>
                        No runs have been logged yet, Please choose an
                        experiment or create one!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <Modal
        //   showModal={deleteExperimentModal}
        //   onClickAway={() => {
        //     setDeleteExperimentModal(false);
        //   }}
        >
          <div className="ModalContainer">
            <h2>Are you sure you want to delete this experiment run ?</h2>
            <div className="ModalActions">
              <PrimaryButton
                color="primary"
                onClick={() => {
                  //   setDeleteExperimentModal(false);
                }}
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
              // onClick={() => {
              //   handleDeleteSelectedExperiment();
              // }}
              >
                {spin ? <Spinner /> : "Delete"}
              </PrimaryButton>
            </div>
          </div>
        </Modal> */}

            <Modal
              showModal={deleteExperimentRunsModal}
              onClickAway={() => {
                setDeleteExperimentRunsModal(false);
              }}
            >
              <div className="ModalContainer">
                <h2>Are you sure you want to delete the selected runs ?</h2>
                <div className="ModalActions">
                  <PrimaryButton
                    color="primary"
                    onClick={() => {
                      setDeleteExperimentRunsModal(false);
                    }}
                  >
                    Cancel
                  </PrimaryButton>
                  {/* <PrimaryButton onClick={handleDeleteSelected}>
                {spin ? <Spinner /> : "Delete"}
              </PrimaryButton> */}
                </div>
              </div>
            </Modal>
          </DashboardLayout>
        </>
      ) : (
        <>
          <NotebookExperimentDetailsPage
            path={path}
            appInfo={appInfo}
            runId={selectedExperimentRun}
            setViewRunDetails={setViewRunDetails}
          />
        </>
      )}
    </>
  );
};

export default NotebookExperimentRunsPage;
