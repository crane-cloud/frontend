import React from "react";
import styles from "./RecentActivitySection.module.css";
import RecentActivityItem from "../RecentActivityItem";
import PrimaryButton from "../PrimaryButton";

const activities = [
  {
    user: "Moses",
    action: "followed your project",
    time: "yesterday",
    projectName: "My Project 1",
    projectDescription:
      "This is my description description description description description description description description",
    followers: 90,
  },
  {
    user: "Moses",
    action: "followed your project",
    time: "yesterday",
    projectName: "My Project 1",
    projectDescription: "This is my description",
    followers: 90,
  },
  {
    user: "Moses",
    action: "followed your project",
    time: "yesterday",
    projectName: "My Project 1",
    projectDescription: "This is my description",
    followers: 90,
  },
  {
    user: "Moses",
    action: "followed your project",
    time: "yesterday",
    projectName: "My Project 1",
    projectDescription: "This is my description",
    followers: 90,
  },
  {
    user: "Moses",
    action: "followed your project",
    time: "yesterday",
    projectName: "My Project 1",
    projectDescription: "This is my description",
    followers: 90,
  },
];

const RecentActivitySection = () => {
  return (
    <div className={styles.recentActivity}>
      <h2 className={styles.title}>Recent Activity</h2>
      {activities.map((activity, index) => (
        <RecentActivityItem
          key={index}
          user={activity.user}
          action={activity.action}
          time={activity.time}
          projectName={activity.projectName}
          projectDescription={activity.projectDescription}
          followers={activity.followers}
          showFollowButton={false}
        />
      ))}

      <PrimaryButton className={styles.viewMoreButton}>
        View All Activity
      </PrimaryButton>
    </div>
  );
};

export default RecentActivitySection;
