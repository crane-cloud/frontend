import React from "react";
import styles from "./FeaturedUsersSection.module.css";
import NewUserCard from "../NewUserCard";
import PrimaryButton from "../PrimaryButton";

const users = [
  { name: "User 1", followers: 120, projects: 10, apps: 5 },
  { name: "User 2", followers: 90, projects: 8, apps: 3 },
  { name: "User 3", followers: 150, projects: 12, apps: 7 },
  { name: "User 4", followers: 120, projects: 10, apps: 4 },
  { name: "User 5", followers: 100, projects: 9, apps: 5 },
];

const FeaturedUsersSection = () => {
  return (
    <div className={styles.featuredUsers}>
      <h2>Featured Users</h2>
      {users.map((user, index) => (
        <NewUserCard
          key={index}
          name={user.name}
          followers={user.followers}
          projects={user.projects}
          apps={user.apps}
        />
      ))}

      <PrimaryButton className={styles.viewMoreButton}>View More</PrimaryButton>
    </div>
  );
};

export default FeaturedUsersSection;
