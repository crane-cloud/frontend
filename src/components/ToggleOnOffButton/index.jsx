import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ToggleOnOffButton.css";

const ToggleOnOffButton = ({ onClick }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    setState(!state);
    onClick();
  };

  return (
    <div
      className="ToggleButtonContainer"
      role="presentation"
      onClick={handleClick}
    >
      <div className={`ToggleBase ${state ? "ToggleOn" : "ToggleOff"}`}>
      <div
          className={`ToggleButtonSlider ${state ? "ToggleOn" : "ToggleOff"}`}
        />
      <div className="ToggleText">NO</div>  
      <div className="ToggleText">YES</div>    
      </div>
    </div>
  );
};

ToggleOnOffButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ToggleOnOffButton;
