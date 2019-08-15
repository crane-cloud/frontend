import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/auth.css';

import loginSuccess from '../../redux/actions/auth/loginSuccess';
import axios from 'axios';
import { BASE_URL } from '../../config';

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
    axios
      .post(BASE_URL + '/login', {
        ...this.state,
      })
      .then(response => {
        // dispatch action on success
        loginSuccess({
          accessToken: response.data.access_token,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
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
    );
  }
}

export default SignInForm;
