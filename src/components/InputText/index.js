import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./InputText.css";

const InputText = (props) => {
  const [inputBackground, setBackground] = useState("InitialBackground");
  const { name, value, placeholder, onChange, required } = props;

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
      type="text"
      placeholder={`${placeholder}${required ? " *" : ""}`}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

InputText.defaultProps = {
  value: "",
  required: false,
};

export default InputText;
