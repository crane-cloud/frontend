import React from 'react';
import './Status.css';

export const Status = (props) => {
  return (
    <div className={`StatusSignal StatusIs${props.status}`} />
  );
};
