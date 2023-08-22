import React from "react";
import "./NewResourceCard.css";

const NewResourceCard = ({ title, count }) => (
  <div className="NewResourceCard">
    <div className="NewResourceCardHeader">{title}</div>
    <div className="NewResourceCardCount">{count}</div>
  </div>
);

export default NewResourceCard;
