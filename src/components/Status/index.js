import React from 'react';
import './Status.css';

const Status = (props) => {
  return (
    <div className={props.status ? 'StatusSignal StatusIsOn' : 'StatusSignal StatusIsOff'} />
  );
};

export default Status;
