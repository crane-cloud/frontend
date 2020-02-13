import React from 'react';
import './InputPassword.css';

const InputPassword = (props) => (
  <input
    className="InputPassword"
    type="password"
    placeholder={props.placeholder+ " *"}
  />
);

export default InputPassword;
