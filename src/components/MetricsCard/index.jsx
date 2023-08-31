import React from "react";
import "./MetricsCard.css";

const MetricsCard = ({ className, title, icon, children }) => {
  return (
    <div className={`MetricsCardContainer ${className}`}>
      <div className="CardHeaderSection">
        <div className="CardTitle">{title}</div>
        <div className="MetricsCardIcon">{icon}</div>
      </div>
      <div className="CardBodySection">{children}</div>
    </div>
  );
};

export default MetricsCard;
