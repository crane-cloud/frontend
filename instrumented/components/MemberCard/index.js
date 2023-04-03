import React from "react";

import "./MemberCard.css";

const MemberCard = ({ name, title, icon }) => {
  
  return (
    <div className="MemberCard">
      <div
        className="MemberImageDiv"
        style={{ backgroundImage: `url(${icon})` }}
      />
      <div className="BottomContainer">
        <div className="MemberCardName">{name}</div>
        <div className="MemberCardDesc">{title}</div>
      </div>
    </div>
  );
};

export default MemberCard;
