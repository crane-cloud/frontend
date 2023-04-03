import React from "react";

import "./ClusterCard.css";

const ClusterCard = ({ name, description, icon }) => {
  return (
    <div className="ClusterCard">
      <div
        className="CardImageDiv"
        style={{ backgroundImage: `url(${icon})` }}
      />
      <div className="ClusterBottomContainer">
        <div className="ClusterCardName">{name}</div>
        <div className="ClusterCardDesc">{description}</div>
      </div>
    </div>
  );
};

export default ClusterCard;
