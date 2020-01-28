import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/';
// import NavBar from './components/NavBar/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
        {/* <NavBar /> */}
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
