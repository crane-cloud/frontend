import React from 'react';
import CreateButton from '../ButtonComponent';
import './InformationBar.css';

function InformationBar({ header, showBtn, btnAction }) {
  return (
    <div className="InformationBar">

      {showBtn ? (
        <div>
          <div className="InfoHeader">{ header }</div>
          <div className="CreateButton">
            <CreateButton onClick={btnAction} />
          </div>
        </div>
      ) : (
        <div className="LeftHeader">{header}</div>
      )}
    </div>
  );
}
export default InformationBar;
