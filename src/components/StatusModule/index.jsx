import React, { useState } from "react";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import { ReactComponent as Downtime } from "../../assets/images/downtime.svg";
import Tooltip from "../Tooltip";
import "./StatusModule.css";

const StatusModule = ({ title, description, isOperational }) => {
  return (
    <div  className="StatusModule">
      <div className="LeftContent">
        <div className="StatusSectionCardTitle">
          <Tooltip
            showIcon={false}
            keyword={title}
            message={description}
            position="bottom"
          ></Tooltip>
        </div>
        <div style={{paddingLeft: '0.5rem'}}>
          {isOperational === "success"
            ? "Operational"
            : isOperational === "partial"
            ? "Issues detected"
            : "Unavailable"}
        </div>
      </div>
      <div className="RightContent">
        <span>
          {isOperational === "success" ? (
            <Operational className="SmallIcon" title="Operational" />
          ) : isOperational === "partial" ? (
            <Incident className="SmallIcon" title="Issues Detected" />
          ) : (
            <Downtime className="SmallIcon" title="Unavailable" />
          )}
        </span>
      </div>
    </div>
  );
};

export default StatusModule;
