import React from "react";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import Tooltip from "../Tooltip";
import "./StatusModule.css";

const StatusModule = ({ title, description, isOperational }) => {
  return (
    <>
      <div className="StatusSectionItem">
        <div className="StatusSection">
          <div className="LeftContent">
            <div className="StatusSectionCardTitle">
              <Tooltip
                showIcon={false}
                keyword={title}
                message={description}
                position="bottom"
              ></Tooltip>
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
    </>
  );
};

export default StatusModule;
