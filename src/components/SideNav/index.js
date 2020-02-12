import React from 'react';
import './SideNav.css';

const items = [
  {
    name: 'Infrastructure',
    items: [
      {'name': 'Nodes'},
      {'name': 'Volumes'},
      {'name': 'Storage Classes'},
      {'name': 'Namespaces'},
    ]
  },
  {
    name: 'Pods',
    items: [
      {'name': 'Pods'},
      {'name': 'Ingresses'},
      {'name': 'Services'},
    ]
  },
  {
    name: 'Controllers',
    items: [
      {'name': 'Deployments'},
      {'name': 'Jobs'},
    ]
  },
  {
    name: 'Users',
    items: [
      {'name': 'Accounts'},
      {'name': 'Projects'},
    ]
  },
];

function SideNav() {
  return (
    <div className='side-nav'>
      <div className='cluster-name'>Cluster Name</div>
      <div className="list">
        {items.map((item) =>
          <div key={item.name}>
            <div key={items.indexOf(item)} className="list-item">{item.name}</div>
            <div key={items.indexOf(item)} className="">
              {item.items.map((subitem) =>
                <div key={items.indexOf(subitem)} className="sub-list-Item">{subitem.name}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className='side-footer'>
        Copyright © 2020 Crane Cloud.<br/> All Rights Reserved.
      </div>
    </div>
  );
}

export default SideNav;