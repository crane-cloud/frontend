import React from "react";
import "./ResourceCard.css";

const ResourceCard = ({title, count}) => (
  <div className="Card">
    <div className="CardHeader">{title}</div>
    <div className="ResourceDigit">{count}</div>
  </div>
);

export default ResourceCard;
