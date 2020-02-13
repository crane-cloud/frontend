import React from 'react';
import './InputText.css';

const InputText = (props) => (
  <input
    className="InputText"
    type="text"
    placeholder={props.placeholder + "*"}
  />
);

export default InputText;
