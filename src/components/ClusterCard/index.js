import React from 'react';
import './ClusterCard.css';
  
const ClusterCard = (props) => (
  <div className="ClusterCard">
    <div className="CardImageDiv">
      <img src={props.icon} alt="avatar" className="CardImage" />
    </div>
    <div className="BottomContainer">
      <div className="ClusterCardName">{props.name}</div>
      <div className="ClusterCardDesc">{props.description}</div>
    </div>
  </div>
    
);

export default ClusterCard;