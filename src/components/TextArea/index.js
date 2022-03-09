import React from "react";
import PropTypes from "prop-types";
import "./TextArea.css";

const TextArea = ({ name, value, placeholder, onChange, required, style}) => {
  return (
    <textarea
      className={style? `${style}`  :"TextArea" }
      type="text"
      placeholder={`${placeholder}${required ? " *" : ""}`}
      rows="3"
      cols="50"
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

TextArea.defaultProps = {
  value: "",
  required: false,
};

export default TextArea;
