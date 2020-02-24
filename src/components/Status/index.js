import React from 'react';
import './Status.css';

const Status = (props) => {
  return (
    <div className={`StatusSignal StatusIs${props.status}`} />
  );
};

export default Status;
