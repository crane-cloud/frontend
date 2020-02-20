import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/';
import SideNav from './components/SideNav';
// import NavBar from './components/NavBar/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
        {/* <NavBar /> */}
      </Route>
      <Route exact path="/side">
        <SideNav />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
