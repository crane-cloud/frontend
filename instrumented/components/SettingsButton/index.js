import React from "react";
import "./SettingsButton.css";

const SettingsButton = ({ label, className, disable, onClick }) => {
  return (
    <button
      disabled={disable}
      className={`Settings-Btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SettingsButton;
