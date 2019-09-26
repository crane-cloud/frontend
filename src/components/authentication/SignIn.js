import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter, Link } from "react-router-dom";

import logOutAction from "../../redux/actions/auth/logoutAction";
import axios from 'axios';
import { BASE_URL } from '../../config';
import loginSuccess from '../../redux/actions/auth/loginSuccess';
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
      loginError : ''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      loginError: ''
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
    const { email, password } = this.state;
    const payload = { email, password };

    axios.post(BASE_URL + '/login', payload)
        .then((response) => {
            if(response.status === 200){
              loginSuccess({ accessToken: response.data.access_token });
            }
          })
          .catch((loginError) => {
            if (loginError.response.status === 401) {
              this.setState({
                email: '',
                password: '',
                submitButtonValue: 'Sign In',
                buttonClass : 'form-field-button',
                loginError: 'Wrong email or password'
              });
            } else if(loginError.response.data && loginError.response.data.message){
            this.setState({
              email: '',
              password: '',
              submitButtonValue: 'Sign In',
              buttonClass : 'form-field-button',
              loginError: loginError.response.data.message
            });
            } else {
              this.setState({
                email: '',
                password: '',
                submitButtonValue: 'Sign In',
                buttonClass : 'form-field-button',
                loginError: loginError
              });
            }
          })
  };

  componentDidMount(){
    /* dispatch logout action after call to /login */
    logOutAction()
  }


  displayLoginError = (loginError) => {
    if(loginError){
      return (
        <div className="alert alert-danger text-center">
        { loginError }
        </div> )
    } else {
      return;
    }
  }

  render() {
    const { buttonClass, submitButtonValue, loginError } = this.state;
    const { loggedIn } = this.props;

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

        { this.displayLoginError(loginError) }
        
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
            required autoFocus
          />
        </div>

        <div className="form-field">
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
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
    loggedIn : state.auth.loggedIn
  }
}

export default  withRouter(connect(mapStateToProps)(SignInForm));
