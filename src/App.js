import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from "./components/homepage/Home";
import UserAuthPage from "./components/authentication/UserAuth";
import AdminDashboard from "./components/admin_dashboard/AdminDashboard"
import Namespace from "./components/namespace/Namespace";    
import OrganizationsDashboard from "./components/admin_dashboard/organizationsDashboard";


export default class App extends Component{
    render(){
        return (
            <Router >
                <Route exact path="/" component={HomePage} />
                <Route exact path="/sign-in" component={UserAuthPage} />
                <Route exact path="/admin-dashboard" component={AdminDashboard} />
                <Route exact path="/namespaces/:namespaceId" component={Namespace} />
                <Route exact path="/organizations" component={OrganizationsDashboard} />
            </Router>
        );
    }

    componentDidMount(){}

   
}
