import React from 'react';
import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import {ReactComponent as Settings }from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const { projectName, userId } = props;

  // const BASE_URL = `/projects/${projectId}`;
  return (
    <div className="SideBar">
      <div className="ClusterName StickTop">
      <Link to={{ pathname: `/users/${userId}/projects/` }}>
          <img src={BackButton} alt="Back Button" />
          <span>&nbsp; &nbsp; &nbsp;</span>
        </Link>
        <Link to={{ pathname: `/users/${userId}/projects/` }} className="CName">{ projectName }</Link>
      </div>

      <Link to="#" className="ListItem">Apps</Link>
      
      <Link to="#" className="ListItem">Metrics</Link>
      <div>
        <Link to="#" className="SubBarListItem">CPU</Link>
        <Link to="#" className="SubBarListItem">Memory</Link>
        <Link to="#" className="SubBarListItem">Storage</Link>
        <Link to="#" className="SubBarListItem">Network</Link>
      </div>
      
      <div>
        <br />
        <br />
        <br />
        <br />
        <Settings className="ListItem"/>
      </div>

      <div className="SideFooter StickBottom">
        Copyright © 2020 Crane Cloud.
        <br />
        {' '}
        All Rights Reserved.
      </div>
    </div>
  );
};


export default SideBar;
