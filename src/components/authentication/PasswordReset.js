import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderComponent from '../homepage/header';

import '../../assets/css/auth.css';

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
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
  };

  render() {
    return (
      <>
        <div className="home-container">
          <HeaderComponent />
        </div>
        <div className="auth-form">
          <form onSubmit={this.handleSubmit}>

            <div className="form-title">
              Reset Your Password
            </div>

            <div className="form-field-msg">
              <p>Submit your email address and we’ll send you a link to reset your password.</p>
            </div>

            <div className="form-field">
              <input
                required
                type="email"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <button className="form-field-button">Send Verification Link</button>

            <p className="redirect">Just in case you remembered your password... <Link to="/login" className="form-field-link">try logging in</Link></p>

          </form>
        </div>
      </>
    )
  }
}

export default PasswordReset;