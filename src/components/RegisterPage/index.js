import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import Checkbox from '../Checkbox';
import { API_BASE_URL } from '../../config';

import './RegisterPage.css';

export default class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      hasAgreed: false,
      loading: false,
      registered: false,
      error: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgreed = this.toggleAgreed.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  toggleAgreed(value) {
    this.setState({
      hasAgreed: value
    });
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.error = this.state;
    if (this.error) {
      this.setState({
        error: ''
      });
    }
  }

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  handleSubmit() {
    const { name, email, password, passwordConfirm, hasAgreed } = this.state;
    const userData = {
      name,
      email,
      password
    };
    if (!email || !password || !name || !passwordConfirm) {
      this.setState({
        error: 'Please enter all fields'
      });
    } else if (this.validateEmail(email) === false) {
      this.setState({
        loading: false,
        error: 'Please provide a valid email address'
      });
    } else if (password !== passwordConfirm) {
      this.setState({
        loading: false,
        error: 'Passwords do not match'
      });
    } else if (hasAgreed === true) {
      this.setState({
        loading: false,
        error: 'Agree to the terms and conditions'
      });
    } else {
      this.setState({
        loading: true
      });

      axios
        .post(`${API_BASE_URL}/users`, userData)
        .then((response) => {
          if (response.data.status === 'success') {
            this.setState({
              loading: false
            });
            setTimeout(() => {
              this.setState({
                registered: true
              });
            }, 1000);
          }
        })
        .catch((error) => {
          this.setState({
            loading: false
          });

        });

    }


  }

  render() {
    const {
      name,
      email,
      password,
      passwordConfirm,
      loading,
      registered,
      error
    } = this.state;

    return (
      <div className="RegisterPageContainer">
        <Header />
        <div className="RegisterContent">
          {!registered ? (
            <>
              <div className="RegisterContentHeading">
                <h1>Create an account</h1>
              </div>
              <div className="RegisterContentInputs">

                <InputText
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.handleOnChange}

                />
                <InputText
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                />
                <InputPassword
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleOnChange}
                />
                <InputPassword
                  placeholder="Repeat Password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={this.handleOnChange}
                />
                {error && (
                  <div className="RegisterErrorDiv">
                    {error}
                  </div>
                )}


                <div className="RegisterContentBottomLink RegisterLinkContainer RegisterCheckbox">
                  <Checkbox
                    onClick={this.toggleAgreed}
                  />
                  &nbsp; I agree to Crane Cloud&apos;s&nbsp;&nbsp;
                  <Link to="/register" className="RegisterContentLink">Terms of service.</Link>
                </div>

                <PrimaryButton
                  label={loading ? <Spinner /> : 'Register'}
                  onClick={this.handleSubmit}
                />
              </div>
            </>
          ) : (
              <div className="RegisterSuccessContent">
                <div className="RegisteredMessage">
                  <h2>Thank you for registering with us!</h2>
                  <p>
                    We&apos;ve sent a link to your email address:&nbsp;
                  <span>{email}</span>
                    .
                  <br />
                    <br />
                    The link will expire after 24 hours. Please use this link to activate and start using your account.
                </p>
                </div>
              </div>
            )}
        </div>


        <div className="RegisterPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}
