import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import store from "./redux/store";
// import App from "./components/App";
import LoginPage from "./components/LoginPage";
// import PricingPage from "./components/PricingPage";
import ContactPage from "./components/ContactPage";
import PasswordReset from "./components/PasswordReset";
import RegisterPage from "./components/RegisterPage";
import ClusterPage from "./components/ClusterPage";
import ClusterResourcesPage from "./components/ClusterResourcesPage";
import ClusterNodes from "./components/NodesList";
import PvcsList from "./components/PvcsList";
import NamespacesListPage from "./components/NamespacesList";
import PodsList from "./components/PodsList";
import CreateNewPassword from "./components/CreateNewPassword";
import ServicesListPage from "./components/ServicesList";
import StorageClassList from "./components/StorageClassList";
import PvsListPage from "./components/PvsListPage";
import JobsListPage from "./components/JobsListPage";
import DeploymentsPage from "./components/DeploymentsPage";
import AdminProjectsPage from "./components/AdminProjectsPage";
import VerificationSentPage from "./components/VerificationSentPage";
import AdminLoginPage from "./components/AdminLoginPage";
import AppsPage from "./components/AppsPage";
import UsersAccounts from "./components/UserAccounts";
import AppMetricsPage from "./components/AppMetricsPage";
import ProjectSettingsPage from "./pages/ProjectSettingsPage";
import AppSettingsPage from "./components/AppSettingsPage";
import ProjectMemoryPage from "./components/ProjectMemoryPage";
import ProjectCPUPage from "./components/ProjectCPUPage";
import ProjectNetworkPage from "./components/ProjectNetworkPage";
import AppCpuPage from "./components/AppCpuPage";
import AppMemoryPage from "./components/AppMemoryPage";
import AppLogsPage from "./components/AppLogsPage";
import AppNetworkPage from "./components/AppNetworkPage";
import TeamPage from "./components/TeamPage";
import PageNotFound from "./components/PageNotFound";
import DatabaseList from "./components/DatabaseList";
import DBSettingsPage from "./components/DBSettingsPage";
import CreateDatabase from "./components/CreateDatabase";
import Terms from "./components/Documents/terms";
import Privacy from "./components/Documents/privacy";
import UserProjectsPage from "./pages/UserProjectsPage";
import ProjectDashboardPage from "./components/ProjectDashboardPage";
import AdminDBList from "./components/AdminDB";

import ProjectBillingPage from "./components/ProjectBillingPage";
import ClusterSettingsPage from "./components/ClusterSettingsPage";
import MonitoringPage from "./components/MonitoringPage";
import UserProfile from "./components/UserProfile";
import AdminUsersProfile from "./components/AdminUsersProfile";

// Protected route should have token. If not, login.
const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

// for now, existence of token will determine access to route
// later, this token will be a verified boolean
const hasToken = store.getState().user.accessToken;

const Routes = () => (
  <Router>
    <Switch>
      <Route key="default-route" exact path="/" component={LoginPage} />
      <Route key="login-route" path="/login" component={LoginPage} />
      {/* <Route path="/pricing" component={PricingPage} /> */}
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
