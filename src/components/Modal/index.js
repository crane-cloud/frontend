import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ showModal, children }) => (
  (showModal && (
    <div className="ModalParentWrap">
      <div className="ModalChildWrap">
        <div className="ModalContent">
          {children}
        </div>
      </div>
    </div>
  ))
);

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
