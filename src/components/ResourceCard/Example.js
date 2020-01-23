import React from 'react';
import ResourceCard from '../ResourceCard';


const Content = (props) =>
    props.resources.map((resource) =>
        <ResourceCard title={resource.name} resourceCount={resource.resourceNumber} />
);

export default Content