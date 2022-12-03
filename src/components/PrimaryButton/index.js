import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = (props) => {
  const { children, className, btnType } = props;

  return (
    <button {...props} className={`Primary-Btn ${className} ${btnType === 'close' && 'DeleteBtn'}`}>
      {children}
    </button>
  );
};

export default PrimaryButton;
