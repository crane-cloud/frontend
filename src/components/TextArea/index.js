import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

const TextArea = (props) => {
  const {
    name, value, placeholder, onChange
  } = props;

  return (
    <textarea
      className="TextArea"
      type="text"
      placeholder={`${placeholder} *`}
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
  onChange: PropTypes.func.isRequired
};

TextArea.defaultProps = {
  value: ''
};

export default TextArea;
