import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';

import './RegisterPage.css';

export default class RegisterPage extends Component {
  render() {
    return (
      <div className="RegisterPageContainer">
        <Header />
        <div className="RegisterContent">
          <div className="RegisterContentHeading">
            <h1>Register to the cloud</h1>
          </div>
          <div className="RegisterContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Email Address'
            />
            <InputPassword
              placeholder='Password'
            />

            <div className="RegisterLinkContainer">
              <Link to='/forgot-password' className="RegisterContentLink">Forgot your password?</Link>
            </div>

            <PrimaryButton label="Register" />

            <div className="RegisterContentBottomLink RegisterLinkContainer">
              Not signed up?  <Link to='/register' className="RegisterContentLink">Create an account.</Link>
            </div>

          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }
}
