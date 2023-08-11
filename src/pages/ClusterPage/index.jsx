import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import InformationBar from "../../components/InformationBar";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import BlackInputText from "../../components/BlackInputText";
import Modal from "../../components/Modal";
import ClustersList from "../../components/ClustersList";
import Header from "../../components/Header";
import addCluster, {clearAddClusterState} from "../../redux/actions/addCluster";
import userSummary from "../../redux/actions/usersSummary";
import appSummary from "../../redux/actions/appsSummary";
import Feedback from "../../components/Feedback";
import styles from "./ClusterPage.module.css";
import getDatabases from "../../redux/actions/getDatabases";
import getClustersList from "../../redux/actions/clusters";
import {currentDate} from "../../helpers/dateConstants";
import {handleGetRequest} from "../../apis/apis.js";

const ClusterPage = ({
  getDatabases,
  userSummary,
  appSummary,
  creatingCluster,
  isAdded,
  isFailed,
  addCluster,
  message,
  databases,
  usersSummary,
  summary,
  isFetchingAppsSummary,
  isFetchingUsersSummary,
  clearAddClusterState,
  clusters,
}) => {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [prometheus_url, setPrometheus_url] = useState("");
  const [projects, setProjects] = useState([]);

  let disabledProjectsCount = 0;
  let enabledProjectsCount = 0;

  useEffect(() => {
    let details = {begin: "2021-03-01", end: currentDate, set_by: "month"};
    userSummary(details);
    appSummary(details);
    getClustersList();
    getDatabases();
    getAllProjects();
  }, [userSummary, appSummary, getDatabases]);

  const getAllProjects = async () => {
    try {
      const response = await handleGetRequest("/projects");
      if (response.data.data.projects.length > 0) {
        const totalNumberOfProjects = response.data.data.pagination.total;
        handleGetRequest(`/projects?per_page=${totalNumberOfProjects}`)
          .then((response) => {
            if (response.data.data.projects.length > 0) {
              setProjects(response.data.data.projects);
            } else {
              throw new Error("No projects found");
            }
          })
          .catch(() => {
            throw new Error("Failed to fetch all projects, please try again");
          });
      } else {
        throw new Error("No projects found");
      }
    } catch (error) {
      throw new Error("Failed to fetch projects, please try again");
    }
  };

  projects.forEach((project) => {
    if (project.disabled) {
      disabledProjectsCount++;
    } else {
      enabledProjectsCount++;
    }
  });

  const showForm = () => setOpenModal(true);

  const hideForm = () => {
    clearAddClusterState();
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // input validation
    if (!host || !name || !token || !description || !prometheus_url) {
      setError("Please provide all the information");
    } else {
      const cluster = {
        host,
        name,
        token,
        description,
        prometheus_url,
      };

      addCluster(cluster);
    }
  };

  return (
    <div className={styles.Page}>
      <div className="TopRow">
        <Header />
        <InformationBar
          header="Overview"
          showBtn
          buttontext="+ New Cluster"
          btnAction={showForm}
          adminRoute={true}
          adminProjects={true}
        />
      </div>

      <div className={styles.OtherCards}>
        <Link to="/accounts" className={styles.ResourceCard}>
          <div className={styles.CardHeader}>Users</div>
          <div className={styles.CardTop}>Count</div>
          <div className={styles.ResourceDigit}>
            {usersSummary?.metadata?.total_users}
          </div>
        </Link>
        <Link to="projectsListing" className={styles.ResourceCard}>
          <>
            <div className={styles.CardHeader}>Projects</div>
            <div className={styles.DBStats}>
              <div className={styles.In}>
                <div className={styles.InnerTitlesStart}>Active</div>
                <div className={styles.ResourceDigit}>
                  {enabledProjectsCount}
                </div>
              </div>
              <div className={styles.verticalLine}></div>
              <div className={styles.In}>
                <div className={styles.InnerTitlesMiddle}>Disabled</div>
                <div className={styles.ResourceDigit}>
                  {disabledProjectsCount}
                </div>
              </div>
            </div>
          </>
        </Link>
        <Link to="/databases" className={styles.ResourceCard}>
          <>
            <div className={styles.CardHeader}>Databases</div>
            <div className={styles.DBStats}>
              <div className={styles.In}>
                <div className={styles.InnerTitlesStart}>Mysql</div>
                <div className={styles.ResourceDigit}>
                  {databases &&
                    databases?.dbs_stats_per_flavour?.mysql_db_count}
                </div>
              </div>
              <div className={styles.verticalLine}></div>
              <div className={styles.In}>
                <div className={styles.InnerTitlesMiddle}>Postgresql</div>
                <div className={styles.ResourceDigit}>
                  {databases &&
                    databases?.dbs_stats_per_flavour?.postgres_db_count}
                </div>
              </div>
            </div>
          </>
        </Link>
        <Link to="/allclusters" className={styles.ResourceCard}>
          <div className={styles.CardHeader}>Clusters</div>
          <div className={styles.CardTop}>Count</div>
          <div className={styles.ResourceDigit}>
            {clusters?.metadata?.cluster_count}
          </div>
        </Link>

        <div className={styles.ResourceCard}>
          <div className={styles.CardHeader}>Apps</div>
          <div className={styles.CardTop}>Count</div>
          <div className={styles.ResourceDigit}>
            {summary?.metadata?.total_apps}
          </div>
        </div>
      </div>

      <div className="ContentSection">
        <div className="TitleArea">
          <div className="SectionTitle" style={{paddingTop: "2rem"}}>
            <b>Select Infrastructure</b>
          </div>
        </div>
      </div>

      <div className="MainRow">
        <ClustersList newClusterAdded={isAdded} />
      </div>

      <div className="FooterRow">
        <p>
          Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
        </p>
      </div>

      {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
      <Modal showModal={openModal} onClickAway={hideForm}>
        <div className="ModalForm">
          <div className="ModalFormHeading">
            <h2>Add a cluster</h2>
          </div>
          <div className="ModalFormInputs">
            <div className="ModalFormInputsBasic">
              <BlackInputText
                required
                placeholder="Host"
                name="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Token"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Prometheus Url"
                name="prometheus_url"
                value={prometheus_url}
                onChange={(e) => setPrometheus_url(e.target.value)}
              />
              <BlackInputText
                required
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {error && <Feedback type="error" message={error} />}

              <div className="ModalFormButtons AddAddButtons">
                <PrimaryButton className="CancelBtn" onClick={hideForm}>
                  Cancel
                </PrimaryButton>
                <PrimaryButton onClick={handleSubmit}>
                  {creatingCluster ? <Spinner /> : "add"}
                </PrimaryButton>
              </div>

              {(isFailed || isAdded) && (
                <Feedback
                  type={isAdded ? "success" : "error"}
                  message={message}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const mapStateToProps = (state) => {
  const {isFetchingDatabases, databasesFetched, databases} =
    state.databasesReducer;
  const {creatingCluster, isAdded, isFailed, errorOccured, message} =
    state.addClusterReducer;
  const {user} = state.user;
  const {summary, FetchedAppsSummary, isFetchingAppsSummary} =
    state.appsSummaryReducer;
  const {usersSummary, FetchedUsersSummary, isFetchingUsersSummary} =
    state.usersSummaryReducer;
  const {clusters} = state.clustersReducer;

  return {
    isFetchingDatabases,
    databasesFetched,
    databases,
    user,
    creatingCluster,
    isAdded,
    isFailed,
    errorOccured,
    message,
    summary,
    FetchedAppsSummary,
    isFetchingAppsSummary,
    usersSummary,
    FetchedUsersSummary,
    isFetchingUsersSummary,
    clusters,
  };
};

const mapDispatchToProps = {
  getDatabases,
  addCluster,
  clearAddClusterState,
  appSummary,
  userSummary,
  getClustersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClusterPage);
