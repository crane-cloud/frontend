import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InformationBar from '../InformationBar';
import Header from '../Header';
import PrimaryButton from '../PrimaryButton';
import deleteProject, { clearDeleteProjectState } from '../../redux/actions/deleteProject';
import updateProject from '../../redux/actions/updateProject';
import Spinner from '../Spinner';
import Modal from '../Modal';
import SideBar from '../SideBar';
import TextArea from '../TextArea';
import Feedback from '../Feedback';
import DeleteWarning from '../DeleteWarning';
import BlackInputText from '../BlackInputText';
import './AppSettingsPage.css';

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const projectInfo = JSON.parse(localStorage.getItem('project'));
    const { name, description} = projectInfo;

    this.state = {
      openDeleteAlert: false,
      error: ''
    };


    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateProjectName = this.validateProjectName.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
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
  renderRedirect = () => {
    const { isDeleted, isUpdated } = this.props;
    const { userID } = this.props.match.params;
    if (isDeleted || isUpdated) {
      return <Redirect to={`/users/${userID}/projects`} noThrow/>
    }
  }

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      message,
      isFailed
    } = this.props;
    const projectInfo = JSON.parse(localStorage.getItem('project'));
    const name = projectInfo.name;
    const {
      openDeleteAlert,
      projectName,
      error
    } = this.state;

    return (
      <div className="Page">
        { isDeleted ? (this.renderRedirect() ) : ( null )}
        <div className="TopBarSection"><Header /></div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={name}
              params={params}
              description={description}
              pageRoute={this.props.location.pathname} />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar
                header="Settings"
              />
            </div>
            <div className="ContentSection">
                  
              <div className="DeleteButtonDiv">
                <PrimaryButton label="Delete App" className="DeleteBtn" onClick={this.showDeleteAlert} />
              </div>
                {(openDeleteAlert && (
                  <div className="ProjectDeleteModel">
                    <Modal showModal={openDeleteAlert} onClickAway={this.hideDeleteAlert}>
                      <div className="DeleteProjectModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="DeleteDescription">
                            Are you sure you want to delete&nbsp;
                            <span>{projectName}</span>
                              &nbsp;
                            ?
                            <DeleteWarning />
                          </div>
                        </div>

                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideDeleteAlert} />
                            <PrimaryButton label={isDeleting ? <Spinner /> : 'Delete'} className="DeleteBtn" onClick={(e) => this.handleDeleteProject(e, params.projectID)} />
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
            </div>
          </div>
        </div>


      </div>
    );
  }
}

AppSettingsPage.propTypes = {
  isFailed: PropTypes.bool,
  clearDeleteProjectState: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  name: PropTypes.string,
  message: PropTypes.string,
  isDeleted: PropTypes.bool
};

AppSettingsPage.defaultProps = {
  message: '',
  isUpdated: false,
  isDeleted: false,
  name: '',
  description: '',
  isUpdating: false
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, clearDeleteProjectState, message} = state.deleteProjectReducer;
  
  return {
    message,
    isDeleting,
    isFailed,
    isDeleted,
    clearDeleteProjectState
  };
};

const mapDispatchToProps = { clearDeleteProjectState
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
