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
import Tooltip from "../Tooltip";
import Select from "../Select";
import DeleteWarning from "../DeleteWarning";
import Status from "../Status";
import styles from "./AppSettingsPage.module.css";
import BlackInputText from "../BlackInputText";
import SettingsButton from "../SettingsButton";
import getSingleApp from "../../redux/actions/getSingleApp";
import updateApp from "../../redux/actions/updateApp";
// import CreateApp from "../createApp";
import UpdateApp from "../updateApp";

class AppSettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const { app } = this.props;
    this.state = {
      openDeleteAlert: false,
      error: "",
      disableDelete: true,
      ConfirmAppname: "",
      updateModal: false,
      newImage: "",
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
      replicas: app.replicas ? app.replicas : 1,
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
  }

  handleChange(e) {
    const { openDeleteAlert } = this.state;
    const {
      match: { params },
    } = this.props;
    const { appID } = params;

    this.setState({
      [e.target.name]: e.target.value,
    });

    if (openDeleteAlert && e.target.value === this.getAppName(appID)) {
      this.setState({
        disableDelete: false,
      });
    } else if (openDeleteAlert && e.target.value !== this.getAppName(appID)) {
      this.setState({
        disableDelete: true,
      });
    }
  }
  componentDidMount() {
    const {
      match: { params },
      getSingleApp,
    } = this.props;
    const { appID } = params;
    getSingleApp(appID);
  }
  componentDidUpdate(prevProps) {
    const { isDeleted } = this.props;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }
  }
  // getAppName(id) {
  //   const { apps } = this.props;
  //   return apps.apps.find((app) => app.id === id).name;
  // }

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
    const { isDeleted } = this.props;
    const { userID, projectID } = this.props.match.params;
    if (isDeleted) {
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

  handleSubmit() {
    const {
      name,
      uri,
      envVars,
      entryCommand,
      port,
      isPrivateImage,
      dockerCredentials: { username, email, password, server },
      replicas,
    } = this.state;
    const { createApp, params } = this.props;

    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: "app name & image uri are required",
      });
    } else if (this.validateAppName(name) === false) {
      this.setState({
        error: "Name should start with a letter",
      });
    } else if (this.validateAppName(name) === "false_convention") {
      this.setState({
        error: "Name may only contain letters,numbers,dot and a hypen -",
      });
    } else if (name.length > 27) {
      this.setState({
        error: "Name may not exceed 27 characters",
      });
    } else if (port && !/^[0-9]*$/.test(port)) {
      // validate port and ensure its a number
      this.setState({
        error: "Port should be an integer",
      });
    } else if (
      isPrivateImage &&
      (!email || !username || !password || !server)
    ) {
      this.setState((prevState) => ({
        dockerCredentials: {
          ...prevState.dockerCredentials,
          error: "please provide all the information above",
        },
      }));
    } else {
      let appInfo = {
        command: entryCommand,
        env_vars: envVars,
        image: uri,
        name,
        project_id: params.projectID,
        private_image: isPrivateImage,
        replicas,
      };

      if (port) {
        appInfo = { ...appInfo, port: parseInt(port, 10) };
      }

      if (isPrivateImage) {
        appInfo = {
          ...appInfo,
          docker_email: email,
          docker_username: username,
          docker_password: password,
          docker_server: server,
        };
      }

      createApp(appInfo, params.projectID);
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
    } = this.props;
    const {
      openDeleteAlert,
      ConfirmAppname,
      disableDelete,
      newImage,
      newUri,
      varName,
      varValue,
      envVars,
      error,
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
    // const name = this.getAppName(appID);
    console.log(this.props);
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
                                {/* <div className={styles.InputTooltipContainerDB}>
                                  <Tooltip
                                    showIcon
                                    message="Registry server for example: docker.io or gcr.io"
                                    position="left"
                                  />
                                </div> */}
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
                    <div className={styles.flexa}>
                      {app.status === "running" ? (
                        <div className={styles.StatusIcon}>
                          <Status status={app.status} />
                          <div>&nbsp;Ready</div>
                        </div>
                      ) : (
                        <div className={styles.StatusIcon}>
                          <Status status={app.status} />
                          <div>&nbsp;Failing</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Age</div>
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
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Link</div>
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
                </div>
              </div>
              <hr />
              <div className={styles.APPSections}>
                <div className={styles.APPSectionTitle}>Manage application</div>
                <div className={styles.APPInstructions}>
                  <div className={styles.APPButtonRow}>
                    <strong>Name</strong>
                  </div>
                  <div className={styles.flexa}>My nicename</div>
                </div>
              </div>
              <div className={styles.APPSections}>
                <div className={styles.APPSectionTitle}>Manage application</div>
                <div className={styles.APPInstructions}>
                  <div className={styles.APPButtonRow}>
                    <strong>Name</strong>
                  </div>
                  <div className="flexa">My nicename</div>
                </div>
              </div>
              <div className={styles.APPSections}>
                <div className={styles.APPSectionTitle}>Manage application</div>
                <div className={styles.APPInstructions}>
                  <div className={styles.APPButtonRow}>
                    <strong>Name</strong>
                  </div>
                  <div className="flexa">My nicename</div>
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
  return {
    // apps,
    isDeleting,
    isDeleted,
    isFailed,
    message,
    app,
  };
};

const mapDispatchToProps = {
  deleteApp,
  clearState,
  getSingleApp,
  UpdateApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
