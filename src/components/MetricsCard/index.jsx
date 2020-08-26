import React from 'react';
import './MetricsCard.css';

const MetricsCard = ({
  className,
  title,
  icon,
  children
}) => {
  return (
    <div className={`MetricsCardContainer ${className}`}>
      <div className="CardHeaderSection">
        <div className="CardTitle">
          {title}
        </div>
        <div className="CardIcon">
          {icon}
        </div>
      </div>
      <hr />
      <div className="CardBodySection">
        {children}
      </div>
    </div>
  );
};

export default MetricsCard;
