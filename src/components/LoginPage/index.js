import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
import InputText from '../InputText';
import InputPassword from '../InputPassword';
import PrimaryButton from '../PrimaryButton';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {};
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
            />
            <InputPassword
              placeholder='Password'
            />

            <div className="LoginLinkContainer">
              <Link to='/forgot-password' className="LoginContentLink">Forgot your password?</Link>
            </div>

            <PrimaryButton label="login" />

            <div className="LoginContentBottomLink LoginLinkContainer">
              Not signed up?  <Link to='/register' className="LoginContentLink">Create an account.</Link>
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

export default LoginPage;
