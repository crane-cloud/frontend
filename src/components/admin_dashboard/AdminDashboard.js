import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopNav from './general_components/TopNav';
import SideNav from './general_components/sideNav';
import DashboardMain from './general_components/DashboardMain/DashboardMain';
import Nodes from './general_components/DashboardMain/components/Nodes/Nodes';

export default class AdminDashboard extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopNav />
          <div className="container-fluid">
            <SideNav />
            <Route exact path="/:name/nodes" component={Nodes} />
            <Route exact path="/admin-dashboard" component={DashboardMain} />
          </div>
        </div>
      </Router>
    );
  }
}
