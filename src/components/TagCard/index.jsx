import React, { useState } from "react";
import styles from "./TagCard.module.css";
import { ReactComponent as Stats } from "../../assets/images/bars.svg";
import Spinner from "../Spinner";
import axios from "../../axios";
import { handleDeleteRequest } from "../../apis/apis";

const TagCard = ({ id, name, projects_count, isFollowing, isModalTag }) => {
  const [tagFollowLoading, setTagFollowLoading] = useState(false);
  const [isFollowingTag, setIsFollowingTag] = useState(isFollowing);

  const handleFollow = async (id) => {
    setTagFollowLoading(true);
    if (isFollowing) {
      handleDeleteRequest(`tags/${id}/following`, {})
        .then(() => {
          setIsFollowingTag(!isFollowing);
          setTagFollowLoading(false);
        })
        .catch((error) => {
          console.error("Error following tag:", error);
          setTagFollowLoading(false);
        });
    } else {
      try {
        const response = await axios.post(`tags/${id}/following`);
        if (response.status === 201) {
          setIsFollowingTag(!isFollowing);
          setTagFollowLoading(false);
        }
      } catch (error) {
        console.error("Error following tag:", error);
        setTagFollowLoading(false);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.tagName}>{name}</div>
        {isModalTag && (
          <div className={styles.modalFollowButton}>
            <button
              className={styles.followButton}
              onClick={() => handleFollow(id)}
            >
              {tagFollowLoading ? (
                <Spinner size="small" />
              ) : isFollowingTag ? (
                "Unfollow"
              ) : (
                "+ Follow"
              )}
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
          <button
            className={styles.followButton}
            onClick={() => handleFollow(id)}
          >
            {tagFollowLoading ? (
              <Spinner size="small" />
            ) : isFollowingTag ? (
              "Unfollow"
            ) : (
              "+ Follow"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TagCard;
