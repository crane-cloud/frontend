import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ showModal, children, onClickAway }) => {
  const [show, setShow] = useState(showModal);
  const modalRef = useRef(null);

  const toggleShowModal = () => {
    setShow(showModal);
  };

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClickAway();
    }
  };

  // componentWillMount & componentWillUnmount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  // componentDidUpdate
  useEffect(() => (
    toggleShowModal()
  ), [showModal]);

  return (
    (show && (
      <div className="ModalParentWrap">
        <div ref={modalRef} className="ModalChildWrap">
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
  children: PropTypes.node.isRequired,
  onClickAway: PropTypes.func.isRequired
};

export default Modal;
