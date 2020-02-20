import React from 'react';
import './InformationBar.css';
import CreateButton from '../ButtonComponent';

function InformationBar(props) {
  return (
    <div className="InformationBar">

      <div className="InfoHeader">{ props.header }</div>
      {props.showBtn ? 
        <div className="CreateButton"><CreateButton /></div> :
        <div className="LeftHeader">{ props.header }</div>}
      
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
