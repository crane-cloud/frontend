import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import AdminDashboard from "../admin_dashboard/AdminDashboard";
import TopNav from "../admin_dashboard/general_components/TopNav";
import SignUpForm from './SignUp';
import SignInForm from './SignIn';

import "../../assets/css/signin.css";

class UserAuthPage extends Component {
    render() {
        return (
            <Router>
                <TopNav />
                <div className="SignIn">
                    <div className="SignIn_aside"></div>
                    <div className="SignIn_form" id="scrollable">
                        <div className="FormTitle">
                            <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/register"
                                activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                        </div>
                        <Route exact path="/admin-dashboard" component={AdminDashboard} />
                        <Route exact path="/register" component={SignUpForm} />
                        <Route exact path="/login" component={SignInForm} />
                    </div>
                </div>
            </Router>

        );
    }
}

export default UserAuthPage;