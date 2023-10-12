import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Feedback from "../../components/Feedback";
import DeleteWarning from "../../components/DeleteWarning";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
  handleDeleteRequest,
} from "../../apis/apis.js";
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
      newUriChecked: false,
      passwordChecked: false,
      openUpdateModal: false,
      newDatabasePassword: "",
      confirmNewDatabasePassword: "",
      // api states
      gettingDatabases: false,
      fetchingDatabaseErrors: "",
      currentDB: {},
      // getting password
      gettingPassword: false,
      getPasswordError: "",
      DBpassword: "",
      // database password
      changingDBPassword: false,
      DBPasswordChangeError: "",
      // database reset
      resettingDB: false,
      resettingDBError: "",
      resettingResponseCode: "",
      //delete database
      deletingDB: false,
      deleteDBError: "",
    };

    this.handleDeleteDatabase = this.handleDeleteDatabase.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.handleResetDatabase = this.handleResetDatabase.bind(this);
    this.showResetAlert = this.showResetAlert.bind(this);
    this.hideResetAlert = this.hideResetAlert.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.nameOnClick = this.nameOnClick.bind(this);
    this.portOnClick = this.portOnClick.bind(this);
    this.userOnClick = this.userOnClick.bind(this);
    this.hostOnClick = this.hostOnClick.bind(this);
    this.uriOnClick = this.uriOnClick.bind(this);
    this.uriCopyPostgresOnClickString =
      this.uriCopyPostgresOnClickString.bind(this);
    this.uriCopyPostgresOnClick = this.uriCopyPostgresOnClick.bind(this);
    this.passwordOnClick = this.passwordOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.fetchPassword = this.fetchPassword.bind(this);

    // api functions
    this.fetchSelectedDb = this.fetchSelectedDb.bind(this);
    this.fetchPasswordApis = this.fetchPasswordApis.bind(this);
    this.changeDatabasePassword = this.changeDatabasePassword.bind(this);
    this.resetDB = this.resetDB.bind(this);
    this.deleteDb = this.deleteDb.bind(this);
  }
  componentDidMount() {
    const { projectID, databaseID } = this.props.match.params;
    this.fetchSelectedDb(projectID, databaseID);
  }
  // componentDidUpdate(prevProps) {
  // }
  fetchSelectedDb(projectID, databaseID) {
    this.setState({
      gettingDatabases: true,
    });
    handleGetRequest(`/projects/${projectID}/databases/${databaseID}`)
      .then((response) => {
        this.setState({
          gettingDatabases: false,
          currentDB: response.data.data.database,
        });
      })
      .catch((error) => {
        this.setState({
          fetchingDatabaseErrors: "Failed to fetch database",
          gettingDatabases: false,
        });
      });
  }

  handleDeleteDatabase(e, projectID, databaseID) {
    e.preventDefault();
    this.deleteDb(projectID, databaseID);
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    this.setState({ openDeleteAlert: false });
  }

  handleResetDatabase(e, projectID, databaseID) {
    e.preventDefault();
    this.resetDB(projectID, databaseID);
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
    this.setState({
      openUpdateModal: false,
      newDatabasePassword: "",
      confirmNewDatabasePassword: "",
    });
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

  togglePassword() {
    this.setState({ hidden: !this.state.hidden });
    this.fetchPassword();
  }

  nameOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(currentDB.name);
    this.setState({ nameChecked: true });
  }
  portOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(currentDB.port);
    this.setState({ portChecked: true });
  }
  hostOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(currentDB.host);
    this.setState({ hostChecked: true });
  }
  userOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(currentDB.user);
    this.setState({ userChecked: true });
  }
  uriOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(
      `${`mysql -u ${currentDB.user} -p -P ${currentDB.port} -h ${currentDB.host} -D ${currentDB.name}`}`
    );
    this.setState({ uriChecked: true });
  }

  uriCopyPostgresOnClickString() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(
      `postgresql://${currentDB.user}:${currentDB.password}@${currentDB.host}:${currentDB.port}/${currentDB.name}`
      // `postgresql://${currentDB?.user}:${currentDB?.password}@${currentDB?.host}:${currentDB?.port}/${currentDB?.name}`
    );
    this.setState({ newUriChecked: true });
  }

  uriCopyPostgresOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(
      `${`psql -h ${currentDB.host} -p ${currentDB.port} -d ${currentDB.name} -U ${currentDB.user} -W`}`
    );
    this.setState({ uriChecked: true });
  }

  passwordOnClick() {
    const { currentDB } = this.state;
    navigator.clipboard.writeText(currentDB.password);
    this.setState({ passwordChecked: true });
  }

  fetchPassword() {
    const {
      match: {
        params: { projectID, databaseID },
      },
    } = this.props;
    this.fetchPasswordApis(projectID, databaseID);
  }
  fetchPasswordApis(projectID, databaseID) {
    this.setState({
      gettingPassword: true,
    });
    handleGetRequest(`/projects/${projectID}/databases/${databaseID}/password`)
      .then((response) => {
        this.setState({
          gettingPassword: false,
          DBpassword: response.data.data.password,
        });
      })
      .catch((error) => {
        this.setState({
          getPasswordError: "Failed to fetch database password",
          gettingPassword: false,
        });
      });
  }

  // handle submit for update modal
  handleSubmitUpdate() {
    const {
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
      // updateDatabasePassword(projectID, databaseID, newPassword);
      this.changeDatabasePassword(projectID, databaseID, newPassword);
    }
  }
  changeDatabasePassword(projectID, databaseID, newPassword) {
    this.setState({
      changingDBPassword: true,
      DBPasswordChangeError: "",
    });
    handlePostRequestWithOutDataObject(
      newPassword,
      `/projects/${projectID}/databases/${databaseID}/reset_password`
    )
      .then(() => {
        window.location.href = `/projects/${projectID}/databases/${databaseID}/settings`;
      })
      .catch((error) => {
        this.setState({
          changingDBPassword: false,
          DBPasswordChangeError: "Failed to update password",
        });
      });
  }
  resetDB(projectID, databaseID) {
    this.setState({
      resettingDB: true,
      resettingDBError: "",
      resettingResponseCode: "",
    });
    handlePostRequestWithOutDataObject(
      {},
      `/projects/${projectID}/databases/${databaseID}/reset`
    )
      .then((response) => {
        this.setState({
          resettingDB: false,
          resettingResponseCode: response.status,
        });
        this.hideResetAlert();
      })
      .catch((error) => {
        this.setState({
          changingDBPassword: false,
          DBPasswordChangeError: "Failed to reset password",
          resettingResponseCode: error.response.status,
        });
        this.hideResetAlert();
      });
  }
  deleteDb(projectID, databaseID) {
    this.setState({ deletingDB: true, deleteDBError: "" });
    handleDeleteRequest(`/projects/${projectID}/databases/${databaseID}`, {})
      .then(() => {
        window.location.href = `/projects/${projectID}/databases`;
      })
      .catch(() => {
        this.setState({
          deleteProjectError: "Failed to delete this database",
          deletingProject: false,
        });
      });
  }
  handleEnableButtonClick = async () => {
    let { currentDB } = this.state;
    const { databaseID } = this.props.match.params;

    try {
      if (currentDB.disabled) {
        await handlePostRequestWithOutDataObject(
          databaseID,
          `/databases/${databaseID}/enable`
        )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            this.setState({
              error: error,
            });
          });
      } else {
        await handlePostRequestWithOutDataObject(
          databaseID,
          `/databases/${databaseID}/disable`
        )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            this.setState({
              error: error,
            });
          });
      }
    } catch (error) {
      console.error("API call error:", error);
    } finally {
      window.location.reload();
    }
  };

  render() {
    const { projects } = this.props;
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
      newUriChecked,
      passwordChecked,
      openUpdateModal,
      newDatabasePassword,
      confirmNewDatabasePassword,
      gettingDatabases,
      currentDB,
      DBpassword,
      changingDBPassword,
      DBPasswordChangeError,
      resettingDB,
      resettingDBError,
      resettingResponseCode,
      deletingDB,
      deleteDBError,
    } = this.state;
    return (
      <DashboardLayout
        header={
          <>
            <Link
              className="breadcrumb"
              to={`/projects/${projectID}/databases/`}
            >
              Databases
            </Link>
            <span>/ DB settings</span>
          </>
        }
        name={getProjectName(projects, projectID)}
        short
      >
        {gettingDatabases ? (
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
                      {currentDB?.database_flavour_name === "mysql"
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
                    <div>{currentDB?.name}</div>
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
                    <div>{currentDB?.user}</div>
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
                    <div>{currentDB?.host}</div>
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
                    <div>{currentDB?.port}</div>
                  </div>
                  <div className="CopyIcon">
                    <CopyText onClick={this.portOnClick} />
                    {portChecked ? <Checked /> : null}
                  </div>
                </div>
              </div>

              {DBpassword !== "" ? (
                <div>
                  <div className="SectionSubTitle">Password</div>
                  <div className="DetailRow">
                    <div className="SettingsSectionInfo">
                      <div>
                        {hidden ? "***************************" : DBpassword}
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
                      <div>{hidden ? "click to get password" : DBpassword}</div>
                    </div>
                    <div className="CopyIcon">
                      <CopyText onClick={this.passwordOnClick} />
                      {passwordChecked ? <Checked /> : null}
                    </div>
                    <div className="DBPassword" onClick={this.togglePassword}>
                      {hidden ? (
                        gettingDatabases ? (
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
                    <div>{currentDB?.db_size}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="SectionSubTitle">Created</div>
                <div className="DetailRow">
                  <div className="SettingsSectionInfo">
                    <div>{currentDB?.age}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="DBSections">
              <div className="SectionTitle">Connect to database</div>
              {currentDB?.database_flavour_name === "mysql" ? (
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
                        {`mysql -u ${currentDB?.user} -p -P ${currentDB?.port} -h ${currentDB?.host} -D ${currentDB?.name}`}
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
                        Following this format{" "}
                        <code>
                          postgresql://[user[:password]@][host][:port][/dbname]
                        </code>{" "}
                        <br />
                        To connect to the database, copy and paste the following
                      </div>
                    </div>
                    <div className="DBInfoBottom">
                      <code className="DBAccessInfo">
                        {`postgresql://${currentDB?.user}:${currentDB?.password}@${currentDB?.host}:${currentDB?.port}/${currentDB?.name}`}
                      </code>
                      <div className="DBAccessCopy">
                        <div className="DBPassword">
                          <CopyText
                            onClick={this.uriCopyPostgresOnClickString}
                          />
                          {newUriChecked ? <Checked /> : null}
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
                      <code className="DBAccessInfo">{`psql -h ${currentDB?.host} -p ${currentDB?.port} -d ${currentDB?.name} -U ${currentDB?.user} -W`}</code>
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
                        small={true}
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
                        small={true}
                        color="red-outline"
                      >
                        Reset
                      </PrimaryButton>
                    </div>
                  </div>
                  {resettingDBError === "" && resettingResponseCode === 200 && (
                    <Feedback
                      message={"Database has been successfully reset."}
                      type={"success"}
                    />
                  )}
                  {resettingDBError !== "" && (
                    <Feedback message={resettingDBError} type={"error"} />
                  )}
                  <div className={styles.MemberTableRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div className="SubTitle">
                        {currentDB?.disabled ? "Enable" : "Disable"} database
                      </div>
                      <br />
                      <div className="SubTitleContent">
                        {currentDB?.disabled
                          ? "This will enable this database."
                          : "This will temporary disable the database."}
                      </div>
                    </div>
                    <div className="SectionButtons">
                      <PrimaryButton
                        onClick={this.handleEnableButtonClick}
                        color={
                          currentDB?.disabled
                            ? "primary-outline"
                            : "red-outline"
                        }
                      >
                        {currentDB?.disabled ? "Enable" : "Disable"}
                      </PrimaryButton>
                    </div>
                  </div>
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
                        small={true}
                        color="red-outline"
                      >
                        Delete
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
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
                    {DBPasswordChangeError && (
                      <Feedback type="error" message={DBPasswordChangeError} />
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
                          {changingDBPassword ? <Spinner /> : "Update"}
                        </PrimaryButton>
                      </div>
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
                        <span className="DatabaseName">{currentDB.name} ?</span>
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
                            this.handleDeleteDatabase(e, projectID, databaseID)
                          }
                        >
                          {deletingDB ? <Spinner /> : "Delete"}
                        </PrimaryButton>
                      </div>

                      {deleteDBError && (
                        <Feedback message={deleteDBError} type="error" />
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
                        <span className="DatabaseName">{currentDB.name} ?</span>
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
                          {resettingDB ? <Spinner /> : "Reset"}
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        )}
      </DashboardLayout>
    );
  }
}

export const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  return {
    projects,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DBSettingsPage);
