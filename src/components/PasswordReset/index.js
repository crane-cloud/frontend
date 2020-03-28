import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import { API_BASE_URL } from '../../config';
import './PasswordReset.css';

export default class PasswordReset extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      loading: false,
      registered: false

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
    const { email } = this.state;
    const userResetEmail = { email };

    this.setState({
      loading: true
    });

    axios
      .post(`${API_BASE_URL}/users/forgot_password`, userResetEmail)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            loading: false
          });
          setTimeout(() => {
            this.setState({
              registered: true
            });
          }, 1000);
        }
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }


  render() {
    const { email, loading, registered } = this.state;

    return (
      <div className="ResetPasswordPageContainer">
        <Header />
        {!registered ? (
          <>
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

                <PrimaryButton
                  label={loading ? <Spinner /> : 'RESET'}
                  onClick={this.handleSubmit}
                />

                <div className="ResetPasswordContentBottomLink ResetPasswordLinkContainer">
                  <Link to='/login' className="ResetPasswordContentLink">Back to Login.</Link>
                </div>

              </div>
            </div>

          </>
        ) : (
          <div className="ResetPasswordSuccessContent">
            <div className="ResetPasswordMessage">
              <h2>Password has successfully been reset!</h2>
              <p>
                We&apos;ve sent a link to your email address to create a new password:&nbsp;
                <span>{email}</span>
                <br />
                <br />
                The link will expire after 24 hours. Please use this link to update password and resume using your account.
              </p>
            </div>
          </div>
        )}
        <div className="PasswordResetPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
