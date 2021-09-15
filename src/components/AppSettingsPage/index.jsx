import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import deleteApp, { clearState } from "../../redux/actions/deleteApp";
import InformationBar from "../InformationBar";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import Modal from "../Modal";
import SideBar from "../SideBar";
import Feedback from "../Feedback";
import Checkbox from "../Checkbox";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import Select from "../Select";
import DeleteWarning from "../DeleteWarning";
import AppStatus from "../AppStatus";
import styles from "./AppSettingsPage.module.css";
import BlackInputText from "../BlackInputText";
import getSingleApp from "../../redux/actions/getSingleApp";
import updateApp, { clearUpdateAppState } from "../../redux/actions/updateApp";

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const { app } = this.props;
    this.state = {
      openDeleteAlert: false,
      error: "",
      portError: "",
      commandError: "",
      disableDelete: true,
      ConfirmAppname: "",
      updateModal: false,
      newImage: "",
      urlChecked: false,
      dockerCredentials: {
        username: "",
        email: "",
        password: "",
        server: "",
        error: "",
      },
      isPrivateImage: false,
      uri: app.uri ? app.uri : "",
      varName: "",
      varValue: "",
      envVars: "",
      entryCommand: "",
      port: app.port ? app.port : "",
      replicas: "",
    };

    this.handleDeleteApp = this.handleDeleteApp.bind(this);
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
    this.hideDeleteAlert = this.hideDeleteAlert.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
    this.handleDockerCredentialsChange =
      this.handleDockerCredentialsChange.bind(this);
    this.addEnvVar = this.addEnvVar.bind(this);
    this.removeEnvVar = this.removeEnvVar.bind(this);
    this.togglePrivateImage = this.togglePrivateImage.bind(this);
    this.handleSelectReplicas = this.handleSelectReplicas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.urlOnClick = this.urlOnClick.bind(this);
    this.handlePortSubmit = this.handlePortSubmit.bind(this);
    this.handleCommandSubmit = this.handleCommandSubmit.bind(this);
  }

  handleChange(e) {
    const { openDeleteAlert } = this.state;
    const { app } = this.props;

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (openDeleteAlert && e.target.value === app.name) {
      this.setState({
        disableDelete: false,
      });
    } else if (openDeleteAlert && e.target.value !== app.name) {
      this.setState({
        disableDelete: true,
      });
    }
  }
  componentDidMount() {
    const {
      match: { params },
      getSingleApp,
      clearState,
      clearUpdateAppState,
    } = this.props;
    const { appID } = params;
    clearState();
    clearUpdateAppState();
    getSingleApp(appID);
  }
  componentDidUpdate(prevProps) {
    const {
      isDeleted,
      isUpdated,
      getSingleApp,
      clearUpdateAppState,
      match: { params },
    } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }

    if (isUpdated !== prevProps.isUpdated) {
      clearUpdateAppState();
      getSingleApp(params.appID);
    }
  }
  getAppName(id) {
    const { apps } = this.props;
    return apps.apps.find((app) => app.id === id).name;
  }

  handleDeleteApp(e, appId) {
    const { deleteApp } = this.props;
    e.preventDefault();
    deleteApp(appId);
  }

  showDeleteAlert() {
    this.setState({ openDeleteAlert: true });
  }

  hideDeleteAlert() {
    const { clearState } = this.props;
    clearState();
    this.setState({ openDeleteAlert: false });
  }

  renderRedirect = () => {
    const { isDeleted, clearState } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (isDeleted) {
      clearState();
      return (
        <Redirect to={`/users/${userID}/projects/${projectID}/apps`} noThrow />
      );
    }
  };

  handleDockerCredentialsChange({ target, target: { value } }) {
    const { dockerCredentials } = this.state;
    this.setState((prevState) => ({
      dockerCredentials: {
        ...prevState.dockerCredentials,
        [target.name]: value,
      },
    }));
    if (dockerCredentials.error) {
      this.setState((prevState) => ({
        dockerCredentials: {
          ...prevState.dockerCredentials,
          error: "",
        },
      }));
    }
  }

  addEnvVar() {
    const { varName, varValue } = this.state;

    if (varName && varValue) {
      this.setState((prevState) => ({
        envVars: {
          ...prevState.envVars,
          [varName]: varValue,
        },
      }));
      this.setState({
        varName: "",
        varValue: "",
      });
    }
  }

  removeEnvVar(index) {
    const { envVars } = this.state;
    const keyToRemove = Object.keys(envVars)[index];
    const newEnvVars = Object.keys(envVars).reduce((object, key) => {
      if (key !== keyToRemove) {
        object[key] = envVars[key]; // eslint-disable-line no-param-reassign
      }
      return object;
    }, {});

    this.setState({ envVars: newEnvVars });
  }

  togglePrivateImage() {
    const { isPrivateImage } = this.state;
    this.setState({
      isPrivateImage: !isPrivateImage,
    });
  }

  handleSelectReplicas(selected) {
    this.setState({ replicas: selected.id });
  }

  urlOnClick() {
    const { app } = this.props;
    navigator.clipboard.writeText(app.url);
    this.setState({ urlChecked: true });
  }

  handlePortSubmit() {
    const {
      match: { params },
      updateApp,
    } = this.props;
    const { appID } = params;
    const { port } = this.state;
    if (port && !/^[0-9]*$/.test(port)) {
      // validate port and ensure its a number
      this.setState({
        portError: "Port should be an integer",
      });
    } else {
      updateApp(appID, { port: parseInt(port, 10) });
    }
  }

  handleCommandSubmit() {
    const {
      match: { params },
      updateApp,
    } = this.props;
    const { appID } = params;
    const { entryCommand } = this.state;
    if (entryCommand && entryCommand.length > 0) {
      updateApp(appID, { command: entryCommand });
    } else {
      this.setState({ commandError: "Please enter a command" });
    }
  }

  handleSubmit() {
    const {
      isPrivateImage,
      dockerCredentials: { username, email, password, server },
      replicas,
      newImage,
    } = this.state;
    const {
      updateApp,
      match: { params },
      app,
    } = this.props;

    if (isPrivateImage && (!email || !username || !password || !server)) {
      this.setState((prevState) => ({
        dockerCredentials: {
          ...prevState.dockerCredentials,
          error: "please provide all the information above",
        },
      }));
    } else {
      if (!newImage && !isPrivateImage && replicas !== app.replicas) {
        updateApp(params.appID, { replicas: replicas });
      } else if (
        newImage &&
        newImage.length > 1 &&
        !isPrivateImage &&
        replicas === app.replicas
      ) {
        updateApp(params.appID, { image: newImage });
      } else if (isPrivateImage && newImage) {
        let appInfo = {
          image: newImage,
          project_id: params.projectID,
          private_image: isPrivateImage,
          replicas,
        };

        appInfo = {
          ...appInfo,
          docker_email: email,
          docker_username: username,
          docker_password: password,
          docker_server: server,
        };
        updateApp(params.appID, appInfo);
      }
    }
  }

  showUpdateModal() {
    this.setState({ updateModal: true });
  }

  hideUpdateModal() {
    this.setState({ updateModal: false });
  }

  render() {
    const {
      match: { params },
      isDeleting,
      isDeleted,
      message,
      isFailed,
      app,
      isUpdating,
      errorMessage,
    } = this.props;
    const {
      openDeleteAlert,
      ConfirmAppname,
      disableDelete,
      newImage,
      urlChecked,
      error,
      portError,
      commandError,
      entryCommand,
      port,
      isPrivateImage,
      dockerCredentials,
      dockerCredentials: { username, email, password, server },
    } = this.state;
    // project name from line 105 disappears on refreash, another source of the name was needed
    //const { name } = this.props.location;
    const { projectID, userID, appID } = params;
    const replicaOptions = [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
    ];

    console.log(app);

    return (
      <div className={styles.Page}>
        {isDeleted ? this.renderRedirect() : null}
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={app.name}
              params={params}
              // description={description}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className={styles.MainContentSection}>
            <div className={styles.InformationBarSection}>
              <InformationBar header="Settings" />
            </div>
            <div className={styles.ContentSection}>
              <div className={styles.APPSections}>
                <div className={styles.APPSectionTitle}>App Information</div>
                <div className={styles.APPInstructions}>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Name</div>
                    <div className={styles.flexa}>{app.name}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Alias</div>
                    <div className={styles.flexa}>{app.alias}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Image</div>
                    <div className={styles.flexa}>
                      <BlackInputText
                        required
                        placeholder={app.image}
                        name="newImage"
                        value={newImage}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.PrivateImageCheckField}>
                    <Checkbox
                      isBlack
                      onClick={this.togglePrivateImage}
                      isChecked={isPrivateImage}
                    />
                    Private Image
                  </div>

                  {isPrivateImage && (
                    <div className={styles.PrivateImageTabContainer}>
                      <div index={1} /* label={<DockerLogo />} */>
                        <div className={styles.PrivateImageInputs}>
                          <div className={styles.APPButtonRow}>
                            <div className={styles.AppLabel}>Username</div>
                            <div className={styles.flexa}>
                              <BlackInputText
                                required
                                placeholder={
                                  app.username ? app.username : "Username"
                                }
                                name="username"
                                value={username}
                                onChange={(e) => {
                                  this.handleDockerCredentialsChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.APPButtonRow}>
                            <div className={styles.AppLabel}>Email</div>
                            <div className={styles.flexa}>
                              <BlackInputText
                                required
                                placeholder={app.email ? app.email : "Email"}
                                name="email"
                                value={email}
                                onChange={(e) => {
                                  this.handleDockerCredentialsChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.APPButtonRow}>
                            <div className={styles.AppLabel}>Password</div>
                            <div className={styles.flexa}>
                              <BlackInputText
                                required
                                placeholder={
                                  app.password ? app.password : "Password"
                                }
                                name="password"
                                value={password}
                                onChange={(e) => {
                                  this.handleDockerCredentialsChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.APPButtonRow}>
                            <div className={styles.AppLabel}>
                              Registry Server
                            </div>
                            <div className={styles.flexa}>
                              <div className={styles.InputFieldWithTooltip}>
                                <BlackInputText
                                  required
                                  placeholder="Registry Server"
                                  name="server"
                                  value={server}
                                  onChange={(e) => {
                                    this.handleDockerCredentialsChange(e);
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {dockerCredentials.error && (
                            <Feedback
                              type="error"
                              message={dockerCredentials.error}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Replicas</div>
                    <div className={styles.flexa}>
                      <div className={styles.ReplicasSelect}>
                        <Select
                          placeholder="Number of Replicas - defaults to 1"
                          options={replicaOptions}
                          onChange={this.handleSelectReplicas}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Status</div>
                    <div className={styles.ShowStatus}>
                      {app.app_running_status === "running" ? (
                        <div className={styles.StatusIcon}>
                          <AppStatus appStatus={app.app_running_status} />
                          <div>&nbsp;Ready</div>
                        </div>
                      ) : (
                        <div className={styles.StatusIcon}>
                          <AppStatus appStatus={app.app_running_status} />
                          <div>&nbsp;Failing</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Age</div>
                    <div className={styles.flexa}>{app.age}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Link</div>
                    <div className={styles.CopyDiv}>
                      <div className="DBTDetail">{app.url}</div>
                      <div className={styles.CopyUrl}>
                        <CopyText onClick={this.urlOnClick} />
                        {urlChecked ? <Checked /> : null}
                      </div>
                    </div>
                  </div>
                  <div className={styles.APPButton}>
                    <div className={styles.UpperSection}>
                      <PrimaryButton
                        label={isUpdating ? <Spinner /> : "UPDATE"}
                        onClick={this.handleSubmit}
                      />
                    </div>
                  </div>
                  <div className={styles.errorCenterDiv}>
                    {error && <Feedback type="error" message={error} />}
                  </div>
                </div>
              </div>
              <hr className={styles.HorizontalLine} />
              <div className={styles.APPSectionPort}>
                <div className={styles.APPSectionTitle}>
                  Port & Entry commands
                </div>
                <div className={styles.PortSection}>
                  <div>Port</div>
                  <input
                    type="text"
                    // required
                    placeholder={app.port}
                    name="port"
                    value={port}
                    className={styles.portInput}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <PrimaryButton
                    label={isUpdating ? <Spinner /> : "UPDATE"}
                    onClick={this.handlePortSubmit}
                  />
                </div>
              </div>
              <div className={styles.errorCenterDiv}>
                {portError && <Feedback type="error" message={portError} />}
              </div>
              <hr className={styles.HorizontalHalfLine} />
              <div className={styles.errorCenterDiv}>
                {errorMessage && (
                  <Feedback type="error" message={errorMessage} />
                )}
              </div>
              <div className={styles.APPSectionPort}>
                <div></div>
                <div className={styles.commandInputSection}>
                  <input
                    type="text"
                    // required
                    placeholder="command"
                    name="entryCommand"
                    value={entryCommand}
                    className={styles.portInput}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                </div>
                <div>
                  <PrimaryButton
                    label={isUpdating ? <Spinner /> : "UPDATE"}
                    onClick={this.handleCommandSubmit}
                  />
                </div>
              </div>
              <div className={styles.errorCenterDiv}>
                {commandError && (
                  <Feedback type="error" message={commandError} />
                )}
              </div>
              <hr className={styles.HorizontalLine} />
              <div className={styles.AppDelete}>
                <div className={styles.APPInstruct}>
                  <div className={styles.APPSectionDelete}>
                    Delete application
                  </div>
                  <div>Deleting your app is irreversible.</div>
                </div>
                <div className={styles.DeleteButtonDiv}>
                  <PrimaryButton
                    label="Delete App"
                    className={styles.DeleteBtn}
                    onClick={this.showDeleteAlert}
                  />
                </div>
              </div>
              {openDeleteAlert && (
                <div className={styles.AppDeleteModel}>
                  <Modal
                    showModal={openDeleteAlert}
                    onClickAway={this.hideDeleteAlert}
                  >
                    <div className={styles.DeleteAppModel}>
                      <div className={styles.DeleteModalUpperSection}>
                        <div className={styles.WarningContainer}>
                          <div className={styles.DeleteDescription}>
                            Are you sure you want to delete&nbsp;
                            <span>{app.name}</span>
                            &nbsp;?
                          </div>
                          <div className={styles.DeleteSubDescription}>
                            This will permanently delete the application. Please
                            confirm by typing{" "}
                            <b className={styles.DeleteWarning}>{app.name}</b>{" "}
                            below.
                          </div>
                          <div className={styles.InnerModalDescription}>
                            <BlackInputText
                              required
                              placeholder={app.name}
                              name="ConfirmAppname"
                              value={ConfirmAppname}
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                            />
                            <DeleteWarning textAlignment="Left" />
                          </div>
                        </div>
                      </div>

                      <div className={styles.DeleteModalLowerSection}>
                        <div className={styles.DeleteAppModelButtons}>
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
                            onClick={(e) => this.handleDeleteApp(e, appID)}
                          />
                        </div>

                        {message && (
                          <Feedback
                            type={isFailed ? "error" : "success"}
                            message={message}
                          />
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

AppSettingsPage.propTypes = {
  isDeleted: PropTypes.bool,
  isFailed: PropTypes.bool,
  deleteApp: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

AppSettingsPage.defaultProps = {
  isDeleted: false,
  isFailed: false,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, message } = state.deleteAppReducer;
  // const { apps } = state.appsListReducer;
  const { app } = state.singleAppReducer;
  const { isUpdating, isUpdated, errorMessage } = state.updateAppReducer;
  return {
    // apps,
    isDeleting,
    isDeleted,
    isFailed,
    message,
    app,
    isUpdated,
    isUpdating,
    errorMessage,
  };
};

const mapDispatchToProps = {
  deleteApp,
  clearState,
  getSingleApp,
  updateApp,
  clearUpdateAppState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
