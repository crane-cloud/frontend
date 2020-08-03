import React from 'react';
import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import {ReactComponent as Settings }from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const { projectId, userId } = props;
  const { projectName } = props;

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
      <div>
        <NavLink to="#" activeClassName="active" className="SubListItem">All</NavLink>
        <NavLink to="#" className="SubListItem"></NavLink>
        
      </div>
      <Link to="#" className="ListItem">Metrics</Link>
      <div>
        <NavLink to="#" activeClassName="active" className="SubListItem">All</NavLink>
        <Link to="#" className="SubListItem">CPU</Link>
        <NavLink to="#" className="SubListItem">Memory</NavLink>
        <NavLink to="#" className="SubListItem">Storage</NavLink>
        <NavLink to="#" className="SubListItem">Network</NavLink>
      </div>
      <Settings className="ListItem"/>

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
