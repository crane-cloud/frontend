import React from 'react';
import Popup from 'reactjs-popup';
import './InformationBar.css';
import AddClusterForm from '../AddClusterForm';
import CreateButton from '../ButtonComponent';

function InformationBar(props) {
  const { header, showBtn } = props;
  return (
    <div className="InformationBar">

      {showBtn ? (
        <div>
          <div className="InfoHeader">{ header }</div>
          <Popup trigger={<div className="CreateButton"><CreateButton /></div>} modal className="popup">
            {(close) => (
              <AddClusterForm close={close} />
            )}
          </Popup>
        </div>
      ) : (
        <div className="LeftHeader">{ header }</div>
      )}

    </div>
  );
}
export default InformationBar;
