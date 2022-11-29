import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import deleteApp, { clearState } from "../../redux/actions/deleteApp";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import SideBar from "../../components/SideBar";
import Feedback from "../../components/Feedback";
import Checkbox from "../../components/Checkbox";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
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
import RemoveIcon from "../../assets/images/remove.svg";
import { v4 as uuidv4 } from "uuid";
import { validateDomain, validateDomainName } from "../../helpers/validation";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";

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
      envVars: "",
      entryCommand: app?.command ? app?.command : "",
      port: app?.port ? app?.port : "",
      replicas: "",
      updating_port: false,
      updating_command: false,
      updating_form: false,
      urlReverted: false,
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
  }

  componentDidUpdate(prevProps) {
    const {
      isDeleted,
      isUpdated,
      getSingleApp,
      clearUpdateAppState,
      clearUrlRevertState,
      isUpdating,
      isReverted,
      match: { params },
    } = this.props;

    const { updating_command, updating_form, updating_port } = this.state;

    if (isDeleted !== prevProps.isDeleted) {
      this.hideDeleteAlert();
    }

    if (
      isUpdated !== prevProps.isUpdated ||
      isReverted !== prevProps.isReverted
    ) {
      clearUpdateAppState();
      clearUrlRevertState();
      getSingleApp(params.appID);
      window.location.reload();
    }

    if (isUpdating !== prevProps.isUpdating) {
      if (updating_command && !isUpdating) {
        this.setState({ updating_command: false });
      }
      if (updating_port && !isUpdating) {
        this.setState({ updating_port: false });
      }
      if (updating_form && !isUpdating) {
        this.setState({ updating_form: false });
      }
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
      dockerCredentials: { username, email, password, server },
    } = this.state;
    // project name from line 105 disappears on refreash, another source of the name was needed
    //const { name } = this.props.location;
    const { projectID, appID } = params;
    const replicaOptions = [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
    ];
    console.log(app);

    return (
      <div className={styles.Page}>
        {isDeleted || isReverted ? this.renderRedirect() : null}
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={app?.name}
              params={params}
              // description={description}
              pageRoute={this.props.location?.pathname}
              allMetricsLink={`/projects/${projectID}/apps/${appID}/dashboard`}
              cpuLink={`/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/projects/${projectID}/databases`}
              networkLink={`/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header="Settings" />
            </div>
            <div className={`${styles.ContentSection} SmallContainer`}>
              {isRetrieving ? (
                <div className="NoResourcesMessage">
                  <div className="SpinnerWrapper">
                    <Spinner size="big" />
                  </div>
                </div>
              ) : (
                isFetched && (
                  <div className={styles.AppContainer}>
                    <div className={styles.APPSections}>
                      <div className={styles.APPSectionTitle}>
                        App Information
                      </div>
                      <div className={styles.APPInstructions}>
                        <div className={styles.APPButtonRow}>
                          <div className={styles.AppLabel}>Name</div>
                          <div className={styles.flexa}>{app?.name}</div>
                        </div>
                        <div className={styles.APPButtonRow}>
                          <div className={styles.AppLabel}>Alias</div>
                          <div className={styles.flexa}>{app?.alias}</div>
                        </div>
                        <div className={styles.APPButtonRow}>
                          <div className={styles.AppLabel}>Image</div>
                          <div className={styles.flexa}>
                            <BlackInputText
                              required
                              placeholder={app?.image}
                              name="newImage"
                              value={newImage ? newImage : app?.image}
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
                                  <div className={styles.AppLabel}>
                                    Username
                                  </div>
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
                                      placeholder={
                                        app.email ? app.email : "Email"
                                      }
                                      name="email"
                                      value={email}
                                      onChange={(e) => {
                                        this.handleDockerCredentialsChange(e);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className={styles.APPButtonRow}>
                                  <div className={styles.AppLabel}>
                                    Password
                                  </div>
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
                                    <div
                                      className={styles.InputFieldWithTooltip}
                                    >
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
                                  Click for more instructions on how to set up
                                  you custom domain.
                                </div>
                                <div className={styles.RevertSection}>
                                  <div className={styles.FlexRevertSection}>
                                    <div>
                                      <strong>Revert to URL</strong>
                                    </div>
                                    <div>
                                      Reverts to cranecloud's auto-generated
                                      URL.
                                    </div>
                                  </div>
                                  <div className={styles.SectionButtons}>
                                    <PrimaryButton
                                      label={
                                        isReverting ? <Spinner /> : "REVERT"
                                      }
                                      className={styles.RevertButton}
                                      onClick={this.domainRevert}
                                      disable={urlReverted}
                                    />
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
                                  "App has " + app.replicas + " replica(s)"
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
                          <div className={styles.AppLabel}>Revisions</div>
                          <div className={styles.flexa}>{app.revisions}</div>
                        </div>
                        <div className={styles.APPButtonRow}>
                          <div className={styles.AppLabel}>Link</div>
                          {app.url ? (
                            <div className={styles.CopyDiv}>
                              <div className="DBTDetail">{app.url}</div>
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
                              label={
                                isUpdating && updating_form ? (
                                  <Spinner />
                                ) : (
                                  "UPDATE"
                                )
                              }
                              disable={isUpdating}
                              className={isUpdating && styles.deactivatedBtn}
                              onClick={this.handleSubmit}
                            />
                          </div>
                        </div>
                        {error && (
                          <div className={styles.errorCenterDiv}>
                            <Feedback type="error" message={error} />
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className={styles.HorizontalLine} />
                    <div className={styles.APPSections}>
                      <div className={styles.APPSectionTitle}>
                        Application Revisions
                      </div>
                      <div className={styles.AppDeleteInstructions}>
                        <div className={styles.APPInstruct}>
                          <div className={styles.AppRevision}>
                            <CheckMark className={styles.Success} />
                            <div>
                              <div>
                                <span className={styles.Entity}>38438229</span>{" "}
                                <span className={styles.Time}>
                                  10:49am 09-13-2023
                                </span>
                                <span className={styles.AppDetails}>
                                  <span className={styles.Entity}>
                                    {app.name}
                                  </span>{" "}
                                  by rhodinemma
                                </span>
                              </div>
                              <div className={styles.RevisionStatus}>
                                <div className={styles.Success}>Successful</div>
                                <div className={styles.Rollback__Option}>
                                  Rollback here
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.AppRevision}>
                            <Danger className={styles.Danger} />
                            <div>
                              <div>
                                <span className={styles.Entity}>38438229</span>{" "}
                                <span className={styles.Time}>
                                  10:49am 09-13-2023
                                </span>
                                <span className={styles.AppDetails}>
                                  <span className={styles.Entity}>
                                    {app.name}
                                  </span>{" "}
                                  by rhodinemma
                                </span>
                              </div>
                              <div className={styles.RevisionStatus}>
                                <div className={styles.Danger}>Failed</div>
                                <div className={styles.Rollback__Option}>
                                  Rollback here
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.AppRevision}>
                            <CheckMark className={styles.Success} />
                            <div>
                              <div>
                                <span className={styles.Entity}>38438229</span>{" "}
                                <span className={styles.Time}>
                                  10:49am 09-13-2023
                                </span>
                                <span className={styles.AppDetails}>
                                  <span className={styles.Entity}>
                                    {app.name}
                                  </span>{" "}
                                  by rhodinemma
                                </span>
                              </div>
                              <div className={styles.RevisionStatus}>
                                <div className={styles.Success}>Successful</div>
                                <div className={styles.Rollback__Option}>
                                  Rollback here
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className={styles.HorizontalLine} />
                    <div className={styles.APPSections}>
                      {/* <div className={styles.APPSectionPort}> */}
                      <div className={styles.APPSectionTitle}>
                        Environment Vars
                      </div>
                      <div className={styles.ModalFormInputsEnvVars}>
                        {app.env_vars && (
                          <div className={styles.EnvData}>
                            <div className={styles.EnvDataItem}>
                              <div>Name</div>
                              <div>Value</div>
                              <div>Remove</div>
                            </div>
                            {Object.keys(app.env_vars).map((envVar, index) => (
                              <div key={index} className={styles.EnvDataItem}>
                                <div>{envVar}</div>
                                <div>{app.env_vars[envVar]}</div>
                                <div className={styles.RemoveIconBtn}>
                                  <img
                                    src={RemoveIcon}
                                    alt="remove_ico"
                                    onClick={() => this.removeEnvVar(index)}
                                    role="presentation"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {Object.keys(envVars).length > 0 && (
                          <div className={styles.EnvData}>
                            {!app.env_vars && (
                              <div className={styles.EnvDataItem}>
                                <div>Name</div>
                                <div>Value</div>
                                <div>Remove</div>
                              </div>
                            )}

                            {Object.keys(envVars).map((envVar, index) => (
                              <div
                                key={uuidv4()}
                                className={styles.EnvDataItem}
                              >
                                <div>{Object.keys(envVars)[index]}</div>
                                <div>
                                  {envVars[Object.keys(envVars)[index]]}
                                </div>
                                <div className={styles.RemoveIconBtn}>
                                  <img
                                    src={RemoveIcon}
                                    alt="remove_ico"
                                    onClick={() => this.removeEnvVar(index)}
                                    role="presentation"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className={styles.EnvDataItem}>
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
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          />
                          <div className={styles.EnvVarsAddBtn}>
                            <PrimaryButton
                              label="add"
                              onClick={this.addEnvVar}
                              className={styles.EnvVarAddBtn}
                            />
                          </div>
                        </div>
                        {Object.keys(envVars).length > 0 && (
                          <div className={styles.APPButton}>
                            <div className={styles.UpperSection}>
                              <PrimaryButton
                                label={isUpdating ? <Spinner /> : "UPDATE"}
                                onClick={this.handleEnvVarsSubmit}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <hr className={styles.HorizontalLine} />
                    <div className={styles.APPSections}>
                      <div className={styles.APPSectionTitle}>
                        Port & Entry commands
                      </div>
                      <div className={styles.AppOtherSection}>
                        <div className={styles.PortSection}>
                          <div>Port</div>
                          <div>
                            <input
                              type="text"
                              placeholder={app.port}
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
                              label={
                                isUpdating && updating_port ? (
                                  <Spinner />
                                ) : (
                                  "UPDATE"
                                )
                              }
                              disable={isUpdating}
                              className={isUpdating && styles.deactivatedBtn}
                              onClick={this.handlePortSubmit}
                            />
                          </div>
                        </div>
                        <div className={styles.PortSection}>
                          <div>Entry Command</div>
                          <div className={styles.commandInputSection}>
                            <div>
                              <input
                                type="text"
                                placeholder={
                                  app.command ? app.command : "command"
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
                              label={
                                isUpdating && updating_command ? (
                                  <Spinner />
                                ) : (
                                  "UPDATE"
                                )
                              }
                              disable={isUpdating}
                              className={isUpdating && styles.deactivatedBtn}
                              onClick={this.handleCommandSubmit}
                            />
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

                    <hr className={styles.HorizontalLine} />
                    <div className={styles.APPSections}>
                      <div className={styles.APPSectionDelete}>
                        Delete application
                      </div>
                      <div className={styles.AppDeleteInstructions}>
                        <div className={styles.APPInstruct}>
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
                                  This will permanently delete the application.
                                  Please confirm by typing{" "}
                                  <b className={styles.DeleteWarning}>
                                    {app.name}
                                  </b>{" "}
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
                                  onClick={(e) =>
                                    this.handleDeleteApp(e, appID)
                                  }
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
                                <div className={styles.Step__Title}>
                                  Step 1.
                                </div>
                                <div className={styles.Step__Description}>
                                  <div>
                                    Login to your domain register account (e.g.
                                    GoDaddy, NameCheap, Google Domains), then
                                    locate
                                  </div>
                                  <div>
                                    {" "}
                                    the DNS settings or management page for your
                                    domain.
                                  </div>
                                </div>
                              </div>
                              <div className={styles.Description__Step}>
                                <div className={styles.Step__Title}>
                                  Step 2.
                                </div>
                                <div className={styles.Step__Description}>
                                  <div>
                                    Add A-Records. Add A-records inorder to use
                                    your root domain(i.e custom domain).
                                  </div>
                                  <div>
                                    Edit any existing A Records with Host Name @
                                  </div>
                                  <div>
                                    Do not edit or delete A-Records for Mail or
                                    Email as it could interfere with your email
                                    service.{" "}
                                  </div>
                                  <div>
                                    An example of A-records with the IP address
                                    we shall provide you;
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
                                <button onClick={this.hideDomainModal}>
                                  OK
                                </button>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    )}
                  </div>
                )
              )}
              {!isRetrieving && !isFetched && (
                <div className={styles.NoResourcesMessage}>
                  Oops! Something went wrong! Failed to retrieve app
                  information.
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
