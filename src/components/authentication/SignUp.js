import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

import { BASE_URL } from '../../config';

import "../../assets/css/auth.css";
import axios from 'axios';

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreed: false,
    redirect: false
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords dont match")
      return;
    } else if (this.state.hasAgreed !== true) {
      return;
    } else {
      this.registerUser();

    }
  }

  registerUser = () => {
    const { name, email, password } = this.state;

    axios.post(BASE_URL + '/register', {
      name: name,
      email: email,
      password: password
    })
      .then((response) => {
        this.setState({ redirect: true });
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })

  }

  render() {
    const { name, email, password, confirmPassword, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/user-dashboard" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>

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

        <button className="form-field-button">Sign Up</button>

        <p className="redirect">Already a member? <Link to="/login" className="form-field-link">Log in here</Link></p>

      </form>
    );
  }
}

export default SignUpForm;