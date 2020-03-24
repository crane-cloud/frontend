import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg';
import './Modal.css';

const Modal = ({ showModal, children }) => {
  const [show, setShow] = useState(true);
  const toggleModalOff = () => setShow(false);

  return (
    ((showModal && show) && (
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

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

// Modal.defaultProps = {
//   showModal: false
// };

export default Modal;
