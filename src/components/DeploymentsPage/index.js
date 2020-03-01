import React, { Component } from 'react';
import NavBar from '../NavBar';
import SideNav from '../SideNav';
import './DeploymentsPage.css';
import InformationBar from '../InformationBar';

export default class DeploymentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="DeploymentsPageContainer">
        <NavBar />
        <div className="DeploymentsPageMain">
          <div className="DeploymentsPageSideNav">
            <SideNav />
          </div>
          <div className="DeploymentsPageMainContent">
            <InformationBar header="Deployments" />
            <div className="DeploymentsPageTableSection">
              Table here
            </div>
          </div>
        </div>
      </div>
    );
  }
}
