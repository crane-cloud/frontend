import React from 'react';
import './InformationBar.css';

function InformationBar() {
  return (
    <div className="InformationBar">
      <div className="DropDownDiv">
        <span className="NamespaceDropDown">name space</span>
        <div className="DropDownContent">
          <div>default</div>
          <div>monitoring</div>
        </div>
      </div>
      <div className="InfoHeader">Header</div>
    </div>
  );
}
export default InformationBar;
