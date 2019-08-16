import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import loginSuccess from '../../redux/actions/auth/loginSuccess';
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
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    /**
     * make api call
     */

    loginApiCall(BASE_URL, this.state);
  };

  render() {
    if(this.props.loggedIn){
      return <Redirect to="/user-dashboard"/>
    }
    return (
      <>
      <div className="home-container">
                    <HeaderComponent />
      </div>
      <div className="auth-form">
      <form onSubmit={this.handleSubmit}>

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

        <button className="form-field-button">Sign In</button>

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
    loggedIn : state.loginSuccess.loggedIn
  }
}

export default  connect(mapStateToProps)(SignInForm);
