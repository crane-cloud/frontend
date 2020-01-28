import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
