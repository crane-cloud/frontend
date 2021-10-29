// import React, { Component } from "react";
import "./AppStatus.css";

import React, { useEffect, useState } from "react";

const AppStatus = (props) => {
  const [statusClassName, setStatusClassName] = useState(
    "StatusSignal StatusOther"
  );

  useEffect(() => {
    const setClassName = () => {
      let currentClassName = props.appStatus;
      if (currentClassName === "running") {
        setStatusClassName("StatusSignal StatusRunning");
      } else if (currentClassName === "failed") {
        setStatusClassName("StatusSignal StatusFailed");
      } else {
        // let default class remain
      }
    };
    setClassName();
  }, [props.appStatus]);
  return (
    <div>
      <div className="StatusWrapper">
        <div className={statusClassName} />
      </div>
    </div>
  );
};

export default AppStatus;
