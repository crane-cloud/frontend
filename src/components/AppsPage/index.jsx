import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import createApp, { clearState } from '../../redux/actions/createApp';
import PrimaryButton from '../PrimaryButton';
import BlackInputText from '../BlackInputText';
import Modal from '../Modal';
import RemoveIcon from '../../assets/images/remove.svg';
import BackButton from '../../assets/images/backButton.svg';
import InformationBar from '../InformationBar';
import AppsList from '../AppsList';
import Header from '../Header';
import Spinner from '../Spinner';
import Feedback from '../Feedback';
import Checkbox from '../Checkbox';
import Tooltip from '../Tooltip';
import Tabs from '../Tabs';
// import { ReactComponent as DockerLogo } from '../../assets/images/docker-logo.svg';
import './AppsPage.css';

class AppsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      uri: '',
      varName: '',
      varValue: '',
      envVars: {},
      openModal: false, // add project modal is closed initially
      error: '',
      createFeedback: '',
      entryCommand: '',
      port: '',
      needDb: false,
      isPrivateImage: false,
      dockerCredentials: {
        username: '',
        email: '',
        password: '',
        server: '',
        error: ''
      },
      dbCredentials: {
        dbName: '',
        dbUser: '',
        dbPassword: '',
        error: ''
      }
    };

    this.state = this.initialState;

    this.addEnvVar = this.addEnvVar.bind(this);
    this.removeEnvVar = this.removeEnvVar.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateAppName = this.validateAppName.bind(this);
    this.toggleNeedDb = this.toggleNeedDb.bind(this);
    this.togglePrivateImage = this.togglePrivateImage.bind(this);
    this.handleDockerCredentialsChange = this.handleDockerCredentialsChange.bind(this);
    this.handleDbCredentialsChange = this.handleDbCredentialsChange.bind(this);
  }

  componentDidMount() {
    const { clearState } = this.props;
    clearState();
  }

  componentDidUpdate(prevProps) {
    const { isCreated } = this.props;

    if (isCreated !== prevProps.isCreated) {
      this.hideForm();
    }
  }

  showForm() {
    this.setState({ openModal: true });
  }

  hideForm() {
    const { clearState } = this.props;
    clearState();
    this.setState(this.initialState);
  }

  handleChange(e) {
    const { error, createFeedback } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    if (error) {
      this.setState({
        error: ''
      });
    }
    if (createFeedback) {
      this.setState({
        createFeedback: ''
      });
    }
  }

  handleDockerCredentialsChange({ target, target: { value } }) {
    const { dockerCredentials } = this.state;
    this.setState((prevState) => ({
      dockerCredentials: {
        ...prevState.dockerCredentials,
        [target.name]: value
      }
    }));
    if (dockerCredentials.error) {
      this.setState((prevState) => ({
        dockerCredentials: {
          ...prevState.dockerCredentials,
          error: ''
        }
      }));
    }
  }

  handleDbCredentialsChange({ target, target: { value } }) {
    const { dbCredentials } = this.state;
    this.setState((prevState) => ({
      dbCredentials: {
        ...prevState.dbCredentials,
        [target.name]: value
      }
    }));
    if (dbCredentials.error) {
      this.setState((prevState) => ({
        dbCredentials: {
          ...prevState.dbCredentials,
          error: ''
        }
      }));
    }
  }

  addEnvVar() {
    const { varName, varValue } = this.state;

    if (varName && varValue) {
      this.setState((prevState) => ({
        envVars: {
          ...prevState.envVars,
          [varName]: varValue
        }
      }));
      this.setState({
        varName: '', varValue: ''
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

  validateAppName(name) {
    if (/^[a-z]/i.test(name)) {
      if (name.match(/[^-a-zA-Z0-9.]/)) {
        return 'false_convention';
      }
      return true;
    }
    return false;
  }

  toggleNeedDb() {
    const { needDb } = this.state;
    this.setState({
      needDb: !needDb
    });
  }

  togglePrivateImage() {
    const { isPrivateImage } = this.state;
    this.setState({
      isPrivateImage: !isPrivateImage
    });
  }

  handleSubmit() {
    const {
      name,
      uri,
      envVars,
      entryCommand,
      port,
      needDb,
      isPrivateImage,
      dockerCredentials: {
        username,
        email,
        password,
        server
      },
      dbCredentials: {
        dbName,
        dbUser,
        dbPassword
      }
    } = this.state;
    const {
      createApp,
      match
    } = this.props;

    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'app name & image uri are required'
      });
    } else if (this.validateAppName(name) === false) {
      this.setState({
        error: 'name should start with a letter'
      });
    } else if (this.validateAppName(name) === 'false_convention') {
      this.setState({
        error: 'name may only contain letters,numbers,dot and a hypen -'
      });
    } else if (port && !(/^[0-9]*$/.test(port))) { // validate port and ensure its a number
      this.setState({
        error: 'Port should be an integer'
      });
    } else if (isPrivateImage && (!email || !username || !password || !server)) {
      this.setState((prevState) => ({
        dockerCredentials: {
          ...prevState.dockerCredentials,
          error: 'please provide all the information above'
        }
      }));
    } else if (needDb && (!dbName || !dbUser || !dbPassword)) {
      this.setState((prevState) => ({
        dbCredentials: {
          ...prevState.dbCredentials,
          error: 'please provide all database information'
        }
      }));
    } else {
      let appInfo = {
        command: entryCommand,
        env_vars: envVars,
        image: uri,
        name,
        need_db: needDb,
        project_id: match.params.projectID,
        private_image: isPrivateImage
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
          docker_server: server
        };
      }

      if (needDb) {
        appInfo = {
          ...appInfo,
          dn_name: dbName,
          db_user: dbUser,
          db_password: dbPassword
        };
      }

      createApp(appInfo, match.params.projectID);
    }
  }

  render() {
    const {
      openModal,
      name,
      uri,
      varName,
      varValue,
      envVars,
      error,
      entryCommand,
      port,
      needDb,
      isPrivateImage,
      dockerCredentials,
      dockerCredentials: {
        username,
        email,
        password,
        server,
      },
      dbCredentials,
      dbCredentials: {
        dbName,
        dbUser,
        dbPassword
      }
    } = this.state;

    const {
      match: { params },
      user: { data },
      isCreating,
      isCreated,
      message,
      errorCode
    } = this.props;

    const userId = data.id;

    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBar
            header={(
              <Link to={{ pathname: `/users/${userId}/projects/` }}>
                <div className="BackDiv">
                  <img src={BackButton} alt="Back Button" />
                  {' '}
                  <p>&nbsp; Apps</p>
                </div>
              </Link>
            )}
            showBtn
            btnAction={this.showForm}
          />
        </div>
        <div className="MainRow">
          <AppsList params={params} newAppCreated={isCreated} />
        </div>
        <div className="FooterRow">
          <p>
            Copyright © 2020 Crane Cloud.
            <br />
            All Rights Reserved.
          </p>
        </div>

        {/* Modal for creating a new app
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal}>
          <div className="ModalForm AddAppModal">
            <div className="ModalFormHeading">
              <h2>Deploy an app</h2>
            </div>

            {/* //- /////////////////////////////////// -// */}

            <div className="ModalFormInputs">
              <div className="ModalFormInputsBasic">
                <BlackInputText
                  required
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <BlackInputText
                  required
                  placeholder="Image Uri"
                  name="uri"
                  value={uri}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />

                <div className="PrivateImageCheckField">
                  <Checkbox
                    isBlack
                    onClick={this.togglePrivateImage}
                    isChecked={isPrivateImage}
                  />
                  &nbsp; Private Image
                </div>

                {isPrivateImage && (
                  <div className="PrivateImageTabContainer">
                    <Tabs>
                      <div index={1}/* label={<DockerLogo />} */>
                        <div className="PrivateImageInputs">
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

                          <BlackInputText
                            required
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                              this.handleDockerCredentialsChange(e);
                            }}
                          />

                          <BlackInputText
                            required
                            placeholder="Server"
                            name="server"
                            value={server}
                            onChange={(e) => {
                              this.handleDockerCredentialsChange(e);
                            }}
                          />

                          {(dockerCredentials.error) && (
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

                <div className="InputFieldWithTooltip">
                  <BlackInputText
                    placeholder="Entry Command"
                    name="entryCommand"
                    value={entryCommand}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className="InputTooltipContainer">
                    <Tooltip
                      showIcon
                      message="Entrypoint or command for your container"
                      position="left"
                    />
                  </div>
                </div>

                <BlackInputText
                  placeholder="Port (optional) - defaults to 80"
                  name="port"
                  value={port}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />

                {error && (
                  <Feedback
                    type="error"
                    message={error}
                  />
                )}
              </div>
              <div className="ModalFormInputsEnvVars">
                <div className="HeadingWithTooltip">
                  <h4>Environment Variables</h4>
                  <Tooltip
                    showIcon
                    message="These are are key/value pairs which define aspects of your app’s environment that can vary"
                  />
                </div>
                {(Object.keys(envVars).length > 0) && (
                  <div className="EnvVarsTable">
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
                <div className="EnvVarsInputGroup">
                  <div className="EnvVarsInputs">
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
                  <div className="EnvVarsAddBtn">
                    <PrimaryButton
                      label="add"
                      onClick={this.addEnvVar}
                      className="EnvVarAddBtn"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="DbSupportSection">
              <div className="HeadingWithTooltip">
                <h4>Database Support</h4>
                <Tooltip
                  showIcon
                  message="Does your application need a database?"
                />
              </div>

              <div className="DbCheckBoxInputGroup">
                <div className="DbSupportCheckField">
                  <Checkbox
                    isBlack
                    onClick={this.toggleNeedDb}
                    isChecked={needDb}
                  />
                  &nbsp; I would like database support
                </div>

                {needDb && (
                  <div className="DatabaseSupportTabContainer">
                    <Tabs>
                      <div index={1}/* label={<DockerLogo />} */>
                        <div className="DatabaseSupportInputs">
                          <BlackInputText
                            required
                            placeholder="Database Name"
                            name="dbName"
                            value={dbName}
                            onChange={(e) => {
                              this.handleDbCredentialsChange(e);
                            }}
                          />

                          <BlackInputText
                            required
                            placeholder="Database User"
                            name="dbUser"
                            value={dbUser}
                            onChange={(e) => {
                              this.handleDbCredentialsChange(e);
                            }}
                          />

                          <BlackInputText
                            required
                            placeholder="Database Password"
                            type="password"
                            name="dbPassword"
                            value={dbPassword}
                            onChange={(e) => {
                              this.handleDbCredentialsChange(e);
                            }}
                          />

                          {(dbCredentials.error) && (
                            <Feedback
                              type="error"
                              message={dbCredentials.error}
                            />
                          )}
                        </div>
                      </div>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>

            {/* //- /////////////////////////////////// -// */}

            <div className="ModalFormButtons AddAddButtons">
              <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideForm} />
              <PrimaryButton label={isCreating ? <Spinner /> : 'proceed'} onClick={this.handleSubmit} />
            </div>

            {message && (
              <Feedback
                message={errorCode === 409 ? 'Name already in use, please choose another and try again' : message}
                type={(isCreated && errorCode !== 409) ? 'success' : 'error'}
              />
            )}

          </div>
        </Modal>
      </div>
    );
  }
}

AppsPage.propTypes = {
  isCreated: PropTypes.bool.isRequired,
  isCreating: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired,
  createApp: PropTypes.func.isRequired,
  errorCode: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

AppsPage.defaultProps = {
  errorCode: null
};

const mapStateToProps = ({ user, createNewApp }) => {
  const {
    message, isCreated, isCreating, errorCode
  } = createNewApp;
  return {
    user,
    isCreated,
    isCreating,
    errorCode,
    message
  };
};

const mapDispatchToProps = {
  createApp, clearState
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppsPage));
