import React from 'react';
import './BlackInputText.css';

const BlackInputText = ({
  onChange,
  placeholder,
  name,
  value
}) => (
  <input
    className="BlackInputText"
    type="text"
    placeholder={`${placeholder} *`}
    name={name}
    value={value}
    onChange={(e) => {
      onChange(e);
    }}
  />
);

export default BlackInputText;
