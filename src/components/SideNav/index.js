import React from 'react';
import './SideNav.css';

const items = [
  {
    name: 'Infrastructure',
    items: [
      { name: 'Nodes' },
      { name: 'Volumes' },
      { name: 'Storage Classes' },
      { name: 'Namespaces' },
    ],
  },
  {
    name: 'Pods',
    items: [
      { name: 'Pods' },
      { name: 'Ingresses' },
      { name: 'Services' },
    ],
  },
  {
    name: 'Controllers',
    items: [
      { name: 'Deployments' },
      { name: 'Jobs' },
    ],
  },
  {
    name: 'Users',
    items: [
      { name: 'Accounts' },
      { name: 'Projects' },
    ],
  },
];

function SideNav() {
  return (
    <div className="SideNav">
      <div className="ClusterName">Cluster Name</div>
      <div className="List">
        {items.map((item) => (
          <div key={item.name}>
            <div key={items.indexOf(item)} className="ListItem">{item.name}</div>
            <div key={items.indexOf(item)} className="">
              {item.items.map((subitem) => <div key={items.indexOf(subitem)} className="SubListItem">{subitem.name}</div>)}
            </div>
          </div>
        ))}
      </div>
      <div className="SideFooter">
        Copyright © 2020 Crane Cloud.
        <br />
        {' '}
        All Rights Reserved.
      </div>
    </div>
  );
}

export default SideNav;
