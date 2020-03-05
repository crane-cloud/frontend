import React from 'react';
import './SideNav.css';
import { NavLink, Link } from 'react-router-dom';


const SideNav = (props) => {
  const { clusterId } = props;
  const { clusterName } = props;

  const BASE_URL = `/clusters/${clusterId}`;
  return (
    <div className="SideNav">
      <div className="ClusterName"><Link to={{ pathname: `${BASE_URL}/resources` }}>{ clusterName }</Link></div>

      <Link to={{ pathname: `${BASE_URL}/resources` }} className="ListItem">Infrastructure</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/nodes` }} activeClassName="active" className="SubListItem">Nodes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/pvcs` }} className="SubListItem">Volumes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/storage-classes` }} className="SubListItem">Storage Classes</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/namespaces` }} className="SubListItem">Namespaces</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">Pods</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/pods` }} activeClassName="active" className="SubListItem">Pods</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/ingresses` }} className="SubListItem">Ingresses</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Services</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/deployments` }} className="ListItem">Controllers</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/deployments` }} className="SubListItem">Deployments</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/jobs` }} className="SubListItem">Jobs</NavLink>
      </div>
      <Link to={{ pathname: `${BASE_URL}/users` }} className="ListItem">Users</Link>
      <div>
        <NavLink to={{ pathname: `${BASE_URL}/accounts` }} className="SubListItem">Accounts</NavLink>
        <NavLink to={{ pathname: `${BASE_URL}/projects` }} className="SubListItem">Projects</NavLink>

      </div>

      <div className="SideFooter">
        Copyright © 2020 Crane Cloud.
        <br />
        {' '}
        All Rights Reserved.
      </div>
    </div>
  );
};


export default SideNav;
