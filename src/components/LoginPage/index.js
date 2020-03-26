import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import saveUser from '../../redux/actions/saveUser';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../SpinnerComponent';
import { API_BASE_URL } from '../../config';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleChange(e) {
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
    const { email, password } = this.state;
    const { saveUser } = this.props;

    const userCredentials = {
      email,
      password
    };

    if (!email || !password) {
      // if user tries to submit empty email/password
      this.setState({
        error: 'Please enter your email and password'
      });
    } else {
      if (this.validateEmail(email)) {
        this.setState({
          loading: true
        });

        axios
          .post(`${API_BASE_URL}/users/login`, userCredentials)
          .then((res) => {
            if (res.data.status === 'success') {
              this.setState({
                loading: false
              });

              // redirect to dashboard
              // save user data to store
              saveUser(res.data.data);
              this.setState(
                {
                  feedbackMessage: 'Login Successful'
                },
                () => {
                  window.location.href = `/users/${res.data.data.id}/projects`;
                }
              );
            }
          })
          .catch((err) => {
            this.setState({
              loading: false
            });
            this.setState({
              error: 'Incorrect email or password'
            });
          });
      } else {
        this.setState({
          error: 'Please provide a valid email address'
        });
      }
    }
  }

  render() {
    const {
      error,
      email,
      password,
      loading
    } = this.state;

    return (
      <div className="LoginPageContainer">
        <Header />
        <div className="LoginContent">
          <div className="LoginContentHeading">

            <h1>Login to the cloud</h1>
          </div>
          <div className="LoginContentInputs">
            {/* Input fields */}
            <InputText
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <InputPassword
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />

            {error && (
              <div className="LoginErrorDiv">
                {error}
              </div>
            )}

            <div className="LoginLinkContainer">
              <Link to="/forgot-password" className="LoginContentLink">Forgot your password?</Link>
            </div>

            <PrimaryButton
              label={loading ? <Spinner /> : 'login'}
              onClick={this.handleSubmit}
            />

            <div className="LoginContentBottomLink LoginLinkContainer">
              Not signed up? &nbsp;
              <Link to="/register" className="LoginContentLink">Create an account.</Link>
            </div>

          </div>
        </div>

        <div className="LoginPageFooter">
          <LandingFooter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  { user: state.user }
);

const mapDispatchToProps = {
  saveUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
