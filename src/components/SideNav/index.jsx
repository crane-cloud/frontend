import React from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';


const SideNav = (props) => {
  const { clusterId } = props;
  const { clusterName } = props;
  const BASE_URL = `/cluster/${clusterId}/resources`;
  return (
    <div className="SideNav">
      <div className="ClusterName">{ clusterName }</div>

      <Link to={{ pathname: `${BASE_URL}/infrastructure` }} className="ListItem">Infrastructure</Link>
      <div>
        <Link to={{ pathname: `${BASE_URL}/nodes` }} className="SubListItem">Nodes</Link>
        <Link to={{ pathname: `${BASE_URL}/volumes` }}>Volumes</Link>
        <Link to={{ pathname: `${BASE_URL}/storage-classes` }}>Storage Classes</Link>
        <Link to={{ pathname: `${BASE_URL}/namespace` }}>Namespaces</Link>
      </div>
      <a className="ListItem">Pods</a>
      <div>
        <a className="SubListItem">Pods</a>
        <a className="SubListItem">Ingresses</a>
        <a className="SubListItem">Services</a>
      </div>
      <a className="ListItem">Controllers</a>
      <div>
        <a className="SubListItem">Deployments</a>
        <a className="SubListItem">Jobs</a>
      </div>
      <a className="ListItem">Users</a>
      <div>
        <a className="SubListItem">Accounts</a>
        <a className="SubListItem">Projects</a>

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
