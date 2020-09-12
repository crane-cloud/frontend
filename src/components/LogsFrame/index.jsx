import React from 'react';
import './LogsFrame.css';

const LogsFrame = ({ title }) => {
  return (
    <div className="LogsFrameContainer">
      <div className="LogsHeaderSection">
        <div className="LogsTitle">{title}</div>
        <div>button</div>
      </div>
      {/* <hr /> */}
      <div className="LogsBodySection">
        Logs here
      </div>
    </div>
  );
};

export default LogsFrame;
