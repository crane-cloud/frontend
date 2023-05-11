import React from "react";
import axios from "axios";
import Header from "../Header";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import "./CreateNewPassword.css";
import { API_BASE_URL } from "../../config";
import InputText from "../InputText";
import { ReactComponent as CopyText } from "../../assets/images/copy.svg";
import { ReactComponent as Open } from "../../assets/images/open.svg";
import { ReactComponent as Closed } from "../../assets/images/close.svg";

export default class CreateNewPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      loading: false,
      passreset: false,
      passwordConfirmShown: false,
      passwordShown: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.togglePasswordConfirm = this.togglePasswordConfirm.bind(this);
  }
  togglePassword() {
    this.setState({ passwordShown: !this.state.passwordShown });
  }
  togglePasswordConfirm() {
    this.setState({ passwordConfirmShown: !this.state.passwordConfirmShown });
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

  handleSubmit() {
    const { password, confirmPassword } = this.state;

    const { match } = this.props;
    const { token } = match.params;

    const userData = {
      password,
    };

    if (!password || !confirmPassword) {
      this.setState({
        error: "Please enter all fields",
      });
    } else if (password !== confirmPassword) {
      this.setState({
        loading: false,
        error: "Passwords do not match",
      });
    } else {
      this.setState({
        loading: true,
      });

      axios
        .post(`${API_BASE_URL}/users/reset_password/${token}`, userData)
        .then((response) => {
          if (response.data.status === "success") {
            this.setState({
              loading: false,
            });
            setTimeout(() => {
              this.setState({
                passreset: true,
              });
            }, 1000);
          }
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error: "Invalid user, please create an account",
          });
        });
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      loading,
      error,
      passreset,
      passwordShown,
      passwordConfirmShown,
    } = this.state;

    return (
      <div className="NewPasswordPageContainer">
        <Header />
        {!passreset ? (
          <>
            <div className="NewPasswordContent">
              <div className="NewPasswordContentHeading">
                <h1>Create New Password</h1>
                <p>Create a new and strong password </p>
              </div>
              <div className="NewPasswordContentInputs">
                {/* Input fields */}
                <div className="password-wrap">
                  <InputText
                    placeholder="Password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={this.handleOnChange}
                  />
                  <div className="password" onClick={this.togglePassword}>
                    {passwordShown ? <Open /> : <Closed />}
                  </div>
                </div>

                <div className="password-repeat">
                  <InputText
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type={passwordConfirmShown ? "text" : "password"}
                    value={confirmPassword}
                    onChange={this.handleOnChange}
                  />
                  <div
                    className="password"
                    onClick={this.togglePasswordConfirm}
                  >
                    {passwordConfirmShown ? <Open /> : <Closed />}
                  </div>
                </div>

                {error && <div className="NewPasswordErrorDiv">{error}</div>}

                <PrimaryButton onClick={this.handleSubmit}>
                  {loading ? <Spinner /> : "RESET"}
                </PrimaryButton>
              </div>
            </div>
          </>
        ) : (
          <div className="NewPasswordSuccessContent">
            <div className="NewPasswordMessage">
              <h2>New password successfully created!</h2>
              <p>
                You&apos;ve successfully created a new password,
                <br />
                <br />
                Please login to use it.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
