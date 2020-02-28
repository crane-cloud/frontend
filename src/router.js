import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import PasswordReset from './components/PasswordReset';
import RegisterPage from './components/RegisterPage';
import ClusterPage from './components/ClusterPage';
import ClusterResourcesPage from './components/ClusterResourcesPage';
import PodsList from './components/ClusterComponents/PodsList';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot-password" component={PasswordReset} />
      <Route path="/register" component={RegisterPage} />
      <Route exact path="/clusters/:clusterID/resources" component={ClusterResourcesPage} />
      <Route exact path="/clusters" component={ClusterPage} />
      <Route exact path="/pods" component={PodsList} />

    </Switch>
  </BrowserRouter>
);

export default Routes;
