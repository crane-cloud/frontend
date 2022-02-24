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
import getSingleDB from "../../redux/actions/getSingleDB";
import getPassword, {
  clearFetchDBPassword,
} from "../../redux/actions/getPassword";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import { ReactComponent as Open } from "../../assets/images/open.svg";
import { ReactComponent as Closed } from "../../assets/images/close.svg";
import BlackInputText from "../BlackInputText";
import SettingsButton from "../SettingsButton";
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
              allMetricsLink={`/projects/${projectID}/metrics`}
              cpuLink={`/projects/${projectID}/cpu/`}
              memoryLink={`/projects/${projectID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/network/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Settings" />
            </div>
            <div className="ContentSection SmallContainer">
              {isRetrieving ? (
                <div className="NoResourcesMessage">
                  <div className="SpinnerWrapper">
                    <Spinner size="big" />
                  </div>
                </div>
              ) : (
                <div className="DatabaseSettingsInfo">
                  <div className="DBSectionTitle">Database information</div>
                  <div className="DatabaseDetail">
                    <div className="DBCardSection">
                      <div className="DBDetailRow">
                        <div className="DBThead">Type</div>
                        <div className="DBTDetail uppercase">
                          {database.database_flavour_name === "mysql"
                            ? "MYSQL"
                            : "POSTGRESQL"}
                        </div>
                      </div>
                      <div className="DBDetailRow">
                        <div className="DBThead">Name</div>
                        <div className="DBTDetail">{database.name}</div>
                        <div className="DBIcon">
                          <CopyText onClick={this.nameOnClick} />
                          {nameChecked ? <Checked /> : null}
                        </div>
                      </div>
                      <div className="DBDetailRow">
                        <div className="DBThead">User</div>
                        <div className="DBTDetail">{database.user}</div>
                        <div className="DBIcon">
                          <CopyText onClick={this.userOnClick} />
                          {userChecked ? <Checked /> : null}
                        </div>
                      </div>
                      {passwordFetched ? (
                        <div className="DBDetailRow">
                          <div className="DBColumn1 DBThead">Password</div>
                          <div className="DBColumn">
                            {hidden ? (
                              isRetrievingPassword ? (
                                <Spinner />
                              ) : (
                                "***************************"
                              )
                            ) : (
                              password
                            )}
                          </div>
                          <div className="DBPasswordBtns">
                            <div className="DBIcon">
                              <CopyText onClick={this.passwordOnClick} />
                              {passwordChecked ? <Checked /> : null}
                            </div>
                            <div
                              className="DBPassword"
                              onClick={this.togglePassword}
                            >
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
                      ) : (
                        <div className="DBDetailRow">
                          <div className="DBColumn1 DBThead">Password</div>
                          <div className="DBColumn">
                            {hidden ? (
                              isRetrievingPassword ? (
                                <Spinner />
                              ) : (
                                "click to get password"
                              )
                            ) : (
                              password
                            )}
                          </div>
                          <div className="DBPasswordBtns">
                            <div className="DBIcon">
                              <CopyText onClick={this.passwordOnClick} />
                              {passwordChecked ? <Checked /> : null}
                            </div>
                            <div
                              className="DBPassword"
                              onClick={this.togglePassword}
                            >
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
                      <div className="DBDetailRow">
                        <div className="DBThead">Host</div>
                        <div className="DBTDetail">{database.host}</div>
                        <div className="DBIcon">
                          <CopyText onClick={this.hostOnClick} />
                          {hostChecked ? <Checked /> : null}
                        </div>
                      </div>
                      <div className="DBDetailRow">
                        <div className="DBThead">Port</div>
                        <div className="DBTDetail">{database.port}</div>
                        <div className="DBIcon">
                          <CopyText onClick={this.portOnClick} />
                          {portChecked ? <Checked /> : null}
                        </div>
                      </div>
                      <div className="DBDetailRow">
                        <div className="DBThead">Size</div>
                        <div className="DBTDetail">{database.db_size}</div>
                      </div>
                      <div className="DBDetailRow">
                        <div className="DBThead">Created</div>
                        <div className="DBTDetail">{database.age}</div>
                      </div>
                    </div>
                  </div>

                  <div className="DBSections">
                    <div className="DBSectionTitle">Connect to database</div>
                    {database.database_flavour_name === "mysql" ? (
                      <div className="DBInstructions">
                        <div className="DBInfoTop">
                          <div>
                            To connect to the database, copy and paste the
                            command below into your terminal. Refer to{" "}
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
                          <div className="DBAccessInfo">{`mysql -u ${database.user} -p -P ${database.port} -h ${database.host} -D ${database.name}`}</div>
                          <div className="DBAccessCopy">
                            <CopyText onClick={this.uriOnClick} />
                            {uriChecked ? <Checked /> : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="DBInstructions">
                        <div className="DBInfoTop">
                          <div>
                            To connect to the database, copy and paste the
                            command below into your terminal. Refer to{" "}
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
                          <div className="DBAccessInfo">{`psql -h ${database.host} -p ${database.port} -d ${database.name} -U ${database.user} -W`}</div>
                          <div className="DBAccessCopy">
                            <div className="DBPassword">
                              <CopyText onClick={this.uriCopyPostgresOnClick} />
                              {uriChecked ? <Checked /> : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="DBSections">
                    <div className="DBSectionTitle">More Options</div>
                    <div className="DBInstructions">
                      <div className="DBButtonRow">
                        <div className="flexa">
                          <div>
                            <strong>Change password</strong>
                          </div>
                          <div>Update the password of this database.</div>
                        </div>
                        <div className="SectionButtons">
                          <SettingsButton
                            label="Change password"
                            onClick={this.showUpdateModal}
                          />
                        </div>
                      </div>
                      <div className="DBButtonRow">
                        <div className="flexa">
                          <div>
                            <strong>Reset database</strong>
                          </div>
                          <div>
                            Delete all data inside this database and restore it
                            to its initial state.
                          </div>
                        </div>
                        <div className="SectionButtons">
                          <SettingsButton
                            label="Reset this database"
                            className="Change-Btn"
                            onClick={this.showResetAlert}
                          />
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
                      </div>
                      <div className="DBButtonRow">
                        <div className="flexa">
                          <div>
                            <strong>Delete database</strong>
                          </div>
                          <div>
                            Destroy the entire database, delete all tables and
                            data inside them.
                          </div>
                        </div>
                        <div className="SectionButtons">
                          <SettingsButton
                            label="Delete this database"
                            className="Change-Btn"
                            onClick={this.showDeleteAlert}
                          />
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
                                  errorMessage
                                    ? "Failed to update password"
                                    : error
                                }
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
                                <Feedback
                                  message={dbDeleteMessage}
                                  type="error"
                                />
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
                                Are you sure you want to delete this database
                                &nbsp;
                                <span className="DatabaseName">
                                  {database.name} ?
                                </span>
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
                                  label={
                                    deletingDatabase ? <Spinner /> : "Delete"
                                  }
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
                                <Feedback
                                  message={dbDeleteMessage}
                                  type="error"
                                />
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
                                Are you sure you want to reset this database
                                &nbsp;
                                <span className="DatabaseName">
                                  {database.name} ?
                                </span>
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
              )}
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
