import React, { Component } from 'react';

import UserTopNav from './components/TopNav/UserTopNav';
import UserSideNav from './components/SideNav/UserSideNav';
import MainSection from './components/MainSection/MainSection';

export default class UserDashboard extends Component {
  render() {
    return (
      <div>
        <UserTopNav />
        <div className="container-fluid">
          <UserSideNav />
          <MainSection />
        </div>
      </div>
    );
  }
}
