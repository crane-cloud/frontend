import React from 'react';
import {Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ClusterResourcesPage from './components/ClusterResourcesPage';
// import NavBar from './components/NavBar/';
import store from './redux/store';

const routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AdminDashboard />
        </Route>
        <Route exact path="/resources">
          <ClusterResourcesPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default routes;
