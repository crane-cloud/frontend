import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = (props) => {
  const { children, className } = props;

  return (
    <button {...props} className={`Primary-Btn ${className}`}>
      {children}
    </button>
  );
};

export default PrimaryButton;
