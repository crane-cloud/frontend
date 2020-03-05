import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import PasswordReset from './components/PasswordReset';
import RegisterPage from './components/RegisterPage';
import ClusterPage from './components/ClusterPage';
import ClusterResourcesPage from './components/ClusterResourcesPage';
import ClusterNodes from './components/NodesList';
import PvcsList from './components/PvcsList';
import NamespacesListPage from './components/NamespacesList';
import PodsList from './components/PodsList';
import CreateNewPassword from './components/CreateNewPassword';
import JobsListPage from './components/JobsListPage';
import DeploymentsPage from './components/DeploymentsPage';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot-password" component={PasswordReset} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/new-password" component={CreateNewPassword} />
      <Route exact path="/clusters/:clusterID/resources" component={ClusterResourcesPage} />
      <Route exact path="/clusters/:clusterID/nodes" component={ClusterNodes} />
      <Route exact path="/clusters/:clusterID/pvcs" component={PvcsList} />
      <Route exact path="/clusters/:clusterID/namespaces" component={NamespacesListPage} />
      <Route exact path="/clusters/:clusterID/pods" component={PodsList} />
      <Route exact path="/clusters/:clusterID/jobs" component={JobsListPage} />
      <Route exact path="/clusters/:clusterID/deployments" component={DeploymentsPage} />
      <Route exact path="/clusters" component={ClusterPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
