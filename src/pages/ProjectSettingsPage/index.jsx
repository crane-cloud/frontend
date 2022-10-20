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
import getProjectMembers from "../../redux/actions/getProjectMembers";
import updateProject, {
  clearUpdateProjectState,
} from "../../redux/actions/updateProject";
import inviteMembers, {
  clearInvitingMembersState,
} from "../../redux/actions/inviteMembers";
import removeMember, {
  clearRemovingMembersState,
} from "../../redux/actions/removeMembers";
import Spinner from "../../components/Spinner";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import SideBar from "../../components/SideBar";
import TextArea from "../../components/TextArea";
import Feedback from "../../components/Feedback";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import DeleteWarning from "../../components/DeleteWarning";
import BlackInputText from "../../components/BlackInputText";
import styles from "./ProjectSettingsPage.module.css";
import SettingsButton from "../../components/SettingsButton";
import Select from "../../components/Select";
import { retrieveProjectTypes } from "../../helpers/projecttypes";
import { validateName } from "../../helpers/validation";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { retrieveMembershipRoles } from "../../helpers/membershipRoles";
// import "./../../components/DBSettingsPage/DBSettingsPage.css"

class ProjectSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const userToken = localStorage.getItem("token", null);
    const { name, description, organisation, project_type, project_id } =
      projectInfo;

    this.state = {
      openUpdateAlert: false,
      openDeleteAlert: false,
      openDropDown: false,
      userToken: userToken,
      projectName: name ? name : "",
      projectID: project_id ? project_id : "",
      projectDescription: description ? description : "",
      error: "",
      nameChecked: false,
      idChecked: false,
      tokenChecked: false,
      descriptionChecked: false,
      Confirmprojectname: "",
      disableDelete: true,
      projectOrganisation: organisation ? organisation : "",
      projectType: project_type ? project_type : "",
      othersBool: false,
      otherType: "",
      actionsMenu: false,
      showInviteModel: false,
      role: "",
      email: "",
    };

    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showUpdateAlert = this.showUpdateAlert.bind(this);
    this.hideUpdateAlert = this.hideUpdateAlert.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.nameOnClick = this.nameOnClick.bind(this);
    this.projectIDOnClick = this.projectIDOnClick.bind(this);
    this.projectDescriptionOnClick = this.projectDescriptionOnClick.bind(this);
    this.userTokenOnClick = this.userTokenOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkProjectInputValidity = this.checkProjectInputValidity.bind(this);
    this.handleTypeSelectChange = this.handleTypeSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showInviteMenu = this.showInviteMenu.bind(this);
    this.handleMemberInvitation = this.handleMemberInvitation.bind(this);
    this.handleInvitationRole = this.handleInvitationRole.bind(this);
    this.hideInviteMenu = this.hideInviteMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.removeProjectMember = this.removeProjectMember.bind(this);
  }

  componentDidMount() {
    const { getProjectMembers, clearInvitingMembersState } = this.props;
    clearInvitingMembersState();
    const projectID = this.props.match.params.projectID;
    getProjectMembers(projectID);
  }

  componentDidUpdate(prevProps) {
    const {
      getProjectMembers,
      isDeleted,
      isSent,
      isRemoved,
      clearRemovingMembersState,
    } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }

    if (isSent !== prevProps.isSent) {
      clearInvitingMembersState();
      getProjectMembers();
      this.hideInviteMenu();
    }

    if (isRemoved !== prevProps.isRemoved) {
      clearRemovingMembersState();
    }
  }

  handleClick = (e) => {
    if (this.state.actionsMenu) {
      return;
    }
    this.setState({ actionsMenu: true });
    e.stopPropagation();
    document.addEventListener("click", this.hideModal);
  };

  hideModal = () => {
    this.setState({ actionsMenu: false });
    document.removeEventListener("click", this.hideModal);
  };

  showMenu(userEmail) {
    this.setState({ email: userEmail });
  }

  removeProjectMember(e) {
    e.preventDefault();
    const { removeMember } = this.props;
    const { email } = this.state;
    const projectID = this.props.match.params.projectID;
    const emailDetails = {
      "email": email
    };
    removeMember(emailDetails, projectID);
  }

  handleMemberInvitation(e) {
    e.preventDefault();
    const { email, role } = this.state;
    const { inviteMembers } = this.props;

    const inviteInfo = {
      email,
      role,
    };

    if (email !== "" && role !== "") {
      this.validateEmail(email);
      const projectID = this.props.match.params.projectID;
      inviteMembers(inviteInfo, projectID);
    }
  }

  validateEmail(email) {
    const emailRegEx =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  handleChange(e) {
    const { error, openDeleteAlert } = this.state;
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
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

  showInviteMenu() {
    this.setState({ showInviteModel: true });
  }

  hideInviteMenu() {
    this.setState({ showInviteModel: false });
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

    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
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

  nameOnClick(e) {
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const { name } = projectInfo;
    navigator.clipboard.writeText(name);
    this.setState({ nameChecked: true });
    e.preventDefault();
  }

  projectIDOnClick() {
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const { project_id } = projectInfo;
    navigator.clipboard.writeText(project_id);
    this.setState({ idChecked: true });
  }

  projectDescriptionOnClick() {
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const { description } = projectInfo;
    navigator.clipboard.writeText(description);
    this.setState({ descriptionChecked: true });
  }

  userTokenOnClick() {
    const token = localStorage.getItem("token");
    navigator.clipboard.writeText(token);
    this.setState({ tokenChecked: true });
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
  handleInvitationRole(selected) {
    this.setState({ role: selected.value });
  }
  renderRedirect = () => {
    const {
      isDeleted,
      isUpdated,
      isSent,
      isRemoved,
      match: {
        params: { projectID },
      },
    } = this.props;
    if (isDeleted || isUpdated) {
      return <Redirect to={`/projects`} noThrow />;
    }

    if (isSent || isRemoved) {
      window.location.href = `/projects/${projectID}/settings`;
    }
  };

  render() {
    const {
      match: { params },
      isDeleting,
      location,
      isDeleted,
      isUpdating,
      message,
      isFailed,
      isUpdated,
      errorMessage,
      projectMembers,
      isSending,
      isSent,
      isRemoved,
    } = this.props;
    // console.log(this.props);
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const { name, description } = projectInfo;

    const { project_users } = projectMembers;

    function updateRoleValue(string) {
      let role = string[1];
      return role.charAt(0).toUpperCase() + role.slice(1);
    }

    const {
      openUpdateAlert,
      openDeleteAlert,
      userToken,
      projectName,
      projectDescription,
      error,
      Confirmprojectname,
      disableDelete,
      projectOrganisation,
      projectType,
      othersBool,
      otherType,
      nameChecked,
      idChecked,
      descriptionChecked,
      tokenChecked,
      showInviteModel,
      email,
      role,
      actionsMenu,
    } = this.state;
    const types = retrieveProjectTypes();
    const roles = retrieveMembershipRoles();

    const { projectID } = params;

    return (
      <div className={styles.Page}>
        {isUpdated || isDeleted || isSent || isRemoved
          ? this.renderRedirect()
          : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={name}
              params={params}
              description={description}
              pageRoute={location.pathname}
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
                <div className={styles.ProjectSectionTitle}>
                  Project Details
                </div>

                <div className={styles.ProjectInstructions}>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Project ID
                      </div>
                      <div>{projectID}</div>
                    </div>
                    <div className={styles.DBIcon}>
                      <CopyText onClick={this.projectIDOnClick} />
                      {idChecked ? <Checked /> : null}
                    </div>
                  </div>

                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Project Name
                      </div>
                      <div>{projectName}</div>
                    </div>
                    <div className={styles.DBIcon}>
                      <CopyText onClick={this.nameOnClick} />
                      {nameChecked ? <Checked /> : null}
                    </div>
                  </div>

                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        Project Description
                      </div>
                      <div>{projectDescription}</div>
                    </div>
                    <div className={styles.DBIcon}>
                      <CopyText onClick={this.projectDescriptionOnClick} />
                      {descriptionChecked ? <Checked /> : null}
                    </div>
                  </div>

                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        User Token
                      </div>
                      <div className={styles.TokenItem}>{userToken}</div>
                    </div>
                    <div className={styles.DBIcon}>
                      <CopyText onClick={this.userTokenOnClick} />
                      {tokenChecked ? <Checked /> : null}
                    </div>
                  </div>
                </div>
                <div className={styles.ProjectSectionTitle}>Membership</div>
                <div className={styles.ProjectInstructions}>
                  <div className={styles.MembershipHeader}>
                    <div className={styles.MemberSection}>
                      <div className={styles.SettingsSectionInfoHeader}>
                        {project_users?.length === 1 ? (
                          <div>Project has 1 Team Member</div>
                        ) : (
                          <div>
                            Project has {project_users?.length} Team Members
                          </div>
                        )}
                      </div>
                      <div className={styles.MemberDescription}>
                        Members have accounts on crane cloud, they can perform
                        different operations on the project depending on their
                        permission.
                      </div>
                    </div>
                    <SettingsButton
                      label="Invite member"
                      className={styles.SettingsButton}
                      onClick={() => {
                        this.showInviteMenu();
                      }}
                    />
                  </div>
                  <div className={styles.MemberTable}>
                    <div className={`${styles.MemberTableRow}`}>
                      <div className={styles.MemberTableHead}>User</div>
                      <div className={styles.MemberTableHead}>Role</div>
                      <div className={styles.MemberTableHead}>Options</div>
                    </div>
                    <div className={styles.MemberBody}>
                      {project_users?.map((entry, index) => (
                        <div className={styles.MemberTableRow} key={index}>
                          <div className={styles.MemberTableCell}>
                            <div className={styles.NameSecting}>
                              <Avatar
                                name={entry.user.name}
                                className={styles.MemberAvatar}
                              />
                              <div className={styles.MemberNameEmail}>
                                <div>{entry.user.name}</div>
                                <div>{entry.user.email}</div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.MemberTableCell}>
                            {updateRoleValue(entry.role.split("."))}
                          </div>
                          <div className={styles.MemberTableCell}>
                            <div
                              onClick={(e) => {
                                console.log(entry.user.email);
                                this.showMenu(entry.user.email);
                                this.handleClick(e);
                              }}
                            >
                              <MoreIcon className={styles.MoreIcon} />
                              {/* options to be determined per user*/}
                              {actionsMenu && entry.user.email === email && (
                                <div className={styles.BelowHeader}>
                                  <div className={styles.contextMenu}>
                                    <div
                                      className={styles.DropDownLink}
                                      role="presentation"
                                    >
                                      Change role
                                    </div>
                                    <div
                                      className={styles.DropDownLink}
                                      role="presentation"
                                      onClick={(e) =>
                                        this.removeProjectMember(e)
                                      }
                                    >
                                      Remove member
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

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
                        className={styles.SettingsButtonUpdate}
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
                        className={styles.DeleteBtn}
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
                              style={styles.TextArea}
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
              {showInviteModel === true && (
                <div className={styles.ProjectDeleteModel}>
                  <Modal
                    showModal={showInviteModel}
                    onClickAway={this.hideInviteMenu}
                  >
                    <div>
                      <div className={styles.ModelHeader}>Invite Member </div>
                      <div className={styles.UpdateForm}>
                        <div className={styles.UpdateInputSection}>
                          <div className={styles.DeleteDescription}>
                            Search member (by email)
                          </div>
                          <BlackInputText
                            placeholder="khalifan@gmail.com"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          />
                        </div>
                        <div className={styles.UpdateInputSection}>
                          <div className={styles.DeleteDescription}>
                            Member Role (in connection with user permission)
                          </div>
                          <Select
                            required
                            placeholder={role ? role : "Choose membership role"}
                            options={roles}
                            onChange={this.handleInvitationRole}
                          />
                        </div>
                        {(errorMessage || error) && (
                          <Feedback
                            type="error"
                            message={
                              errorMessage ? "Failed to send invitation" : error
                            }
                          />
                        )}
                        <div className={styles.SendInvitationButton}>
                          <PrimaryButton
                            label={isSending ? <Spinner /> : "Send Invitation"}
                            className={styles.BlueBtn}
                            onClick={this.handleMemberInvitation}
                          />
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
  isSending: PropTypes.bool,
  isSent: PropTypes.bool,
  isRemoving: PropTypes.bool,
  isRemoved: PropTypes.bool,
  clearRemovingMembersState: PropTypes.func.isRequired,
};

ProjectSettingsPage.defaultProps = {
  message: "",
  isUpdated: false,
  isDeleted: false,
  name: "",
  description: "",
  isUpdating: false,
  isSending: false,
  isSent: false,
  isRemoving: false,
  isRemoved: false,
};

export const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, clearDeleteProjectState, message } =
    state.deleteProjectReducer;

  const { projectMembers } = state.projectMembersReducer;
  const { data } = state.user;
  const { invitation, isSending, isSent, clearInvitingMembersState } =
    state.inviteMembersReducer;

  const { member, isRemoving, isRemoved, clearRemovingMembersState } =
    state.removeMemberReducer;

  const { isUpdated, isUpdating, errorMessage, clearUpdateProjectState } =
    state.updateProjectReducer;
  return {
    data,
    isUpdated,
    isUpdating,
    message,
    isDeleting,
    isSending,
    isSent,
    isRemoving,
    isRemoved,
    isFailed,
    isDeleted,
    errorMessage,
    clearInvitingMembersState,
    clearDeleteProjectState,
    clearUpdateProjectState,
    clearRemovingMembersState,
    projectMembers,
    invitation,
    member,
  };
};

const mapDispatchToProps = {
  deleteProject,
  updateProject,
  getProjectMembers,
  inviteMembers,
  removeMember,
  clearInvitingMembersState,
  clearDeleteProjectState,
  clearUpdateProjectState,
  clearRemovingMembersState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettingsPage);
