import React from "react";
import styles from "./NewUserCard.module.css";

const NewUserCard = ({ name, followers, projects, apps }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <h3 className={styles.title}>
            <strong>{name}</strong>
          </h3>
        </div>
        <div className={styles.followButtonArea}>
          <button className={styles.followButton}>+ Follow</button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.statItem}>
          <p className={styles.followers}>
            <strong>{followers}</strong> Followers
          </p>
        </div>
        <div className={styles.statItem}>
          <span>
            <strong>{projects}</strong> Projects
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewUserCard;
