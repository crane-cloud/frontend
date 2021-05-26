import React from "react";
import "./SecondaryButton.css";

const SecondaryButton = (props) => (
  <div>
    {props.isBlack ? (
      <button className="Secondary-Btn SecondaryBlack">{props.label}</button>
    ) : (
      <button className="Secondary-Btn SecondaryWhite">{props.label}</button>
    )}
  </div>
);

export default SecondaryButton;
