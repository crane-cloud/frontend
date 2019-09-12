import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import logOutAction from "../../redux/actions/auth/logoutAction";
import axios from 'axios';
import { BASE_URL } from '../../config';
import { loginApiCall } from "../../apiCalls/auth/login";
import HeaderComponent from '../homepage/header';

import '../../assets/css/auth.css';
import '../../assets/css/home.css';

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailToken: '',
      submitButtonValue: 'Confirm',
      buttonClass : 'form-field-button',
      displayError : false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      displayError: false
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
    console.log(this.state);
  };

  componentWillReceiveProps(props){
    if(props.loginFailureMessage){
      this.setState({
        email: '',
        password: '',
        submitButtonValue: 'Confirm',
        buttonClass : 'form-field-button',
        displayLoginError: true
      });
    }
  }

  displayError = (displayError, errorMessage) => {
    if(displayError){
      return (
        <div className="alert alert-danger text-center">
        { errorMessage }
        </div> )
    } else {
      return;
    }
  }

  displayHelperAlert = () => {
      return (
        <div className="alert alert-info" role="alert">
          An access token has been sent to your email. Please enter that access
          token to confirm your email address
        </div> )
  }

  render() {
    const { buttonClass, submitButtonValue, displayError } = this.state;
    const { loggedIn, loginFailureMessage } = this.props;

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

        { this.displayHelperAlert() }
        { this.displayError(displayError, loginFailureMessage) }
        
        <div className="form-title"> 
          Confirm email
        </div>

        <div className="form-field">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required autoFocus
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            placeholder="Enter the token"
            name="emailToken"
            value={this.state.emailToken}
            onChange={this.handleChange}
            required
          />
        </div>

        <button className={buttonClass}>{submitButtonValue}</button>

      </form>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn : state.auth.loggedIn,
    loginFailureMessage: state.auth.loginFailureMessage
  }
}

export default  withRouter(connect(mapStateToProps)(ConfirmEmail));
