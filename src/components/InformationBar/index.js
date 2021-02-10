import React from 'react';
import RoundAddButton from '../RoundAddButton';
import CancelButton from '../CancelButton';
import AppStatus from '../AppStatus';
import './InformationBar.css';

const InformationBar = ({ header, status, showBtn, btnAction }) => (
  <div className="InformationBar">
    {status ? (
      <div className="InformationBarWithButton">
      <div className="AppUrl"><a target="_blank" rel="noopener noreferrer" href={header}>{header}</a></div>
      <div className="RoundAddButtonWrap">
        <AppStatus appStatus={status}/>
      </div>
    </div>
    ):(
      showBtn ? (
        <div className="InformationBarWithButton">
          <div className="InfoHeader">{header}</div>
          <div className="RoundAddButtonWrap">
            <RoundAddButton onClick={btnAction} />
          </div>
        </div>
      ) : (
        <div className="InfoHeader">{header}</div>
      ))
      }
  </div>
);

export default InformationBar;
