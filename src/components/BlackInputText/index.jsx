import React from "react";
import PropTypes from "prop-types";
import "./BlackInputText.css";

const BlackInputText = ({
  className,
  onChange,
  placeholder,
  name,
  value,
  required,
  type,
  readOnly,
  onFocus,
}) => (
  <input
    className={`BlackInputText ${className}`}
    type={type}
    placeholder={`${placeholder}${required ? " *" : ""}`}
    name={name}
    value={value}
    onChange={(e) => {
      onChange(e);
    }}
    readOnly={readOnly}
    onFocus={onFocus}
  />
);

BlackInputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

BlackInputText.defaultProps = {
  value: "",
  required: false,
  type: "text",
  readOnly: false,
};

export default BlackInputText;
