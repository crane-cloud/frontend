import React from 'react';
import './UserProjectsPage.css';
import InformationBar from '../InformationBar';
import NavBar from '../NavBar';

function UserProjectsPage() {
  return (
    <div className="Page">
      <div className="TopRow">
        <NavBar />
        <InformationBar header="Project" showBtn />
      </div>
      <div className="MainRow">
      </div>
      <div className="FooterRow">
        <p>
          Copyright © 2020 Crane Cloud.
          All Rights Reserved.

        </p>
      </div>
    </div>


  );
}
export default UserProjectsPage;
