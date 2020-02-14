import React from 'react';
import ResourceCard from '../ResourceCard';
import './ClusterResource.css';

const resources = [
  {
    'name': 'Nodes',
    'resourceNumber': 7
  },
  {
    'name': 'Secrets',
    'resourceNumber': 3
  },
  {
    'name': 'Deployments',
    'resourceNumber': 11
  },
  {
    'name': 'Pods',
    'resourceNumber': 9
  },
  {
    'name': 'Volumes',
    'resourceNumber': 5
  },
  {
    'name': 'Daemon Sets',
    'resourceNumber': 0
  },
  {
    'name': 'Replica',
    'resourceNumber': 2
  }
];


function ClusterResources() {
  return (
    <div className="ClusterContainer">
      {resources.map((resource) =>
        <div className="ClusterItem">
          <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
        </div>
      )}
    </div>
  );
}
export default ClusterResources;