import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
 
import HomePage from "./components/homepage/Home";
import UserAuthPage from "./components/authentication/UserAuth";
import SignInForm from "./components/authentication/SignIn";
import SignUpForm from "./components/authentication/SignUp";
import ConfirmEmail from './components/authentication/ConfirmEmail';
import AdminDashboard from "./components/admin_dashboard/AdminDashboard"
import Namespace from "./components/namespace/Namespace";
import OrganizationsDashboard from "./components/admin_dashboard/organizationsDashboard";
import TotalResources from "./components/admin_dashboard/general_components/Organizations/components/TotalResources";
import ClusterInfo from "./components/admin_dashboard/general_components/DashboardMain/components/ClusterInfo/ClusterInfo";
import Victory from "./components/admin_dashboard/general_components/Organizations/components/Victory";
import UserDashboard from "./components/user_dashboard/main";
import UserOrganization from "./components/user_dashboard/components/Organization/organization";
import Deployment from "./components/user_dashboard/components/Deployment/ExistingDeployment/Deployment";

class App extends Component {
    render() {
        // const { loggedIn } = this.props;
        const session =  sessionStorage.getItem("creds") || "";

        return (
            <Router>
                <Switch >
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={SignInForm} />
                    <Route exact path="/register" component={SignUpForm} />
                    <Route exact path="/confirm-email" component={ConfirmEmail} />
                    <Route exact path="/forgot-password" component={UserAuthPage} />
                    <Route exact path="/admin-dashboard" component={AdminDashboard} />
                    <Route exact path="/namespaces/:namespaceId" component={Namespace} />
                    <Route exact path="/organizations" component={OrganizationsDashboard} />
                    <Route exact path="/organization-resources" component={TotalResources} />
                    <Route exact path="/:name/cluster-info" component={ClusterInfo} />
                    <Route exact path="/victory" component={Victory} />

                    <Route exact path="/user-dashboard" 
                        render={() => session ? 
                                        <UserDashboard /> : 
                                        <Redirect to="/login" /> }
                    />

                    <Route exact path="/user-organizations/:orgID" component={UserOrganization} />
                    <Route exact path="/deployments/:deploymentID" component={Deployment} />
                </Switch>
            </Router>
        );
    }

    componentDidMount() { }


}

const mapStateToProps = (state) => {
    return {
        loggedIn : state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(App);