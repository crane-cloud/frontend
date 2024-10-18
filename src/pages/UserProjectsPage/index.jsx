import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import styles from "./UserProjectsPage.module.css";
import InformationBar from "../../components/InformationBar";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import getClustersList from "../../redux/actions/clusters";
import CreateProject from "../../components/CreateProject";
import getUserProjects from "../../redux/actions/projectsList";
import getUserCredits from "../../redux/actions/userCredits";
import ProjectCard from "../../components/ProjectCard";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import { handlePatchRequest } from "../../apis/apis.js";
import "../../index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { useProjects } from "../../hooks/useProjects.js";

const UserProjectsPage = (props) => {
  const [openCreateComponent, setOpenCreateComponent] = useState(false);
  const [searchword, setSearchword] = useState("");
  // SearchList: [],
  const [projectsList, setProjectList] = useState([]);
  const [sharedProjectsList, setSharedProjectList] = useState([]);
  const [showInviteModel, setShowInviteModel] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState("My projects");
  const [inviteeProjectId, setInviteeProjectId] = useState("");
  const [inviteeModelRole, setInviteeModelRole] = useState("");
  const [decliningInvitation, setDecliningInvitation] = useState(false);
  const [acceptingInvitation, setAcceptingInvitation] = useState(false);
  const [invitationError, setInvitationError] = useState("");
  const [currentTab, setCurrentTab] = useState("My Projects");
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);

  const { data: projectsData, isLoading, isError, isFetched} =
    useProjects(currentPaginationPage, searchword);

  const {
    getUserProjects,
    getClustersList,
    getUserCredits,
    data,
    pagination,
    isRetrieving,
    credits,
    isAdded,
    isDeleted,
    isUpdated,
    clearUpdateProjectState,
    match: { params },
  } = props;


  const handleSharedProjectsTabChange = () => {
    setSelectedProjects("Shared Projects");
    setCurrentTab("Shared Projects");
  };

  const handleTabChange = useCallback(() => {
    setSelectedProjects("My projects");
    setCurrentTab("My Projects");
  }, [currentTab]);

  const handleTabAll = useCallback(
    (selectedOption) => {
      let displayProjects;
      if (selectedOption === "All") {
        displayProjects = projectsList.concat(sharedProjectsList);
      } else if (selectedOption === "My Projects") {
        displayProjects = projectsList;
      } else if (selectedOption === "Shared Projects") {
        displayProjects = sharedProjectsList;
      } else {
        displayProjects = projectsList.concat(sharedProjectsList);
      }
      setCurrentTab(selectedOption);
      setSelectedProjects(selectedOption);
      setDisplayProjects(displayProjects);
    },
    [projectsList, sharedProjectsList]
  );

  useEffect(() => {
    getClustersList();
    if(data.id){
    getUserCredits(data.id);
    }
  }, [data.id, currentPaginationPage]); 

  // useEffect(() => {
  //   if (isFetched) {
  //     const filteredData = filterProjects();
  //     setProjectList(filteredData.myProjects);
  //     setSharedProjectList(filteredData.sharedProjects);
  //     setDisplayProjects(
  //       filteredData.myProjects.concat(filteredData.sharedProjects)
  //     );
  //   }
  // },[isFetched]);

  // useEffect(() => {
  //   searchThroughProjects();
  // },[searchword]);

  useEffect(() => {
    if (isDeleted) {
      getUserProjects(currentPaginationPage);
      getClustersList();
    }

    if (isUpdated) {
      clearUpdateProjectState();
      getUserProjects(currentPaginationPage);
      getClustersList();
    }

    if (isAdded) {
      getUserProjects(currentPaginationPage);
      setUserProjects([]);
    }
  }, [
    isDeleted,
    isUpdated,
    isAdded,
    clearUpdateProjectState,
    getClustersList,
    currentPaginationPage,
    getUserProjects
  ]);

  const filterProjects = () => {
    let myProjects = [];
    let sharedProjects = [];

    projectsData.data?.data?.projects.forEach((element) => {
      if (element.owner_id === data.id) {
        myProjects.push(element);
      } else {
        sharedProjects.push(element);
      }
    });
    if (myProjects.length < sharedProjects.length) {
      setSelectedProjects("Shared Projects");
      setCurrentTab("Shared Projects");
    } else {
      setSelectedProjects("My projects");
      setCurrentTab("My projects");
    }
    return {myProjects, sharedProjects}
  }
  
  useEffect(() => {
    if (isFetched) {
      const filteredData = filterProjects();

      if (
        JSON.stringify(projectsList) !== JSON.stringify(filteredData.myProjects) ||
        JSON.stringify(sharedProjectsList) !== JSON.stringify(filteredData.sharedProjects)
      ) {
        setProjectList(filteredData.myProjects);
        setSharedProjectList(filteredData.sharedProjects);
        setDisplayProjects(filteredData.myProjects.concat(filteredData.sharedProjects))
    }
  }
  },[isFetched, projectsList, sharedProjectsList]);

  useEffect(() => {
    if (searchword) {
      searchThroughProjects();
    }
  },[searchword]);

  useEffect(() => {
    if (isFetched) {
      const combinedProjects = projectsList.concat(sharedProjectsList);
      setSelectedProjects("All");
      setCurrentTab("All");
      setDisplayProjects(combinedProjects);
    }
  }, [isFetched, projectsList, sharedProjectsList]);

  const openProjectCreateComponent = () => {
    setOpenCreateComponent(true);
  };
  const callbackProjectCreateComponent = useCallback(() => {
    setOpenCreateComponent(false);
  },[]);

  const searchThroughProjects = () => {
    setCurrentPaginationPage(1);
    getUserProjects(1, searchword);
  };

  const hideInvitationModel = () => {
    setShowInviteModel(false);
  };

  const showInvitationModel = (inviteeProjectId, inviteeModelRole) => {
    setShowInviteModel(true);
    setInviteeProjectId(inviteeProjectId);
    setInviteeModelRole(inviteeModelRole);
  };

  const handleInvitationDecline = () => {
    setDecliningInvitation(true);
    handlePatchRequest(`/projects/${inviteeProjectId}/users/handle_invite`, {
      accepted_collaboration_invite: false,
    })
      .then(() => {
        setDecliningInvitation(false);
        setShowInviteModel(false);
        getUserProjects(currentPaginationPage);
      })
      .catch(() => {
        setInvitationError("Something went wrong");
        setDecliningInvitation(false);
        setShowInviteModel(false);
      });
  };

  const handleInvitationAcceptence = () => {
    setAcceptingInvitation(true);
    handlePatchRequest(`/projects/${inviteeProjectId}/users/handle_invite`, {
      accepted_collaboration_invite: true,
    })
      .then(() => {
        setAcceptingInvitation(false);
        setShowInviteModel(false);
        getUserProjects(currentPaginationPage);
      })
      .catch(() => {
        setInvitationError("Something went wrong");
        setAcceptingInvitation(false);
        setShowInviteModel(false);
      });
  };
  
  const onPageChange = (page) => {
    setCurrentPaginationPage(page);
  };
  
  // const onFilterSelect = (selectedOption) => {
  //   setSelectedProjects(selectedOption);
  //   const updatedDisplayProjects =
  //     selectedOption === "All"
  //       ? projectsList.concat(sharedProjectsList)
  //       : selectedOption === "Shared Projects"
  //       ? sharedProjectsList
  //       : projectsList;

  //   setDisplayProjects(updatedDisplayProjects);
  // };

  return (
    <div className={styles.Page}>
      {openCreateComponent ? (
        <CreateProject
          closeComponent={callbackProjectCreateComponent}
          params={params}
        />
      ) : (
        <div>
          <div className={styles.TopRow}>
            <Header credits={credits?.amount} />
            <InformationBar
              header={
                <span>
                  <Link className="breadcrumb" to={`/dashboard`}>
                    Dashboard
                  </Link>
                  / Projects
                </span>
              }
              showBtn
              buttontext="+ New Project"
              showSearchBar
              selectedProjects={selectedProjects}
              myProjectsList={projectsList}
              sharedProjectsList={sharedProjectsList}
              viewFilter={true}
              placeholder="Search through projects"
              btnAction={openProjectCreateComponent}
              searchAction={setSearchword}
              adminRoute={data?.username === "admin"}
              // onFilterSelect={handleTabAll}
            />
          </div>
          <div className={styles.MainRow}>
            <div className={`${styles.SelectProjects} SmallContainer`}></div>
            {isLoading ? (
              <div className={styles.NoResourcesMessage}>
                <div className={styles.SpinnerWrapper}>
                  <Spinner size="big" />
                </div>
              </div>
            ) : searchword !== "" ? (
              <div className={`${styles.ProjectList}  SmallContainer`}>
                {isFetched &&
                  projectsData.data?.data?.projects!== undefined &&
                  projectsData.data?.data?.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      cardID={project.id}
                      acceptInviteCallBackModel={showInvitationModel}
                      userID={data.id}
                      ownerId={project.owner_id}
                      apps_count={project.apps_count}
                      followers_count={project.followers_count}
                      disabled={project.disabled}
                      admin_disabled={project.admin_disabled}
                    />
                  ))}
              </div>
            ) : (
              <div className={`${styles.ProjectList}  SmallContainer`}>
                {isFetched &&
                  projectsData.data?.data?.projects!== undefined &&
                  projectsData.data?.data?.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      cardID={project.id}
                      userID={data.id}
                      ownerId={project.owner_id}
                      acceptInviteCallBackModel={showInvitationModel}
                      followers_count={project.followers_count}
                      apps_count={project.apps_count}
                      disabled={project.disabled}
                      admin_disabled={project.admin_disabled}
                    />
                  ))}
              </div>
            )}

            {showInviteModel === true && (
              <div className={styles.ProjectDeleteModel}>
                <Modal
                  showModal={showInvitationModel}
                  onClickAway={hideInvitationModel}
                >
                  <div className={styles.ModelContent}>
                    <div className={styles.ModelHeader}>
                      Invitation to this project{" "}
                    </div>
                    <div className={styles.UpdateForm}>
                      <div className={styles.InformationText}>
                        You have been invited to join this project as (a/an)
                        <span className={styles.Role}>
                          {" "}
                          {inviteeModelRole}.
                        </span>
                      </div>
                      <div className={styles.InformationWarning}>
                        If you decline, you will not be able to see this project
                        again unless you are re-invited.
                      </div>
                      <div className={styles.UpdateProjectModelButtons}>
                        <PrimaryButton
                          color="red"
                          onClick={() => {
                            handleInvitationDecline();
                          }}
                        >
                          {decliningInvitation ? <Spinner /> : "Decline"}
                        </PrimaryButton>
                        <PrimaryButton
                          color="primary"
                          onClick={() => {
                            handleInvitationAcceptence();
                          }}
                        >
                          {acceptingInvitation ? <Spinner /> : "Accept"}
                        </PrimaryButton>
                      </div>
                      {invitationError && (
                        <div className={styles.InformationWarning}>
                          {invitationError}
                        </div>
                      )}
                    </div>
                  </div>
                </Modal>
              </div>
            )}
            {displayProjects.length === 0 && isFetched && (
              <div className={styles.NoResourcesMessage}>
                {selectedProjects === "My projects" ? (
                  <>
                    {currentPaginationPage === 1 ? (
                      <div>
                        You haven’t created any projects yet. Click the &nbsp;{" "}
                        <ButtonPlus className={styles.ButtonPlusSmall} /> &nbsp;
                        button to add a project.
                      </div>
                    ) : (
                      <div>
                        This page of you personal projects contains no projects,
                        switch tabs to shared to see Projects &nbsp; Or click{" "}
                        <ButtonPlus className={styles.ButtonPlusSmall} />
                        &nbsp; button to add a project.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {currentPaginationPage === 1 ? (
                      <>No project has been shared with you as yet.</>
                    ) : (
                      <>This page contains no shared projects.</>
                    )}
                  </>
                )}
              </div>
            )}
            {!isFetched && !projectsData?.data?.data?.projects?.length === 0 && (
              <div className={styles.NoResourcesMessage}>
                You haven’t created any projects yet. Click the &nbsp;{" "}
                <ButtonPlus className={styles.ButtonPlusSmall} /> &nbsp; button
                to add a project.
              </div>
            )}
            {isError &&(
              <div className={styles.NoResourcesMessage}>
                Oops! Something went wrong! Failed to retrieve Projects.
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.FooterRow}>
        {pagination?.pages > 1 &&
          !isRetrieving &&
          isFetched &&
          !openCreateComponent && (
            <div className={styles.PaginationSection}>
              {/* customise pagination for shared and personal projects */}
              <Pagination
                total={pagination?.pages}
                current={currentPaginationPage}
                onPageChange={onPageChange}
              />
            </div>
          )}
        <div>
          Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

UserProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  clusters: PropTypes.object,
  pagination: PropTypes.shape({}),
  getClustersList: PropTypes.func.isRequired,
  getUserProjects: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isFetched: PropTypes.bool,
  isRetrieving: PropTypes.bool,
};

UserProjectsPage.defaultProps = {
  clusters: [],
  projects: [],
  pagination: {},
  isFetched: false,
  isRetrieving: false,
};

export const mapStateToProps = (state) => {
  const { data } = state.user;

  const { clusters } = state.clustersReducer;
  const { isRetrieving, projects, isFetched, pagination } =
    state.userProjectsReducer;
  const { credits } = state.userCreditsReducer;
  return {
    data,
    isRetrieving,
    projects,
    pagination,
    clusters,
    isFetched,
    credits,
  };
};

const mapDispatchToProps = {
  getUserProjects,
  getClustersList,
  getUserCredits,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectsPage);
