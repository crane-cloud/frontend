import React from "react";
import styles from "./RecentActivityItem.module.css";
import NewProjectCard from "../NewProjectCard";

const RecentActivityItem = ({
  user,
  action,
  time,
  projectName,
  projectDescription,
  followers,
}) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.userAvatar}>{user[0]}</div>
      <div className={styles.activityContent}>
        <div className={styles.userAction}>
          <strong>{user}</strong> {action}
        </div>
        <div className={styles.time}>{time}</div>
        <div className={styles.projectCard}>
          <NewProjectCard
            name={projectName}
            description={projectDescription}
            number={followers}
            showFollowers={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentActivityItem;
