import React from 'react';
import './ResourceCard.css';

const ResourceCard = (props) => (
    <div className="card">
      <div className="cardHeader">{props.title}</div>
      <div className="resourceDigit"><h1>{props.resourceNumber}</h1></div>
    </div>
  )

export default ResourceCard;