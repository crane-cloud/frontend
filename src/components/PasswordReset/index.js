import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import PrimaryButton from '../PrimaryButton';
import './PasswordReset.css';

export default class PasswordReset extends React.Component {
  render() {
    return (
      <div className="ResetPasswordPageContainer">
        <Header />
        <div className="ResetPasswordContent">
          <div className="ResetPasswordContentHeading">
            <h1>Reset password</h1>
            <p>Enter your email address so that we can send you a link to reset your password.</p>
          </div>
          <div className="ResetPasswordContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Email Address'
            />

            <PrimaryButton label="RESET" />

            <div className="ResetPasswordContentBottomLink ResetPasswordLinkContainer">
              <Link to='/login' className="ResetPasswordContentLink">Back to Login.</Link>
            </div>

          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }
}
