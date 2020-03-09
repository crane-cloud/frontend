import React from 'react';
import './ClusterPage.css';
import InformationBar from '../InformationBar';
import ClustersList from '../ClustersList';
import Header from '../Header';

function ClusterPage() {
  return (
    <div className="Page">
      <div className="TopRow" >
        <Header />
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
