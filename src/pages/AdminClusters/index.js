import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./adminClusters.module.css";
import InformationBar from "../../components/InformationBar";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import BlackInputText from "../../components/BlackInputText";
import Modal from "../../components/Modal";
import ClustersList from "../../components/ClustersList";
import Header from "../../components/Header";
import userSummary from "../../redux/actions/usersSummary";
import appSummary from "../../redux/actions/appsSummary";
import Feedback from "../../components/Feedback";
import getDatabases from "../../redux/actions/getDatabases";
import getClustersList from "../../redux/actions/clusters";
import { currentDate } from "../../helpers/dateConstants";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import { handleGetRequest } from "../../apis/apis.js";

const AdminClusters = () => {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [prometheus_url, setPrometheus_url] = useState("");
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [actionsMenu, setActionsMenu] = useState(false);
  //api
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("none");
  const baseLinkRef = useRef(`/clusters`);
  const fetchClusters = (link) => {
    setLoading(true);
    handleGetRequest(link)
      .then((response) => {
        console.log(response);
        if (response.data.data.clusters.length > 0) {
          setClusters(response.data.data.clusters);
        } else {
          setFeedback("No Clusters for you");
        }
        setLoading(false);
      })
      .catch((error) => {
        setFeedback("Failed to fetch logs, please try again");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClusters(`${baseLinkRef.current}`);
    setFeedback("");
  }, []);
  const showForm = () => setOpenModal(true);

  const hideForm = () => {
    setOpenModal(false);
  };
  const handleClick = (e) => {
    if (actionsMenu) {
      // this.closeModal();
      return;
    }
    setActionsMenu(true);
    e.stopPropagation();
    document.addEventListener("click", hideModal);
  };

  const hideModal = () => {
    setActionsMenu(false);
    document.removeEventListener("click", hideModal);
  };

  const showMenu = (id) => {
    setSelectedCluster(id);
  };

  const showUpdateModal = () => {

  }

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className={styles.MainSection2}>
        <div className={styles.MainContentSection3}>
          <div className="InformationBarSection">
            <InformationBar
              header={
                <>
                  <span>
                    <Link to={{ pathname: `/clusters` }} className="breadcrumb">
                      Dashboard
                    </Link>
                    / Clusters Listing
                  </span>
                </>
              }
              showBtn={false}
            />
          </div>
          <div className={styles.ContentSection}>
            <div className="SearchBar">
              <div className="AdminSearchInput"></div>
            </div>
            <div
              className={
                setLoading
                  ? "ResourcesTable LoadingResourcesTable"
                  : "ResourcesTable"
              }
            >
              <table>
                <thead className="uppercase">
                  <tr>
                    <th>name</th>
                    <th>Host</th>
                    <th>description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {loading ? (
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
                    {clusters !== undefined &&
                      clusters.map((cluster) => (
                        <tr key={clusters.indexOf(cluster)}>
                          <td>{cluster?.name}</td>
                          <td>{cluster?.host}</td>
                          <td>{cluster?.description}</td>
                          <td
                            onClick={(e) => {
                              showMenu(cluster.id);
                              handleClick(e);
                            }}
                          >
                            <MoreIcon />
                            {actionsMenu && cluster.id === selectedCluster && (
                              <div className="BelowHeader bg-light">
                                <div className="context-menu">
                                  <div
                                    className="DropDownLink"
                                    role="presentation"
                                    onClick={() => {
                                      showUpdateModal();
                                    }}
                                  >
                                    Update Cluster
                                  </div>
                                  <div
                                    className="DropDownLink"
                                    role="presentation"
                                  >
                                    <Link
                                      to={{
                                        pathname: `/clusters/${selectedCluster}`,
                                      }}
                                    >
                                      Cluster details
                                    </Link>
                                  </div>
                                  
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {clusters.length === 0 && (
                <div className="NoResourcesMessage">
                  <p>No clusters available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClusters;
