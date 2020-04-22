import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import DotsImg from '../../assets/images/3dots.svg';
import deleteProject, { clearDeleteProjectState } from '../../redux/actions/deleteProject';
import updateProject from '../../redux/actions/updateProject';
import getProjectDetail from '../../redux/actions/projectDetail';
import Spinner from '../SpinnerComponent';
import InputText from '../InputText';
// import TextArea from '../TextArea';
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
    };

    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.hideUpdateForm = this.hideUpdateForm.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
  }

  showDropDown() {
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
    // const { clearAddProjectState } = this.props;
    // clearAddProjectState();
    this.setState({ openUpdateModal: false });
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

  handleDeleteProject(e, projectID) {
    const {
      deleteProject, isDeleted, isFailed
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
        deleteFeedback: 'Failed to delete Project. Try again'
      });
      setTimeout(
        () => {
          this.setState({
            deleteFeedback: '',
            openDeleteAlert: false,
          });
        }, 2000
      );
    }
    // clearDeleteProjectState();
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
      name, isDeleting, data, description, icon, CardID, isUpdating
    } = this.props;
    const userId = data.id;
    const { openDeleteAlert, openDropDown, projectName, openUpdateModal } = this.state;
    return (
      <div className="Page">
        <div className="ProjectsCard">
          <div className="ProjectImageDiv" style={{ backgroundImage: `url(${icon})` }} />
          <div className="BottomContainer">
            <Link to={{ pathname: `/users/${userId}/projects/${CardID}/apps` }} key={CardID}>
              <div className="ProjectsCardName">{name}</div>
            </Link>
            <div className="ProjectsCardDesc">
              <table className="AppTable">
                <tr>
                  <td className="AppName">{description}</td>
                  <td className="OtherData">
                    <div className="StatusData">
                      <div className="ProjectDropDown" onClick={() => this.toggleDropDown()}>
                        <img src={DotsImg} alt="three dots" className="DropDownImg" />
                        {openDropDown && (
                          <div className="AppDropDownContent">
                            <div onClick={() => this.showDeleteAlert()}>Delete</div>
                            <div onClick={() => this.showUpdateForm()}>Update</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
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
                <div className="DeleteProjectModelResponses">
                  <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                  <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} onClick={(e) => this.handleDeleteProject(e, CardID)} />
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
                  <h2>Update your project</h2>
                </div>
                <div className="ModalFormInputs">
                  <InputText
                    placeholder="New Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />

                </div>
                {/* {error && (
                  <Feedback
                    type="error"
                    message={error}
                  />
                )} */}
                <div className="ModalFormButtons">
                  <PrimaryButton label="Cancel" className="CancelBtn" onClick={this.hideUpdateForm} />
                  <PrimaryButton label={isUpdating ? <Spinner /> : 'Update project'} onClick={this.handleSubmit} />
                </div>

                {/* {message && (
                  <Feedback
                    message={errorCode === 200 ? 'Successfully Updated' : message}
                    type={(isAdded && errorCode !== 409) ? 'success' : 'error'}
                  />
                )} */}

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
};

ProjectCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const {
    isDeleting, isDeleted, isFailed, clearDeleteProjectState 
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

export const mapDispatchToProps = (dispatch) => ({
  deleteProject: (projectID) => dispatch(deleteProject(projectID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
