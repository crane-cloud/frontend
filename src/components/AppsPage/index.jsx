import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import createApp from '../../redux/actions/createApp';
import PrimaryButton from '../PrimaryButton';
import InputText from '../BlackInputText';
import Modal from '../Modal';
import RemoveIcon from '../../assets/images/remove.svg';
import BackButton from '../../assets/images/backButton.svg';
import InformationBarSub from '../InformationBarSub';
import AppsList from '../AppsList';
import Header from '../Header';
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
      error: ''
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
    this.setState({ openModal: false });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.error = this.state;
    if (this.error) {
      this.setState({
        error: ''
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

<<<<<<< HEAD
const AppsPage = (props) => {
  const { user: { accessToken, data } } = props;
  const { match: { params } } = props;
  const userId = data.id;
  localStorage.setItem('token', accessToken);
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
=======
    this.setState({ envVars: newEnvVars });
    console.log(envVars);
  }

  handleSubmit() {
    const { name, uri, envVars } = this.state;
    const app = {
      name,
      uri
    };
    const { createApp, match } = this.props;


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
      createApp(appInfo);
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
    } = this.state;

    console.log(this.props);
    const { user: { accessToken, data } } = this.props;
    const userId = data.id;
    localStorage.setItem('token', accessToken);
    return (
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBarSub
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
          <AppsList />
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
>>>>>>> post to backend
              </div>
            </Link>
          )}
          showBtn
        />
      </div>
      <div className="MainRow">
        <AppsList params={params} />
      </div>
      <div className="FooterRow">
        <p>
          Copyright © 2020 Crane Cloud.
          <br />
          All Rights Reserved.

            <div className="ModalFormButtons AddAddButtons">
              <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideForm} />
              <PrimaryButton label="proceed" onClick={this.handleSubmit} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ user, createAppReducer }) => {
  const { isCreated, isCreating, app } = createAppReducer;
  return {
    user,
    isCreated,
    isCreating,
    app
  };
};

// const mapStateToProps = (state) => (
//   { user: state.user }
// );

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  createApp
}, dispatch);

export default connect(mapStateToProps, null)(withRouter(AppsPage));
