import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InputPassword.css';

const InputPassword = (props) => {
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

  useEffect(() => changeBackground(), [value]); // eslint-disable-line

  return (
    <input
      className={`InputPassword ${inputBackground}`}
      type="password"
      placeholder={`${placeholder} *`}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

InputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputPassword.defaultProps = {
  value: ''
};

export default InputPassword;
