import React from "react";
import axios from "axios";
import { Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import saveUser from "../../redux/actions/saveUser";
import removeUser from "../../redux/actions/removeUser";
import Header from "../Header";
import InputText from "../InputText";
import InputPassword from "../InputPassword";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import { API_BASE_URL,GIT_REDIRECT_URL} from "../../config";
import { ReactComponent as LogoIcon } from "../../assets/images/githublogo.svg";
import  "./LoginPage.css";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      error: "",
      gitLoading: false,
      feedbackMessage:"",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.initiateGitHubLogin = this.initiateGitHubLogin.bind(this);
  }

  componentDidMount() {
    // remove the current state from local storage
    // so that when a person logs in they dont encounter
    // the previous state which wasnt cleared
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams?.get('code');
    // localStorage.setItem("state", {});
    // localStorage.removeItem("state");
    // this.props.removeUser();
    if(code){
     this.initiateGitHubLogin(code);
    }

  }

  handleChange(e) {
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
    // eslint-disable-next-line no-useless-escape
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();

    const { error, email, password } = this.state;
    const { saveUser } = this.props;

    const userCredentials = {
      email,
      password,
    };

    if (!email || !password) {
      // if user tries to submit empty email/password
      this.setState({
        error: "Please enter your email and password",
      });
    } else {
      if (this.validateEmail(email)) {
        this.setState({
          loading: true,
        });

        if (error) {
          this.setState({
            error: "",
          });
        }

        axios
          .post(`${API_BASE_URL}/users/login`, userCredentials)
          .then((res) => {
            if (res.data.status === "success") {
              this.setState({
                loading: false,
              });

              // redirect to dashboard
              // save user data to store
              saveUser(res.data.data);
              // add access token to localstorage
              localStorage.setItem("token", res.data.data.access_token);
              this.setState(
                {
                  feedbackMessage: "Login Successful",
                },
                () => {
                  window.location.href = `/users/${res.data.data.id}/projects`;
                }
              );
            }
          })
          .catch((err) => {
            this.setState({
              loading: false,
            });
            if (err.response.data.message === "email not verified") {
              this.setState({
                error: "Please verify your account.",
              });
            } else {
              this.setState({
                error: "Incorrect email or password.",
              });
            }
          });
      } else {
        this.setState({
          error: "Please provide a valid email address",
        });
      }
    }
  }

  initiateGitHubLogin = (code) =>{
    const {gitLoading,feedbackMessage} = this.state;
    const { saveUser } = this.props;
   if(!gitLoading && !feedbackMessage ){
    const object = {
      code,
    }
    console.log(object);
    this.setState({
      gitLoading:true,
      feedbackMessage:"Please wait",
    });

  axios
        .post(`${API_BASE_URL}/users/oauth`, object)
        .then((res) => {
          console.log(res);     
          if (res.data.status === "success") {
            saveUser(res.data.data);
            localStorage.setItem("token", res.data.data.access_token);

            this.setState(
              {
                gitLoading:false,
                feedbackMessage: "Login Successful",
              });

            window.location.href = `/users/${res.data.data.id}/projects`;       
          }
        })
        .catch((e) => {
          this.setState({
            gitLoading:false,
            error:"Login failed",
            feedbackMessage:""
          });
        });
    }
  };
 
  render() {
   
    const { error, email, password, loading,gitLoading,feedbackMessage} = this.state;

    
    return (
      <div className="LoginPageContainer">
        <Header />
        <div className="LoginContent">
          <div className="LoginContentHeading">
            <h1>Login to the cloud</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="LoginContentInputs">
              {/* Input fields */}
              <InputText
                required
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <InputPassword
                required
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />

              {error && <div className="LoginErrorDiv">{error}</div>}

              <div className="LoginLinkContainer">
                <Link to="/forgot-password" className="LoginContentLink">
                  Forgot your password?
                </Link>
              </div>

              <PrimaryButton
                label={loading ? <Spinner /> : "login"}
                className="LoginButton" 
                onClick={this.handleSubmit}
              /> 
            </div>
          </form>
          <div className="LowerLoginSection">
          <div>
                 <p className="LoginWith"><span>Or Login with</span></p>  
               </div> 
               <a
                href={gitLoading ? 0 :`${GIT_REDIRECT_URL}`}
                rel="noopener noreferrer"
                target="_blank"
              >  
                <PrimaryButton
                label={gitLoading ? <Spinner /> : 
                <div className="GitLoginBtn">
                  <LogoIcon className="LogoIcon" />
                  <div className="GitText">Github</div>
                </div>}
                className="GithubLoginBtn" 
                disable= {gitLoading}
              />
              </a>
              { feedbackMessage && <div className="LoginFeedBackDiv">{feedbackMessage}</div>}
              <div className="LoginContentBottomLink LoginLinkContainer">
                Not signed up? &nbsp;
                <Link to="/register" className="LoginContentLink">
                  Create an account.
                </Link>
              </div>
         </div>        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = {
  saveUser,
  removeUser,
};

LoginPage.propTypes = {
  saveUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));