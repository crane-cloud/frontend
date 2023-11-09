import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import Select from "../Select";
//import CancelButton from "../CancelButton";
import BlackInputText from "../BlackInputText";
import { v4 as uuidv4 } from "uuid";
// import Modal from "../Modal";
import RemoveIcon from "../../assets/images/remove.svg";
//import ToggleOnOffButton from "../ToggleOnOffButton";
import { handlePostRequestWithOutDataObject } from "../../apis/apis.js";
import Spinner from "../Spinner";
import Feedback from "../Feedback";
import Checkbox from "../Checkbox";
import Tooltip from "../Tooltip";
import Tabs from "../Tabs";
import styles from "./CreateApp.module.css";
import { validateName } from "../../helpers/validation";
import MiraPage from "../../pages/MiraPage";
import { ReactComponent as Open } from "../../assets/images/open.svg";
import { ReactComponent as Closed } from "../../assets/images/close.svg";

// const dockerEmail = process.env.REACT_APP_DOCKER_EMAIL;
// const dockerPassword = process.env.REACT_APP_DOCKER_PASSWORD;

class CreateApp extends React.Component {
  constructor(props) {
    super(props);

    const {
      clusters: { clusters },
    } = this.props;
    this.state = {
      name: "",
      uri: "",
      varName: "",
      varValue: "",
      envVars: {},
      error: "",
      createFeedback: "",
      entryCommand: "",
      port: "",
      dockerEmail: "",
      dockerPassword: "",
      dockerUsername:"",
      dockerServer: "",
      isPrivateImage: false,
      isCustomDomain: false,
      currentDeploymentMethod: "default",
      domainName: "",
      dockerCredentials: {
        username: "",
        email: "",
        password: "",
        server: "",
        error: "",
        passwordShown: false,
      },
      replicas: 1,
      multiCluster: false,
      SelectedClusters: new Array(clusters?.length).fill(false),
      addingApp: false,
      addAppError: false,
      addErrorCode: "",
    };

    this.addEnvVar = this.addEnvVar.bind(this);
    this.removeEnvVar = this.removeEnvVar.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateDomainName = this.validateDomainName.bind(this);
    this.togglePrivateImage = this.togglePrivateImage.bind(this);
    this.toggleCustomDomain = this.toggleCustomDomain.bind(this);
    this.toggleDefaultDeployment = this.toggleDefaultDeployment.bind(this);
    this.toggleMiraDeployment = this.toggleMiraDeployment.bind(this);
    this.handleDockerCredentialsChange =
      this.handleDockerCredentialsChange.bind(this);
    this.handleSelectReplicas = this.handleSelectReplicas.bind(this);
    this.changeMultiSelectionOption =
      this.changeMultiSelectionOption.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createNewApp = this.createNewApp.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }
  handleOnChange(position) {
    const { SelectedClusters } = this.state;
    this.setState({
      SelectedClusters: SelectedClusters.map((item, index) =>
        index === position ? !item : item
      ),
    });
  }
  changeMultiSelectionOption() {
    const { multiCluster } = this.state;
    this.setState({
      multiCluster: !multiCluster,
    });
  }

  toggleDefaultDeployment() {
    this.setState({ currentDeploymentMethod: "default" });
  }

  toggleMiraDeployment() {
    this.setState({ currentDeploymentMethod: "mira" });
  }

  // componentDidMount() {
  // }

  componentDidUpdate(prevProps) {
    const {
      isCreated,
      params: { projectID },
    } = this.props;

    if (isCreated !== prevProps.isCreated) {
      return <Redirect to={`/projects/${projectID}/Apps`} noThrow />;
    }
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    this.setState(this.initialState);
  }

  togglePassword() {
    //this.setState({ hidden: !this.state.hidden });
    this.setState({ passwordShown: !this.state.passwordShown });
  }

  validateDomainName(domainName) {
    const expression =
      /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (regex.test(domainName)) {
      if (domainName.match(!regex)) {
        return "false_convention";
      }
      return true;
    }
    return false;
  }

  handleChange(e) {
    const { error, createFeedback } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (error) {
      this.setState({
        error: "",
      });
    }
    if (createFeedback) {
      this.setState({
        createFeedback: "",
      });
    }
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

  toggleCustomDomain() {
    const { isCustomDomain } = this.state;
    this.setState({
      isCustomDomain: !isCustomDomain,
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
      dockerEmail,
      dockerPassword,
      dockerUsername,
      dockerServer,
      dockerCredentials: { username, email, password, server },
      isCustomDomain,
      domainName,
      replicas,
    } = this.state;
    const { createApp, params } = this.props;

    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: "app name & image uri are required",
      });
    } else if (validateName(name) === false) {
      this.setState({
        error: "Name should start with a letter",
      });
    } else if (validateName(name) === "false_convention") {
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
    } else if (isCustomDomain && !domainName) {
      this.setState({
        error: "Please enter a domain name",
      });
    } else if (domainName && this.validateDomainName(domainName) === false) {
      this.setState({
        error: "Domain name should start with a letter",
      });
    } else if (
      domainName &&
      this.validateDomainName(domainName) === "false_convention"
    ) {
      this.setState({
        error: "Use accepted formats for example google.com, domain.ug",
      });
    } else {
      let appInfo = {
        command: entryCommand,
        env_vars: envVars,
        image: uri,
        name,
        project_id: params.projectID,
        private_image: true,
        replicas,
        docker_email: dockerEmail,
        docker_password: dockerPassword,
        docker_server: dockerServer,
        docker_username: dockerUsername,
        // docker_username: "cranecloudplatform",
       // docker_server: "docker.io",
       
      };

      if (isCustomDomain === true) {
        let sentDomainName = domainName.toLowerCase();
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
        appInfo = { ...appInfo, custom_domain: sentDomainName };

        createApp(appInfo, params.projectID);
      } else {
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
        //change

        this.createNewApp(appInfo, params.projectID);
      }
    }
  }
  createNewApp(data, projectID) {
    this.setState({
      addingApp: true,
      addAppError: "",
    });
    handlePostRequestWithOutDataObject(data, `/projects/${projectID}/apps`)
      .then(() => {
        window.location.href = `/projects/${projectID}/Apps`;
      })
      .catch((error) => {
        this.setState({
          addAppError: "Failed to add App. Try again later",
          addingApp: false,
          addErrorCode: error.response?.status,
        });
      });
  }

  render() {
    const {
      params: { projectID },
      data: { beta },
      clusters: { clusters },
    } = this.props;
    const {
      name,
      uri,
      varName,
      varValue,
      envVars,
      error,
      entryCommand,
      port,
      isPrivateImage,
      dockerCredentials,
      dockerCredentials: { username, email, password, server },
      isCustomDomain,
      currentDeploymentMethod,
      domainName,
      multiCluster,
      SelectedClusters,
      addingApp,
      addErrorCode,
      addAppError,
      passwordShown,
    } = this.state;

    const replicaOptions = [
      { id: 1, name: "1" },
      { id: 2, name: "2" },
      { id: 3, name: "3" },
      { id: 4, name: "4" },
    ];

    return (
      <div>
        <div className={styles.DeploymentMethodTabs}>
          <span
            className={
              currentDeploymentMethod === "default"
                ? styles.CurrentTab
                : styles.Tab
            }
            onClick={this.toggleDefaultDeployment}
          >
            Deploy with Crane Cloud
          </span>
          <span
            className={
              currentDeploymentMethod === "mira"
                ? styles.CurrentTab
                : styles.Tab
            }
            onClick={this.toggleMiraDeployment}
          >
            Deploy with mira
          </span>
        </div>

        {currentDeploymentMethod === "default" && (
          <div className={styles.CreateFormHolder}>
            <div className={styles.ModalFormInputs}>
              <div className={styles.FormHeading}>
                Fields marked * are required
              </div>
              <div className={styles.ModalFormInputsBasic}>
                <BlackInputText
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  className="ReplicasSelect"
                />

                <div className={styles.ReplicasSelect}>
                  <Select
                    placeholder="Number of Replicas - defaults to 1"
                    options={replicaOptions}
                    onChange={this.handleSelectReplicas}
                  />
                </div>

                <div className={styles.InputFieldWithTooltip}>
                  <BlackInputText
                    required
                    placeholder="Image URI"
                    name="uri"
                    value={uri}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="Image URI e.g for docker: ngnixdemos/hello with ngnixdemos being your username and hello being the image name"
                      position="left"
                    />
                  </div>
                </div>

                <div className={styles.PrivateImageCheckField}>
                  <Checkbox
                    isBlack
                    onClick={this.togglePrivateImage}
                    isChecked={isPrivateImage}
                  />
                  &nbsp; Private Image
                </div>

                {isPrivateImage && (
                  <div className={styles.PrivateImageTabContainer}>
                    <Tabs>
                      <div index={1} /* label={<DockerLogo />} */>
                        <div className={styles.PrivateImageInputs}>
                          <BlackInputText
                            required
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => {
                              this.handleDockerCredentialsChange(e);
                            }}
                          />

                          <BlackInputText
                            required
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              this.handleDockerCredentialsChange(e);
                            }}
                          />
                          <div className="password-wrappers">
                            <BlackInputText
                              required
                              placeholder="Password"
                              name="password"
                              type={passwordShown ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                this.handleDockerCredentialsChange(e);
                              }}
                            />

                            <div
                              className="password"
                              onClick={this.togglePassword}
                            >
                              {passwordShown ? <Open /> : <Closed />}
                            </div>
                          </div>
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
                            <div className={styles.InputTooltipContainerDB}>
                              <Tooltip
                                showIcon
                                message="Registry server for example: docker.io or gcr.io"
                                position="left"
                              />
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
                    </Tabs>
                  </div>
                )}

                {/** <div className={styles.ClusterSelectionSection}>
                 <div className={styles.alignText}>Multicluster options</div>
                  <div className={styles.TooltipStyles}>
                    <Tooltip
                      showIcon
                      message="Choose cluster policy for your application deployment"
                    />
                  </div>
                </div>
                 <div className={styles.ClusterToggleSection}>
                  <ToggleOnOffButton
                    onClick={this.changeMultiSelectionOption}
                  />{" "}
                  &nbsp; Deploy app on the same datacenter(s) as project.
                </div>*/}
                {multiCluster && (
                  <div className={styles.ClustersSection}>
                    <div className={styles.MultiSelectionText}>
                      Please select a datacenter(s) you would like your app to
                      be deployed to.
                    </div>
                    <div className={styles.Multipleclusters}>
                      {clusters.map(({ name, id }, index) => {
                        return (
                          <li className={styles.ListStyle} key={index}>
                            <div className={styles.clusterListItem}>
                              <div className={styles.leftsection}>
                                <input
                                  type="checkbox"
                                  id={id}
                                  name={name}
                                  value={name}
                                  checked={SelectedClusters[index]}
                                  onChange={() => this.handleOnChange(index)}
                                />
                                <label
                                  className={styles.ClusterLabel}
                                  htmlFor={id}
                                >
                                  {name}
                                </label>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                )}

                {beta && (
                  <div className={styles.CustomDomainCheckField}>
                    <Checkbox
                      isBlack
                      onClick={this.toggleCustomDomain}
                      isChecked={isCustomDomain}
                    />
                    &nbsp; Custom Domain
                  </div>
                )}

                {isCustomDomain && (
                  <div className={styles.CustomDomainTabContainer}>
                    <Tabs>
                      <div index={1}>
                        <div className={styles.InputFieldWithTooltip}>
                          <BlackInputText
                            required
                            placeholder="Domain name"
                            name="domainName"
                            value={domainName}
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                          />
                          <div className={styles.InputTooltipContainer}>
                            <Tooltip
                              showIcon
                              message="You will be given IP addresses to link your hosting provider DNS to our servers"
                              position="left"
                            />
                          </div>
                        </div>
                      </div>
                    </Tabs>
                  </div>
                )}

                <div className={styles.InputFieldWithTooltip}>
                  <BlackInputText
                    placeholder="Entry Command"
                    name="entryCommand"
                    value={entryCommand}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="Entrypoint or command for your container"
                      position="left"
                    />
                  </div>
                </div>
                <div className={styles.InputFieldWithTooltip}>
                  <BlackInputText
                    placeholder="Port (optional) - defaults to 80"
                    name="port"
                    value={port}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="Exposed port of your container"
                      position="left"
                    />
                  </div>
                </div>

                {error && (
                  <div className={styles.FeedbackSection}>
                    {" "}
                    <Feedback type="error" message={error} />{" "}
                  </div>
                )}
              </div>
              <div className={styles.ModalFormInputsEnvVars}>
                <div className={styles.HeadingWithTooltip}>
                  <h4>Environment Variables</h4>
                  <Tooltip
                    showIcon
                    message="These are are key/value pairs which define aspects of your app’s environment that can vary"
                  />
                </div>
                {Object.keys(envVars).length > 0 && (
                  <div className={styles.EnvVarsTable}>
                    <table>
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Value</td>
                          <td>Remove</td>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(envVars).map((envVar, index) => (
                          <tr key={uuidv4()}>
                            <td>{Object.keys(envVars)[index]}</td>
                            <td>{envVars[Object.keys(envVars)[index]]}</td>
                            <td>
                              <img
                                src={RemoveIcon}
                                alt="remove_ico"
                                onClick={() => this.removeEnvVar(index)}
                                role="presentation"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className={styles.EnvVarsInputGroup}>
                  <div className={styles.EnvVarsInputs}>
                    <BlackInputText
                      placeholder="Name"
                      name="varName"
                      value={varName}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <BlackInputText
                      placeholder="Value"
                      name="varValue"
                      value={varValue}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                  </div>
                  <div className={styles.EnvVarsAddBtn}>
                    <PrimaryButton
                      onClick={this.addEnvVar}
                      className={styles.EnvVarAddBtn}
                    >
                      Add
                    </PrimaryButton>
                  </div>
                </div>
              </div>
              <div className={styles.ModalFormButtons}>
                {addAppError && (
                  <div className={styles.FeedbackSection}>
                    <Feedback
                      className={styles.FeedbackSection}
                      message={
                        addErrorCode === 409
                          ? "Name already in use, please choose another and try again"
                          : addAppError
                      }
                      type={"error"}
                    />
                  </div>
                )}

                <div className={styles.ButtonSection}>
                  <PrimaryButton
                    className="AuthBtn FullWidth"
                    onClick={this.handleSubmit}
                  >
                    {addingApp ? <Spinner /> : "deploy"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentDeploymentMethod === "mira" && (
          <MiraPage projectID={projectID} />
        )}
      </div>
    );
  }
}
CreateApp.propTypes = {
  clusters: PropTypes.object,
  params: PropTypes.shape({}),
};

CreateApp.defaultProps = {
  clusters: [],
  params: {},
};

export const mapStateToProps = (state) => {
  const { data } = state.user;
  const { clusters } = state.clustersReducer;

  return {
    clusters,
    data,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp);
