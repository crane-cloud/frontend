import React from "react";
import "./SecondaryButton.css";

const SecondaryButton = ({className, label, onClick}) => {
  return (<button className={`Secondary-Btn ${className}`} onClick={onClick}>{label}</button>)  
};

export default SecondaryButton;
