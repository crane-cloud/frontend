import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './UserProjectsPage.css';
import addProject, { clearAddProjectState } from '../../redux/actions/addProject';
import InformationBar from '../InformationBar';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
import Modal from '../Modal';
import getClustersList from '../../redux/actions/clusters';
import getUserProjects from '../../redux/actions/projectsList';
import InputText from '../InputText';
import TextArea from '../TextArea';
import Spinner, { BigSpinner } from '../SpinnerComponent';

import ClusterCard from '../ClusterCard';
import crane from '../../assets/images/plant.svg';
import Feedback from '../Feedback';


class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false, // add project modal is closed initially
      projectName: '',
      clusterID: '',
      projectDescription: '',
      error: ''
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProjectName = this.validateProjectName.bind(this);
  }

  componentDidMount() {
    const { getClustersList, getUserProjects, data } = this.props;
    getUserProjects(data.id);
    getClustersList();
  }

  componentDidUpdate(prevProps) {
    const { isAdded, data, getUserProjects } = this.props;

    if (isAdded !== prevProps.isAdded) {
      getUserProjects(data.id);
      this.hideForm();
    }
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    const { clearAddProjectState } = this.props;
    clearAddProjectState();
    this.setState({ openModal: false });
  }

  validateProjectName(name) {
    if (/^[a-z]/i.test(name)) {
      if (name.match(/[^-a-zA-Z]/)) {
        return 'false_convention';
      }
      return true;
    }
    return false;
  }

  handleChange(e) {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });

    if (error) {
      this.setState({
        error: ''
      });
    }
  }

  handleSubmit() {
    const { projectName, projectDescription, clusterID } = this.state;
    const { addProject, data } = this.props;

    if (!projectName || !clusterID || !projectDescription) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'all fields are required'
      });
    } else if (this.validateProjectName(projectName) === false) {
      this.setState({
        error: 'name should start with a letter'
      });
    } else if (this.validateProjectName(projectName) === 'false_convention') {
      this.setState({
        error: 'name may only contain letters and a hypen -'
      });
    } else {
      const newProject = {
        description: projectDescription,
        cluster_id: clusterID,
        name: projectName,
        owner_id: data.id
      };
      addProject(newProject);
    }
  }


  render() {
    const {
      openModal,
      projectName,
      projectDescription,
      error,
      value
      // clusterID,
      // loading
    } = this.state;
    const {
      projects,
      clusters,
      isRetrieving,
      data,
      message,
      errorCode,
      isFetched,
      isAdded,
      isAdding
    } = this.props;
    const userId = data.id;
    const clustersList = clusters.length > 0
        && clusters.map((item) => (
          <option className="ClusterNameOption" key={item.id} value={item.id}>{item.name}</option>
        ));

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBar header="Projects" showBtn btnAction={this.showForm} />
        </div>
        <div className="MainRow">
          <div className="ProjectList">
            {
              isRetrieving ? (
                <div className="TableLoading">
                  <div className="SpinnerWrapper">
                    <BigSpinner />
                  </div>
                </div>
              ) : (
                <div className="ProjectList">
                  {(isFetched && projects !== undefined && (
                    (projects.map((project) => (
                      <Link to={{ pathname: `/users/${userId}/projects/${project.id}/apps` }} key={project.id}>
                        <div key={project.id} className="ProjectCardItem">
                          <ClusterCard
                            name={project.name}
                            description={project.description}
                            icon={crane}
                          />
                        </div>
                      </Link>
                    ))))
                  )}
                  {(isFetched && projects.length === 0) && (
                    <div className="NoContentDiv">
                      You haven’t created any projects yet.
                      Click the create button to get started.
                    </div>
                  )}
                  {(!isRetrieving && !isFetched) && (
                    <div className="NoContentDiv">
                      Oops! Something went wrong!
                      Failed to retrieve Projects.
                    </div>
                  )}

                </div>
              )
            }
          </div>
        </div>
        <div className="FooterRow">
          <p>
            Copyright © 2020 Crane Cloud.
            <br />
            All Rights Reserved.
          </p>
        </div>

        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal}>
          <div className="ModalForm">
            <div className="ModalFormHeading">
              <h2>Add a project</h2>
            </div>
            <div className="ModalFormInputs">
              <select
                className="ClusterDrop"
                name="clusterID"
                value={value}
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              >
                <option disabled selected>Pick a Cluster</option>
                {clustersList}
              </select>

              <InputText
                placeholder="Project Name"
                name="projectName"
                value={projectName}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />

              <TextArea
                placeholder="Project Description"
                name="projectDescription"
                value={projectDescription}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />

            </div>
            {error && (
              <Feedback
                type="error"
                message={error}
              />
            )}
            <div className="ModalFormButtons">
              <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideForm} />
              <PrimaryButton label={isAdding ? <Spinner /> : 'Create project'} onClick={this.handleSubmit} />
            </div>

            {message && (
              <Feedback
                message={errorCode === 409 ? 'Name already in use, please choose another' : message}
                type={(isAdded && errorCode !== 409) ? 'success' : 'error'}
              />
            )}

          </div>
        </Modal>
      </div>
    );
  }
}

UserProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  clusters: PropTypes.arrayOf(PropTypes.object),
  getClustersList: PropTypes.func.isRequired,
  getUserProjects: PropTypes.func.isRequired,
  clearAddProjectState: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  isAdded: PropTypes.bool,
  errorCode: PropTypes.number,
  isAdding: PropTypes.bool,
  isFetched: PropTypes.bool,
  message: PropTypes.string,
  isRetrieving: PropTypes.bool
};

UserProjectsPage.defaultProps = {
  clusters: [],
  isAdded: false,
  isAdding: false,
  errorCode: null,
  projects: [],
  message: '',
  isFetched: false,
  isRetrieving: false
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const {
    isAdded, isAdding, message, errorCode
  } = state.addProjectReducer;
  const { clusters } = state.clustersReducer;
  const { isRetrieving, projects, isFetched } = state.userProjectsReducer;
  return {
    isAdded,
    data,
    isRetrieving,
    projects,
    clusters,
    isFetched,
    isAdding,
    message,
    errorCode
  };
};

const mapDispatchToProps = {
  getUserProjects, addProject, getClustersList, clearAddProjectState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
