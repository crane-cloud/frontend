import React from 'react';
import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';


const SideBar = (props) => {
  const { projectId } = props;
  const { projectName } = props;

  const BASE_URL = `/projects/${projectId}`;
  return (
    <div className="SideBar">
      <div className="ClusterName StickTop">
        <Link to={{ pathname: '/clusters' }}>
          <img src={BackButton} alt="Back Button" />
          <span>&nbsp; &nbsp; &nbsp;</span>
        </Link>
        <Link to={{ pathname: `${BASE_URL}/resources` }} className="CName">{ projectName }</Link>
      </div>

      <Link to={{ pathname: `${BASE_URL}/resources` }} className="ListItem">Apps</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/nodes` }} activeClassName="active" className="SubListItem">All</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/volumes` }} className="SubListItem"></NavLink>
        
      </div>
      <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">Metrics</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/pods` }} activeClassName="active" className="SubListItem">All</NavLink>
        <Link to="#" className="SubListItem">CPU</Link>
        <NavLink to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Memory</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Storage</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Network</NavLink>
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
