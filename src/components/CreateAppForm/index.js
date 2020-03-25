import React from 'react';
import InputText from '../BlackInputText';
import PrimaryButton from '../PrimaryButton';
import Header from '../Header';
import InformationBar from '../InformationBar';
import Modal from '../Modal';
import './CreateAppForm.css';


class CreateAppForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      uri: '',
      openModal: false // add project modal is closed initially
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
  }

  addEnvVar() {
    // add env var
  }

  handleSubmit() {
    const { name, uri } = this.state;
    const app = {
      name,
      uri
    };

    // we shall add that here
    console.log(app);
  }


  render() {
    const { openModal, name, uri } = this.state;

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
          <div className="ModalForm">
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
              </div>
              <div className="ModalFormInputsEnvVars">
                <h4>Environment Variables</h4>
                <div className="EnvVarsInputGroup">
                  <div className="EnvVarsInputs">
                    <InputText
                      placeholder="Name"
                      name="varName"
                      // value={uri}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <InputText
                      placeholder="Value"
                      name="varValue"
                      // value={uri}
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
            <div className="ModalFormButtons">
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
