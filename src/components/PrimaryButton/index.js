import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = (props) => {
  const { children, className, btnType, color } = props;

  const getColorClass = () => {
    switch (color) {
      case "primary":
        return "PrimaryColorBtn";
      case "black":
        return "BlackPrimaryBtn";
      case "red":
        return "DeleteBtn";
      default:
        return "primary-button--blue";
    }
  };
  return (
    <button
      {...props}
      className={`Primary-Btn ${className} ${btnType === "close" && "DeleteBtn"}
        ${color && getColorClass()}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
