import React from "react";
import "./SecondaryButton.css";

const SecondaryButton = ({isBlack, label}) => (
  <div>
    {isBlack ? (
      <button className="Secondary-Btn SecondaryBlack">{label}</button>
    ) : (
      <button className="Secondary-Btn SecondaryWhite">{label}</button>
    )}
  </div>
);

export default SecondaryButton;
