import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';

import './RegisterPage.css';

export default class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email:'',
      password:'',
      passwordConfirm:''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
 
  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }); 
  }


  render() {
    return (
      <div className="RegisterPageContainer">
        <Header />
        <div className="RegisterContent">
          <div className="RegisterContentHeading">
            <h1>Create an account</h1>
          </div>
          <div className="RegisterContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Name'
              name = 'name'
              value = {this.state.name}
              onChange = {this.handleOnChange}

            />
            <InputText
              placeholder='Email Address'
              name = 'email'
              value = {this.state.email}
              onChange = {this.handleOnChange}
            />
            <InputPassword
              placeholder='Password'
              name = 'password'
              value = {this.state.password}
              onChange = {this.handleOnChange}
            />
            <InputPassword
              placeholder='Repeat Password'
              name = 'passwordConfirm'
              value = {this.state.passwordConfirm}
              onChange = {this.handleOnChange}
            />

            <div className="RegisterContentBottomLink RegisterLinkContainer">
              I agree to Crane Cloud&apos;s&nbsp;&nbsp;<Link to='/register' className="RegisterContentLink">Terms of service.</Link>
            </div>

            <PrimaryButton label="Register" />

          </div>
        </div>
        <div className="RegisterPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
