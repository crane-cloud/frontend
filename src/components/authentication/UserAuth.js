import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import AdminDashboard from "../admin_dashboard/AdminDashboard";
import SignUpForm from './SignUp';
import SignInForm from './SignIn';
import PasswordReset from './PasswordReset';

import "../../assets/css/auth.css";

class UserAuthPage extends Component {
    render() {
        return (
            <div className="auth-form">
                <Router>
                    <Route exact path="/admin-dashboard" component={AdminDashboard} />
                    <Route exact path="/register" component={SignUpForm} />
                    <Route exact path="/login" component={SignInForm} />
                    <Route exact path="/forgot-password" component={PasswordReset} />
                </Router>
            </div>

        );
    }
}

export default UserAuthPage;