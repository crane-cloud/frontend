import React from 'react';
import {Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import PasswordReset from './components/PasswordReset';
import RegisterPage from './components/RegisterPage';
import ClusterResourcesPage from './components/ClusterResourcesPage';
import store from './redux/store';

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgot-password" component={PasswordReset} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/resources" component={ClusterResourcesPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;
