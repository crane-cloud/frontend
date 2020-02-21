import React from 'react';
import ResourceCard from '../ResourceCard';
import './ClusterResource.css';

function ClusterResources(props) {
  const { resourceCount } = props;
  return (
    <div className="ClusterContainer">
      {resourceCount.map(
        (resource) => <ResourceCard title={resource.name} count={resource.count} />
      ) }
    </div>
  );
}
export default ClusterResources;
