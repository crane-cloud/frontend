import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/';
import InformationBar from './components/InformationBar';
// import NavBar from './components/NavBar/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <InformationBar showBtn={true} header={'Goat'} />
        {/* <NavBar /> */}
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
