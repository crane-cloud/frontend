import React from 'react';
import InputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
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
      link: '',
      openModal: false // add project modal is closed initially
    };

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

  handleSubmit() {
    // we shall add that here
  }


  render() {
    const { openModal } = this.state;

    return (
      // this is a dummy page where we'll check our modal...
      // Later, We'll throw it away and use Allan's page
      <div>
        <Header />
        <InformationBar header="App" showBtn btnAction={this.showForm} />
        {/* Modal for creating a new project
        Its triggered by the value of state.openModal */}
        <Modal showModal={openModal}>
          <div className="ModalForm">
            <div className="ModalFormHeading">
              <h2>Add a project</h2>
            </div>
            <div className="ModalFormInputs">
              <InputText
                placeholder="Project Name"
              />
              <InputText
                placeholder="+ some other stuff"
              />
            </div>
            <div className="ModalFormButtons">
              <PrimaryButton label="create project" />
              <PrimaryButton label="cancel" className="CancelBtn" onClick={this.hideForm} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateAppForm;
