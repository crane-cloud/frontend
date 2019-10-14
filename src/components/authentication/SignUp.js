import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { BASE_URL } from '../../config';
import HeaderComponent from '../homepage/header';
import loginSuccess from '../../redux/actions/auth/loginSuccess';

import '../../assets/css/auth.css';

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    hasAgreed: false,
    submitButtonValue: 'Sign Up',
    buttonClass: 'form-field-button',
    errorMEssage: ''
  }

  handleChange = (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
      submitButtonValue: 'Sign Up',
      buttonClass: 'form-field-button',
      errorMessage: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitButtonValue: 'Processing ....',
      buttonClass: 'form-field-button-processing'
    });

    const {
      password,
      confirmPassword,
      name,
      email
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        errorMessage: 'Passwords dont match',
        password: '',
        confirmPassword: '',
        submitButtonValue: 'Sign Up',
        buttonClass: 'form-field-button',
      });
    } else if (this.state.hasAgreed !== true) {
      this.setState({ errorMessage: 'Please agree to the terms of service' });
    } else {
      /* api call */
      axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password
      })
        .then((response) => {
          if (response.status === 201) {
            /* log the user in and get access token */
            loginSuccess({ accessToken: response.data.access_token });
          }
        })
        .catch((regErr) => {
          if (regErr.response && regErr.response.data && regErr.response.data.message) {
            this.setState({
              submitButtonValue: 'Sign Up',
              buttonClass: 'form-field-button',
              errorMessage: regErr.response.data.message
            });
          } else if (regErr.response && regErr.response.statusText) {
            this.setState({
              submitButtonValue: 'Sign Up',
              buttonClass: 'form-field-button',
              errorMessage: `Error occured: ${regErr.response.statusText}. Please try again`
            });
          } else {
            this.setState({
              submitButtonValue: 'Sign Up',
              buttonClass: 'form-field-button',
              errorMessage: `Error occured: ${regErr.message}. Please try again`
            });
          }
        });
    }
  }

  displayError = () => {
    const { errorMessage } = this.state;
    return (
      <div className="alert alert-danger text-center">
        {errorMessage}
      </div>
    );
  }


  render() {
    const { loggedIn } = this.props;
    const {
      name, email, password, confirmPassword, submitButtonValue, buttonClass
    } = this.state;

    if (loggedIn) {
      return <Redirect to="/user-dashboard" />;
    }

    return (
      <>
        <div className="home-container">
          <HeaderComponent />
        </div>
        <div className="auth-form">
          <form onSubmit={this.handleSubmit}>
            {this.displayError()}
            <div className="form-title">
              Sign Up
            </div>

            <div className="form-field">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
                required autoFocus
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-field">
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
              />
            </div>

            <label className="form-field-checkbox-label">
              <input
                required
                type="checkbox"
                className="form-field-checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />
              I agree to the <Link to="/terms" className="form-field__TermsLink">terms of service</Link>
            </label>

            <button className={buttonClass}>{submitButtonValue}</button>

            <p className="redirect">Already a member? <Link to="/login" className="form-field-link">Log in here</Link></p>

          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default withRouter(connect(mapStateToProps)(SignUpForm));
