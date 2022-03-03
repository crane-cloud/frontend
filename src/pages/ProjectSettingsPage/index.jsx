import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import deleteProject, {
  clearDeleteProjectState,
} from "../../redux/actions/deleteProject";
import updateProject, {
  clearUpdateProjectState,
} from "../../redux/actions/updateProject";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import SideBar from "../../components/SideBar";
import TextArea from "../../components/TextArea";
import Feedback from "../../components/Feedback";
import DeleteWarning from "../../components/DeleteWarning";
import BlackInputText from "../../components/BlackInputText";
import styles from "./ProjectSettingsPage.module.css";
import SettingsButton from "../../components/SettingsButton";
import Select from "../../components/Select";
import { retrieveProjectTypes } from "../../helpers/projecttypes";
import { validateName } from "../../helpers/validation"
class ProjectSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const { name, description, organisation, project_type } = projectInfo;

    this.state = {
      openUpdateAlert: false,
      openDeleteAlert: false,
      openDropDown: false,
      projectName: name ? name : "",
      projectDescription: description ? description : "",
      error: "",
      Confirmprojectname: "",
      disableDelete: true,
      projectOrganisation: organisation ? organisation : "",
      projectType: project_type ? project_type : "",
      othersBool: false,
      otherType: "",
    };

    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showUpdateAlert = this.showUpdateAlert.bind(this);
    this.hideUpdateAlert = this.hideUpdateAlert.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkProjectInputValidity = this.checkProjectInputValidity.bind(this);
    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }
  }
  handleChange(e) {
    const { error, openDeleteAlert } = this.state;
    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const { name } = projectInfo;
    const {
      errorMessage,
      clearUpdateProjectState,
      clearDeleteProjectState,
      isFailed,
      message,
    } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (errorMessage) {
      clearUpdateProjectState();
    }
    if (error) {
      this.setState({
        error: "",
      });
    }
    if (isFailed && message) {
      clearDeleteProjectState();
    }
    if (e.target.value === name && openDeleteAlert) {
      this.setState({
        disableDelete: false,
      });
    } else if (e.target.value !== name && openDeleteAlert) {
      this.setState({
        disableDelete: true,
      });
    }
  }

  handleSubmit() {
    const {
      projectName,
      projectDescription,
      projectOrganisation,
      projectType,
      otherType,
      othersBool,
    } = this.state;
    const {
      updateProject,
      match: {
        params: { projectID },
      },
    } = this.props;

    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const { name, description, organisation, project_type } = projectInfo;

    const Trim = (input) => input.trim();
    const capitalizeFirstLetter = (input) =>
      input.charAt(0).toUpperCase() + input.slice(1);
    const type = othersBool
      ? capitalizeFirstLetter(otherType)
      : capitalizeFirstLetter(projectType);
    const trimedprojectName = Trim(projectName);
    const trimedprojectDescription = Trim(projectDescription);
    const trimedprojectOrganisation = Trim(projectOrganisation);
    const trimedprojectType = Trim(type);

    if (
      trimedprojectName !== name ||
      trimedprojectDescription !== description ||
      trimedprojectOrganisation !== organisation ||
      trimedprojectType !== project_type
    ) {
      if (
        !trimedprojectName ||
        !trimedprojectDescription ||
        !trimedprojectOrganisation ||
        !trimedprojectType
      ) {
        this.setState({
          error:
            "Can't update when an empty field is submited, please fill the missing field or leave it unchanged.",
        });
      } else {
        if (trimedprojectName !== name) {
          const nameCheckResult = this.checkProjectInputValidity(
            trimedprojectName,
            "name"
          );
          if (nameCheckResult !== "") {
            this.setState({
              error: nameCheckResult,
            });
          } else {
            const organisationCheckResult = this.checkProjectInputValidity(
              trimedprojectOrganisation,
              "organisation"
            );
            const typeCheckResult = this.checkProjectInputValidity(
              trimedprojectType,
              "type"
            );
            if (organisationCheckResult !== "" || typeCheckResult !== "") {
              if (organisationCheckResult !== "") {
                this.setState({
                  error: organisationCheckResult,
                });
              }
              if (typeCheckResult !== "") {
                this.setState({
                  error: typeCheckResult,
                });
              }
            }
            if (typeCheckResult === "" && organisationCheckResult === "") {
              const newProject = {
                name: trimedprojectName,
                project_type: trimedprojectType,
                organisation: trimedprojectOrganisation,
                description: trimedprojectDescription,
              };
              updateProject(projectID, newProject);
            }
          }
        } else {
          const organisationCheckResult = this.checkProjectInputValidity(
            trimedprojectOrganisation,
            "organisation"
          );
          const typeCheckResult = this.checkProjectInputValidity(
            trimedprojectType,
            "type"
          );
          if (organisationCheckResult !== "" || typeCheckResult !== "") {
            if (organisationCheckResult !== "") {
              this.setState({
                error: organisationCheckResult,
              });
            }
            if (typeCheckResult !== "") {
              this.setState({
                error: typeCheckResult,
              });
            }
          }
          if (typeCheckResult === "" && organisationCheckResult === "") {
            const newProject = {
              project_type: trimedprojectType,
              organisation: trimedprojectOrganisation,
              description: trimedprojectDescription,
            };
            updateProject(projectID, newProject);
          }
        }
      }
    } else {
      this.setState({
        error: "Please provide new information in atleast one of the fields",
      });
    }
  }

  handleDeleteProject(e, projectID) {
    const { deleteProject } = this.props;
    e.preventDefault();
    deleteProject(projectID);
  }

  showUpdateAlert() {
    this.setState({ openUpdateAlert: true });
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }
  checkProjectInputValidity(input, output) {
    if (!validateName(input)) {
      return `${output} should start with a letter`;
    } else if (validateName(input) === "false_convention") {
      return `${output} may only contain letters and a hypen -`;
    } else if (input.length > 22) {
      return `Project ${output} cannot exceed 22 characters`;
    } else {
      return "";
    }
  }

  hideUpdateAlert() {
    this.setState({ openUpdateAlert: false });
  }

  hideDeleteAlert() {
    const { clearDeleteProjectState } = this.props;
    clearDeleteProjectState();
    this.setState({ openDeleteAlert: false });
  }
  handleTypeSelectChange(selected) {
    const { othersBool } = this.state;
    if (selected.id === 6) {
      if (!othersBool) {
        this.setState({ othersBool: true });
      }
    } else {
      this.setState({ projectType: selected.value });
      if (othersBool) {
        this.setState({ othersBool: false });
      }
    }
  }
  renderRedirect = () => {
    const { isDeleted, isUpdated } = this.props;
    if (isDeleted || isUpdated) {
      return <Redirect to={`/projects`} noThrow />;
    }
  };

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      isUpdating,
      message,
      isFailed,
      isUpdated,
      errorMessage,
    } = this.props;
    const projectInfo = JSON.parse(localStorage.getItem("project"));
    const { name, description } = projectInfo;

    const {
      openUpdateAlert,
      openDeleteAlert,
      projectName,
      projectDescription,
      error,
      Confirmprojectname,
      disableDelete,
      projectOrganisation,
      projectType,
      othersBool,
      otherType,
    } = this.state;
    const types = retrieveProjectTypes();

    const { projectID } = params;

    return (
      <div className={styles.Page}>
        {isUpdated || isDeleted ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={name}
              params={params}
              description={description}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/projects/${projectID}/metrics`}
              cpuLink={`/projects/${projectID}/cpu/`}
              memoryLink={`/projects/${projectID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/network/`}
            />
          </div>
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header="Settings" />
            </div>
            <div className={styles.ContentSection}>
              <div className={`${styles.ProjectSections} SmallContainer`}>
                <div className={styles.ProjectSectionTitle}>Manage project</div>
                <div className={styles.ProjectInstructions}>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Update project
                      </div>
                      <div>Modify the project name and description</div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <SettingsButton
                        label="Update"
                        onClick={this.showUpdateAlert}
                      />
                    </div>
                  </div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Delete project
                      </div>
                      <div>
                        Take down your entire project, delete all apps under it.
                      </div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <SettingsButton
                        label="Delete"
                        className="Change-Btn"
                        onClick={this.showDeleteAlert}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {openUpdateAlert && (
                <div className={styles.ProjectDeleteModel}>
                  <Modal
                    showModal={openUpdateAlert}
                    onClickAway={this.hideUpdateAlert}
                  >
                    <div>
                      <div
                        onSubmit={(e) => {
                          this.handleSubmit();
                          e.preventDefault();
                        }}
                      >
                        <div className={styles.UpdateForm}>
                          <div className={styles.UpdateInputSection}>
                            <div className={styles.DeleteDescription}>
                              Project name
                            </div>
                            <BlackInputText
                              placeholder="Project Name"
                              name="projectName"
                              value={projectName}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                          <div className={styles.UpdateInputSection}>
                            <div className={styles.DeleteDescription}>
                              Organisation
                            </div>
                            <BlackInputText
                              placeholder="Organisation"
                              name="projectOrganisation"
                              value={projectOrganisation}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                          <div className={styles.UpdateInputSection}>
                            <div className={styles.DeleteDescription}>
                              Project type
                            </div>
                            <Select
                              required
                              placeholder={
                                projectType
                                  ? projectType
                                  : "Update project type"
                              }
                              options={types}
                              onChange={this.handleTypeSelectChange}
                            />
                            {othersBool && (
                              <BlackInputText
                                required
                                placeholder="Type of project"
                                name="otherType"
                                value={otherType}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                              />
                            )}
                          </div>
                          <div className={styles.UpdateInputSection}>
                            <div className={styles.DeleteDescription}>
                              Project description
                            </div>
                            <TextArea
                              placeholder="Description"
                              name="projectDescription"
                              value={projectDescription}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                          {(errorMessage || error) && (
                            <Feedback
                              type="error"
                              message={
                                errorMessage
                                  ? "Failed to update Project"
                                  : error
                              }
                            />
                          )}
                          <div className={styles.UpdateProjectModelButtons}>
                            <PrimaryButton
                              label="cancel"
                              className="CancelBtn"
                              onClick={this.hideUpdateAlert}
                            />
                            <PrimaryButton
                              label={
                                isUpdating ? <Spinner /> : "update project"
                              }
                              onClick={this.handleSubmit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}

              {openDeleteAlert && (
                <div className={styles.ProjectDeleteModel}>
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={this.hideDeleteAlert}
                  >
                    <div className={styles.DeleteProjectModel}>
                      <div className={styles.DeleteProjectModalUpperSection}>
                        <div className={styles.WarningContainer}>
                          <div className={styles.DeleteDescription}>
                            Are you sure you want to delete&nbsp;
                            <span>{name}</span>
                            &nbsp;?
                          </div>
                          <div className={styles.DeleteSubDescription}>
                            This will permanently delete the project and all its
                            resources.
                            <br />
                            <br />
                            Please confirm by typing &nbsp;
                            <b className={styles.DeleteWarning}>{name}</b>{" "}
                            &nbsp; below.
                          </div>
                          <div className={styles.InnerModalDescription}>
                            <BlackInputText
                              required
                              placeholder={name}
                              name="Confirmprojectname"
                              value={Confirmprojectname}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                            <DeleteWarning textAlignment="Left" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.DeleteProjectModalLowerSection}>
                        <div className={styles.DeleteProjectModelButtons}>
                          <PrimaryButton
                            label="cancel"
                            className="CancelBtn"
                            onClick={this.hideDeleteAlert}
                          />
                          <PrimaryButton
                            label={isDeleting ? <Spinner /> : "Delete"}
                            className={
                              disableDelete
                                ? styles.InactiveDelete
                                : styles.DeleteBtn
                            }
                            disable={disableDelete}
                            onClick={(e) =>
                              this.handleDeleteProject(e, params.projectID)
                            }
                          />
                        </div>

                        {isFailed && message && (
                          <Feedback message={message} type="error" />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectSettingsPage.propTypes = {
  isFailed: PropTypes.bool,
  clearDeleteProjectState: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  name: PropTypes.string,
  isUpdating: PropTypes.bool,
  description: PropTypes.string,
  message: PropTypes.string,
  isUpdated: PropTypes.bool,
  isDeleted: PropTypes.bool,
};

ProjectSettingsPage.defaultProps = {
  message: "",
  isUpdated: false,
  isDeleted: false,
  name: "",
  description: "",
  isUpdating: false,
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, clearDeleteProjectState, message } =
    state.deleteProjectReducer;

  const { isUpdated, isUpdating, errorMessage, clearUpdateProjectState } =
    state.updateProjectReducer;
  return {
    isUpdated,
    isUpdating,
    message,
    isDeleting,
    isFailed,
    isDeleted,
    errorMessage,
    clearDeleteProjectState,
    clearUpdateProjectState,
  };
};

const mapDispatchToProps = {
  deleteProject,
  updateProject,
  clearDeleteProjectState,
  clearUpdateProjectState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettingsPage);
