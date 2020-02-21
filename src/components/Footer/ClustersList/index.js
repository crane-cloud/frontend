import React from 'react';
import ClusterCard from '../../ClusterCard';
import './ClustersList.css';
import crane from '../../assets/images/craneLogo.png';
import kikoni from '../../assets/images/cloud.svg';
import othercrane from '../../assets/images/logo.png';
import cloud from '../../assets/images/logoPrimary.png';

const clustersList = [
  {
    'name': 'Makerere',
    'desc': 'good',
    'icon': crane
  },
  {
    'name': 'Kikoni',
    'desc': 'good',
    'icon': kikoni
  },
  {
    'name': 'Aws',
    'desc': 'good',
    'icon': othercrane
  },
  {
    'name': 'Gcp',
    'desc': 'good',
    'icon': cloud
  },
];

function ClustersList() {
  return (
    <div className="ClusterList">
      {clustersList.map((cluster) =>
        <div key={cluster.name} className="ClusterCardItem">
          <ClusterCard name={cluster.name} description={cluster.desc} icon={cluster.icon} />
        </div>
      )}
    </div>
  );
}

export default ClustersList;