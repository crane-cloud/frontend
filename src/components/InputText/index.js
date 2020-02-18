import React from 'react';
import './InputText.css';

const InputText = (props) => (
  <input
    className="InputText"
    type="text"
    placeholder={`${props.placeholder} *`}
    name={props.name}
    value={props.value}
    onChange={e => {
      props.onChange(e);
    }}
  />
);

export default InputText;
