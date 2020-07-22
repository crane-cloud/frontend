import React from 'react';
import './AppStatus.css';

const AppStatus = (props) => (
  <div className="StatusWrapper">
    <div className={
        if props.status == ''? 'StatusSignal StatusIsOn' : 'StatusSignal StatusIsOff'} />
  </div>
);

export default AppStatus;
