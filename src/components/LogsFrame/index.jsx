import React from 'react';
import ToggleButton from '../ToggleButton';
import './LogsFrame.css';

const LogsFrame = ({ title }) => {
  return (
    <div className="LogsFrameContainer">
      <div className="LogsHeaderSection">
        <div className="LogsTitle">{title}</div>
        <ToggleButton />
      </div>

      <div className="LogsBodySection">
        Logs here
      </div>
    </div>
  );
};

export default LogsFrame;
