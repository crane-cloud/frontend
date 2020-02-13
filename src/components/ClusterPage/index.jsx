import React from 'react';
import './ClusterPage.css';
import Footer from '../Footer';
import ClusterResources from '../ClusterResources';

function ClusterPage() {
  return (
    <div className="Page">
      <div className="TopRow" />
      <div className="MainRow">
        <ClusterResources />
      </div>
      <div className="FooterRow">
        <Footer />
      </div>
    </div>

  );
}
export default ClusterPage;
