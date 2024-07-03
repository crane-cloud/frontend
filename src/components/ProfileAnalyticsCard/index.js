import React from "react";
import { PieChart, Pie, Cell } from "recharts";
// import moment from "moment";
import styles from "./ProfileAnalyticsCard.module.css";
// import PrimaryButton from "../PrimaryButton";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ProfileAnalytics = (UserProfile) => {
  const userSummary = UserProfile.user
  
  const resources = [
    { name: "Apps", value: userSummary?.apps_count },
    { name: "Projects", value: userSummary?.projects_count },
  ];

  const projects = [
    { name: "Following Projects", value: userSummary?.followed_projects_count },
    { name: "Projects' Followers", value: userSummary?.projects_followers_count },
  ];

  const social = [
    { name: "Follows", value: userSummary?.follower_count },
    { name: "Followers", value: userSummary?.following_count },
  ];
  
  return (
    <section className="AdminCardArea">
      <div className="AdminUserProfileCard">
        <div className={styles.ChartsContainer}>
          <div className={styles.Chart}>
            <div className={styles.SingleChart}>
              <h4>Resources</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={resources}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resources.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className={styles.ChartLabel}>Apps/Projects</div>
              <div className={styles.AdminProfileRowInfo}>
                <div className={styles.AdminProfileRowItem}>
                  Apps: <span>{userSummary?.apps_count}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Projects: <span>{userSummary?.projects_count}</span>
                </div>
                
              </div>
            </div>
          </div>
          <div className={styles.Chart}>
            <div className={styles.SingleChart}>
              <h4>Projects</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={projects}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projects.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className={styles.ChartLabel}>
                Projects (Following/Followers)
              </div>
              <div className={styles.AdminProfileRowInfo}>
                <div className={styles.AdminProfileRowItem}>
                  Follows: <span>{userSummary?.followed_projects_count}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Followers: <span>{userSummary?.projects_followers_count}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.Chart}>
            <div className={styles.SingleChart}>
              <h4>Users</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={social}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {social.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    //   Tooltip={entry}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className={styles.ChartLabel}>
                Users (Followed/Followers)
              </div>
              <div className={styles.AdminProfileRowInfo}>
                <div className={styles.AdminProfileRowItem}>
                  Follows: <span>{userSummary?.following_count}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Followers: <span>{userSummary?.follower_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileAnalytics;
