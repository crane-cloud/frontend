import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import DotsImg from '../../assets/images/3dots.svg';
import deleteProject, { clearDeleteProjectState } from '../../redux/actions/deleteProject';
import updateProject from '../../redux/actions/updateProject';
import getProjectDetail, { clearProjectState } from '../../redux/actions/projectDetail';
import Spinner from '../SpinnerComponent';
import TextArea from '../TextArea';
import Feedback from '../Feedback';
import Tooltip from '../Tooltip';
import BlackInputText from '../BlackInputText';
import Modal from '../Modal';
import './ProjectCard.css';

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openUpdateModal: false,
      openDeleteAlert: false,
      openDropDown: false,
      deleteFeedback: '',
      projectName: '',
      projectDescription: '',
      error: ''
    };

    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.hideUpdateForm = this.hideUpdateForm.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProjectName = this.validateProjectName.bind(this);
  }

  showDropDown() {
    const { getProjectDetail, cardID } = this.props;
    getProjectDetail(cardID);

    this.setState({ openDropDown: true });
  }

  toggleDropDown() {
    const { openDropDown } = this.state;

    if (openDropDown) {
      this.hideDropDown();
    } else {
      this.showDropDown();
    }
  }

  hideDropDown() {
    this.setState({ openDropDown: false });
  }

  showUpdateForm() {
    this.setState({ openUpdateModal: true });
  }

  hideUpdateForm() {
    this.setState({
      openUpdateModal: false
    });
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
    const { projectName, projectDescription } = this.state;
    const { updateProject, cardID, project } = this.props;

    if (projectName === project.name) {
      this.setState({
        error: 'You can not submit the same project Name'
      });
    } else if (!projectName && projectDescription) {
      const newProjectObject = {
        description: projectDescription
      };
      updateProject(cardID, newProjectObject);
    } else if (projectName && !projectDescription) {
      const newProjectObject = {
        name: projectName
      };
      updateProject(cardID, newProjectObject);
    } else if (!projectName && !projectDescription) {
      this.setState({
        error: 'You cannot submit empty fields.'
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
      const newProjectObject = {
        name: projectName,
        description: projectDescription
      };
      updateProject(cardID, newProjectObject);
    }
  }


  handleDeleteProject(e, projectID) {
    const {
      deleteProject, isDeleted, isFailed, clearDeleteProjectState
    } = this.props;
    e.preventDefault();

    deleteProject(projectID);
    if (isDeleted) {
      this.setState({
        deleteFeedback: 'Project has been Deleted.',
        openDeleteAlert: false
      });
    }

    if (isFailed) {
      this.setState({
        deleteFeedback: 'Failed to delete Project. Try again',
        openDeleteAlert: false,
      });
    }
    clearDeleteProjectState();
  }


  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    clearDeleteProjectState();
    this.setState({ openDeleteAlert: false });
  }

  render() {
    const {
      name,
      isDeleting,
      data,
      description,
      icon,
      cardID,
      isUpdating,
      project
    } = this.props;
    const userId = data.id;
    const {
      openDeleteAlert,
      openDropDown,
      projectName,
      projectDescription,
      openUpdateModal,
      error
    } = this.state;
    return (
      <div>
        <div className="ProjectsCard">
          <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps` }} key={cardID}>
            <div className="ProjectImageDiv" style={{ backgroundImage: `url(${icon})` }} />
          </Link>
          <div className="BottomContainer">
            <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps` }} key={cardID}>
              <div className="ProjectsCardName">{name}</div>
            </Link>
            <div className="ProjectsCardDesc">
              <table className="ProjectTab">
                <tbody>
                  <tr>
                    <td className="ProjectName">{description}</td>
                    <td className="OtherData">
                      <div className="DropDownData">
                        <div className="ProjectDropDown" onClick={() => this.toggleDropDown()}>
                          <div className="DropDownIcon">
                            <img src={DotsImg} alt="three dots" className="DropDownImg" />
                          </div>
                          {openDropDown && (
                            <div className="ProjectDropDownContent">
                              <div onClick={() => this.showDeleteAlert()}>Delete</div>
                              <div onClick={() => this.showUpdateForm()}>Update</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {(openDeleteAlert && (
          <div className="ProjectDeleteModel">
            <Modal showModal={openDeleteAlert}>
              <div className="DeleteProjectModel">
                <div className="DeleteDescription">
                  Sure you want to delete project
                  <span>
                    <b>
                      {' '}
                      {name}
                      {' '}
                    </b>
                  </span>
                  ?
                </div>
                <div className="DeleteProjectModelResponses Extended">
                  <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                  <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} onClick={(e) => this.handleDeleteProject(e, cardID)} />
                </div>
              </div>

            </Modal>
          </div>
        ))}

        {(openUpdateModal && (
          <div className="ProjectDeleteModel">
            <Modal showModal={openUpdateModal}>
              <div className="ModalUpdateForm">
                <div className="ModalFormHeading">
                  <div className="HeadingWithTooltip">
                    <h2>
                      Update your project
                      <b>
                        {' '}
                        {project.name}
                      </b>
                    </h2>
                    <div className="UpdateToolTip">
                      <Tooltip
                        showIcon
                        message="You can update either project name or description or both."
                      />
                    </div>
                  </div>
                </div>
                <div className="ModalFormInputs">
                  <BlackInputText
                    placeholder={project.name}
                    name="projectName"
                    value={projectName}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <TextArea
                    placeholder={project.description}
                    name="projectDescription"
                    value={projectDescription}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />

                  {error && (
                    <Feedback
                      type="error"
                      message={error}
                    />
                  )}

                </div>

                <div className="ModalFormButtons">
                  <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideUpdateForm} />
                  <PrimaryButton label={isUpdating ? <Spinner /> : 'Update project'} onClick={this.handleSubmit} />
                </div>

              </div>
            </Modal>
          </div>
        ))}

      </div>

    );
  }
}

ProjectCard.propTypes = {
  isDeleted: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isFailed: PropTypes.bool,
  clearDeleteProjectState: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  cardID: PropTypes.string.isRequired,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  description: PropTypes.string,
  data: PropTypes.shape({Name: PropTypes.string}),
  icon: PropTypes.string.isRequired
};

ProjectCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  name: '',
  description: '',
  isUpdating: false,
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const {
    isDeleting, isDeleted, isFailed
  } = state.deleteProjectReducer;
  const { isUpdating, isUpdated } = state.updateProjectReducer;
  const { project } = state.projectDetailReducer;

  return {
    data,
    isDeleting,
    isDeleted,
    isFailed,
    isUpdating,
    isUpdated,
    project,
    clearDeleteProjectState
  };
};

export const mapDispatchToProps = {
  deleteProject, updateProject, getProjectDetail, clearProjectState
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
