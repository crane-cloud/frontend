import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      createFeedback: ''
    };

    this.addEnvVar = this.addEnvVar.bind(this);
    this.removeEnvVar = this.removeEnvVar.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        object[key] = envVars[key];
      }
      return object;
    }, {});

    this.setState({ envVars: newEnvVars });
  }

  async handleSubmit() {
    const { name, uri, envVars } = this.state;
    const {
      createApp,
      match,
      isCreated,
      attempted
    } = this.props;

    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'Please enter the App Name and Image Uri'
      });
    } else {
      const appInfo = {
        env_vars: envVars,
        image: uri,
        name,
        project_id: match.params.projectID
      };

      await createApp(appInfo, match.params.projectID);
      if (attempted && isCreated) {
        this.hideForm();
      }
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
      error
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

        {/* Modal for creating a new project
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
                {error && (
                  <div className="AppFormErrorDiv">
                    {error}
                  </div>
                )}
              </div>
              <div className="ModalFormInputsEnvVars">
                <h4>Environment Variables</h4>
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

            {/* //- /////////////////////////////////// -// */}

            <div className="ModalFormButtons AddAddButtons">
              <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideForm} />
              <PrimaryButton label={isCreating ? <Spinner /> : 'proceed'} onClick={this.handleSubmit} />
            </div>
            {message && (
              <div className={(isCreated && errorCode !== 409) ? 'AppFormErrorDiv CreateSuccess' : 'AppFormErrorDiv CreateFail'}>
                {errorCode === 409 ? 'Name already in use, please choose another and try again' : message}
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, createNewApp }) => {
  const {
    message, isCreated, isCreating, app, attempted, errorCode
  } = createNewApp;
  return {
    user,
    isCreated,
    isCreating,
    app,
    attempted,
    errorCode,
    message
  };
};

export default connect(mapStateToProps, { createApp, clearState })(withRouter(AppsPage));
