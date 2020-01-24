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
      "name": "Nodes",
      "resourceNumber": 7
      },
      {
      "name": "Secrets",
      "resourceNumber": 3
      },
      {
      "name": "Nodes",
      "resourceNumber": 7
      },
      {
      "name": "Secrets",
      "resourceNumber": 3
      }
  ]
const ClusterResources = () =>
    resources.map((resource) =>
        <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
);

export default ClusterResources