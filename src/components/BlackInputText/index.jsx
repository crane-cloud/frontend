import React from "react";
import PropTypes from "prop-types";
import "./BlackInputText.css";

const BlackInputText = ({
  onChange,
  placeholder,
  name,
  value,
  required,
  type,
}) => (
  <input
    className="BlackInputText"
    type={type}
    placeholder={`${placeholder}${required ? " *" : ""}`}
    name={name}
    value={value}
    onChange={(e) => {
      onChange(e);
    }}
  />
);

BlackInputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
};

BlackInputText.defaultProps = {
  value: "",
  required: false,
  type: "text",
};

export default BlackInputText;
