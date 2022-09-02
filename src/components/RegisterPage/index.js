import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import InputText from "../InputText";
import InputPassword from "../InputPassword";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import { ReactComponent as LogoIcon } from "../../assets/images/githublogo.svg";
import { API_BASE_URL, GIT_REDIRECT_URL } from "../../config";
import Checkbox from "../Checkbox";

import "./RegisterPage.css";

export default class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      hasAgreed: false,
      loading: false,
      registered: false,
      gitLoading: false,
      error: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAgreed = this.toggleAgreed.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.toGithubauth = this.toGithubauth.bind(this);
  }

  toggleAgreed() {
    const { hasAgreed, error } = this.state;
    this.setState({
      hasAgreed: !hasAgreed,
    });

    if (error) {
      this.setState({
        error: "",
      });
    }
  }
  toGithubauth = () => {
    // on return, github will be redricted to the login page where the
    // functions that handle the rest of the authrntications are
    const { hasAgreed } = this.state;
    if (hasAgreed) {
      this.setState({
        loading: true,
        gitLoading: true,
      });
      window.location.href = `${GIT_REDIRECT_URL}`;
    } else {
      this.setState({
        loading: false,
        gitLoading: false,
        error: "Please agree to our Terms of Service",
      });
    }
  };

  handleOnChange(e) {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (error) {
      this.setState({
        error: "",
      });
    }
  }

  validateEmail(email) {
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, passwordConfirm, hasAgreed } = this.state;

    const userData = {
      name,
      email,
      password,
    };

    if (!email || !password || !name || !passwordConfirm) {
      this.setState({
        error: "Please enter all fields",
      });
    } else if (!name.trim()) {
      this.setState({
        error: "Please provide a valid username",
      });
    } else if (this.validateEmail(email) === false) {
      this.setState({
        loading: false,
        error: "Please provide a valid email address",
      });
    } else if (password !== passwordConfirm) {
      this.setState({
        loading: false,
        error: "Passwords do not match",
      });
    } else if (!hasAgreed) {
      this.setState({
        loading: false,
        error: "Please agree to our Terms of Service",
      });
    } else {
      this.setState({
        loading: true,
      });

      axios
        .post(`${API_BASE_URL}/users`, userData)
        .then((response) => {
          if (response.data.status === "success") {
            this.setState({
              loading: false,
              registered: true,
            });
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error: "Email already in use by another account.",
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
      error,
      hasAgreed,
      gitLoading,
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
              <form onSubmit={this.handleSubmit}>
                <div className="RegisterContentInputs">
                  <InputText
                    required
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleOnChange}
                  />
                  <InputText
                    required
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleOnChange}
                  />
                  <InputPassword
                    required
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleOnChange}
                  />
                  <InputPassword
                    required
                    placeholder="Repeat Password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={this.handleOnChange}
                  />
                  {error && <div className="RegisterErrorDiv">{error}</div>}

                  <div className="RegisterContentBottomLink RegisterLinkContainer RegisterCheckbox">
                    <Checkbox
                      onClick={this.toggleAgreed}
                      isChecked={hasAgreed}
                    />
                    &nbsp; I agree to Crane Cloud&apos;s&nbsp;&nbsp;
                    <Link
                      to="/terms-of-service"
                      target="_blank"
                      className="RegisterContentLink"
                    >
                      Terms of service.
                    </Link>
                  </div>

                  <PrimaryButton
                    className="SignupBtn AuthBtn"
                    label={loading ? <Spinner /> : "Register"}
                    onClick={this.handleSubmit}
                  />
                </div>
              </form>
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
                  The link will expire after 24 hours. Please use this link to
                  activate and start using your account.
                </p>
              </div>
            </div>
          )}
          <div className="LowerSignupSection">
            <div>
              <p className="SignupWith">
                <span>Or Join with</span>
              </p>
            </div>
            <PrimaryButton
              label={
                gitLoading ? (
                  <Spinner />
                ) : (
                  <div className="GitLoginBtn">
                    <LogoIcon className="LogoIcon" />
                    <div className="GitText">Github</div>
                  </div>
                )
              }
              className="GithubLoginBtn AuthBtn"
              disable={gitLoading}
              onClick={this.toGithubauth}
            />
          </div>
          <div className="LoginContentBottomLink LoginLinkContainer">
            Already have an account? &nbsp;
            <Link to="/" className="LoginContentLink">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
