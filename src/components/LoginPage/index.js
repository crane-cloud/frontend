import React from 'react';
import Header from '../Header';
import LandingFooter from '../LandingFooter';
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
            hello
          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }
}

export default LoginPage;
