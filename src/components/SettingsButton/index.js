import React from "react";
import "./SettingsButton.css";

const SettingsButton = (props) => {
  const { label, className,disable } = props;
  return (
    <button
      disabled={disable}
      className={`Settings-Btn uppercase ${className}`}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

export default SettingsButton;
