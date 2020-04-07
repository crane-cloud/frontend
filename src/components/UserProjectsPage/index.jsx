import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './UserProjectsPage.css';
import AddProject from '../../redux/actions/addProject';
import InformationBarSub from '../InformationBarSub';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
import Modal from '../Modal';
import getClustersList from '../../redux/actions/ClustersActions';
import getUserProjects from '../../redux/actions/projectsListActions';
import InputText from '../InputText';
import TextArea from '../TextArea';
import { BigSpinner } from '../SpinnerComponent';
import ClusterCard from '../ClusterCard';
import crane from '../../assets/images/craneLogo.png';


class UserProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false, // add project modal is closed initially
      projectName: '',
      clusterID: '',
      projectDescription: '',
      clusters: [],
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getClustersList, getUserProjects, data } = this.props;
    getUserProjects(data.id);
    getClustersList();
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    this.setState({ openModal: false });
  }

  handleSubmit() {
    const { projectName, projectDescription, clusterID } = this.state;
    const { AddProject, data, isAdded } = this.props;
    const newProject = {
      description: projectDescription,
      cluster_id: clusterID,
      name: projectName,
      owner_id: data.id
    };
    AddProject(newProject);
    // this.setState({
    //   loading: true
    // });

    if (isAdded === true) {
      this.setState({
        openModal: false
      });
    }
  }


  render() {
    const {
      openModal,
      projectName,
      projectDescription,
      // clusterID,
      // loading
    } = this.state;
    const {
      projects, clusters, isRetrieving, data, isFetched
    } = this.props;
    const userId = data.id;
    const clustersList = clusters.length > 0
        && clusters.map((item, i) => (
          <option key={i} value={item.id}>{item.name}</option>
        ));

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBarSub header="Projects" showBtn btnAction={this.showForm} />
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
                  { (isFetched && projects !== undefined && (
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
                name="clusterID"
                value={this.state.value}
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              >
                <option selected>Pick a Cluster</option>
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
            <div className="ModalFormButtons">
              <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideForm} />
              <PrimaryButton label="Create project" onClick={this.handleSubmit} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

UserProjectsPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  clusters: PropTypes.arrayOf(PropTypes.object),
  project: PropTypes.arrayOf(PropTypes.object),
  isAdded: PropTypes.bool,
  isFetched: PropTypes.bool,
  isRetrieving: PropTypes.bool
};

UserProjectsPage.defaultProps = {
  clusters: [],
  project: {},
  isAdded: false,
  projects: [],
  isFetched: false,
  isRetrieving: false
};

export const mapStateToProps = (state) => {
  const { data } = state.user;
  const { isAdded, project } = state.addProjectReducer;
  const { clusters } = state.ClustersReducer;
  const { isRetrieving, projects, isFetched } = state.UserProjectsReducer;
  return {
    isAdded, project, data, isRetrieving, projects, clusters, isFetched
  };
};

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserProjects, AddProject, getClustersList,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjectsPage);
