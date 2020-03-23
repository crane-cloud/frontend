import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import './Modal.css';

const Modal = (props) => {
  return (
    <div className="ModalParentWrap">
      <div className="ModalChildWrap">
        <div className="ModalHeaderSection">
          <div className="CloseModalIcon">
            <CloseIcon />
          </div>
        </div>
        <div className="ModalContentSection">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
