/* eslint-disable linebreak-style */
import React from 'react';
// import { Link } from 'react-router-dom';
import './ClusterResourcesPage.css';
import NavBar from '../NavBar';
import InformationBar from '../InformationBar';
import SideNav from '../SideNav';

const ClusterResourcesPage = () => (
  <>
    <NavBar />
    <div className="MainSection">
      <SideNav />
      <div className="Content">
        <InformationBar />
      </div>
    </div>
  </>
);

export default ClusterResourcesPage;
