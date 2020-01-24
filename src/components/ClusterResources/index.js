import React from 'react';
import ResourceCard from '../ResourceCard';

const resources = [
    {
      "name": "Nodes",
      "resourceNumber": 7
    },
    {
      "name": "Secrets",
      "resourceNumber": 3
    },
    {
      "name": "Deployments",
      "resourceNumber": 11
      },
      {
      "name": "Pods",
      "resourceNumber": 9
      },
      {
      "name": "Volumes",
      "resourceNumber": 5
      },
      {
      "name": "Daemon Sets",
      "resourceNumber": 0
      }
  ]
const ClusterResources = () =>
    resources.map((resource) =>
        <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
);

export default ClusterResources