import React from 'react';
import Header from '../Header';
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
        <div>
          hello
        </div>
      </div>
    );
  }
}

export default LoginPage;
