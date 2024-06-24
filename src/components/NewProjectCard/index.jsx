import React from "react";
import styles from "./NewProjectCard.module.css";
import { ReactComponent as ProjectMembers } from "../../assets/images/project-members.svg";

const NewProjectCard = ({
  name,
  description,
  number,
  showFollowers,
  showFollowButton,
}) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.cardExtras}>
          {showFollowers && (
            <>
              <ProjectMembers
                className={styles.membersIcon}
                title={`Members following this project`}
              />
              <span className={styles.memberCount}>{number}</span>
            </>
          )}
        </div>
      </div>
      {!showFollowers && !showFollowButton ? (
        <div className={styles.numberBox} title={`Apps in this project`}>
          <span className={styles.number}>{number}</span>
        </div>
      ) : showFollowButton ? (
        <div className={styles.followButtonArea}>
          <button className={styles.followButton}>+ Follow</button>
        </div>
      ) : null}
    </div>
  );
};

export default NewProjectCard;
