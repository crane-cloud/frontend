import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
        {/* <NavBar /> */}
      </Route>
    </Switch>
  </Router>
);

export default Routes;
