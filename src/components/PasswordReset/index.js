import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import PrimaryButton from '../PrimaryButton';
import './PasswordReset.css';

export default class PasswordReset extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',

    };

    this.handleChange = this.handleChange.bind(this);
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    const { email } = this.state;

    return (
      <div className="ResetPasswordPageContainer">
        <Header />
        <div className="ResetPasswordContent">
          <div className="ResetPasswordContentHeading">
            <h1>Password Reset</h1>
            <p>Enter your email address so that we can send you a link to reset your password.</p>
          </div>
          <div className="ResetPasswordContentInputs">
            {/* Input fields */}
            <InputText
              placeholder='Email Address'
              name="email"
              value={email}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />

            <PrimaryButton label="RESET" />

            <div className="ResetPasswordContentBottomLink ResetPasswordLinkContainer">
              <Link to='/login' className="ResetPasswordContentLink">Back to Login.</Link>
            </div>

          </div>
        </div>
        <div className="PasswordResetPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
