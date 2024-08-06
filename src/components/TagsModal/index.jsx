import React from "react";
import styles from "./TagsModal.module.css";
import TagCard from "../TagCard";

const TagsModal = ({ tags, onClose, onFollow, isModalTag }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>Suggested tags</div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.grid}>
          {tags?.map((tag) => (
            <TagCard
              key={tag.id}
              name={tag.name}
              projects_count={tag.projects_count}
              id={tag.id}
              onFollow={onFollow}
              isModalTag={isModalTag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsModal;
