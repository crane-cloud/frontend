import React from 'react';
import Popup from 'reactjs-popup';
import './InformationBar.css';
import CreateAppForm from '../CreateAppForm';
import CreateButton from '../ButtonComponent';

function InformationBar(props) {
  return (
    <div className="InformationBar">

      {props.showBtn ? (
        <div>
          <div className="InfoHeader">{ props.header }</div>
          <Popup trigger={<div className="CreateButton"><CreateButton /></div>} modal className="popup">
            {(close) => (
              <CreateAppForm close={close} />
            )}
          </Popup>
        </div>
      ) : (
        <div className="LeftHeader">{ props.header }</div>
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
