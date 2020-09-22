import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '../ToggleButton';
import Spinner from '../Spinner';
import './LogsFrame.css';

const LogsFrame = ({ loading, title, data }) => {
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
        {true ? (
          <div className="LogsSpinner">
            <Spinner />
          </div>
        ) : (
          <>
            {(data.length ? (
              <div className="LogsAvailable">
                {data.map((logs) => (
                  <span>{logs}</span>
                ))}
              </div>
            ) : (
              <div className="LogsEmpty">
                <div>No logs available</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

LogsFrame.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
};

export default LogsFrame;
