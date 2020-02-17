import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import './PasswordReset.css';

export default class PasswordReset extends React.Component {
  render() {
    return (
      <div className="ResetPasswordPageContainer">
        <Header />
        <div className="ResetPasswordContent">
          <div className="ResetPasswordContentHeading">
            <h1>ResetPassword to the cloud</h1>
          </div>
          <div className="ResetPasswordContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Email Address'
            />
            <InputPassword
              placeholder='Password'
            />

            <div className="ResetPasswordLinkContainer">
              <Link to='/forgot-password' className="ResetPasswordContentLink">Forgot your password?</Link>
            </div>

            <PrimaryButton label="ResetPassword" />

            <div className="ResetPasswordContentBottomLink ResetPasswordLinkContainer">
                            Not signed up?  <Link to='/register' className="ResetPasswordContentLink">Create an account.</Link>
            </div>

          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }
}
