import React from 'react';
import { Provider } from 'react-redux'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/';
import ClusterPage from './components/ClusterPage';
import store from './redux/store';
// import NavBar from './components/NavBar/';

const Routes = () => (
  <Provider store ={store}>

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AdminDashboard />
          {/* <NavBar /> */}
        </Route>
        <Route path="/clusters">
          <ClusterPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;
