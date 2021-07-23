import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = (props) => {
  const { label, className,disable } = props;
  return (
    <button
      disabled={disable}
      className={`Primary-Btn uppercase ${className}`}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
