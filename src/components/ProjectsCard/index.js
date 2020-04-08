import React from 'react';

import './ClusterCard.css';

const ClusterCard = (props) => {
  const { name, description, icon } = props;
  return (
    <div className="ClusterCard">
      <div className="CardImageDiv" style={{ backgroundImage: `url(${icon})` }} />
      <div className="BottomContainer">
        <div className="ClusterCardName">{name}</div>
        <div className="ClusterCardDesc">{description}</div>
      </div>
    </div>

  );
};

export default ClusterCard;
