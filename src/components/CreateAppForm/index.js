import React from 'react';
import InputText from '../BlackInputText';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import Header from '../Header';
import InformationBar from '../InformationBar';
import './CreateAppForm.css';


class CreateAppForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      link: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
      // this is a dummy page where we'll check our modal...
      // Later, We'll throw it away and use Allan's page
      <div>
        <Header />
        <InformationBar header="App" showBtn />
        Here, we're going to put our Modal, which will be triggered by that button
        Currently clicking that button will do Create Cluster...
        This means out InformationBar is not dynamic
        So, we shall have to redo the Information Bar
      </div>
    );
  }
}

export default CreateAppForm;
