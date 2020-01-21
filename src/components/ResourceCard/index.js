import React from 'react';

const ResourceCard = (props) => (
    <div className="card">
      <div className="cardHeader">{props.title}</div>
      <div className="resourceDigit">{props.resourceNumber}</div>
    </div>
  )

export default ResourceCard;