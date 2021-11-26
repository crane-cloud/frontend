import React from "react";
import "./Status.css";

const Status = ({status}) => (
  <div className="StatusWrapper">
    <div
      className={
        status ? "StatusSignal StatusIsOn" : "StatusSignal StatusIsOff"
      }
    />
  </div>
);

export default Status;
