import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderNav from "./components/homepage/Header";
import HomePage from "./components/homepage/Home";
import UserAuthPage from "./components/authentication/UserAuth";
import AdminDashboard from "./components/admin_dashboard/AdminDashboard"
import NamespacesTable from "./components/admin_dashboard/Namespaces";

export default class App extends Component{
    render(){
        return (
            <Router>
                <HeaderNav/>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/sign-in" component={UserAuthPage} />
                <Route exact path="/admin-dashboard" component={AdminDashboard} />
                <Route exact path="/namespaces" component={NamespacesTable} />
            </Router>
        );
    }

    componentDidMount(){}

   
}