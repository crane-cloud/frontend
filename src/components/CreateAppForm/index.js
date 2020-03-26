import React from 'react';
import InputText from '../BlackInputText';
import PrimaryButton from '../PrimaryButton';
import Header from '../Header';
import InformationBar from '../InformationBar';
import Modal from '../Modal';
import RemoveIcon from '../../assets/images/remove.svg';
import './CreateAppForm.css';


class CreateAppForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      uri: '',
      varName: '',
      varValue: '',
      envVars: [],
      openModal: false, // add project modal is closed initially
      error: ''
    };

    this.addEnvVar = this.addEnvVar.bind(this);
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
    const newEnvVar = {
      name: varName,
      value: varValue
    };

    this.setState((prevState) => ({
      envVars: [...prevState.envVars, newEnvVar]
    }));
  }

  handleSubmit() {
    const { name, uri, envVars } = this.state;
    const app = {
      name,
      uri
    };


    if (!name || !uri) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'Please enter the App Name and Image Uri'
      });
    } else {
      // we shall add that here
      console.log(app);
      console.log(envVars);
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

    return (
      // this is a dummy page where we'll check our modal...
      // Later, We'll throw it away and use Allan's page
      <div className="Page">
        <div className="TopRow">
          <Header />
          <InformationBar header="App" showBtn btnAction={this.showForm} />
        </div>

        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal>
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
              </div>
              <div className="ModalFormInputsEnvVars">
                <h4>Environment Variables</h4>
                {(envVars.length > 0) && (
                  <div className="EnvVarsTable">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Value</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {envVars.map((envVar) => (
                          <tr key={envVars.indexOf(envVar)}>
                            <td>{envVar.name}</td>
                            <td>{envVar.value}</td>
                            <td><img src={RemoveIcon} alt="remove_ico" /></td>
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

export default CreateAppForm;
