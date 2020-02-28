import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import './CreateNewPassword.css';

export default class CreateNewPassword extends React.Component {

  render() {
    return (
      <div className="NewPasswordPageContainer">
        <Header />
        <div className="NewPasswordContent">
          <div className="NewPasswordContentHeading">
            <h1>Create New Password</h1>
            <p>Create a new and strong password </p>
          </div>
          <div className="NewPasswordContentInputs">
            {/* Input fields */}
            <InputPassword
              placeholder='Password'
              name='password'
             


            />
            <InputPassword
              placeholder='Confirm Password'
              name='confirmPassword'
              


            />

            <PrimaryButton label="RESET" />

           

          </div>
        </div>

        <div className="PasswordResetPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
