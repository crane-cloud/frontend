import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InformationBar from "../InformationBar";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import Modal from "../Modal";
import SideBar from "../SideBar";
import Feedback from "../Feedback";
import DeleteWarning from "../DeleteWarning";
import deleteDatabase, {
  clearDeleteDatabaseState,
} from "../../redux/actions/deleteDatabase";
import resetDatabase, {
  clearDatabaseResetState,
} from "../../redux/actions/resetDatabase";
import updateDatabasePassword, {
  clearUpdateDatabasePasswordState,
} from "../../redux/actions/updateDBPassword";
import getProjectDatabases from "../../redux/actions/databaseList";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as Open } from "../../assets/images/open.svg";
import { ReactComponent as Closed } from "../../assets/images/close.svg";
import BlackInputText from "../BlackInputText";
import "./DBSettingsPage.css";

class DBSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteAlert: false,
      openResetAlert: false,
      error: "",
      hidden: true,
      nameChecked: false,
      portChecked: false,
      userChecked: false,
      hostChecked: false,
      uriChecked: false,
      passwordChecked: false,
      openUpdateModal: false,
      newDatabasePassword: "",
      confirmNewDatabasePassword: "",
    };

    this.handleDeleteDatabase = this.handleDeleteDatabase.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleResetDatabase = this.handleResetDatabase.bind(this);
    this.showResetAlert = this.showResetAlert.bind(this);
    this.hideResetAlert = this.hideResetAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.nameOnClick = this.nameOnClick.bind(this);
    this.portOnClick = this.portOnClick.bind(this);
    this.userOnClick = this.userOnClick.bind(this);
    this.hostOnClick = this.hostOnClick.bind(this);
    this.uriOnClick = this.uriOnClick.bind(this);
    this.uriCopyPostgresOnClick = this.uriCopyPostgresOnClick.bind(this);
    this.passwordOnClick = this.passwordOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.renderUpdateRedirect = this.renderUpdateRedirect.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
  }
  componentDidMount() {
    const {
      clearDatabaseResetState,
      getProjectDatabases,
     } = this.props;
    const { projectID } = this.props.match.params;
    clearDatabaseResetState();
    getProjectDatabases(projectID);
  }

  componentDidUpdate(prevProps) {
    const { dbDeleteMessage, isReset, dbPasswordUpdated } = this.props;

    if (dbDeleteMessage !== prevProps.dbDeleteMessage) {
      this.hideDeleteAlert();
    }

    if (isReset !== prevProps.isReset) {
      this.hideResetAlert();
    }

    if (dbPasswordUpdated !== prevProps.dbPasswordUpdated) {
      this.hideUpdateModal();
    }
  }

  getDatabaseInfo(id) {
    const { databases } = this.props;
    const found = databases.find((database) => database.id === id);
    const info = {
      flavor: found.database_flavour_name,
      name: found.name,
      user: found.user,
      host: found.host,
      dbID: found.id,
      port: found.port,
      password: found.password,
      age: found.age,
    };

    return info;
  }

  handleDeleteDatabase(e, projectID, databaseID) {
    const { deleteDatabase } = this.props;
    e.preventDefault();
    deleteDatabase(projectID, databaseID);
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearDeleteDatabaseState } = this.props;
    clearDeleteDatabaseState();
    this.setState({ openDeleteAlert: false });
  }

  handleResetDatabase(e, projectID, databaseID) {
    const { resetDatabase } = this.props;
    e.preventDefault();
    resetDatabase(projectID, databaseID);
  }

  showResetAlert() {
    this.setState({ openResetAlert: true });
  }

  hideResetAlert() {
    this.setState({ openResetAlert: false });
  }

  // show update modal
  showUpdateModal() {
    this.setState({ openUpdateModal: true });
  }

  // hide update modal
  hideUpdateModal() {
    const { clearUpdateDatabasePasswordState } = this.props;
    clearUpdateDatabasePasswordState();
    this.setState({ openUpdateModal: false });
    this.setState({ newDatabasePassword: "" });
    this.setState({confirmNewDatabasePassword: "" });
  }

  // handle input onchange
  handleChange(e) {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (error) {
      this.setState({ error: "" });
    }
  }

  renderRedirect = () => {
    const { dbDeleteMessage } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (dbDeleteMessage === "Database Deleted Successfully") {
      this.hideDeleteAlert();
      return (
        <Redirect
          to={`/users/${userID}/projects/${projectID}/databases`}
          noThrow
        />
      );
    }
  };

  renderUpdateRedirect = () => {
    const { dpPasswordUpdated, getProjectDatabases } = this.props;
    const { userID, projectID, databaseID } = this.props.match.params;
    getProjectDatabases(projectID);
    if (dpPasswordUpdated) {
      return (
        <Redirect
          to={`/users/${userID}/projects/${projectID}/databases/${databaseID}/settings`}
          noThrow
        />
      );
    }
  };

  togglePassword() {
    this.setState({ hidden: !this.state.hidden });
  }

  nameOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.name);
    this.setState({ nameChecked: true });
  }
  portOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.port);
    this.setState({ portChecked: true });
  }
  hostOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.host);
    this.setState({ hostChecked: true });
  }
  userOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.user);
    this.setState({ userChecked: true });
  }
  uriOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(
      `${`mysql -u ${dbInfo.user} -p -P ${dbInfo.port} -h ${dbInfo.host} -D ${dbInfo.name}`}`
    );
    this.setState({ uriChecked: true });
  }

  uriCopyPostgresOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(
      `${`psql -h ${dbInfo.host} -p ${dbInfo.port} -d ${dbInfo.name} -U ${dbInfo.user} -W`}`
    );
    this.setState({ uriChecked: true });
  }

  passwordOnClick() {
    const { databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    navigator.clipboard.writeText(dbInfo.password);
    this.setState({ passwordChecked: true });
  }

  // handle submit for update modal
  handleSubmitUpdate() {
    
    const {
      updateDatabasePassword,
      match: {
        params: { projectID, databaseID },
      },
    } = this.props;

    const { newDatabasePassword, confirmNewDatabasePassword } = this.state;
    
    if (!newDatabasePassword || newDatabasePassword.length > 32) {
      this.setState({
        error: "Password should be at most 32 characters.",
      });
    } else if(newDatabasePassword !== confirmNewDatabasePassword) {
      this.setState({
        error: "The passwords do not match!",
      });
    } else if (newDatabasePassword.length < 8) {
      this.setState({
        error: "Password has to be more than 8 characters.",
      });
    } else {
      const newPassword = {
        password: newDatabasePassword,
      };
      
      updateDatabasePassword(projectID, databaseID, newPassword);
    }
  }
  getProjectName(projects, id) {
    const project = projects.find((project) => project.id === id);
    return project.name;
  }

  render() {
    const {
      dbDeleteMessage,
      deletingDatabase,
      databaseDeleteFailed,
      isReset,
      isReseting,
      resetMessage,
      dbPasswordUpdated,
      updatingDBPassword,
      errorMessage,
      projects,
    } = this.props;
    const { userID, projectID, databaseID } = this.props.match.params;
    const dbInfo = this.getDatabaseInfo(databaseID);
    const {
      openDeleteAlert,
      openResetAlert,
      hidden,
      nameChecked,
      portChecked,
      hostChecked,
      userChecked,
      uriChecked,
      passwordChecked,
      openUpdateModal,
      newDatabasePassword,
      confirmNewDatabasePassword,
      error,
    } = this.state;
    return (
      <div className="Page">
        {dbDeleteMessage === "Database Deleted Successfully"
          ? this.renderRedirect()
          : null}
        {dbPasswordUpdated ? this.renderUpdateRedirect() : null}
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={this.getProjectName(projects, projectID)}
              params={this.props.match.params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/metrics`}
              cpuLink={`/users/${userID}/projects/${projectID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Settings" />
            </div>
            <div className="ContentSection">
              <div>
                <div className="DatabaseDetail">
                  <div className="DBDetailRow">
                    <div className="DBThead">Type</div>
                    <div className="DBTDetail uppercase">{dbInfo.flavor}</div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Name</div>
                    <div className="DBTDetail">{dbInfo.name}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.nameOnClick} />
                      {nameChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">User</div>
                    <div className="DBTDetail">{dbInfo.user}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.userOnClick} />
                      {userChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBColumn1 DBThead">Password</div>
                    <div className="DBColumn">
                      {hidden ? "***************************" : dbInfo.password}
                    </div>
                    <div className="DBIcon">
                      <CopyText onClick={this.passwordOnClick} />
                      {passwordChecked ? <Checked /> : null}
                    </div>
                    <div className="DBPassword">
                      <div onClick={this.togglePassword}>
                        {hidden ? <Open /> : <Closed />}
                      </div>
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Host</div>
                    <div className="DBTDetail">{dbInfo.host}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.hostOnClick} />
                      {hostChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Port</div>
                    <div className="DBTDetail">{dbInfo.port}</div>
                    <div className="DBIcon">
                      <CopyText onClick={this.portOnClick} />
                      {portChecked ? <Checked /> : null}
                    </div>
                  </div>
                  <div className="DBDetailRow">
                    <div className="DBThead">Created</div>
                    <div className="DBTDetail">{dbInfo.age}</div>
                  </div>
                </div>
              </div>

              {dbInfo.flavor === "mysql" ? (
                <div className="DBInstructions">
                  <div className="DBInfoTop">
                    <div>
                      Connecting to the database. Read{" "}
                      <a
                        href="https://medium.com/cranecloud/connecting-to-a-remote-mysql-database-a6b3cc15c40b"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="MysqlArticle"
                      >
                        this article
                      </a>
                      , for a more comprehensive guide.
                    </div>
                  </div>
                  <div className="DBInfoBottom">
                    <div className="DBAccessInfo">{`mysql -u ${dbInfo.user} -p -P ${dbInfo.port} -h ${dbInfo.host} -D ${dbInfo.name}`}</div>
                    <div className="DBAccessCopy">
                      <div className="DBPassword">
                        <CopyText onClick={this.uriOnClick} />
                        {uriChecked ? <Checked /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="DBInstructions">
                  <div className="DBInfoTop">
                    <div>
                      Connecting to the database. Read{" "}
                      <a
                        href="https://medium.com/cranecloud/connecting-to-a-remote-postgresql-database-779637147abf"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="MysqlArticle"
                      >
                        this article
                      </a>
                      , for a more comprehensive guide.
                    </div>
                  </div>
                  <div className="DBInfoBottom">
                    <div className="DBAccessInfo">{`psql -h ${dbInfo.host} -p ${dbInfo.port} -d ${dbInfo.name} -U ${dbInfo.user} -W`}</div>
                    <div className="DBAccessCopy">
                      <div className="DBPassword">
                        <CopyText onClick={this.uriCopyPostgresOnClick} />
                        {uriChecked ? <Checked /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="DBButtons">
                <div className="DBButtonRow">
                  <PrimaryButton
                    label="Update Password"
                    className="ResetBtn DB-Btn"
                    onClick={this.showUpdateModal}
                  />
                  <div className="buttonText">
                    Changes or updates database password.
                  </div>
                </div>
                {openUpdateModal && (
                  <div className="ProjectDeleteModel">
                    <Modal
                      showModal={openUpdateModal}
                      onClickAway={this.hideUpdateModal}
                    >
                      <div className="DeleteDatabaseModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="ModalFormHeading">
                            <h2>Update database password</h2>
                          </div>
                          <div className="InnerModalDescription">
                            <BlackInputText
                              required
                              placeholder="New database Password"
                              name="newDatabasePassword"
                              value={newDatabasePassword}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                            <BlackInputText
                              required
                              placeholder="Confirm New database Password"
                              name="confirmNewDatabasePassword"
                              value={confirmNewDatabasePassword}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        {(errorMessage || error) && (
                          <Feedback
                            type="error"
                            message={errorMessage ? "Failed to update password" : error}
                          />
                        )}
                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton
                              label="cancel"
                              className="CancelBtn"
                              onClick={this.hideUpdateModal}
                            />
                            <PrimaryButton
                              label={
                                updatingDBPassword ? <Spinner /> : "Update"
                              }
                              className="ResetBtn"
                              onClick={this.handleSubmitUpdate}
                            />
                          </div>

                          {databaseDeleteFailed && dbDeleteMessage && (
                            <Feedback message={dbDeleteMessage} type="error" />
                          )}
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}
                <div className="DBButtonRow">
                  <PrimaryButton
                    label="Reset Database"
                    className="ResetBtn DB-Btn"
                    onClick={this.showResetAlert}
                  />
                  <div className="buttonText">
                    Deletes all tables and data, but the database remains.
                  </div>
                </div>
                {resetMessage !== "" && (
                  <Feedback
                    message={
                      resetMessage !== ""
                        ? "Database has been successfully reset."
                        : null
                    }
                    type={isReset ? "success" : "error"}
                  />
                )}
                <div className="DBButtonRow">
                  <PrimaryButton
                    label="Delete Database"
                    className="DBDeleteBtn DB-Btn"
                    onClick={this.showDeleteAlert}
                  />
                  <div className="buttonText">
                    Destroys the entire database, deleting all tables and data.
                  </div>
                </div>
                {openDeleteAlert && (
                  <div className="ProjectDeleteModel">
                    <Modal
                      showModal={openDeleteAlert}
                      onClickAway={this.hideDeleteAlert}
                    >
                      <div className="DeleteDatabaseModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="InnerModalDescription">
                            Are you sure you want to delete this Database &nbsp;
                            <span>{dbInfo.name} ?</span>
                            <DeleteWarning />
                          </div>
                        </div>

                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton
                              label="cancel"
                              className="CancelBtn"
                              onClick={this.hideDeleteAlert}
                            />
                            <PrimaryButton
                              label={deletingDatabase ? <Spinner /> : "Delete"}
                              className="DeleteBtn"
                              onClick={(e) =>
                                this.handleDeleteDatabase(
                                  e,
                                  projectID,
                                  databaseID
                                )
                              }
                            />
                          </div>

                          {databaseDeleteFailed && dbDeleteMessage && (
                            <Feedback message={dbDeleteMessage} type="error" />
                          )}
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}

                {openResetAlert && (
                  <div className="ProjectDeleteModel">
                    <Modal
                      showModal={openResetAlert}
                      onClickAway={this.hideResetAlert}
                    >
                      <div className="DeleteDatabaseModel">
                        <div className="DeleteProjectModalUpperSection">
                          <div className="InnerModalDescription">
                            Are you sure you want to reset this Database &nbsp;
                            <span>{dbInfo.name} ?</span>
                            <DeleteWarning />
                          </div>
                        </div>

                        <div className="DeleteProjectModalLowerSection">
                          <div className="DeleteProjectModelButtons">
                            <PrimaryButton
                              label="cancel"
                              className="CancelBtn"
                              onClick={this.hideResetAlert}
                            />
                            <PrimaryButton
                              label={isReseting ? <Spinner /> : "Reset"}
                              className="ResetBtn"
                              onClick={(e) =>
                                this.handleResetDatabase(
                                  e,
                                  projectID,
                                  databaseID
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DBSettingsPage.propTypes = {
  databaseDeleteFailed: PropTypes.bool,
  clearDeleteDatabaseState: PropTypes.func,
  databaseDeleted: PropTypes.bool,
  deletingDatabase: PropTypes.bool,
  dbDeleteMessage: PropTypes.string,
  isReset: PropTypes.bool,
  isReseting: PropTypes.bool,
  resetFailed: PropTypes.bool,
  resetMessage: PropTypes.string,
  dbPasswordUpdated: PropTypes.bool,
  getProjectDatabases: PropTypes.func,
};

DBSettingsPage.defaultProps = {
  dbDeleteMessage: "",
  databaseDeleteFailed: false,
  deletingDatabase: false,
  databaseDeleted: false,
  dbPasswordUpdated: false,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { databases } = state.projectDatabasesReducer;
  const {
    databaseDeleted,
    deletingDatabase,
    databaseDeleteFailed,
    dbDeleteMessage,
    clearDeleteDatabaseState,
  } = state.deleteDatabaseReducer;
  const {
    isReset,
    isReseting,
    resetFailed,
    resetMessage,
    clearDatabaseResetState,
  } = state.resetDatabaseReducer;
  const {
    database,
    updatingDBPassword,
    updateDBPasswordFailed,
    dbPasswordUpdated,
    errorMessage,
    clearUpdateDatabasePasswordState
  } = state.updateDatabasePasswordReducer;

  return {
    databases,
    databaseDeleted,
    databaseDeleteFailed,
    deletingDatabase,
    dbDeleteMessage,
    clearDeleteDatabaseState,
    isReset,
    isReseting,
    resetFailed,
    resetMessage,
    clearDatabaseResetState,
    database,
    updatingDBPassword,
    updateDBPasswordFailed,
    dbPasswordUpdated,
    errorMessage,
    clearUpdateDatabasePasswordState,
    projects,
  };
};

const mapDispatchToProps = {
  deleteDatabase,
  clearDeleteDatabaseState,
  resetDatabase,
  clearDatabaseResetState,
  updateDatabasePassword,
  clearUpdateDatabasePasswordState,
  getProjectDatabases,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DBSettingsPage);
