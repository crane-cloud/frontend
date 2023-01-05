import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Feedback from "../../components/Feedback";
import DeleteWarning from "../../components/DeleteWarning";
import deleteDatabase, {
  clearDeleteDatabaseState,
} from "../../redux/actions/deleteDatabase";
import resetDatabase, {
  clearDatabaseResetState,
} from "../../redux/actions/resetDatabase";
import updateDatabasePassword, {
  clearUpdateDatabasePasswordState,
} from "../../redux/actions/updateDBPassword";
import getSingleDB from "../../redux/actions/getSingleDB";
import getPassword, {
  clearFetchDBPassword,
} from "../../redux/actions/getPassword";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as Open } from "../../assets/images/open.svg";
import { ReactComponent as Closed } from "../../assets/images/close.svg";
import BlackInputText from "../../components/BlackInputText";
import "./DBSettingsPage.css";
import { getProjectName } from "../../helpers/projectName";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import styles from "../ProjectSettingsPage/ProjectSettingsPage.module.css";

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
    this.fetchPassword = this.fetchPassword.bind(this);
  }
  componentDidMount() {
    const { getSingleDB, clearFetchDBPassword } = this.props;
    const { projectID, databaseID } = this.props.match.params;
    clearDatabaseResetState();
    clearFetchDBPassword();
    getSingleDB(projectID, databaseID);
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
    this.setState({ confirmNewDatabasePassword: "" });
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
    const { projectID } = this.props.match.params;
    if (dbDeleteMessage === "Database Deleted Successfully") {
      this.hideDeleteAlert();
      return <Redirect to={`/projects/${projectID}/databases`} noThrow />;
    }
  };

  renderUpdateRedirect = () => {
    const { dpPasswordUpdated } = this.props;
    const { projectID, databaseID } = this.props.match.params;
    if (dpPasswordUpdated) {
      return (
        <Redirect
          to={`/projects/${projectID}/databases/${databaseID}/settings`}
          noThrow
        />
      );
    }
  };

  togglePassword() {
    this.setState({ hidden: !this.state.hidden });
    this.fetchPassword();
  }

  nameOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(database.name);
    this.setState({ nameChecked: true });
  }
  portOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(database.port);
    this.setState({ portChecked: true });
  }
  hostOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(database.host);
    this.setState({ hostChecked: true });
  }
  userOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(database.user);
    this.setState({ userChecked: true });
  }
  uriOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(
      `${`mysql -u ${database.user} -p -P ${database.port} -h ${database.host} -D ${database.name}`}`
    );
    this.setState({ uriChecked: true });
  }

  uriCopyPostgresOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(
      `${`psql -h ${database.host} -p ${database.port} -d ${database.name} -U ${database.user} -W`}`
    );
    this.setState({ uriChecked: true });
  }

  passwordOnClick() {
    const { database } = this.props;
    navigator.clipboard.writeText(database.password);
    this.setState({ passwordChecked: true });
  }

  fetchPassword() {
    const {
      getPassword,
      match: {
        params: { projectID, databaseID },
      },
    } = this.props;

    getPassword(projectID, databaseID);
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
    } else if (newDatabasePassword !== confirmNewDatabasePassword) {
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
      database,
      isRetrieving,
      password,
      isRetrievingPassword,
      passwordFetched,
    } = this.props;
    const { projectID, databaseID } = this.props.match.params;
    // const dbInfo = this.getDatabaseInfo(databaseID);
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
      <DashboardLayout
        header="Database Settings"
        name={getProjectName(projects, projectID)}
        short
      >
        {dbDeleteMessage === "Database Deleted Successfully"
          ? this.renderRedirect()
          : null}
        {dbPasswordUpdated ? this.renderUpdateRedirect() : null}

        {isRetrieving ? (
          <div className="NoResourcesMessage">
            <div className="SpinnerWrapper">
              <Spinner size="big" />
            </div>
          </div>
        ) : (
          <div className="DatabaseSettingsInfo">
            <div className="SectionTitle">Database information</div>
            <div className="BigCard DetailsList">
              <div>
                <div className="SectionSubTitle">Type</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>
                      {database?.database_flavour_name === "mysql"
                        ? "MYSQL"
                        : "POSTGRESQL"}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">Name</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.name}</div>
                  </div>
                  <div className="CopyIcon">
                    <CopyText onClick={this.nameOnClick} />
                    {nameChecked ? <Checked /> : null}
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">User</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.user}</div>
                  </div>
                  <div className="CopyIcon">
                    <CopyText onClick={this.userOnClick} />
                    {userChecked ? <Checked /> : null}
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">Host</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.host}</div>
                  </div>
                  <div className="CopyIcon">
                    <CopyText onClick={this.hostOnClick} />
                    {hostChecked ? <Checked /> : null}
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">Port</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.port}</div>
                  </div>
                  <div className="CopyIcon">
                    <CopyText onClick={this.portOnClick} />
                    {portChecked ? <Checked /> : null}
                  </div>
                </div>
              </div>

              {passwordFetched ? (
                <div>
                  <div className="SectionSubTitle">Password</div>
                  <div className="DetailRow">
                    <div className="SettingsSectionInfo">
                      <div>
                        {hidden ? "***************************" : password}
                      </div>
                    </div>
                    <div className="CopyIcon">
                      <CopyText onClick={this.passwordOnClick} />
                      {passwordChecked ? <Checked /> : null}
                    </div>
                    <div className="DBPassword" onClick={this.togglePassword}>
                      {hidden ? <Open /> : <Closed />}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="SectionSubTitle">Password</div>
                  <div className="DetailRow">
                    <div className="SettingsSectionInfo">
                      <div>{hidden ? "click to get password" : password}</div>
                    </div>
                    <div className="CopyIcon">
                      <CopyText onClick={this.passwordOnClick} />
                      {passwordChecked ? <Checked /> : null}
                    </div>
                    <div className="DBPassword" onClick={this.togglePassword}>
                      {hidden ? (
                        isRetrievingPassword ? (
                          <Spinner />
                        ) : (
                          <Open />
                        )
                      ) : (
                        <Closed />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="SectionSubTitle">Size</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.db_size}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">Created</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{database?.age}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="DBSections">
              <div className="SectionTitle">Connect to database</div>
              {database?.database_flavour_name === "mysql" ? (
                <div className="BigCard DBInstructionsView">
                  <div className="SubTitle">Connect with terminal</div>
                  <div className="DBConnectionInfo">
                    <div className="DBInfoTop">
                      {/* TODO: Add mysql conncetion with DB URI */}
                      <div>
                        To connect to the database, copy and paste the command
                        below into your terminal. Refer to{" "}
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
                      <code className="DBAccessInfo">
                        {`mysql -u ${database?.user} -p -P ${database?.port} -h ${database?.host} -D ${database?.name}`}
                      </code>
                      <div className="DBAccessCopy">
                        <CopyText onClick={this.uriOnClick} />
                        {uriChecked ? <Checked /> : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="BigCard DBInstructionsView">
                  <div className="SubTitle">
                    Connect with a connection string
                  </div>
                  <div className="DBConnectionInfo">
                    <div className="DBInfoTop">
                      <div>
                        Followwing this format{" "}
                        <code>
                          postgresql://[user[:password]@][host][:port][/dbname]
                        </code>{" "}
                        <br />
                        To connect to the database, copy and paste the following
                      </div>
                    </div>
                    <div className="DBInfoBottom">
                      <code className="DBAccessInfo">
                        {`postgresql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`}
                      </code>
                      <div className="DBAccessCopy">
                        <div className="DBPassword">
                          <CopyText onClick={this.uriCopyPostgresOnClick} />
                          {uriChecked ? <Checked /> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="SubTitle">Connect with terminal</div>
                  <div className="DBConnectionInfo">
                    <div className="DBInfoTop">
                      <div>
                        To connect to the database, copy and paste the command
                        below into your terminal. Refer to{" "}
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
                      <code className="DBAccessInfo">{`psql -h ${database?.host} -p ${database?.port} -d ${database?.name} -U ${database?.user} -W`}</code>
                      <div className="DBAccessCopy">
                        <div className="DBPassword">
                          <CopyText onClick={this.uriCopyPostgresOnClick} />
                          {uriChecked ? <Checked /> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="DBSections">
              <div className="SectionTitle">More Options</div>
              <div className={styles.ProjectInstructions}>
                <div className={styles.MemberBody}>
                  <div className={styles.MemberTableRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className="SubTitle">Change password</div>
                      <div>Update the password of this database.</div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <PrimaryButton
                        onClick={this.showUpdateModal}
                        small
                        color="primary-outline"
                      >
                        Change Password
                      </PrimaryButton>
                    </div>
                  </div>
                  <div className={styles.MemberTableRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className="SubTitle">Reset database</div>
                      <div>
                        Delete all data inside this database and restore it to
                        its initial state.
                      </div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <PrimaryButton
                        onClick={this.showResetAlert}
                        small
                        color="red-outline"
                      >
                        Reset
                      </PrimaryButton>
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
                  <div className={styles.MemberTableRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className="SubTitle">Delete database</div>
                      <div>
                        Destroy the entire database, delete all tables and data
                        inside them.
                      </div>
                    </div>
                    <div className={styles.SectionButtons}>
                      <PrimaryButton
                        onClick={this.showDeleteAlert}
                        small
                        color="red-outline"
                      >
                        Delete
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="DBButtons">
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
                          message={
                            errorMessage ? "Failed to update password" : error
                          }
                        />
                      )}
                      <div className="DeleteProjectModalLowerSection">
                        <div className="DeleteProjectModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={this.hideUpdateModal}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            color="primary"
                            onClick={this.handleSubmitUpdate}
                          >
                            {updatingDBPassword ? <Spinner /> : "Update"}
                          </PrimaryButton>
                        </div>

                        {databaseDeleteFailed && dbDeleteMessage && (
                          <Feedback message={dbDeleteMessage} type="error" />
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              {openDeleteAlert && (
                <div className="ProjectDeleteModel">
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={this.hideDeleteAlert}
                  >
                    <div className="DeleteDatabaseModel">
                      <div className="DeleteProjectModalUpperSection">
                        <div className="InnerModalDescription">
                          Are you sure you want to delete this database &nbsp;
                          <span className="DatabaseName">
                            {database.name} ?
                          </span>
                          <DeleteWarning />
                        </div>
                      </div>

                      <div className="DeleteProjectModalLowerSection">
                        <div className="DeleteProjectModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={this.hideDeleteAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            color="red"
                            onClick={(e) =>
                              this.handleDeleteDatabase(
                                e,
                                projectID,
                                databaseID
                              )
                            }
                          >
                            {deletingDatabase ? <Spinner /> : "Delete"}
                          </PrimaryButton>
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
                          Are you sure you want to reset this database &nbsp;
                          <span className="DatabaseName">
                            {database.name} ?
                          </span>
                          <DeleteWarning />
                        </div>
                      </div>

                      <div className="DeleteProjectModalLowerSection">
                        <div className="DeleteProjectModelButtons">
                          <PrimaryButton
                            className="CancelBtn"
                            onClick={this.hideResetAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            color="red"
                            onClick={(e) =>
                              this.handleResetDatabase(e, projectID, databaseID)
                            }
                          >
                            {isReseting ? <Spinner /> : "Reset"}
                          </PrimaryButton>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        )}
      </DashboardLayout>
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

export const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  const { database, isRetrieving, isFetched } = state.singleDBReducer;
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
    updatingDBPassword,
    updateDBPasswordFailed,
    dbPasswordUpdated,
    errorMessage,
    clearUpdateDatabasePasswordState,
  } = state.updateDatabasePasswordReducer;

  const { password, isRetrievingPassword, passwordFetched } =
    state.passwordReducer;
  return {
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
    isRetrieving,
    isFetched,
    password,
    isRetrievingPassword,
    passwordFetched,
  };
};

const mapDispatchToProps = {
  deleteDatabase,
  clearDeleteDatabaseState,
  resetDatabase,
  clearDatabaseResetState,
  updateDatabasePassword,
  clearUpdateDatabasePasswordState,
  getSingleDB,
  getPassword,
  clearFetchDBPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(DBSettingsPage);
