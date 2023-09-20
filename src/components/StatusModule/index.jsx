import React, { useState } from "react";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import "./StatusModule.css";

const StatusModule = ({ title, description, isOperational }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY + target.offsetHeight,
      left: rect.left + window.scrollX + target.offsetWidth,
    };
    setTooltipPosition(position);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div className="StatusSectionItem">
        <div className="StatusSection">
          <div className="LeftContent">
            <div
              className="StatusSectionCardTitle"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {title}
            </div>
            <div>{isOperational ? "No Issues" : "Issues detected"}</div>
          </div>
          <div className="RightContent">
            <span>
              {isOperational ? (
                <Operational className="SmallIcon" title="Operational" />
              ) : (
                <Incident className="SmallIcon" title="Issues Detected" />
              )}
            </span>
          </div>
        </div>
      </div>

      {showTooltip && (
        <div
          className="CustomTooltip"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          {description}
        </div>
      )}
    </>
  );
};

export default StatusModule;
