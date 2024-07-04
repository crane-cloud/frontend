import React from "react";
import styles from "./NewAppCard.module.css";

const NewAppCard = ({ name, url, image, port }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.appUrl}>
            {url}
          </a>
        </p>

        <div className={styles.cardExtras}>
          <div className={styles.cardSummary}>
            <div className={styles.statItem}>
              <span>Image: {image}</span>
            </div>
            <div className={styles.statItem}>
              <span>Port: {port}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppCard;
