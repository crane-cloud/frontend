import React, { useEffect, useRef } from "react";
import styles from "./NewModal.module.css";

const NewModal = ({ children, showModal, onClickAway }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClickAway();
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "visible";
    };
  }, [showModal, onClickAway]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClickAway();
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClickOutside}>
      <div
        className={styles.modalContent}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default NewModal;
