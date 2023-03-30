import React from "react";
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
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as Users } from "../../assets/images/users.svg";
import "../../index.css";

class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      openCreateComponent: false,
      Searchword: "",
      SearchList: [],
      myProjectsList: [],
      sharedProjectsList: [],
      showInviteModel: false,
      selectedProjects: "My projects",
      inviteeProjectId: "",
      inviteeModelRole: "",
      decliningInvitation: false,
      acceptingInvitation: false,
      invitationError: "",
      currentTab: "My Projects",
      currentPaginationPage: 1,
    };
    this.state = this.initialState;
    this.openProjectCreateComponent =
      this.openProjectCreateComponent.bind(this);
    this.callbackProjectCreateComponent =
      this.callbackProjectCreateComponent.bind(this);
    this.searchThroughProjects = this.searchThroughProjects.bind(this);
    this.handleCallbackSearchword = this.handleCallbackSearchword.bind(this);
    this.showInvitationModel = this.showInvitationModel.bind(this);
    this.hideInvitationModel = this.hideInvitationModel.bind(this);
    this.handleInvitationAcceptence =
      this.handleInvitationAcceptence.bind(this);
    this.handleInvitationDecline = this.handleInvitationDecline.bind(this);
    this.filterProjects = this.filterProjects.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const { getClustersList, getUserProjects, data, getUserCredits } =
      this.props;
    //add page 1
    getUserProjects(this.state.currentPaginationPage);
    getClustersList();
    getUserCredits(data.id);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isAdded,
      getClustersList,
      getUserProjects,
      isDeleted,
      isUpdated,
      clearUpdateProjectState,
      isFetched,
    } = this.props;
    const { Searchword } = this.state;

    if (isDeleted !== prevProps.isDeleted) {
      getUserProjects(this.state.currentPaginationPage);
      getClustersList();
    }

    if (isUpdated !== prevProps.isUpdated) {
      clearUpdateProjectState();
      getUserProjects(this.state.currentPaginationPage);
      getClustersList();
    }

    if (isAdded !== prevProps.isAdded) {
      getUserProjects(this.state.currentPaginationPage);
      this.setState(this.initialState);
    }
    if (isFetched !== prevProps.isFetched) {
      //call filter
      const filteredData = this.filterProjects();
      this.setState({
        myProjectsList: filteredData.myProjects,
        sharedProjectsList: filteredData.sharedProjects,
      });
    }
    if (Searchword !== prevState.Searchword) {
      this.searchThroughProjects();
    }
  }

  openProjectCreateComponent() {
    this.setState({ openCreateComponent: true });
  }
  callbackProjectCreateComponent() {
    const { getUserProjects } = this.props;
    this.setState(this.initialState);
    getUserProjects(this.state.currentPaginationPage);
  }
  searchThroughProjects() {
    const { Searchword } = this.state;
    const { projects } = this.props;
    let searchResult = [];
    projects.forEach((element) => {
      if (element.name.toLowerCase().includes(Searchword.toLowerCase())) {
        searchResult.push(element);
      }
    });
    this.setState({
      SearchList: searchResult.sort((a, b) =>
        b.date_created > a.date_created ? 1 : -1
      ),
    });
  }
  hideInvitationModel() {
    this.setState({ showInviteModel: false });
  }
  showInvitationModel(inviteeProjectId, inviteeModelRole) {
    this.setState({
      showInviteModel: true,
      inviteeProjectId: inviteeProjectId,
      inviteeModelRole: inviteeModelRole,
    });
  }
  handleCallbackSearchword(word) {
    this.setState({
      Searchword: word,
    });
  }
  handleInvitationDecline() {
    const { getUserProjects } = this.props;
    this.setState({
      decliningInvitation: true,
    });
    const { inviteeProjectId } = this.state;
    handlePatchRequest(`/projects/${inviteeProjectId}/users/handle_invite`, {
      accepted_collaboration_invite: false,
    })
      .then((response) => {
        this.setState({
          decliningInvitation: false,
        });
        this.hideInvitationModel();
        getUserProjects(this.state.currentPaginationPage);
      })
      .catch((error) => {
        this.setState({
          invitationError: "Something went wrong",
          decliningInvitation: false,
        });
        this.hideInvitationModel();
      });
  }
  handleInvitationAcceptence() {
    const { getUserProjects } = this.props;
    this.setState({
      acceptingInvitation: true,
    });
    const { inviteeProjectId } = this.state;

    handlePatchRequest(`/projects/${inviteeProjectId}/users/handle_invite`, {
      accepted_collaboration_invite: true,
    })
      .then((response) => {
        this.setState({
          acceptingInvitation: false,
        });
        this.hideInvitationModel();
        getUserProjects(this.state.currentPaginationPage);
      })
      .catch((error) => {
        this.setState({
          invitationError: "Something went wrong",
          acceptingInvitation: false,
        });
        this.hideInvitationModel();
      });
  }
  filterProjects() {
    const { projects, data } = this.props;
    let myProjects = [];
    let sharedProjects = [];
    projects.forEach((element) => {
      if (element.owner_id === data.id) {
        myProjects.push(element);
      } else {
        sharedProjects.push(element);
      }
    });
    return {
      sharedProjects,
      myProjects,
    };
  }
  onPageChange(page) {
    const { getUserProjects } = this.props;
    this.setState({
      currentPaginationPage: page,
    });
    getUserProjects(page);
  }

  render() {
    const {
      openCreateComponent,
      Searchword,
      SearchList,
      showInviteModel,
      selectedProjects,
      inviteeModelRole,
      decliningInvitation,
      acceptingInvitation,
      invitationError,
      sharedProjectsList,
      myProjectsList,
      currentTab,
    } = this.state;
    const {
      projects,
      pagination,
      isRetrieving,
      isFetched,
      match: { params },
      credits,
      data,
    } = this.props;
    const displayProjects =
      selectedProjects === "My projects" ? myProjectsList : sharedProjectsList;
    const sortedProjects = displayProjects.sort((a, b) =>
      b.date_created > a.date_created ? 1 : -1
    );
    return (
      <div className={styles.Page}>
        {openCreateComponent ? (
          <CreateProject
            closeComponent={this.callbackProjectCreateComponent}
            params={params}
          />
        ) : (
          <div>
            <div className={styles.TopRow}>
              <Header credits={credits?.amount} />
              <InformationBar
                header="Projects"
                showBtn
                buttontext="+ New Project"
                showSearchBar
                placeholder="Search through projects"
                btnAction={this.openProjectCreateComponent}
                searchAction={this.handleCallbackSearchword}
              />
            </div>
            <div className={styles.MainRow}>
              <div className={`${styles.SelectProjects} SmallContainer`}>
                <div className={styles.ProjectCategoryHeadings}>
                  <span
                    className={
                      currentTab === "My Projects"
                        ? styles.CurrentTab
                        : styles.Tab
                    }
                    onClick={() => {
                      this.setState({
                        selectedProjects: "My projects",
                        currentTab: "My Projects",
                      });
                    }}
                  >
                    <div className={styles.ProjectCategories}>
                      <span>
                        <User className={styles.SmallerIcon} />
                      </span>
                      <span>My Projects</span>
                    </div>
                  </span>
                  <span
                    className={
                      currentTab === "Shared Projects"
                        ? styles.CurrentTab
                        : styles.Tab
                    }
                    onClick={() => {
                      this.setState({
                        selectedProjects: "Shared Projects",
                        currentTab: "Shared Projects",
                      });
                    }}
                  >
                    <div className={styles.ProjectCategories}>
                      <span>
                        <Users className={styles.SmallerIcon} />
                      </span>
                      <span>Shared Projects</span>
                    </div>
                  </span>
                </div>
              </div>
              {isRetrieving ? (
                <div className={styles.NoResourcesMessage}>
                  <div className={styles.SpinnerWrapper}>
                    <Spinner size="big" />
                  </div>
                </div>
              ) : Searchword !== "" ? (
                <div className={`${styles.ProjectList}  SmallContainer`}>
                  {isFetched &&
                    SearchList !== undefined &&
                    SearchList.map((project) => (
                      <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        cardID={project.id}
                        acceptInviteCallBackModel={this.showInvitationModel}
                        userID={data.id}
                        ownerId={project.owner_id}
                        apps_count={project.apps_count}
                        disabled={project.disabled}
                      />
                    ))}
                </div>
              ) : (
                <div className={`${styles.ProjectList}  SmallContainer`}>
                  {isFetched &&
                    sortedProjects !== undefined &&
                    sortedProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        cardID={project.id}
                        userID={data.id}
                        ownerId={project.owner_id}
                        acceptInviteCallBackModel={this.showInvitationModel}
                        apps_count={project.apps_count}
                        disabled={project.disabled}
                      />
                    ))}
                </div>
              )}

              {showInviteModel === true && (
                <div className={styles.ProjectDeleteModel}>
                  <Modal
                    showModal={showInviteModel}
                    onClickAway={this.hideInvitationModel}
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
                          If you decline, you will not be able to see this
                          project again unless you are re-invited.
                        </div>
                        <div className={styles.UpdateProjectModelButtons}>
                          <PrimaryButton
                            color="red"
                            onClick={() => {
                              this.handleInvitationDecline();
                            }}
                          >
                            {decliningInvitation ? <Spinner /> : "Decline"}
                          </PrimaryButton>
                          <PrimaryButton
                            color="primary"
                            onClick={() => {
                              this.handleInvitationAcceptence();
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
              {displayProjects.length === 0 && (
                <div className={styles.NoResourcesMessage}>
                  {selectedProjects === "My projects" ? (
                    <div>
                      You haven’t created any projects yet. Click the &nbsp;{" "}
                      <ButtonPlus className={styles.ButtonPlusSmall} /> &nbsp;
                      button to add a project.
                    </div>
                  ) : (
                    <>No project has been shared with you as yet.</>
                  )}
                </div>
              )}
              {isFetched && projects.length === 0 && (
                <div className={styles.NoResourcesMessage}>
                  You haven’t created any projects yet. Click the &nbsp;{" "}
                  <ButtonPlus className={styles.ButtonPlusSmall} /> &nbsp;
                  button to add a project.
                </div>
              )}
              {!isRetrieving && !isFetched && (
                <div className={styles.NoResourcesMessage}>
                  Oops! Something went wrong! Failed to retrieve Projects.
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.FooterRow}>
        {pagination?.pages > 1 && (
          <div className={styles.PaginationSection}>
            <Pagination
              total={pagination.pages}
              current={this.state.currentPaginationPage}
              onPageChange={this.onPageChange}
            />
          </div>
        )}
          <div>
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </div>
        </div>
      </div>
    );
  }
}

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
