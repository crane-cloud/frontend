import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./UserProjectsPage.module.css";
import { clearUpdateProjectState } from "../../redux/actions/updateProject";
import InformationBar from "../../components/InformationBar";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import Header from "../../components/Header";
import getClustersList from "../../redux/actions/clusters";
import BlackInputText from "../../components/BlackInputText";
import CreateProject from "../../components/CreateProject";
import getUserProjects from "../../redux/actions/projectsList";
import ProjectCard from "../../components/ProjectCard";
import Spinner from "../../components/Spinner";

class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      openCreateComponent: false,
      Searchword: "",
      SearchList: [],
    };

    this.state = this.initialState;

    this.openProjectCreateComponent =
      this.openProjectCreateComponent.bind(this);
    this.callbackProjectCreateComponent =
      this.callbackProjectCreateComponent.bind(this);
    this.searchThroughProjects = this.searchThroughProjects.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getClustersList, getUserProjects, data, clearUpdateProjectState } =
      this.props;
    getUserProjects(data.id);
    getClustersList();
    clearUpdateProjectState();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isAdded,
      getClustersList,
      getUserProjects,
      data,
      isDeleted,
      isUpdated,
      clearUpdateProjectState,
    } = this.props;
    const { Searchword } = this.state;

    if (isDeleted !== prevProps.isDeleted) {
      getUserProjects(data.id);
      getClustersList();
    }

    if (isUpdated !== prevProps.isUpdated) {
      clearUpdateProjectState();
      getUserProjects(data.id);
      getClustersList();
    }

    if (isAdded !== prevProps.isAdded) {
      getUserProjects(data.id);
      this.setState(this.initialState);
    }
    if (Searchword !== prevState.Searchword) {
      this.searchThroughProjects();
    }
  }

  openProjectCreateComponent() {
    this.setState({ openCreateComponent: true });
  }
  callbackProjectCreateComponent() {
    this.setState(this.initialState);
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
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { openCreateComponent, Searchword, SearchList } = this.state;
    const {
      projects,
      isRetrieving,
      isFetched,
      match: { params },
    } = this.props;
    const sortedProjects = projects.sort((a, b) =>
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
              <Header />
              <InformationBar
                header="Projects"
                showBtn
                btnAction={this.openProjectCreateComponent}
              />
            </div>
            <div className={styles.MainRow}>
              <div className={styles.SearchBar}>
                <BlackInputText
                  required
                  placeholder="Search through projects"
                  name="Searchword"
                  value={Searchword}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              {isRetrieving ? (
                <div className={styles.NoResourcesMessage}>
                  <div className={styles.SpinnerWrapper}>
                    <Spinner size="big" />
                  </div>
                </div>
              ) : Searchword !== "" ? (
                <div className={styles.ProjectList}>
                  {isFetched &&
                    SearchList !== undefined &&
                    SearchList.map((project) => (
                      <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        cardID={project.id}
                      />
                    ))}
                </div>
              ) : (
                <div className={styles.ProjectList}>
                  {isFetched &&
                    sortedProjects !== undefined &&
                    sortedProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        cardID={project.id}
                      />
                    ))}
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
  getClustersList: PropTypes.func.isRequired,
  getUserProjects: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isAdded: PropTypes.bool,
  errorCode: PropTypes.number,
  isAdding: PropTypes.bool,
  isFetched: PropTypes.bool,
  message: PropTypes.string,
  isUpdated: PropTypes.bool,
  isDeleted: PropTypes.bool,
  isRetrieving: PropTypes.bool,
};

UserProjectsPage.defaultProps = {
  clusters: [],
  isAdded: false,
  isAdding: false,
  errorCode: null,
  projects: [],
  message: "",
  isFetched: false,
  isUpdated: false,
  isDeleted: false,
  isRetrieving: false,
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isAdded, isAdding, message, errorCode } = state.addProjectReducer;
  const { clusters } = state.clustersReducer;
  const { isDeleted } = state.deleteProjectReducer;
  const { isRetrieving, projects, isFetched } = state.userProjectsReducer;
  const { isUpdated, clearUpdateProjectState } = state.updateProjectReducer;
  return {
    isAdded,
    data,
    isRetrieving,
    projects,
    clusters,
    isUpdated,
    isFetched,
    isAdding,
    message,
    isDeleted,
    errorCode,
    clearUpdateProjectState,
  };
};

const mapDispatchToProps = {
  getUserProjects,
  getClustersList,
  clearUpdateProjectState,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectsPage);
