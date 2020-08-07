import React from 'react';
import './MetricsCard.css';

const MetricsCard = ({ title, icon }) => {
  return (
    <div className="MetricsCardContainer">
      <div className="CardHeaderSection">
        <div className="CardTitle">
          {title}
        </div>
        <div className="CardIcon">
          {icon}
        </div>
      </div>
      <div className="CardBodySection">
        body
      </div>
    </div>
  );
};

export default MetricsCard;
