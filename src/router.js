import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import store from './redux/store';
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
import ServicesListPage from './components/ServicesList';
import StorageClassList from './components/StorageClassList';
import PvsListPage from './components/PvsListPage';
import JobsListPage from './components/JobsListPage';
import DeploymentsPage from './components/DeploymentsPage';
import UserProjectsPage from './components/UserProjectsPage';
import AdminProjectsPage from './components/AdminProjectsPage';
import VerificationSentPage from './components/VerificationSentPage';
import AdminLoginPage from './components/AdminLoginPage';
import AppsPage from './components/AppsPage';
import UsersAccounts from './components/UserAccounts';
import AppMetricsPage from './components/AppMetricsPage';
import ProjectSettingsPage from './components/ProjectSettingsPage';
import AppSettingsPage from './components/AppSettingsPage';
import ProjectMemoryPage from './components/ProjectMemoryPage';
import ProjectCPUPage from './components/ProjectCPUPage';
import ProjectNetworkPage from './components/ProjectNetworkPage';
import ProjectMetricsPage from './components/ProjectMetricsPage';

// Protected route should have token. If not, login.
const ProtectedRoute = ({ isAllowed, ...props }) => (
  isAllowed
    ? <Route {...props} />
    : <Redirect to="/login" />
);

// for now, existence of token will determine access to route
// later, this token will be a verified boolean
const hasToken = store.getState().user.accessToken;

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin-login" component={AdminLoginPage} />
      <Route path="/forgot-password" component={PasswordReset} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/new-password" component={CreateNewPassword} />
      <Route path="/verify/:token" component={VerificationSentPage} />
      <Route path="/reset_password/:token" component={CreateNewPassword} />
      {/* projects */}
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects" component={UserProjectsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/apps" component={AppsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/apps/:appID/metrics" component={AppMetricsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/apps/:appID/settings" component={AppSettingsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/memory/" component={ProjectMemoryPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/cpu/" component={ProjectCPUPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/metrics" component={ProjectMetricsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/network/" component={ProjectNetworkPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/users/:userID/projects/:projectID/settings" component={ProjectSettingsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/clusters/:clusterID/accounts" component={UsersAccounts} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/projects" component={AdminProjectsPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/resources" component={ClusterResourcesPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/services" component={ServicesListPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/volumes" component={PvsListPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/nodes" component={ClusterNodes} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/pvcs" component={PvcsList} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/namespaces" component={NamespacesListPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/pods" component={PodsList} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/storage-classes" component={StorageClassList} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/jobs" component={JobsListPage} />
      <ProtectedRoute isAllowed={hasToken} path="/clusters/:clusterID/deployments" component={DeploymentsPage} />
      <ProtectedRoute isAllowed={hasToken} exact path="/clusters" component={ClusterPage} />
    </Switch>
  </Router>
);

export default Routes;
