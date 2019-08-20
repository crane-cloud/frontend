import React, { Component } from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { BASE_URL } from '../../config';
import { registerUserAPI } from '../../apiCalls/auth/register';
import HeaderComponent from '../homepage/header';

import "../../assets/css/auth.css";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false,
    submitButtonValue: 'Sign Up',
    buttonClass : 'form-field-button',
    displayLoginError : false,
    registrationError : false,
    displayApiRegError: false,
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({ 
      [name]: value,
      submitButtonValue: 'Sign Up',
      buttonClass : 'form-field-button',
      registrationError: false,
      displayLoginError: false,
      displayApiRegError: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      submitButtonValue: "Processing ....",
      buttonClass: 'form-field-button-processing'

    });

    const { password, confirmPassword, name, email } = this.state;
    if (password !== confirmPassword) {
      debugger;
      this.setState({
        registrationError: 'Passwords dont match',
        password: '',
        confirmPassword: '',
        submitButtonValue: 'Sign Up',
        buttonClass : 'form-field-button',
      })
      return;
    } else if (this.state.hasAgreed !== true) {
      return;
    } else {
      registerUserAPI(name, email, password, BASE_URL);
    }
  }

  displayLoginError = (displayLoginError, loginFailureMessage) => {
    if(displayLoginError){
      return (
        <div className="alert alert-danger text-center">
          { loginFailureMessage }
        </div> )
    } else {
      return;
    }
  }

  displayRegistrationError = () => {
    const { registrationError } = this.state;
    if(registrationError){
      return (
        <div className="alert alert-danger text-center">
        { registrationError }
        </div> )
    } else {
      return;
    }
  }


  displayApiRegError = (displayApiRegError, registrationFailureMessage) => {
    if(displayApiRegError){
      return (
        <div className="alert alert-danger text-center">
          { registrationFailureMessage }
        </div> )
    } else {
      return;
    }
  }

  componentWillReceiveProps(props){
    if(props.loginFailureMessage){
      this.setState({
        displayLoginError: true
      });
    }
  }

  render() {
    const { name, email, password, confirmPassword, submitButtonValue, buttonClass, displayLoginError, displayApiRegError } = this.state;
    const { loggedIn, loginFailureMessage, registrationFailureMessage } = this.props;

    if(loggedIn){
      return <Redirect to="/user-dashboard"/>
    }

    return (
      <>
      <div className="home-container">
                    <HeaderComponent />
      </div>
      <div className="auth-form">
      <form onSubmit={this.handleSubmit}>
        { this.displayLoginError(displayLoginError, loginFailureMessage) }
        { this.displayRegistrationError() }
        { this.displayApiRegError(displayApiRegError, registrationFailureMessage) }
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

const mapStateToProps = (state) => {
  return {
    loggedIn : state.auth.loggedIn,
    loginFailureMessage: state.auth.loginFailureMessage,
    registrationFailureMessage: state.auth.registrationFailureMessage
  }
}

export default  withRouter(connect(mapStateToProps)(SignUpForm));

// export default SignUpForm;