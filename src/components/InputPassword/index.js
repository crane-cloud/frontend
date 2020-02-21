import React from 'react';
import './InputPassword.css';

const InputPassword = props => (
  <input
    className="InputPassword"
    type="password"
    placeholder={`${props.placeholder} *`}
    name={props.name}
    value={props.value}
    onChange={e => {
      props.onChange(e);
    }}
  />
);

export default InputPassword;