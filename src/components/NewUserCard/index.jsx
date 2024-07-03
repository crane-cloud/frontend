import React from "react";
import styles from "./NewUserCard.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NewUserCard = ({ userID, name, organisation, age }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <h3 className={styles.title}>
            <Link
              to={{
                pathname: `/profile/${userID}`,
              }}
              className={styles.linkBlue}
            >
              <strong>{name}</strong>
            </Link>
          </h3>
        </div>
        <div className={styles.followButtonArea}>
          <button className={styles.followButton}>+ Follow</button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardExtras}>
          <div className={styles.cardSummary}>
            {/* <div className={styles.statItem}>
              <span>Organisation: {organisation}</span>
            </div> */}
            <div className={styles.statItem}>
              <span>Joined {age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserCard;
