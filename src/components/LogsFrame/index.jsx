import React, { useState } from 'react';
import ToggleButton from '../ToggleButton';
import './LogsFrame.css';

const LogsFrame = ({ title, data }) => {
  const [dark, setDarkMode] = useState(false);

  const changeMode = () => {
    setDarkMode(!dark);
  };

  return (
    <div className={`LogsFrameContainer ${dark && 'Dark'}`}>
      <div className={`LogsHeaderSection ${dark && 'Dark'}`}>
        <div className="LogsTitle">{title}</div>
        <ToggleButton onClick={changeMode} />
      </div>

      <div className={`LogsBodySection ${dark && 'Dark'}`}>
        {(data.length ? (
          <div className="LogsAvailable">
            {data.map((logs) => `${logs}\n`)}
          </div>
        ) : (
          <div className="LogsEmpty">
            No logs available
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsFrame;
