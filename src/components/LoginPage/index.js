import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import saveUser from '../../redux/actions/saveUser';
import { connect } from 'react-redux';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import { API_BASE_URL } from '../../config';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    const userCredentials = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(`${API_BASE_URL}/users/login`, userCredentials)
      .then(res => {
        console.log(res);
        this.props.saveUser(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
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
              placeholder='Email Address'
              name='email'
              value={this.state.email}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <InputPassword
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={e => {
                this.handleChange(e);
              }}
            />

            <div className="LoginLinkContainer">
              <Link to='/forgot-password' className="LoginContentLink">Forgot your password?</Link>
            </div>

            <PrimaryButton
              label="login"
              onClick={this.handleSubmit}
            />

            <div className="LoginContentBottomLink LoginLinkContainer">
              Not signed up?  <Link to='/register' className="LoginContentLink">Create an account.</Link>
            </div>

          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = {
  saveUser: saveUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
