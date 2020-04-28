import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import createApp, { clearState } from '../../redux/actions/createApp';
import PrimaryButton from '../PrimaryButton';
import InputText from '../BlackInputText';
import Modal from '../Modal';
import RemoveIcon from '../../assets/images/remove.svg';
import BackButton from '../../assets/images/backButton.svg';
import InformationBar from '../InformationBar';
import AppsList from '../AppsList';
import Header from '../Header';
import Spinner from '../SpinnerComponent';
import Feedback from '../Feedback';
import Checkbox from '../Checkbox';
import Tooltip from '../Tooltip';
import './AppsPage.css';

class AppsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      needDb: false
    };

    this.addEnvVar = this.addEnvVar.bind(this);
    this.removeEnvVar = this.removeEnvVar.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateAppName = this.validateAppName.bind(this);
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
    this.setState({ openModal: false });
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

  handleSubmit() {
    const {
      name, uri, envVars, entryCommand, port, needDb
    } = this.state;
    const {
      createApp,
      match
    } = this.props;

    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'Please enter the App Name and Image Uri'
      });
    } else if (this.validateAppName(name) === false) {
      this.setState({
        error: 'name should start with a letter'
      });
    } else if (this.validateAppName(name) === 'false_convention') {
      this.setState({
        error: 'name may only contain letters,numbers,dot and a hypen -'
      });
    } else {
      const appInfo = {
        command: entryCommand,
        env_vars: envVars,
        image: uri,
        name,
        need_db: needDb,
        port,
        project_id: match.params.projectID
      };

      console.log(appInfo, match.params.projectID);
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
      needDb
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
                <InputText
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <InputText
                  placeholder="Image Uri"
                  name="uri"
                  value={uri}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <InputText
                  placeholder="Entry Command"
                  name="entryCommand"
                  value={entryCommand}
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
                <InputText
                  placeholder="Port - defaults to 80"
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
                    <InputText
                      placeholder="Name"
                      name="varName"
                      value={varName}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <InputText
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

            <Checkbox
              onClick={this.toggleAgreed}
              isChecked={needDb}
            />
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
  errorCode: PropTypes.number.isRequired,
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
