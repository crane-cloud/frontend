import React from 'react';
import './Status.css';

const Status = (props) => (
  <div className="StatusWrapper">
    <div className={props.status ? 'StatusSignal StatusIsOn' : 'StatusSignal StatusIsOff'} />
  </div>
);

export default Status;
