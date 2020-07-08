import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ showModal, children }) => {
  const [show, setShow] = useState(showModal);

  const toggleModal = () => {
    setShow(showModal);
  };

  useEffect(() => (
    toggleModal()
  ), [showModal]); // eslint-disable-line

  return (
    (show && (
      <div className="ModalParentWrap">
        <div className="ModalChildWrap">
          <div className="ModalContent">
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

export default Modal;
