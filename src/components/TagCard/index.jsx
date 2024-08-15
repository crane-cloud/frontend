import React from "react";
import styles from "./TagCard.module.css";
import { ReactComponent as Stats } from "../../assets/images/bars.svg";
import Spinner from "../Spinner";
import PrimaryButton from "../PrimaryButton";

const TagCard = ({
  name,
  projects_count,
  isFollowing,
  id,
  onFollow,
  tagFollowLoading,
  isModalTag,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.tagName}>{name}</div>
        {isModalTag && (
          <div className={styles.modalFollowButton}>
            <button
              className={styles.followButton}
              onClick={() => onFollow(id, isFollowing)}
            >
              {isFollowing ? "Unfollow" : "+ Follow"}
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
          <PrimaryButton
            className={styles.followButton}
            onClick={() => onFollow(id, isFollowing)}
          >
            {tagFollowLoading ? (
              <Spinner size="small" />
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "+ Follow"
            )}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default TagCard;
