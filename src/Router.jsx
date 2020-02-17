import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
// import NavBar from './components/NavBar/';

const routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <AdminDashboard />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default routes;
