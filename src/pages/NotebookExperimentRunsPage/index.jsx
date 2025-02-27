import React, { useState } from "react";
import styles from "./NotebookExperimentRunsPage.module.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PrimaryButton from "../../components/PrimaryButton";
import NotebookExperimentDetailsPage from "../NotebookRunDetailsPage/index.jsx";
import Modal from "../../components/Modal";
import {
  useExperimentRunArtifacts,
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedExperimentRun, setSelectedExperimentRun] = useState("");
  const [viewRunDetails, setViewRunDetails] = useState(false);

  // modals
  const [spin, setSpin] = useState(false);
  const [deleteExperimentRunModal, setDeleteExperimentRunModal] =
    useState(false);
  const [deleteExperimentRunsModal, setDeleteExperimentRunsModal] =
    useState(false);

  // fetch runs for an experiment
  const { data: experimentRuns, isLoading: isLoadingRuns } = useExperimentRuns(
    experiment.experiment_id
  );

  // download experiment run artifacts
  const { isFetching, refetch } = useExperimentRunArtifacts(
    experiment.experiment_id,
    selectedExperimentRun.run_id
  );

  // delete runs for an experiment
  const deleteRunsMutation = useExperimentRunDelete();

  // event handlers
  const handleRowClick = (runId) => {
    // setSelectedExperimentRun(runId);
  };

  const handleDownload = async () => {
    try {
      const { data } = await refetch();

      // Ensure data is a Blob (ZIP file)
      if (!data || !(data instanceof Blob)) {
        console.error("Invalid file data received:", data);
        alert("Failed to download the file. Please try again.");
        return;
      }

      // Create a URL for the ZIP blob
      const blobUrl = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = blobUrl;

      // Set filename with .zip extension
      const filename = `${selectedExperimentRun.run_name}-artifact.zip`;
      a.download = filename.endsWith(".zip") ? filename : `${filename}.zip`;

      // Trigger the download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the object URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("An error occurred while downloading the file.");
    }
  };

  const handleSelectRow = (row) => {
    setSelectedExperimentRun(row);
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row.run_id)
        ? prevSelected.filter((rowId) => rowId !== row.run_id)
        : [...prevSelected, row.run_id]
    );
  };

  //   const handleSelectRow = (id) => {
  //     setSelectedRows((prevSelected) =>
  //       prevSelected.includes(id)
  //         ? prevSelected.filter((rowId) => rowId !== id)
  //         : [...prevSelected, id]
  //     );
  //   };

  const handleDeleteSelectedRun = async () => {
    if (selectedRows.length === 0) return;

    setSpin(true);
    try {
      deleteRunsMutation.mutateAsync(selectedExperimentRun.run_id);
      setSpin(false);
      setDeleteExperimentRunModal(false);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting experiment runs:", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return;

    setSpin(true);
    try {
      await Promise.all(
        selectedRows.map((id) => deleteRunsMutation.mutateAsync(id))
      );
      setSpin(false);
      setDeleteExperimentRunsModal(false);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting experiment runs:", error);
    }
  };

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
                          onClick={() => setDeleteExperimentRunsModal(true)}
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
                          onClick={() => handleDownload()}
                          disabled={selectedRows.length === 0}
                        >
                          {isFetching
                            ? "Downloading..."
                            : "Download run artifacts"}
                        </PrimaryButton>
                        <PrimaryButton
                          color="red"
                          onClick={() => setDeleteExperimentRunModal(true)}
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
                                onChange={() => handleSelectRow(row)}
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

            <Modal
              showModal={deleteExperimentRunModal}
              onClickAway={() => {
                setDeleteExperimentRunModal(false);
              }}
            >
              <div className="ModalContainer">
                <h2>Are you sure you want to delete this experiment run ?</h2>
                <div className="ModalActions">
                  <PrimaryButton
                    color="primary"
                    onClick={() => {
                      setDeleteExperimentRunModal(false);
                    }}
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton onClick={() => handleDeleteSelectedRun()}>
                    {spin ? <Spinner /> : "Delete"}
                  </PrimaryButton>
                </div>
              </div>
            </Modal>

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
                  <PrimaryButton onClick={() => handleDeleteSelected()}>
                    {spin ? <Spinner /> : "Delete"}
                  </PrimaryButton>
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
            runId={selectedExperimentRun.run_id}
            setViewRunDetails={setViewRunDetails}
          />
        </>
      )}
    </>
  );
};

export default NotebookExperimentRunsPage;
