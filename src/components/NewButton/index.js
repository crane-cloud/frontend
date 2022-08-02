import React from "react";
import "./NewButton.css";

const NewButton = (props) => {
  const { label, className,disable,type } = props;
  return (
    <button
      disabled={disable}
      className={type==="new"?`New-Btn uppercase ${className}`:`Close-Btn uppercase ${className}`}
      onClick={props.onClick}
    >
    {type==="new"? <> New {label}</>: <>Close</> } 
    </button>
  );
};

export default NewButton;
