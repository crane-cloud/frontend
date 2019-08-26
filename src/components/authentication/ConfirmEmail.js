import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import HeaderComponent from '../homepage/header';

import '../../assets/css/auth.css';
import '../../assets/css/home.css';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      token: '',
      submitButtonValue: 'Verify Email',
      buttonClass: 'form-field-button'
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      displayLoginError: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      submitButtonValue: "Processing ....",
      buttonClass: 'form-field-button-processing'
    })
    /**
     * make api call
     */
  };

  resendTokenEmail = () => {
    // TODO: Resend token email here.
  }

  render() {
    const { buttonClass, submitButtonValue } = this.state;

    return (
      <>
        <div className="home-container">
          <HeaderComponent />
        </div>
        <div className="auth-form">
          <form onSubmit={this.handleSubmit}>

            <div className="form-title">
              Verify Your Email
            </div>

            <div className="form-field-msg">
              <p>We have sent you an email with a token. Please enter it below to verify your email.</p>
            </div>

            <div className="form-field">
              <input
                type="text"
                placeholder="Enter token"
                name="token"
                value={this.state.token}
                onChange={this.handleChange}
                required
              />
            </div>

            <button className={buttonClass}>{submitButtonValue}</button>

            <p className="redirect">Did not receive email? <Link onClick = {this.resendTokenEmail} className="form-field-link">Click here to resend.</Link></p>

          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    loginFailureMessage: state.auth.loginFailureMessage
  }
}

export default withRouter(connect(mapStateToProps)(ConfirmEmail));
