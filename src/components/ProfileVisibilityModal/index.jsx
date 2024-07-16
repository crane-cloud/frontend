import React from "react";
import styles from "./ProfileVisibilityModal.module.css";
import PrimaryButton from "../PrimaryButton";

const ProfileVisibilityModal = ({ onClose }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>This user profile is private!</h2>
        <PrimaryButton onClick={onClose}>Return to Previous Screen</PrimaryButton>
      </div>
    </div>
  );
};

export default ProfileVisibilityModal;
