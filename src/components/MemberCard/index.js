import React from "react";

import "./MemberCard.css";

const MemberCard = (props) => {
  const { name, title, icon } = props;
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
