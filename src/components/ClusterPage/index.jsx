import React from 'react';
import './ClusterPage.css';
import InformationBar from '../InformationBar';
import ClustersList from '../ClusterList';
import NavBar from '../NavBar';

function ClusterPage() {
  return (
    <div className="Page">
      <div className="TopRow" >
        <NavBar />
        <InformationBar header="Select Infrastructure" showBtn={true}/>
      </div>
      <div className="MainRow">
        <ClustersList />
      </div>
      <div className="FooterRow">
        <p>Copyright © 2020 Crane Cloud.
All Rights Reserved.</p>
      </div>
    </div>
   

  );
}
export default ClusterPage;
