import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import PasswordReset from './components/PasswordReset';
import RegisterPage from './components/RegisterPage';
import SideNav from './components/SideNav';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgot-password" component={PasswordReset} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/side" component={SideNav}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
