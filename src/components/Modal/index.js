import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import './Modal.css';

const Modal = ({ showModal, children }) => {
  const [hidden, setHidden] = useState(showModal);
  const toggleModalOff = () => setHidden(false);

  return (
    (hidden && (
      <div className="ModalParentWrap">
        <div className="ModalChildWrap">
          <div className="ModalHeaderSection">
            <button className="CloseModalBtn" onClick={toggleModalOff}>
              <CloseIcon />
            </button>
          </div>
          <div className="ModalContentSection">
            {children}
          </div>
        </div>
      </div>
    ))
  );
};

Modal.defaultProps = {
  showModal: false
};

export default Modal;
