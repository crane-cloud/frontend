import React from 'react';
import RoundAddButton from '../RoundAddButton';
import './InformationBar.css';

const InformationBar = ({ header, showBtn, btnAction }) => (
  <div className="InformationBar">
    {showBtn ? (
      <div className="InformationBarWithButton">
        <div className="InfoHeader">{header}</div>
        <div className="RoundAddButtonWrap">
          <RoundAddButton onClick={btnAction} />
        </div>
      </div>
    ) : (
      <div className="LeftHeader">{header}</div>
    )}
  </div>
);

export default InformationBar;
