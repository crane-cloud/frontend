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

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitButtonValue: 'Sign In',
      buttonClass : 'form-field-button',
      displayLoginError : false
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
    loginApiCall(BASE_URL, this.state)
  };

  componentDidMount(){
    /* dispatch logout action after call to /login */
    logOutAction()
  }

  componentWillReceiveProps(props){
    if(props.loginFailureMessage){
      this.setState({
        email: '',
        password: '',
        submitButtonValue: 'Sign In',
        buttonClass : 'form-field-button',
        displayLoginError: true
      });
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

  render() {
    const { buttonClass, submitButtonValue, displayLoginError } = this.state;
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

        { this.displayLoginError(displayLoginError, loginFailureMessage) }
        
        <div className="form-title"> 
          Sign In
        </div>

        <div className="form-field">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-field">
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <button className={buttonClass}>{submitButtonValue}</button>

        <Link to="/forgot-password" className="form-field-link">Forgot password?</Link>
        <p className="redirect">Not yet a member? <Link to="/register" className="form-field-link">Create an account</Link></p>

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

export default  withRouter(connect(mapStateToProps)(SignInForm));
