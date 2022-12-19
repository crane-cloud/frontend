import React, { useState, useEffect } from "react";
import "./InputText.css";

const InputText = (props) => {
  const { name, value, placeholder, onChange, required } = props;
  const [inputBackground, setBackground] = useState("InitialBackground");
  const changeBackground = () => {
    if (value) {
      setBackground("WhiteBackground");
    } else {
      setBackground("InitialBackground");
    }
  };

  useEffect(() => changeBackground(), [value]); // eslint-disable-line

  return (
    <input
      className={`InputText ${inputBackground}`}
      placeholder={`${placeholder}${required ? " *" : ""}`}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      {...props}
    />
  );
};

export default InputText;
