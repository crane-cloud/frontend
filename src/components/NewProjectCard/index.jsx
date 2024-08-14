import React from "react";
import styles from "./NewProjectCard.module.css";
import { ReactComponent as ProjectMembers } from "../../assets/images/project-members.svg";
import { ReactComponent as Deployments } from "../../assets/images/deployments.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {formatCount} from "../../helpers/counterFormat.js"

const NewProjectCard = ({
  projectID,
  name,
  description,
  organization,
  type,
  number,
  showFollowButton,
  projectFollowers,
}) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>
          <Link
            to={{
              pathname: `/projects/${projectID}/dashboard`,
              projectData: name,
            }}
            className={styles.linkBlue}
          >
            {name}
          </Link>
        </h3>
        <div className={styles.appCount} >
         <div className={styles.countAndIcon}>
          <ProjectMembers
            className={styles.membersIcon}
            title={"Project followers"}
          />
          <span className={styles.memberCount}>{formatCount(projectFollowers)}</span>
         </div>
         <div className={styles.countAndIcon}>
          <Deployments
            className={styles.membersIcon}
            title={"Project apps"}
          />
          <span className={styles.memberCount}>{formatCount(number)}</span>
         </div>
        </div>
        <p className={styles.description}>{description}</p>

        {/* <div className={styles.cardExtras}>
          {showFollowers && (
            <>
              <ProjectMembers
                className={styles.membersIcon}
                title={`Members following this project`}
              />
              <span className={styles.memberCount}>{number}</span>
            </>
          )}
        </div> */}

        <div className={styles.cardExtras}>
          <div className={styles.cardSummary}>
            <div className={styles.statItem}>
              <span>Organisation: {organization}</span>
            </div>
            <div className={styles.statItem}>
              <span>Type: {type}</span>
            </div>
          </div>
        </div>
      </div>
      {!showFollowButton && number !== undefined ? (
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
