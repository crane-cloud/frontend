import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
    <div className="ModalParentWrap">
      <div className="ModalChildWrap">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
