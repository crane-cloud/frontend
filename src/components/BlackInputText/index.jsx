import React from 'react';
import './BlackInputText.css';

const BlackInputText = (props) => (
  <input
    className="BlackInputText"
    type="text"
    placeholder={`${props.placeholder} *`}
    name={props.name}
    // value={props.value}
    onChange={e => {
      props.onChange(e);
    }}
  />
);

export default BlackInputText;
