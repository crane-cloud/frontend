import React, { useState } from "react";
import PropTypes from "prop-types";
import ToggleButton from "../ToggleButton";
import Spinner from "../Spinner";
import "./LogsFrame.css";

const LogsFrame = ({ loading, title, data,error }) => {
  const [dark, setDarkMode] = useState(false);

  const changeMode = () => {
    setDarkMode(!dark);
  };

  return (
    <div className={`LogsFrameContainer ${dark && "Dark"}`}>
      <div className={`LogsHeaderSection ${dark && "Dark"}`}>
        <div className="LogsTitle">{title}</div>
        <ToggleButton onClick={changeMode} />
      </div>

      <div className={`LogsBodySection ${dark && "Dark"}`}>
        {loading ? (
          <div className="LogsSpinner">
            <Spinner />
          </div>
        ) :error?<div className="LogsEmpty">{error}</div>:(
          <>
            {data.length === 0 || data[0] === "" ? (
              <div className="LogsEmpty">No logs available</div>
            ) : (
              <div className="LogsAvailable">
                  {data.map((logs, index) => (
                  <span key={index}>{logs}</span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

LogsFrame.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default LogsFrame;
