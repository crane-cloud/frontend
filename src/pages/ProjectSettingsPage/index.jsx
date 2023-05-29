import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
  handlePatchRequest,
  handleDeleteRequest,
} from "../../apis/apis.js";
import Spinner from "../../components/Spinner";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import TextArea from "../../components/TextArea";
import Feedback from "../../components/Feedback";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import DeleteWarning from "../../components/DeleteWarning";
import BlackInputText from "../../components/BlackInputText";
import styles from "./ProjectSettingsPage.module.css";
import "./ProjectSettingsPage.module.css";
import Select from "../../components/Select";
import { retrieveProjectTypes } from "../../helpers/projecttypes";
import { validateName } from "../../helpers/validation";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { retrieveMembershipRoles } from "../../helpers/membershipRoles";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
// import "./../../components/DBSettingsPage/DBSettingsPage.css"

class ProjectSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };
    const userToken = localStorage.getItem("token", null);
    const { name, description, organisation, project_type } =
      projectInfo;
    this.state = {
      openUpdateAlert: false,
      openRoleUpdateAlert: false,
      openDeleteAlert: false,
      openDropDown: false,
      userToken: userToken,
      projectName: name ? name : "",
      projectID: this.props.match.params.projectID,
      projectDescription: description ? description : "",
      error: "",
      updatingProjectDetails:false,
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
      removeMemberModal: false,
      isCurrentUserRemoved: false,
      projectUsers: [],
      fetchingProjectMembersError: "",
      projectUnregisteredUsers: [],
      fetchingProjectMembers: true,
      invitingMembers: false,
      invitingMembersError: "",
      updateMemberError: "",
      updatingMemberRole: false,
      removeMemberError: "",
      removingMember: false,
      currentUserIsAdminOrMember: false,
      currentUserIsAdminOrOwner: false,
      currentUserIsMemberOnly: false,
      deleteProjectError: "",
      deletingProject: false,
      disableProjectError: "",
      disablingProject: false,
      openDisableProjectModel: false
    };

    this.handleDeleteProject = this.handleDeleteProject.bind(this);
    this.showUpdateAlert = this.showUpdateAlert.bind(this);
    this.updateRoleAlert = this.updateRoleAlert.bind(this);
    this.hideUpdateAlert = this.hideUpdateAlert.bind(this);
    this.hideRoleUpdateAlert = this.hideRoleUpdateAlert.bind(this);
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
    this.handleMemberRoleUpdate = this.handleMemberRoleUpdate.bind(this);
    this.handleInvitationRole = this.handleInvitationRole.bind(this);
    this.hideInviteMenu = this.hideInviteMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.removeProjectMember = this.removeProjectMember.bind(this);
    this.checkMembership = this.checkMembership.bind(this);
    this.updateRoleValue = this.updateRoleValue.bind(this);
    this.showRemoveMemberModal = this.showRemoveMemberModal.bind(this);
    this.closeRemoveMemberModal = this.closeRemoveMemberModal.bind(this);
    this.getProjectMemberz = this.getProjectMemberz.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
    this.updateMemberRoles = this.updateMemberRoles.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.updateProjectDetails = this.updateProjectDetails.bind(this);
    this.deleteThisProject = this.deleteThisProject.bind(this);
    this.handleDisableProject = this.handleDisableProject.bind(this);
  }

  componentDidMount() {
    this.getProjectMemberz();
  }

  getProjectMemberz() {
    const projectID = this.props.match.params.projectID;
    handleGetRequest(`/projects/${projectID}/users`)
      .then((response) => {
        this.setState({
          projectUsers: response.data.data.project_users,
          projectUnregisteredUsers: response.data.data.project_anonymous_users,
          fetchingProjectMembers: false,
        });
        this.checkMembership();
      })
      .catch((error) => {
        this.setState({
          fetchingProjectMembersError: "Failed to fetch project members",
          fetchingProjectMembers: false,
        });
      });
  }

  inviteMember() {
    const { email, role } = this.state;
    this.setState({
      invitingMembers: true,
    });
    const projectID = this.props.match.params.projectID;
    handlePostRequestWithOutDataObject(
      { email: email, role: role },
      `/projects/${projectID}/users`
    )
      .then(() => {
        //page reset also resets loader
        window.location.href = `/projects/${projectID}/settings`;
      })
      .catch((error) => {
        this.setState({
          invitingMembersError: "Failed to invite user",
          invitingMembers: false,
        });
      });
  }

  updateMemberRoles() {
    const { email, role } = this.state;
    this.setState({
      updatingMemberRole: true,
    });
    const projectID = this.props.match.params.projectID;
    handlePatchRequest(`/projects/${projectID}/users`, {
      email,
      role,
    })
      .then(() => {
        window.location.href = `/projects/${projectID}/settings`;
      })
      .catch((error) => {
        this.setState({
          updateMemberError: "Failed to update user",
          updatingMemberRole: false,
        });
      });
  }

  removeMember(email) {
    const projectID = this.props.match.params.projectID;
    const data = { data: email };
    this.setState({ removingMember: true });
    handleDeleteRequest(`/projects/${projectID}/users`, data)
      .then(() => {
        window.location.href = `/projects/${projectID}/settings`;
      })
      .catch(() => {
        this.setState({
          removeMemberError: "Failed to remove user",
          removingMember: false,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
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

  showRemoveMemberModal(email) {
    this.setState({
      removeMemberModal: true,
      removeMemberError: "",
      email: email,
    });
  }

  closeRemoveMemberModal() {
    this.setState({
      removeMemberModal: false,
    });
  }

  removeProjectMember(e) {
    e.preventDefault();
    const { data } = this.props;
    const { email } = this.state;
    const emailDetails = {
      email: email,
    };
    this.removeMember(emailDetails);
    if (email === data.email) {
      this.setState({
        isCurrentUserRemoved: true,
      });
    }
  }

  handleMemberInvitation(e) {
    e.preventDefault();
    const { email, role } = this.state;
    if (email !== "" && role !== "") {
      this.validateEmail(email);
      this.inviteMember();
    }
  }

  handleMemberRoleUpdate(e) {
    e.preventDefault();
    const { email, role } = this.state;
    if (email !== "" && role !== "") {
      this.validateEmail(email);
      this.updateMemberRoles();
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

    this.setState({
      [e.target.name]: e.target.value,
    });
    if (error) {
      this.setState({
        error: "",
      });
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
    this.setState({ showInviteModel: true, invitingMembersError: "" });
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
              //updateProject(projectID, newProject);
              this.updateProjectDetails(projectID, newProject)
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
            //updateProject(projectID, newProject);
           this.updateProjectDetails(projectID, newProject)
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
    // const { deleteProject } = this.props;
    e.preventDefault();
     this.deleteThisProject(projectID)
  }

  handleDisableProject(e,disabled) {
    // /projects/d1e9954c-7a3b-437f-8611-9c0045815afe/disable
    e.preventDefault();
    this.setState({
      disablingProject: true,
    });
    const projectID = this.props.match.params.projectID;
    let apiEndpoint
    if(disabled){
      apiEndpoint = `/projects/${projectID}/enable`;
    }else{
      apiEndpoint = `/projects/${projectID}/disable`;
    }
    handlePostRequestWithOutDataObject(
      {},
      apiEndpoint
    ).then(() => {
        //reset to projects page to re populate redux
        window.location.href = `/projects`;
      })
      .catch((error) => {
        this.setState({
          disableProjectError: "Process failed, please try again.",
          disablingProject: false,
        });
      });
    
  }

  showUpdateAlert() {
    this.setState({ openUpdateAlert: true });
  }

  updateRoleAlert(email) {
    this.setState({
      openRoleUpdateAlert: true,
      email: email,
    });
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

  hideRoleUpdateAlert() {
    this.setState({ openRoleUpdateAlert: false });
  }

  hideDeleteAlert() {
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

  checkMembership() {
    const { data } = this.props;
    const { projectUsers } = this.state;
    const result = projectUsers?.filter((item) => item.user?.id === data.id);
    //either member or admin
    if (
      result[0]?.role === "RolesList.member" ||
      result[0]?.role === "RolesList.admin"
    ) {
      this.setState({ currentUserIsAdminOrMember: true });
    }
    //either owner or admin
    if (
      result[0]?.role === "RolesList.owner" ||
      result[0]?.role === "RolesList.admin"
    ) {
      this.setState({ currentUserIsAdminOrOwner: true });
    }
    if (result[0]?.role === "RolesList.member") {
      this.setState({ currentUserIsMemberOnly: true });
    }
  }

  updateRoleValue(string) {
    let role = string[1];
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  renderRedirect = () => {
    const { isDeleted, isUpdated } = this.props;
    const { isCurrentUserRemoved } = this.state;
    if (isDeleted || isUpdated || isCurrentUserRemoved) {
      return <Redirect to={`/projects`} noThrow />;
    }
  };
  updateProjectDetails(projectID, data) {
    this.setState({
      updatingProjectDetails: true,
    });
    handlePatchRequest(`/projects/${projectID}`, 
    data)
      .then(() => {
        window.location.href = `/projects`;
      })
      .catch((error) => {
        this.setState({
          error: "Failed to update project",
          updatingProjectDetails: false,
        });
      });
  }

  deleteThisProject(projectID){
    this.setState({ deletingProject: true, deleteProjectError:"" });
    handleDeleteRequest(`/projects/${projectID}`,{})
      .then(() => {
        window.location.href = `/projects`;
      })
      .catch(() => {
        this.setState({
          deleteProjectError: "Failed to delete this project",
          deletingProject: false,
        })
      });
  }

  render() {
    const {
      match: { params },
      isDeleted,
      isUpdated,
      errorMessage,
      data,
    } = this.props;

    const projectInfo = { ...JSON.parse(localStorage.getItem("project")) };

    let currentUserEmail = data.email;

    const { name,disabled } = projectInfo;

    const {
      openUpdateAlert,
      openDeleteAlert,
      openRoleUpdateAlert,
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
      currentUserIsAdminOrMember,
      removeMemberModal,
      projectUsers,
      projectUnregisteredUsers,
      currentUserIsAdminOrOwner,
      currentUserIsMemberOnly,
      fetchingProjectMembers,
      invitingMembers,
      invitingMembersError,
      updateMemberError,
      updatingMemberRole,
      removingMember,
      removeMemberError,
      updatingProjectDetails,
      deletingProject,
      deleteProjectError,
      disableProjectError,
      disablingProject,
      openDisableProjectModel
    } = this.state;
    const types = retrieveProjectTypes();
    const roles = retrieveMembershipRoles();

    const { projectID } = params;

    return (
      <DashboardLayout name={name} header="Project Settings" short>
        {isUpdated || isDeleted ? this.renderRedirect() : null}
        <div className="SectionTitle">Project Details</div>
        <div className={styles.ProjectInstructions}>
          <div>
            <div className="SectionSubTitle">Project ID</div>
            <div className={styles.ProjectButtonRow}>
              <div className={styles.SettingsSectionInfo}>
                <div>{projectID}</div>
              </div>
              <div className={styles.CopyIcon}>
                <CopyText onClick={this.projectIDOnClick} />
                {idChecked ? <Checked /> : null}
              </div>
            </div>
          </div>
          <div>
            <div className="SectionSubTitle">Project Name</div>
            <div className={styles.ProjectButtonRow}>
              <div className={styles.SettingsSectionInfo}>
                <div>{projectName}</div>
              </div>
              <div className={styles.CopyIcon}>
                <CopyText onClick={this.nameOnClick} />
                {nameChecked ? <Checked /> : null}
              </div>
            </div>
          </div>
          <div>
            <div className="SectionSubTitle">Project Description</div>
            <div className={styles.ProjectButtonRow}>
              <div className={styles.SettingsSectionInfo}>
                <div>{projectDescription}</div>
              </div>
              <div className={styles.CopyIcon}>
                <CopyText onClick={this.projectDescriptionOnClick} />
                {descriptionChecked ? <Checked /> : null}
              </div>
            </div>
          </div>
          <div>
            <div className="SectionSubTitle">Project Status</div>
            <div className={styles.ProjectButtonRow}>
              <div className={styles.SettingsSectionInfo}>
                <div>{disabled === true ? <span style={{color:'red'}}>Disabled</span>:"Enabled"}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="SectionSubTitle">User Token</div>
            <div className={styles.ProjectButtonRow}>
              <div className={styles.SettingsSectionInfo}>
                <div className={styles.TokenItem}>{userToken}</div>
              </div>
              <div className={styles.CopyIcon}>
                <CopyText onClick={this.userTokenOnClick} />
                {tokenChecked ? <Checked /> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="SectionTitle">Membership</div>
        <div className={styles.ProjectInstructions}>
          {fetchingProjectMembers ? (
            <Spinner />
          ) : (
            <>
              <div className={styles.MembershipHeader}>
                <div className={styles.MemberSection}>
                  <div className={styles.SettingsSectionInfoHeader}>
                    {projectUsers?.length === 1 ? (
                      <div className="SectionSubTitle">
                        Project has 1 Team Member
                      </div>
                    ) : (
                      <div>Project has {projectUsers?.length} Team Members</div>
                    )}
                  </div>
                  <div className="SubText">
                    Members that have accounts on crane cloud can perform
                    different operations on the project depending on their
                    permission.
                  </div>
                </div>
                {currentUserIsAdminOrOwner && (
                  <PrimaryButton
                    // className={styles.SettingsButton}
                    color="primary-outline"
                    onClick={() => {
                      this.showInviteMenu();
                    }}
                  >
                    Invite member
                  </PrimaryButton>
                )}
              </div>
              <div className={styles.MemberTable}>
                <div className={styles.MemberBody}>
                  {projectUsers?.map((entry, index) => (
                    <div className={styles.MemberTableRow} key={index}>
                      <div className={styles.MemberInfo}>
                        <Avatar
                          name={entry.user.name}
                          className={styles.MemberAvatar}
                        />
                        <div className={styles.MemberNameEmail}>
                          <div className={styles.UserHeader}>
                            {entry.user.name}
                          </div>
                          <div className={styles.Wrap}>{entry.user.email}</div>
                        </div>
                      </div>
                      {entry.role !== "RolesList.owner" &&
                        entry.accepted_collaboration_invite === false && (
                          <div className="SubText">Pending Invitation</div>
                        )}
                      <div className={styles.MemberOptions}>
                        <div
                          className={styles.MemberRole}
                          onClick={() => {
                            !currentUserIsMemberOnly &&
                              this.updateRoleAlert(entry.user.email);
                          }}
                          title="Change Role"
                        >
                          <span>Role:</span>
                          {this.updateRoleValue(entry.role.split("."))}
                        </div>
                        <div>
                          {entry.user.email === currentUserEmail
                            ? entry.role !== "RolesList.owner" && (
                                <PrimaryButton
                                  small
                                  noPadding
                                  transparent
                                  onClick={() => {
                                    this.showRemoveMemberModal(
                                      entry.user.email
                                    );
                                  }}
                                >
                                  Leave
                                </PrimaryButton>
                              )
                            : currentUserIsAdminOrOwner && (
                                <PrimaryButton
                                  small
                                  noPadding
                                  transparent
                                  onClick={() => {
                                    this.showRemoveMemberModal(
                                      entry.user.email
                                    );
                                  }}
                                >
                                  Remove
                                </PrimaryButton>
                              )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {projectUnregisteredUsers.length > 0 && (
                <div className={styles.LowerSection}>
                  <div className={styles.SettingsSectionInfoHeader}>
                    Unregistered Members
                  </div>
                  <div className={styles.MemberDescription}>
                    Members invited to this project by email but have no crane
                    cloud accounts.
                  </div>
                  <div className={`${styles.MemberTable}`}>
                    <div className={`${styles.MemberTableRowUnregistered}`}>
                      <div className={styles.MemberTableHead}>User</div>
                      <div className={styles.MemberTableHead}>Role</div>
                      <div className={styles.MemberTableHead}>Options</div>
                    </div>
                    <div className={styles.MemberBody}>
                      {projectUnregisteredUsers?.map((entry, index) => (
                        <div
                          className={styles.MemberTableRowUnregistered}
                          key={index}
                        >
                          <div className={styles.MemberTableCell}>
                            <div className={styles.NameSecting}>
                              <Avatar
                                name={entry.email}
                                className={styles.MemberAvatar}
                              />
                              <div className={styles.MemberNameEmail}>
                                <div className={styles.Wrap}>{entry.email}</div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.MemberTableCell}>
                            {entry.role}
                          </div>
                          <div className={styles.MemberTableCell}>
                            <div
                              onClick={(e) => {
                                this.showMenu(entry.email);
                                this.handleClick(e);
                              }}
                            >
                              <MoreIcon className={styles.MoreIcon} />
                              {/* options to be determined per user*/}
                              {actionsMenu && entry.email === email && (
                                <>
                                  <div className={styles.BelowHeader}>
                                    <div className={styles.contextMenu}>
                                      <div
                                        className={styles.DropDownLink}
                                        role="presentation"
                                        onClick={() => {}}
                                      >
                                        Remove Member
                                      </div>
                                      <div
                                        className={styles.DropDownLink}
                                        role="presentation"
                                        onClick={() => {}}
                                      >
                                        Resend Invite
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {openRoleUpdateAlert && (
          <div className={styles.ProjectDeleteModel}>
            <Modal
              showModal={openRoleUpdateAlert}
              onClickAway={this.hideRoleUpdateAlert}
            >
              <div>
                <div className={styles.ModelHeader}>Change Member Role</div>
                <div className={styles.UpdateForm}>
                  <div className={styles.UpdateInputSection}>
                    <div className={styles.DeleteDescription}>
                      Search member (by email)
                    </div>
                    <BlackInputText
                      placeholder="Enter email here"
                      name="email"
                      value={email}
                      // should not be editable
                      // onChange={(e) => {
                      //   this.handleChange(e);
                      // }}
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
                  {updateMemberError && (
                    <Feedback message={updateMemberError} type="error" />
                  )}
                  <div className={styles.SendInvitationButton}>
                    <PrimaryButton
                      onClick={this.handleMemberRoleUpdate}
                      color="primary"
                    >
                      {updatingMemberRole ? <Spinner /> : "Update Role"}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
        {currentUserIsAdminOrMember === false ? (
          <>
            <div className="SectionTitle">Danger Zone</div>
            <div className={styles.ProjectInstructions}>
              <div className={styles.MemberBody}>
                <div className={styles.MemberTableRow}>
                  <div className={styles.SettingsSectionInfo}>
                    <div className="SubTitle">Update project</div>
                    <div>Modify the project name and description</div>
                  </div>
                  <div className={styles.SectionButtons}>
                    <PrimaryButton
                      onClick={this.showUpdateAlert}
                      small
                      color="primary"
                    >
                      Update
                    </PrimaryButton>
                  </div>
                </div>
                <div className={styles.MemberTableRow}>
                  <div className={styles.SettingsSectionInfo}>
                    <div className="SubTitle">{disabled ? "Enable" :"Disable"} project</div>
                    <div>
                      {disabled?"Allow access to project resources and enable billing":
                      "Prevent project from being billed by blocking access to it's resources."}
                    </div>
                  </div>
                  <div className={styles.SectionButtons}>
                    <PrimaryButton
                      onClick={()=>{this.setState({openDisableProjectModel:true})}}
                      small
                      color={disabled?"primary":"red"}
                    >
                    {disabled?"Enable":"Disable"}
                    </PrimaryButton>
                  </div>
                </div>
                <div className={styles.MemberTableRow}>
                  <div className={styles.SettingsSectionInfo}>
                    <div className="SubTitle">Delete project</div>
                    <div>
                      Take down your entire project, delete all apps under it.
                    </div>
                  </div>
                  <div className={styles.SectionButtons}>
                    <PrimaryButton
                      onClick={this.showDeleteAlert}
                      small
                      color="red"
                    >
                      Delete
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

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
                          projectType ? projectType : "Update project type"
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
                          errorMessage ? "Failed to update Project" : error
                        }
                      />
                    )}
                    <div className={styles.UpdateProjectModelButtons}>
                      <PrimaryButton
                        className="CancelBtn"
                        onClick={this.hideUpdateAlert}
                      >
                        Cancel
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={this.handleSubmit}
                        color="primary"
                      >
                        {updatingProjectDetails ? <Spinner /> : "update project"}
                      </PrimaryButton>
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
                      placeholder="Enter email here"
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
                  {invitingMembersError && (
                    <Feedback type="error" message={invitingMembersError} />
                  )}
                  <div className={styles.SendInvitationButton}>
                    <PrimaryButton
                      color="primary"
                      onClick={this.handleMemberInvitation}
                    >
                      {invitingMembers ? <Spinner /> : "Send Invitation"}
                    </PrimaryButton>
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
                      <b className={styles.DeleteWarning}>{name}</b> &nbsp;
                      below.
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
                      className="CancelBtn"
                      onClick={this.hideDeleteAlert}
                    >
                      Cancel
                    </PrimaryButton>
                    <button
                      className={
                        disableDelete ? styles.InactiveDelete : styles.DeleteBtn
                      }
                      disabled={disableDelete}
                      onClick={(e) =>
                        this.handleDeleteProject(e, params.projectID)
                      }
                    >
                      {deletingProject ? <Spinner /> : "Delete"}
                    </button>
                  </div>

                  {deleteProjectError && (
                    <Feedback message={deleteProjectError} type="error" />
                  )}
                </div>
              </div>
            </Modal>
          </div>
        )}
        {openDisableProjectModel && (
          <div className={styles.ProjectDeleteModel}>
            <Modal
              showModal={openDisableProjectModel}
              onClickAway={()=>{this.setState({openDisableProjectModel:false})}}
            >
              <div className={styles.DeleteProjectModel}>
                <div className={styles.DeleteProjectModalUpperSection}>
                  <div className={styles.WarningContainer}>
                    <div className={styles.DeleteDescription}>
                      Are you sure you want to {disabled?"enable":"disable"}&nbsp;
                      <span>{name}</span>
                      &nbsp;?
                    </div>
                    <div className={styles.DisableSubDescription}>
                      This will {disabled? "enable" :"disable"}  billing and external access of resources in this project.
                    </div>
                  </div>
                </div>
                <div className={styles.DeleteProjectModalLowerSection}>
                  <div className={styles.DeleteProjectModelButtons}>
                    <PrimaryButton
                      className="CancelBtn"
                      onClick={()=>{this.setState({openDisableProjectModel:false})}}
                    >
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton
                      color={disabled?"primary":"red"}
                      onClick={(e) =>
                        this.handleDisableProject(e, disabled)
                      }
                    >
                      {disablingProject ? <Spinner /> : disabled===true ? "Enable" :"Disable"}
                    </PrimaryButton>
                  </div>

                  {disableProjectError && (
                    <Feedback message={disableProjectError} type="error" />
                  )}
                </div>
              </div>
            </Modal>
          </div>
        )}

        <Modal
          showModal={removeMemberModal}
          onClickAway={this.closeRemoveMemberModal}
        >
          <div className={styles.DeleteProjectModel}>
            <div className={styles.DeleteProjectModalUpperSection}>
              <div className={styles.WarningContainer}>
                <div className={styles.DeleteDescription}>
                  {currentUserEmail === email ? (
                    <>Are you sure you want to remove yourself?</>
                  ) : (
                    <>
                      Are you sure you want to remove the member with
                      <br /> email: {email}?
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.DeleteProjectModalLowerSection}>
              <div className={styles.DeleteProjectModelButtons}>
                <PrimaryButton
                  type="button"
                  className="CancelBtn"
                  onClick={this.closeRemoveMemberModal}
                >
                  Cancel
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  color="red"
                  onClick={(e) => this.removeProjectMember(e)}
                >
                  {removingMember ? <Spinner /> : "Confirm"}
                </PrimaryButton>
              </div>
            </div>
            {removeMemberError && (
              <Feedback type="error" message={"Failed to remove member"} />
            )}
          </div>
        </Modal>
      </DashboardLayout>
    );
  }
}

ProjectSettingsPage.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

ProjectSettingsPage.defaultProps = {
  message: "",
  name: "",
  description: "",
};

export const mapStateToProps = (state) => {


  const { data } = state.user;

 
  return {
    data,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSettingsPage);
