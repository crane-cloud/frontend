import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = (props) => {
  const { children, className, btntype, color, small, transparent, noPadding } = props;

  const getColorClass = () => {
    switch (color) {
      case "primary":
        return "PrimaryColorBtn";
      case "primary-outline":
        return "PrimaryOutlineColorBtn";
      case "black":
        return "BlackPrimaryBtn";
      case "red":
        return "DeleteBtn";
      case "red-outline":
        return "DeleteBtnOutline";
      default:
        return "primary-button--blue";
    }
  };
  return (
    <button
      {...props}
      className={`Primary-Btn ${className} ${btntype === "close" && "DeleteBtnOutline"}
        ${color && getColorClass()} ${small && "SmallBtn"} ${transparent && "TransparentBtn"}
        ${noPadding && "NoPaddingBtn"}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
