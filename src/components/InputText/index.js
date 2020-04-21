import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InputText.css';

const InputText = (props) => {
  const [inputBackground, setBackground] = useState('InitialBackground');
  const {
    name, value, placeholder, onChange
  } = props;

  const changeBackground = () => {
    if (value) {
      setBackground('WhiteBackground');
    } else {
      setBackground('InitialBackground');
    }
  };

  useEffect(() => changeBackground(), [value]);

  return (
    <input
      className={`InputText ${inputBackground}`}
      type="text"
      placeholder={`${placeholder} *`}
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
  onChange: PropTypes.func.isRequired
};

InputText.defaultProps = {
  value: ''
};

export default InputText;
