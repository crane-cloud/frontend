import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Light } from "../../assets/images/light.svg";
import { ReactComponent as Dark } from "../../assets/images/dark.svg";
import "./ToggleButton.css";

const ToggleButton = ({ onClick }) => {
  const [state, setState] = useState(false);

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
      <div className="ToggleBase">
        <Light />
        <Dark />
        <div
          className={`ToggleButtonSlider ${state ? "ToggleOn" : "ToggleOff"}`}
        />
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
