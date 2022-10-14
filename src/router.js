import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AdminDBList from './components/AdminDB';
import AdminLoginPage from './components/AdminLoginPage';
import AdminProjectsPage from './components/AdminProjectsPage';
import AdminUsersProfile from './components/AdminUsersProfile';
import App from './components/App';
import AppLogsPage from './components/AppLogsPage';
import AppMemoryPage from './components/AppMemoryPage';
import AppNetworkPage from './components/AppNetworkPage';
import AppSettingsPage from './components/AppSettingsPage';
import AppsPage from './components/AppsPage';
import ClusterPage from './components/ClusterPage';
import ClusterResourcesPage from './components/ClusterResourcesPage';
import ClusterSettingsPage from './components/ClusterSettingsPage';
// import PricingPage from "./components/PricingPage";
import ContactPage from './components/ContactPage';
import CreateDatabase from './components/CreateDatabase';
import CreateNewPassword from './components/CreateNewPassword';
import DatabaseList from './components/DatabaseList';
import DBSettingsPage from './components/DBSettingsPage';
import DeploymentsPage from './components/DeploymentsPage';
import Privacy from './components/Documents/privacy';
import Terms from './components/Documents/terms';
import JobsListPage from './components/JobsListPage';
// import App from "./components/App";
import LoginPage from './components/LoginPage';
import MonitoringPage from './components/MonitoringPage';
import NamespacesListPage from './components/NamespacesList';
import ClusterNodes from './components/NodesList';
import PageNotFound from './components/PageNotFound';
import PasswordReset from './components/PasswordReset';
import PodsList from './components/PodsList';
import ProjectBillingPage from './components/ProjectBillingPage';
import ProjectCPUPage from './components/ProjectCPUPage';
import ProjectDashboardPage from './components/ProjectDashboardPage';
import ProjectMemoryPage from './components/ProjectMemoryPage';
import ProjectNetworkPage from './components/ProjectNetworkPage';
import PvcsList from './components/PvcsList';
import PvsListPage from './components/PvsListPage';
import RegisterPage from './components/RegisterPage';
import ServicesListPage from './components/ServicesList';
import StorageClassList from './components/StorageClassList';
import TeamPage from './components/TeamPage';
import UsersAccounts from './components/UserAccounts';
import UserProfile from './components/UserProfile';
import VerificationSentPage from './components/VerificationSentPage';
import AppCpuPage from './pages/AppCpuPage';
import AppMetricsPage from './pages/AppMetricsPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import UserProjectsPage from './pages/UserProjectsPage';
import store from './redux/store';

// Protected route should have token. If not, login.
const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/" />;

// for now, existence of token will determine access to route
// later, this token will be a verified boolean
const hasToken = store.getState().user.accessToken;

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin-login" component={AdminLoginPage} />
      <Route path="/forgot-password" component={PasswordReset} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/new-password" component={CreateNewPassword} />
      <Route path="/verify/:token" component={VerificationSentPage} />
      <Route path="/reset_password/:token" component={CreateNewPassword} />
      <Route path="/team" component={TeamPage} />
      <Route path="/create" component={CreateDatabase} />
      <Route path="/terms-of-service" component={Terms} />
      <Route path="/privacy-policy" component={Privacy} />
      <Route path="/status" component={MonitoringPage} />
      {/* projects */}
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/billing"
        component={ProjectBillingPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects"
        component={UserProjectsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/databases"
        component={DatabaseList}
      />

      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/databases/:databaseID/settings"
        component={DBSettingsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps"
        component={AppsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/network"
        component={AppNetworkPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/cpu"
        component={AppCpuPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/memory"
        component={AppMemoryPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/dashboard"
        component={AppMetricsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/settings"
        component={AppSettingsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/apps/:appID/logs"
        component={AppLogsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/databases"
        component={DatabaseList}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/memory/"
        component={ProjectMemoryPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/dashboard"
        component={ProjectDashboardPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/cpu/"
        component={ProjectCPUPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/network/"
        component={ProjectNetworkPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/projects/:projectID/settings"
        component={ProjectSettingsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/accounts"
        component={UsersAccounts}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/profile"
        component={UserProfile}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/accounts/:userID"
        component={AdminUsersProfile}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/projects"
        component={AdminProjectsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/resources"
        component={ClusterResourcesPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/services"
        component={ServicesListPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/volumes"
        component={PvsListPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/nodes"
        component={ClusterNodes}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/pvcs"
        component={PvcsList}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/namespaces"
        component={NamespacesListPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/pods"
        component={PodsList}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/storage-classes"
        component={StorageClassList}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/jobs"
        component={JobsListPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        path="/clusters/:clusterID/deployments"
        component={DeploymentsPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/clusters"
        component={ClusterPage}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/databases"
        component={AdminDBList}
      />
      <ProtectedRoute
        isAllowed={hasToken}
        exact
        path="/clusters/:clusterID/clusterSettings"
        component={ClusterSettingsPage}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Router>
);

export default Routes;
