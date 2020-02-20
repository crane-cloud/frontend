/* eslint-disable linebreak-style */
import React from 'react';
// import { Link } from 'react-router-dom';
import './ClusterResourcesPage.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';
import ClusterResources from '../ClusterResources';

const ClusterResourcesPage = () => (
    
  <>
    <NavBar />
    <div className="MainSection">
      <div className="SiteSideNav">
        {/* <SideNav /> */}
      </div>
      <div className="Content">
        <div className="UpperBar">
          <InformationBar />
        </div>
        <div className="LowerBar">
          <ClusterResources />
        </div>
      </div>
    </div>
  </>
);

export default ClusterResourcesPage;
