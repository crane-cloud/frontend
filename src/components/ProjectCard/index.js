import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import { ReactComponent as DotsImg } from '../../assets/images/more-verticle.svg';
import deleteProject, { clearDeleteProjectState } from '../../redux/actions/deleteProject';
import updateProject from '../../redux/actions/updateProject';
import Spinner from '../Spinner';
import TextArea from '../TextArea';
import Feedback from '../Feedback';
import DeleteWarning from '../DeleteWarning';
import BlackInputText from '../BlackInputText';
import Modal from '../Modal';
import './ProjectCard.css';
import LineChartComponent from '../LineChart';

const sampleData = [
  { name: 'Sample Metric 1', uv: 250 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 10 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 70 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 60 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 190 },
  { name: 'Sample Metric 2', uv: 290 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 130 },
  { name: 'Sample Metric 2', uv: 0 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 280 },
  { name: 'Sample Metric 2', uv: 300 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 170 },
  { name: 'Sample Metric 2', uv: 290 },
];

// this function is meant to shuffle the dummy data array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    const { name, description } = props;
    this.state = {
      openUpdateModal: false,
      openDeleteAlert: false,
      openDropDown: false,
      projectName: name ? props.name : '',
      projectDescription: description ? props.description : '',
      error: ''
    };

    this.container = React.createRef();

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
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  showDropDown() {
    this.setState({
      openDropDown: true,
    });
  }

  handleClickOutside(event) {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        openDropDown: false
      });
    }
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
    this.setState({
      openDropDown: false
    });
  }

  showUpdateForm() {
    this.setState({ openUpdateModal: true });
  }

  hideUpdateForm() {
    const { name, description } = this.props;
    this.setState({
      openUpdateModal: false,
      projectName: name,
      projectDescription: description
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
    const {
      updateProject, cardID, name, description
    } = this.props;

    if (projectName !== name || projectDescription !== description) {
      if (!projectName || !projectDescription) {
        this.setState({
          error: 'please provide either a new name or description'
        });
      } else {
        if (projectName !== name && projectDescription === description) {
          if (!this.validateProjectName(projectName)) {
            this.setState({
              error: 'name should start with a letter'
            });
          } else if (this.validateProjectName(projectName) === 'false_convention') {
            this.setState({
              error: 'name may only contain letters and a hypen -'
            });
          } else if (projectName.length > 22) {
            this.setState({
              error: 'project name cannot exceed 22 characters'
            });
          } else {
            const newProject = { name: projectName };
            updateProject(cardID, newProject);
          }
        }

        if (projectName === name && projectDescription !== description) {
          const newProject = { description: projectDescription };
          updateProject(cardID, newProject);
        }

        if (projectName !== name && projectDescription !== description) {
          if (!this.validateProjectName(projectName)) {
            this.setState({
              error: 'name should start with a letter'
            });
          } else if (this.validateProjectName(projectName) === 'false_convention') {
            this.setState({
              error: 'name may only contain letters and a hypen -'
            });
          } else {
            const newProject = { name: projectName, description: projectDescription };
            updateProject(cardID, newProject);
          }
        }
      }
    }
  }


  handleDeleteProject(e, projectID) {
    const { deleteProject } = this.props;
    e.preventDefault();
    deleteProject(projectID);
  }


  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearDeleteProjectState } = this.props;
    clearDeleteProjectState();
    this.setState({ openDeleteAlert: false });
  }

  render() {
    const {
      name, isDeleting, data, description, cardID, isUpdating, message, isFailed
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
      <>
        <div className="ProjectsCard">
          <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps`, projectData: name, projectDesc: projectDescription }} key={cardID}>
            <div className="ProjectImageDiv">
              <LineChartComponent data={shuffle(sampleData)} />
            </div>
          </Link>
          <div className="BottomContainer">
            <div className="ProjectInfoSection">
              <Link to={{ pathname: `/users/${userId}/projects/${cardID}/apps`, projectData: name }} key={cardID}>
                <div className="ProjectsCardName">{name}</div>
              </Link>
              <div
                className="ProjectDropDown"
                onClick={this.toggleDropDown}
                role="presentation"
                ref={this.container}
              >
                <DotsImg className="DropDownImg" />

                {openDropDown && (
                  <div className="ProjectDropDownContent">
                    <div
                      onClick={this.showUpdateForm}
                      role="presentation"
                    >
                      Update
                    </div>
                    <div
                      onClick={this.showDeleteAlert}
                      role="presentation"
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="ProjectDescription">{description}</div>
          </div>
        </div>

        {(openDeleteAlert && (
          <div className="ProjectDeleteModel">
            <Modal showModal={openDeleteAlert} onClickAway={this.hideDeleteAlert}>
              <div className="DeleteProjectModel">
                <div className="DeleteProjectModalUpperSection">
                  <div className="DeleteDescription">
                    Are you sure you want to delete&nbsp;
                    <span>{name}</span>
                      &nbsp;
                    ?
                    <DeleteWarning />
                  </div>
                </div>

                <div className="DeleteProjectModalLowerSection">
                  <div className="DeleteProjectModelButtons">
                    <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                    <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} className="DeleteBtn" onClick={(e) => this.handleDeleteProject(e, cardID)} />
                  </div>

                  {(isFailed && message) && (
                    <Feedback
                      message={message}
                      type="error"
                    />
                  )}
                </div>
              </div>

            </Modal>
          </div>
        ))}

        {(openUpdateModal && (
          <div className="ProjectDeleteModel">
            <Modal showModal={openUpdateModal} onClickAway={this.hideUpdateForm}>
              <div className="ModalUpdateForm">
                <div className="ModalFormHeading">
                  <div className="HeadingWithTooltip">
                    <h2>
                      Update your project
                    </h2>
                  </div>
                </div>
                <div className="ModalFormInputs">
                  <BlackInputText
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <TextArea
                    placeholder="Description"
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
                  <PrimaryButton label={isUpdating ? <Spinner /> : 'Update Project'} onClick={this.handleSubmit} />
                </div>

              </div>
            </Modal>
          </div>
        ))}

      </>

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
  data: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  message: PropTypes.string.isRequired
};

ProjectCard.defaultProps = {
  isDeleted: false,
  isDeleting: false,
  isFailed: false,
  name: '',
  description: '',
  isUpdating: false
};

const mapStateToProps = (state) => {
  const { data } = state.user;
  const {
    isDeleting, isDeleted, isFailed, clearDeleteProjectState, message
  } = state.deleteProjectReducer;
  const { isUpdating, isUpdated } = state.updateProjectReducer;

  return {
    data,
    isDeleting,
    isDeleted,
    isFailed,
    isUpdating,
    isUpdated,
    clearDeleteProjectState,
    message
  };
};

const mapDispatchToProps = {
  deleteProject, updateProject, clearDeleteProjectState
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
