import React from "react";
import styles from "./TagCard.module.css";
import { ReactComponent as Stats } from "../../assets/images/bars.svg";

const TagCard = ({ name, projects_count, id, onFollow, isModalTag }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.tagName}>{name}</div>
        {isModalTag && (
          <div className={styles.modalFollowButton}>
            <button
              className={styles.followButton}
              onClick={() => onFollow(id)}
            >
              + Follow
            </button>
          </div>
        )}
        <div className={styles.statItem}>
          <span>
            <Stats className={styles.stats} />{" "}
          </span>
          <span>
            {projects_count !== 0 && projects_count === 1
              ? "1 project"
              : `${projects_count} projects`}
          </span>
        </div>
      </div>

      {!isModalTag && (
        <div className={styles.followButtonArea}>
          <button className={styles.followButton} onClick={() => onFollow(id)}>
            + Follow
          </button>
        </div>
      )}
    </div>
  );
};

export default TagCard;
