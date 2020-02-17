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
            <h1>Create an account</h1>
          </div>
          <div className="RegisterContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Name'
            />
            <InputText
              placeholder='Email Address'
            />
            <InputPassword
              placeholder='Password'
            />
            <InputPassword
              placeholder='Repeat Password'
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
