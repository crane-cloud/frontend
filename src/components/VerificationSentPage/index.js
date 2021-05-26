import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import saveUser from "../../redux/actions/saveUser";
import Header from "../Header";
import InputText from "../InputText";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import "./VerificationSentPage.css";
import { API_BASE_URL } from "../../config";

class VerificationSentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      isTokenChecked: false,
      isVerificationFailed: false,
      loading: false,
      feedback: "",
      error: "",
      emailSent: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match, saveUser } = this.props;
    const { token } = match.params;

    // remove the current state from local storage
    // so that when a person doesnt access the panel of another
    // from the previous state which wasnt cleared
    localStorage.removeItem("state");
    localStorage.removeItem("project");

    axios
      .get(`${API_BASE_URL}/users/verify/${token}`)
      .then((response) => {
        if (response.data.status === "success") {
          this.setState({
            isTokenChecked: true,
          });

          // redirect to dashboard
          // save user data to store and log them in
          saveUser(response.data.data);
          localStorage.setItem("token", response.data.data.access_token);
          this.setState(
            {
              feedback: "Login successful",
            },
            () => {
              window.location.href = `/users/${response.data.data.id}/projects`;
            }
          );
        }
      })
      .catch((/* error */) => {
        this.setState({
          isTokenChecked: true,
          isVerificationFailed: true,
          feedback: "Oops! Account verification failed!",
        });
      });
  }

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
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  handleSubmit() {
    const { email } = this.state;

    if (!email) {
      this.setState({
        error: "Please enter your email address",
      });
    } else {
      if (this.validateEmail(email)) {
        this.setState({
          loading: true,
        });

        axios
          .post(`${API_BASE_URL}/users/verify`, { email })
          .then((res) => {
            if (res.data.status === "success") {
              this.setState({
                loading: false,
                emailSent: true,
              });
            }
          })
          .catch((err) => {
            this.setState({
              loading: false,
              // There can only be a singular error for this from the backend
              error: "Email not yet registered.",
            });
          });
      } else {
        this.setState({
          error: "Please enter a valid email address",
        });
      }
    }
  }

  render() {
    const {
      loading,
      isTokenChecked,
      isVerificationFailed,
      email,
      feedback,
      error,
      emailSent,
    } = this.state;

    return (
      <div className="VerificationPageContainer">
        <div className="VerificationPageHeader">
          <Header />
        </div>
        <div className="VerificationPageMain">
          <div className="VerificationPageContent">
            {!isTokenChecked && (
              <>
                <div>
                  <Spinner size="Big" />
                </div>
                <br />
                <div>Please wait...</div>
              </>
            )}
            {emailSent ? (
              <div className="RegisterSuccessContent">
                <div className="RegisteredMessage">
                  <h2>Thank you for registering with us!</h2>
                  <p>
                    We&apos;ve re-sent a link to your email address:&nbsp;
                    <span>{email}</span>
                    .
                    <br />
                    <br />
                    The link too will expire after 24 hours. Please use this
                    link to activate and start using your account.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {isVerificationFailed && (
                  <div className="ResendLinkForm">
                    <h2>{feedback}</h2>
                    {/* eslint-disable-next-line max-len */}
                    <p>
                      Looks like your link expired. Worry not! Just enter your
                      email below and we&apos;ll send you another link.
                    </p>
                    <div className="ResendFormInputs">
                      <InputText
                        required
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => this.handleOnChange(e)}
                      />
                      {error && <div className="LoginErrorDiv">{error}</div>}
                      <PrimaryButton
                        className="ResendLinkBtn"
                        label={loading ? <Spinner /> : "Resend Link"}
                        onClick={this.handleSubmit}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

VerificationSentPage.propTypes = {
  saveUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = {
  saveUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerificationSentPage));
