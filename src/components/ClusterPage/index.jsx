import React from 'react';
import './ClusterPage.css';
import InformationBar from '../InformationBar';
import ClustersList from '../ClustersList';
import NavBar from '../NavBar';

function ClusterPage() {
  return (
    <div className="Page">
      <div className="TopRow" >
        <NavBar />
        <InformationBar />
      </div>
      <div className="MainRow">
        <ClustersList />
      </div>
      <div className="FooterRow">
      </div>
    </div>

  );
}
export default ClusterPage;
