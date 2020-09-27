import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveUser from '../../redux/actions/saveUser';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import Spinner from '../Spinner';
import { API_BASE_URL } from '../../config';
import '../LoginPage/LoginPage.css';

class AdminLoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      feedbackMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { saveUser } = this.props;

    const { email, password } = this.state;

    const adminCredentials = {
      email,
      password
    };

    this.setState({
      loading: true
    });

    axios
      .post(`${API_BASE_URL}/users/admin_login`, adminCredentials)
      .then((res) => {
        if (res.data.status === 'success') {
          this.setState({
            loading: false
          });

          // redirect to dashboard
          // save user data to store
          saveUser(res.data.data);
          localStorage.setItem('token', res.data.data.access_token);
          this.setState(
            {
              feedbackMessage: 'Login Successful'
            },
            () => {
              window.location.href = '/clusters';
            }
          );
        }
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { email, password, loading } = this.state;

    return (
      <div className="LoginPageContainer">
        <Header />
        <div className="LoginContent">
          <div className="LoginContentHeading">
            <h1>Admin Login</h1>
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

              <div className="LoginLinkContainer">
                <Link to="/forgot-password" className="LoginContentLink">Forgot your password?</Link>
              </div>

              <PrimaryButton
                label={loading ? <Spinner /> : 'login'}
                onClick={this.handleSubmit}
              />

              <div className="LoginContentBottomLink LoginLinkContainer">
                <Link to="/login" className="LoginContentLink">Go to user login.</Link>
              </div>

            </div>
          </form>
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

AdminLoginPage.propTypes = {
  saveUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminLoginPage));
