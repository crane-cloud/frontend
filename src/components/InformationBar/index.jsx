import React from 'react';
import Popup from 'reactjs-popup';
import './InformationBar.css';
import AddClusterForm from '../AddClusterForm';
import CreateButton from '../ButtonComponent';

function InformationBar({ header, showBtn, btnAction }) {
  return (
    <div className="InformationBar">

      {showBtn ? (
        <div>
          <div className="InfoHeader">{ header }</div>
          <Popup trigger={<div className="CreateButton"><CreateButton onClick={btnAction} /></div>} modal className="popup">
            {(close) => (
              <AddClusterForm close={close} />
            )}
          </Popup>
        </div>
      ) : (
        <div className="LeftHeader">{header}</div>
      )}

      {/* <div className="DropDownDiv">
        <span className="NamespaceDropDown">name space</span>
        <div className="DropDownContent">
          <div>default</div>
          <div>monitoring</div>
        </div>
      </div> */}
    </div>
  );
}
export default InformationBar;
