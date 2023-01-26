import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import deleteApp, { clearState } from "../../redux/actions/deleteApp";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import Feedback from "../../components/Feedback";
import Checkbox from "../../components/Checkbox";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/trash-2.svg";
import { ReactComponent as Checked } from "../../assets/images/checked.svg";
import Select from "../../components/Select";
import DeleteWarning from "../../components/DeleteWarning";
import AppStatus from "../../components/AppStatus";
import styles from "./AppSettingsPage.module.css";
import BlackInputText from "../../components/BlackInputText";
import getSingleApp, {
  clearFetchAppState,
} from "../../redux/actions/getSingleApp";
import updateApp, { clearUpdateAppState } from "../../redux/actions/updateApp";
import revertUrl, { clearUrlRevertState } from "../../redux/actions/revertUrl";
import { v4 as uuidv4 } from "uuid";
import { validateDomain, validateDomainName } from "../../helpers/validation";
import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
} from "../../apis/apis";
import { DisplayDateTime } from "../../helpers/dateConstants";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

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
      domainModal: false,
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
      isCustomDomain: app?.has_custom_domain ? true : false,
      domainName: "",
      uri: app?.uri ? app?.uri : "",
      varName: "",
      varValue: "",
      envVars: {},
      entryCommand: app?.command ? app?.command : "",
      port: app?.port ? app?.port : "",
      replicas: "",
      updating_port: false,
      updating_command: false,
      updating_form: false,
      urlReverted: false,
      revisions: [],
      appDetail: [],
      fetchingAppDetails: true,
      revisionId: "",
      rollBackConfirmationModal: false,
      revisingApp: false,
      revisingAppError: "",
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
    this.toggleCustomDomain = this.toggleCustomDomain.bind(this);
    this.handleSelectReplicas = this.handleSelectReplicas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.urlOnClick = this.urlOnClick.bind(this);
    this.handlePortSubmit = this.handlePortSubmit.bind(this);
    this.handleCommandSubmit = this.handleCommandSubmit.bind(this);
    this.handleEnvVarsSubmit = this.handleEnvVarsSubmit.bind(this);
    this.showDomainModal = this.showDomainModal.bind(this);
    this.hideDomainModal = this.hideDomainModal.bind(this);
    this.domainRevert = this.domainRevert.bind(this);
    this.disableRevert = this.disableRevert.bind(this);
    this.regenerate = this.regenerate.bind(this);
    this.getAppRevisionDetails = this.getAppRevisionDetails.bind(this);
    this.rollbackApp = this.rollbackApp.bind(this);
    this.showAppRevisionModal = this.showAppRevisionModal.bind(this);
    this.hideAppRevisionModal = this.hideAppRevisionModal.bind(this);
    this.removeExistingEnvVar = this.removeExistingEnvVar.bind(this);
    this.getCurrentRevision = this.getCurrentRevision.bind(this);
  }

  handleChange(e) {
    const { openDeleteAlert, error } = this.state;
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

    if (error) {
      this.setState({
        error: "",
      });
    }
  }

  componentDidMount() {
    const {
      match: { params },
      getSingleApp,
      clearState,
      clearUpdateAppState,
      clearFetchAppState,
      clearUrlRevertState,
    } = this.props;
    const { appID } = params;
    clearFetchAppState();
    clearState();
    clearUpdateAppState();
    clearUrlRevertState();
    getSingleApp(appID);
    this.getAppRevisionDetails();
  }

  getAppRevisionDetails() {
    const {
      match: { params },
    } = this.props;
    const { appID } = params;
    handleGetRequest(`/apps/${appID}`)
      .then((response) => {
        this.setState({
          appDetail: response.data.data.apps,
          revisions: response.data.data.revisions,
          fetchingAppDetails: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Failed to fetch app revisions",
          fetchingAppDetails: false,
        });
      });
  }

  getCurrentRevision(revisions) {
    let currentRevision = revisions.find(
      (revision) => revision.current === true
    );
    return currentRevision.revision_id;
  }

  rollbackApp(revisionId) {
    const {
      match: { params },
    } = this.props;
    const { appID } = params;
    const { app } = this.props;
    const projectID = app.project_id;
    this.setState({
      revisingApp: true,
    });
    handlePostRequestWithOutDataObject(
      revisionId,
      `/apps/${appID}/revise/${revisionId}`
    )
      .then(() => {
        window.location.href = `/projects/${projectID}/apps/${appID}/settings`;
        this.setState({
          revisingApp: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  showAppRevisionModal(revisionId) {
    this.setState({
      revisionId: revisionId,
      rollBackConfirmationModal: true,
      reviseAppError: "",
    });
  }

  hideAppRevisionModal() {
    this.setState({
      rollBackConfirmationModal: false,
    });
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     isDeleted,
  //     isUpdated,
  //     getSingleApp,
  //     clearUpdateAppState,
  //     clearUrlRevertState,
  //     isUpdating,
  //     isReverted,
  //     match: { params },
  //   } = this.props;

  //   const { updating_command, updating_form, updating_port } = this.state;

  //   if (isDeleted !== prevProps.isDeleted) {
  //     this.hideDeleteAlert();
  //   }

  //   if (
  //     isUpdated !== prevProps.isUpdated ||
  //     isReverted !== prevProps.isReverted
  //   ) {
  //     clearUpdateAppState();
  //     clearUrlRevertState();
  //     getSingleApp(params.appID);
  //     window.location.reload();
  //   }

  //   if (isUpdating !== prevProps.isUpdating) {
  //     if (updating_command && !isUpdating) {
  //       this.setState({ updating_command: false });
  //     }
  //     if (updating_port && !isUpdating) {
  //       this.setState({ updating_port: false });
  //     }
  //     if (updating_form && !isUpdating) {
  //       this.setState({ updating_form: false });
  //     }
  //   }
  // }

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
    const { isDeleted, isReverted, clearState, clearUrlRevertState } =
      this.props;
    const { projectID } = this.props.match.params;
    if (isDeleted) {
      clearState();
      return <Redirect to={`/projects/${projectID}/apps`} noThrow />;
    }
    if (isReverted) {
      clearUrlRevertState();
      return <Redirect to={`/projects/${projectID}/apps`} noThrow />;
    }
  };
  regenerate() {
    const {
      revertUrl,
      match: { params },
    } = this.props;
    revertUrl(params.appID);
  }

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

    if (varName.trim() && varValue.trim()) {
      this.setState((prevState) => ({
        envVars: {
          ...prevState.envVars,
          [varName.trim()]: varValue.trim(),
        },
      }));
      this.setState({
        varName: "",
        varValue: "",
      });
    } else {
      this.setState({
        error: "Provide an environment variable key and value.",
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
  removeExistingEnvVar(index) {
    const {
      match: { params },
      updateApp,
    } = this.props;
    const { appDetail } = this.state;
    const { appID } = params;
    const keyToRemove = Object.keys(appDetail.env_vars)[index];
    const newEnvVars = Object.keys(appDetail.env_vars).reduce((object, key) => {
      if (key !== keyToRemove) {
        object[key] = appDetail.env_vars[key]; // eslint-disable-line no-param-reassign
      }
      return object;
    }, {});
    updateApp(appID, { env_vars: newEnvVars });
  }

  togglePrivateImage() {
    const { isPrivateImage } = this.state;
    this.setState({
      isPrivateImage: !isPrivateImage,
    });
  }

  toggleCustomDomain() {
    const { isCustomDomain } = this.state;
    this.setState({
      isCustomDomain: !isCustomDomain,
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

  handleEnvVarsSubmit() {
    const {
      match: { params },
      updateApp,
    } = this.props;
    const { appID } = params;
    const { envVars } = this.state;
    updateApp(appID, { env_vars: envVars });
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
      this.setState({ updating_port: true });
      updateApp(appID, { port: parseInt(port, 10) });
    }
  }

  handleCommandSubmit() {
    const {
      match: { params },
      updateApp,
      app,
    } = this.props;
    const { appID } = params;
    const { entryCommand } = this.state;
    if (entryCommand === app.command) {
      this.setState({ commandError: "Enter a new command." });
    } else if (entryCommand && entryCommand.length > 0) {
      this.setState({ updating_command: true });
      updateApp(appID, { command: entryCommand });
    } else {
      this.setState({ commandError: "Please enter a command" });
    }
  }

  handleSubmit() {
    const {
      isPrivateImage,
      dockerCredentials: { username, email, password, server },
      domainName,
      isCustomDomain,
      replicas,
      newImage,
    } = this.state;
    const {
      updateApp,
      match: { params },
      app,
    } = this.props;

    if (!newImage && replicas === "" && !domainName && !isPrivateImage) {
      this.setState({
        error: "No changes made",
      });
    } else if (newImage && !isPrivateImage && replicas === "" && !domainName) {
      this.setState({ updating_form: true });
      updateApp(params.appID, { image: newImage });
    } else if (!newImage && !isPrivateImage && replicas !== "" && !domainName) {
      this.setState({ updating_form: true });
      updateApp(params.appID, { replicas: replicas });
    } else if (newImage && !isPrivateImage && replicas !== "" && !domainName) {
      this.setState({ updating_form: true });
      updateApp(params.appID, { image: newImage, replicas: replicas });
    } else if (!newImage && !isPrivateImage && replicas === "" && domainName) {
      let error = validateDomain(domainName.toLowerCase());
      if (error) {
        this.setState({
          error: error,
        });
      } else {
        this.setState({ updating_form: true });
        updateApp(params.appID, { custom_domain: domainName.toLowerCase() });
      }
    } else if (newImage && !isPrivateImage && replicas !== "" && domainName) {
      let setDomainName = domainName.toLowerCase();
      this.setState({ updating_form: true });
      updateApp(params.appID, {
        image: newImage,
        replicas: replicas,
        custom_domain: setDomainName,
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
    } else if (isCustomDomain && !domainName) {
      this.setState({
        error: "Please enter a domain name",
      });
    } else if (domainName && validateDomainName(domainName) === false) {
      this.setState({
        error: "Domain name should start with a letter",
      });
    } else if (
      domainName &&
      validateDomainName(domainName) === "false_convention"
    ) {
      this.setState({
        error: "Use accepted formats for example google.com, domain.ug",
      });
    } else {
      let appInfo = {
        image: app.image,
        project_id: params.projectID,
        private_image: isPrivateImage,
      };
      if (isPrivateImage === true && domainName) {
        let setDomainName = domainName.toLowerCase();
        if (replicas === "") {
          appInfo = {
            ...appInfo,
            docker_email: email,
            docker_username: username,
            docker_password: password,
            docker_server: server,
            replicas: app.replicas,
          };
          this.setState({ updating_form: true });
          appInfo = { ...appInfo, custom_domain: setDomainName };
          updateApp(params.appID, appInfo);
        } else {
          appInfo = {
            ...appInfo,
            docker_email: email,
            docker_username: username,
            docker_password: password,
            docker_server: server,
            replicas: replicas,
          };
          this.setState({ updating_form: true });
          updateApp(params.appID, appInfo);
        }
      } else {
        if (replicas === "") {
          appInfo = {
            ...appInfo,
            docker_email: email,
            docker_username: username,
            docker_password: password,
            docker_server: server,
            replicas: app.replicas,
          };
          this.setState({ updating_form: true });
          updateApp(params.appID, appInfo);
        } else {
          appInfo = {
            ...appInfo,
            docker_email: email,
            docker_username: username,
            docker_password: password,
            docker_server: server,
            replicas: replicas,
          };
          this.setState({ updating_form: true });
          updateApp(params.appID, appInfo);
        }
      }
    }
  }

  showUpdateModal() {
    this.setState({ updateModal: true });
  }

  hideUpdateModal() {
    this.setState({ updateModal: false });
  }

  showDomainModal() {
    this.setState({ domainModal: true });
  }

  hideDomainModal() {
    this.setState({ domainModal: false });
  }

  domainRevert() {
    const {
      revertUrl,
      match: {
        params: { appID },
      },
    } = this.props;
    revertUrl(appID);
    this.disableRevert();
  }

  disableRevert() {
    const { isReverted } = this.props;
    if (isReverted) {
      this.setState({
        urlReverted: true,
      });
    }
  }

  render() {
    const {
      match: { params },
      data: { beta },
      isDeleting,
      isDeleted,
      message,
      isFailed,
      app,
      isFetched,
      isRetrieving,
      isUpdating,
      isReverted,
      errorMessage,
      isReverting,
    } = this.props;

    const {
      openDeleteAlert,
      domainModal,
      ConfirmAppname,
      disableDelete,
      newImage,
      urlChecked,
      error,
      portError,
      commandError,
      entryCommand,
      port,
      varValue,
      varName,
      envVars,
      isPrivateImage,
      isCustomDomain,
      domainName,
      dockerCredentials,
      updating_command,
      updating_port,
      updating_form,
      urlReverted,
      revisions,
      appDetail,
      fetchingAppDetails,
      revisionId,
      rollBackConfirmationModal,
      revisingApp,
      revisingAppError,
      dockerCredentials: { username, email, password, server },
    } = this.state;
    // project name from line 105 disappears on refreash, another source of the name was needed
    //const { name } = this.props.location;
    console.log(revisions);
    const { appID } = params;
    const replicaOptions = [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
    ];

    return (
      <DashboardLayout name={appDetail?.name} header="App Settings" short>
        {isDeleted || isReverted ? this.renderRedirect() : null}

        {fetchingAppDetails ? (
          <div className="NoResourcesMessage">
            <div className="SpinnerWrapper">
              <Spinner size="big" />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.AppPageLayout}>
              <div className={styles.APPSections}>
                <div className="SectionTitle">App Information</div>
                <div className={`${styles.APPInstructions} BigCard`}>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Name</div>
                    <div className={styles.flexa}>{appDetail?.name}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Alias</div>
                    <div className={styles.flexa}>{appDetail?.alias}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Image</div>
                    <div className={styles.flexa}>
                      <BlackInputText
                        required
                        placeholder={appDetail?.image}
                        name="newImage"
                        value={newImage ? newImage : appDetail?.image}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Private Image</div>
                    <Checkbox
                      isBlack
                      onClick={this.togglePrivateImage}
                      isChecked={isPrivateImage}
                    />
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

                  {beta && (
                    <div className={styles.APPButtonRow}>
                      <div className={styles.AppLabel}>Custom Domain</div>
                      <Checkbox
                        isBlack
                        onClick={this.toggleCustomDomain}
                        isChecked={isCustomDomain}
                      />
                    </div>
                  )}

                  {isCustomDomain && (
                    <div className={styles.CustomDomainTabContainer}>
                      <div index={1}>
                        <div className={styles.CustomDomainInputs}>
                          <div className={styles.APPButtonRow}>
                            <div className={styles.AppLabel}>
                              {app?.has_custom_domain === true && (
                                <span>Edit &nbsp;</span>
                              )}
                              Domain name
                            </div>
                            <div className={styles.flexa}>
                              <BlackInputText
                                required
                                placeholder="Domain name"
                                name="domainName"
                                value={domainName.toLowerCase()}
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className={styles.Domain__Popup}
                            onClick={this.showDomainModal}
                          >
                            Click for more instructions on how to set up you
                            custom domain.
                          </div>
                          <div className={styles.RevertSection}>
                            <div className={styles.FlexRevertSection}>
                              <div>
                                <strong>Revert to URL</strong>
                              </div>
                              <div>
                                Reverts to cranecloud's auto-generated URL.
                              </div>
                            </div>
                            <div className={styles.SectionButtons}>
                              <PrimaryButton
                                className={styles.RevertButton}
                                onClick={this.domainRevert}
                                disable={urlReverted}
                              >
                                {isReverting ? <Spinner /> : "REVERT"}
                              </PrimaryButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Replicas</div>
                    <div className={styles.flexa}>
                      <div className={styles.ReplicasSelect}>
                        <Select
                          placeholder={
                            "App has " + appDetail?.replicas + " replica(s)"
                          }
                          options={replicaOptions}
                          isSmall
                          onChange={this.handleSelectReplicas}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Status</div>
                    <div className={styles.ShowStatus}>
                      {appDetail.app_running_status === "running" ? (
                        <div className={styles.StatusIcon}>
                          <AppStatus appStatus={appDetail.app_running_status} />
                          <div>&nbsp;Ready</div>
                        </div>
                      ) : (
                        <div className={styles.StatusIcon}>
                          <AppStatus appStatus={appDetail.app_running_status} />
                          <div>&nbsp;Failing</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Age</div>
                    <div className={styles.flexa}>{appDetail.age}</div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Current Revision</div>
                    <div className={styles.flexa}>
                      {this.getCurrentRevision(revisions)}
                    </div>
                  </div>
                  <div className={styles.APPButtonRow}>
                    <div className={styles.AppLabel}>Link</div>
                    {app.url ? (
                      <div className={styles.CopyDiv}>
                        <div className="DBTDetail">{appDetail.url}</div>
                        <div className={styles.CopyUrl}>
                          <CopyText onClick={this.urlOnClick} />
                          {urlChecked ? <Checked /> : null}
                        </div>
                      </div>
                    ) : (
                      <>
                        {isReverting ? (
                          <Spinner />
                        ) : (
                          <div
                            className={styles.InnerContentWarnText}
                            onClick={() => {
                              this.regenerate();
                            }}
                          >
                            Click to re-generate url
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.APPButton}>
                    <div className={styles.UpperSection}>
                      <PrimaryButton
                        disable={isUpdating}
                        className={isUpdating && styles.deactivatedBtn}
                        onClick={this.handleSubmit}
                      >
                        {isUpdating && updating_form ? <Spinner /> : "Update"}
                      </PrimaryButton>
                    </div>
                  </div>
                  {error && (
                    <div className={styles.errorCenterDiv}>
                      <Feedback type="error" message={error} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.APPSections}>
                <div className="SectionTitle">App Revisions</div>

                <div className={`${styles.AppRevisionsDetails} BigCard`}>
                  {revisions?.map((entry, index) => (
                    <div className={styles.APPInstruct} key={index}>
                      <div className={styles.AppRevision}>
                        <Upload className={styles.Success} />
                        <div>
                          <div>
                            <span className={styles.Entity}>
                              {entry.revision_id}
                            </span>{" "}
                            <span className={styles.Time}>
                              {DisplayDateTime(new Date(entry.created_at))}
                            </span>
                            <span className={styles.AppDetails}>
                              <span>{appDetail.name}</span> - {entry.image}
                            </span>
                          </div>
                          <div className={styles.RevisionStatus}>
                            <div className={styles.Success}>
                              {JSON.stringify(entry.current)
                                ? "Current"
                                : "Revision: " + entry.revision}
                            </div>
                            <div
                              className={styles.Rollback__Option}
                              onClick={() =>
                                this.showAppRevisionModal(entry.revision_id)
                              }
                            >
                              {JSON.stringify(entry.current)
                                ? null
                                : "Rollback here"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Modal
                showModal={rollBackConfirmationModal}
                onClickAway={this.hideAppRevisionModal}
              >
                <div className={styles.ReviseAppModal}>
                  <div className={styles.DeleteProjectModalUpperSection}>
                    <div className={styles.WarningContainer}>
                      <div className={styles.ReviseAppDescription}>
                        Are you sure you want to revise your app?
                      </div>
                    </div>
                  </div>
                  <div className={styles.ReviseAppModalLowerSection}>
                    <div className={styles.ReviseAppModalButtons}>
                      <PrimaryButton
                        className="CancelBtn"
                        label="Cancel"
                        onClick={this.hideAppRevisionModal}
                      >
                        Cancel
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={(e) => this.rollbackApp(revisionId)}
                      >
                        {revisingApp ? <Spinner /> : "Confirm"}
                      </PrimaryButton>
                    </div>
                  </div>
                  {revisingAppError && (
                    <Feedback type="error" message={"Failed to rollback"} />
                  )}
                </div>
              </Modal>

              <div className={styles.APPSections}>
                {/* <div className={styles.APPSectionPort}> */}
                <div className="SectionTitle">Environment Variables</div>
                <div className={`${styles.ModalFormInputsEnvVars} BigCard`}>
                  <div>
                    {appDetail.env_vars && (
                      <div className={styles.EnvData}>
                        <div className={styles.EnvDataItem}>
                          <div>Name</div>
                          <div>Value</div>
                        </div>
                        {Object.keys(appDetail.env_vars).map(
                          (envVar, index) => (
                            <div key={index} className={styles.EnvDataItem}>
                              <div>{envVar}</div>
                              <div className={styles.EnvValue}>
                                <div style={{ flex: 1 }}>
                                  {appDetail.env_vars[envVar]}
                                </div>
                                <div
                                  className={
                                    isUpdating
                                      ? styles.RemoveIconUpdating
                                      : styles.RemoveIconBtn
                                  }
                                  onClick={() =>
                                    this.removeExistingEnvVar(index)
                                  }
                                  title={
                                    isUpdating ? "Updating" : "Remove Item"
                                  }
                                >
                                  <DeleteIcon width={16} height={16} />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {Object.keys(envVars).length > 0 && (
                      <div className={styles.EnvData}>
                        {!appDetail.env_vars && (
                          <div className={styles.EnvDataItem}>
                            <div>key</div>
                            <div>Value</div>
                            <div></div>
                          </div>
                        )}

                        {Object.keys(envVars).map((envVar, index) => (
                          <div key={uuidv4()} className={styles.EnvDataItem}>
                            <div>{Object.keys(envVars)[index]}</div>
                            <div className={styles.EnvValue}>
                              <div style={{ flex: 1 }}>
                                {envVars[Object.keys(envVars)[index]]}
                              </div>
                              <div
                                className={styles.RemoveIconBtn}
                                onClick={() => this.removeEnvVar(index)}
                                title="Remove Item"
                              >
                                <DeleteIcon width={16} height={16} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.EnvInputItem}>
                    <input
                      placeholder="Name"
                      name="varName"
                      value={varName}
                      className={styles.varInput}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <input
                      placeholder="Value"
                      name="varValue"
                      value={varValue}
                      className={styles.varInput}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <div className={styles.EnvVarsAddBtn}>
                      <PrimaryButton
                        onClick={this.addEnvVar}
                        color="primary"
                        small
                      >
                        Add
                      </PrimaryButton>
                    </div>
                  </div>
                  {Object.keys(envVars).length > 0 && (
                    <div className={styles.APPButton}>
                      <div className={styles.UpperSection}>
                        <PrimaryButton onClick={this.handleEnvVarsSubmit} small>
                          {isUpdating ? <Spinner /> : "Update"}
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.APPSections}>
                <div className="SectionTitle">Port & Entry commands</div>
                <div className={`${styles.AppOtherSection} BigCard`}>
                  <div className={styles.PortSection}>
                    <div>Port</div>
                    <div>
                      <input
                        type="text"
                        placeholder={appDetail.port}
                        name="port"
                        value={port}
                        className={styles.portInput}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                      />
                    </div>
                    <div className={styles.APPOptionsButton}>
                      <PrimaryButton
                        disable={isUpdating}
                        onClick={this.handlePortSubmit}
                        small
                      >
                        {isUpdating && updating_port ? <Spinner /> : "Update"}
                      </PrimaryButton>
                    </div>
                  </div>
                  <div className={styles.PortSection}>
                    <div>Entry Command</div>
                    <div className={styles.commandInputSection}>
                      <div>
                        <input
                          type="text"
                          placeholder={
                            appDetail.command ? appDetail.command : "command"
                          }
                          name="entryCommand"
                          value={entryCommand}
                          className={styles.portInput}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.APPOptionsButton}>
                      <PrimaryButton
                        disable={isUpdating}
                        // className={isUpdating && styles.deactivatedBtn}
                        onClick={this.handleCommandSubmit}
                        small
                      >
                        {isUpdating && updating_command ? (
                          <Spinner />
                        ) : (
                          "Update"
                        )}
                      </PrimaryButton>
                    </div>
                  </div>
                  {portError && (
                    <div className={styles.errorCenterDiv}>
                      <Feedback type="error" message={portError} />
                    </div>
                  )}
                  {errorMessage && (
                    <div className={styles.errorCenterDiv}>
                      <Feedback type="error" message={errorMessage} />
                    </div>
                  )}
                  {commandError && (
                    <div className={styles.errorCenterDiv}>
                      <Feedback type="error" message={commandError} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.APPSections}>
                <div className="SectionTitle">Danger Zone</div>
                <div className={`${styles.AppDeleteInstructions} BigCard`}>
                  <div className={styles.APPInstruct}>
                    <div className="SubTitle">Delete Application</div>
                    <div>Deleting your app is irreversible.</div>
                  </div>
                  <div className={styles.DeleteButtonDiv}>
                    <PrimaryButton
                      color="red"
                      onClick={this.showDeleteAlert}
                      small
                    >
                      Delete App
                    </PrimaryButton>
                  </div>
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
                            <b className={styles.DeleteWarning}>
                              {appDetail.name}
                            </b>{" "}
                            below.
                          </div>
                          <div className={styles.InnerModalDescription}>
                            <BlackInputText
                              required
                              placeholder={appDetail.name}
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
                            className="CancelBtn"
                            onClick={this.hideDeleteAlert}
                          >
                            Cancel
                          </PrimaryButton>
                          <PrimaryButton
                            className={disableDelete && styles.InactiveDelete}
                            color={!disableDelete && "red"}
                            disable={disableDelete}
                            onClick={(e) => this.handleDeleteApp(e, appID)}
                          >
                            {isDeleting ? <Spinner /> : "Delete"}
                          </PrimaryButton>
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
              {domainModal && (
                <div className={styles.AppDeleteModel}>
                  <Modal
                    showModal={domainModal}
                    onClickAway={this.hideDomainModal}
                  >
                    <div className={styles.DomainModal__Main}>
                      <div className={styles.DomainModal__Title}>
                        Instructions on how to add an A-Record{" "}
                      </div>
                      <div className={styles.DomainModal__Description}>
                        <div className={styles.Description__Step}>
                          <div className={styles.Step__Title}>Step 1.</div>
                          <div className={styles.Step__Description}>
                            <div>
                              Login to your domain register account (e.g.
                              GoDaddy, NameCheap, Google Domains), then locate
                            </div>
                            <div>
                              {" "}
                              the DNS settings or management page for your
                              domain.
                            </div>
                          </div>
                        </div>
                        <div className={styles.Description__Step}>
                          <div className={styles.Step__Title}>Step 2.</div>
                          <div className={styles.Step__Description}>
                            <div>
                              Add A-Records. Add A-records inorder to use your
                              root domain(i.e custom domain).
                            </div>
                            <div>
                              Edit any existing A Records with Host Name @
                            </div>
                            <div>
                              Do not edit or delete A-Records for Mail or Email
                              as it could interfere with your email service.{" "}
                            </div>
                            <div>
                              An example of A-records with the IP address we
                              shall provide you;
                            </div>
                            <ul>
                              <li>A-Record: 3.209.XX.XX</li>
                              <li>Host or Name: @</li>
                              <li>Points To: 3.209.XX.XX</li>
                              <li>TTL: 1 Hour</li>
                              <li>Click: Save</li>
                            </ul>
                            <div>
                              <strong>Note:</strong> DNS settings may look
                              different for each
                            </div>
                          </div>
                        </div>
                        <div className={styles.Description__button}>
                          <button onClick={this.hideDomainModal}>OK</button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>
          </div>
        )}
        {!isRetrieving && !isFetched && (
          <div className={styles.NoResourcesMessage}>
            Oops! Something went wrong! Failed to retrieve app information.
          </div>
        )}
      </DashboardLayout>
    );
  }
}

AppSettingsPage.propTypes = {
  isDeleted: PropTypes.bool,
  isFailed: PropTypes.bool,
  deleteApp: PropTypes.func,
  clearState: PropTypes.func.isRequired,
  message: PropTypes.string,
};

AppSettingsPage.defaultProps = {
  isDeleted: false,
  isFailed: false,
  apps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = (state) => {
  const { isDeleting, isDeleted, isFailed, message } = state.deleteAppReducer;
  const { app, isRetrieving, isFetched } = state.singleAppReducer;
  const { isUpdating, isUpdated, errorMessage } = state.updateAppReducer;
  const { data } = state.user;
  const { isReverting, isReverted } = state.revertUrlReducer;
  return {
    isDeleting,
    isDeleted,
    isFailed,
    message,
    app,
    isUpdated,
    isUpdating,
    errorMessage,
    data,
    isFetched,
    isRetrieving,
    isReverted,
    isReverting,
  };
};

const mapDispatchToProps = {
  deleteApp,
  clearState,
  getSingleApp,
  updateApp,
  clearUpdateAppState,
  revertUrl,
  clearFetchAppState,
  clearUrlRevertState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSettingsPage);
