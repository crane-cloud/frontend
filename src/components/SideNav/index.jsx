import React from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';


const SideNav = (props) => {
  const { clusterId } = props;
  const { clusterName } = props;

  const BASE_URL = `/clusters/${clusterId}`;
  return (
    <div className="SideNav">
      <div className="ClusterName">{ clusterName }</div>

      <Link to={{ pathname: `${BASE_URL}/infrastructure` }} className="ListItem">Infrastructure</Link>
      <div>
        <Link to={{ pathname: `${BASE_URL}/nodes` }} className="SubListItem">Nodes</Link>
        <Link to={{ pathname: `${BASE_URL}/volumes` }} className="SubListItem">Volumes</Link>
        <Link to={{ pathname: `${BASE_URL}/storage-classes` }} className="SubListItem">Storage Classes</Link>
        <Link to={{ pathname: `${BASE_URL}/namespaces` }} className="SubListItem">Namespaces</Link>
      </div>
      <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">Pods</Link>
      <div>
        <Link to={{ pathname: `${BASE_URL}/pods` }} className="SubListItem">Pods</Link>
        <Link to={{ pathname: `${BASE_URL}/ingresses` }} className="SubListItem">Ingresses</Link>
        <Link to={{ pathname: `${BASE_URL}/services` }} className="SubListItem">Services</Link>
      </div>
      <Link to={{ pathname: `${BASE_URL}/pods` }} className="ListItem">Controllers</Link>
      <div>
        <Link to={{ pathname: `${BASE_URL}/deployments` }} className="SubListItem">Deployments</Link>
        <Link to={{ pathname: `${BASE_URL}/jobs` }} className="SubListItem">Jobs</Link>
      </div>
      <Link to={{ pathname: `${BASE_URL}/users` }} className="ListItem">Users</Link>
      <div>
        <Link to={{ pathname: `${BASE_URL}/accounts` }} className="SubListItem">Accounts</Link>
        <Link to={{ pathname: `${BASE_URL}/projects` }} className="SubListItem">Projects</Link>

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
