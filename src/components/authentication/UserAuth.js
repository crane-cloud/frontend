import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminDashboard from "../admin_dashboard/AdminDashboard";
import SignUpForm from './SignUp';
import SignInForm from './SignIn';
import PasswordReset from './PasswordReset';
import HeaderComponent from '../homepage/header';

import "../../assets/css/auth.css";
import "../../assets/css/home.css";

class UserAuthPage extends Component {
    render() {
        return (
            <Router>
                <div className="home-container">
                    <HeaderComponent />
                </div>
                <div className="auth-form">
                    <Route exact path="/admin-dashboard" component={AdminDashboard} />
                    <Route exact path="/register" component={SignUpForm} />
                    <Route exact path="/login" component={SignInForm} />
                    <Route exact path="/forgot-password" component={PasswordReset} />
                </div>
            </Router>
        );
    }
}

export default UserAuthPage;