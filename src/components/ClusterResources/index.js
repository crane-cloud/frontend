import React from 'react';
import ResourceCard from '../ResourceCard';
import './ClusterResource.css';

function ClusterResources(props) {
  const { resourceCount } = props;
  return (
    <div className="ClusterContainer">
      {
        resourceCount.length !== 0 ? (resourceCount.map(
          (resource) => <ResourceCard title={resource.name} count={resource.count} />
        )) : (
          <h3 className="EmptyList">No Resources Available</h3>
        )
      }
    </div>
  );
}
export default ClusterResources;
