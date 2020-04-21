import React from 'react';
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

export default TextArea;
