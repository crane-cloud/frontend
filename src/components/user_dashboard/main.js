import React, { Component } from 'react';

import HeaderComponent from '../homepage/header';
// import UserTopNav from './components/TopNav/UserTopNav';
import UserSideNav from './components/SideNav/UserSideNav';
import MainSection from './components/MainSection/MainSection';


export default class UserDashboard extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container-fluid">
          <div className="row">
            <UserSideNav />
            <MainSection />
          </div>
        </div>
      </div>
    );
  }
}
