import React from "react";
import "./ResourceCard.css";

const ResourceCard = (props) => (
  <div className="Card">
    <div className="CardHeader">{props.title}</div>
    <div className="ResourceDigit">{props.count}</div>
  </div>
);

export default ResourceCard;
