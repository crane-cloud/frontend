import React from 'react';
import './SideNav.css';
import { NavLink, Link } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';


const SideNav = (props) => {
  const { clusterId } = props;
  const { clusterName } = props;

  const BASE_URL = `/clusters/${clusterId}`;
  return (
    <div className="SideNav">
      <div className="ClusterName StickTop">
        <Link to={{ pathname: '/clusters' }}>
          <img src={BackButton} alt="Back Button" />
          <span>&nbsp; &nbsp; &nbsp;</span>
        </Link>
        <Link to={{ pathname: `${BASE_URL}/resources` }} className="CName">{ clusterName }</Link>
      </div>

      <Link to={{ pathname: `${BASE_URL}/resources` }} className="ListItem">Infrastructure</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/nodes` }} activeClassName="active" className="SubListItem">Nodes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/volumes` }} className="SubListItem">Volumes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/pvcs` }} className="SubListItem">Volume Claims</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/storage-classes` }} className="SubListItem">Storage Classes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/namespaces` }} className="SubListItem">Namespaces</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">Pods</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/pods` }} activeClassName="active" className="SubListItem">Pods</NavLink>
        <Link to="#" className="SubListItem">Ingresses</Link>
        <NavLink to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Services</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/deployments` }} className="ListItem">Controllers</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/deployments` }} className="SubListItem">Deployments</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/jobs` }} className="SubListItem">Jobs</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/users` }} className="ListItem">Users</Link>
      <div>
        <Link to="#" className="SubListItem">Accounts</Link>
        <NavLink to={{ pathname: '/projects' }} className="SubListItem">Projects</NavLink>

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


export default SideNav;
