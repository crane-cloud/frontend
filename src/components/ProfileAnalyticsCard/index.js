import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./ProfileAnalyticsCard.module.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ProfileAnalytics = (UserProfile) => {
  const userSummary = UserProfile.user;

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

  const renderPieChart = (data, title, label, userCounts) => {
    const allZero = data.every(entry => entry.value === 0);

    return (
      <div className={styles.Chart}>
        <div className={styles.SingleChart}>
          <h4>{title}</h4>
          <PieChart width={200} height={200}>
            <Pie
              data={allZero ? [{ name: "No Data", value: 1 }] : data}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              fill={allZero ? "red" : "#82ca9d"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={allZero ? "red" : COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className={styles.ChartLabel}>{label}</div>
          <div className={styles.AdminProfileRowInfo}>
            {userCounts.map((count, index) => (
              <div className={styles.AdminProfileRowItem} key={index}>
                {count.label}: <span>{count.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="AdminCardArea">
      <div className="AdminUserProfileCard">
        <div className={styles.ChartsContainer}>
          {renderPieChart(resources, "Resources", "Apps/Projects", [
            { label: "Apps", value: userSummary?.apps_count },
            { label: "Projects", value: userSummary?.projects_count },
          ])}
          {renderPieChart(projects, "Projects", "Projects (Following/Followers)", [
            { label: "Following Projects", value: userSummary?.followed_projects_count },
            { label: "Projects' Followers", value: userSummary?.projects_followers_count },
          ])}
          {renderPieChart(social, "Users", "Users (Followed/Followers)", [
            { label: "Follows", value: userSummary?.follower_count },
            { label: "Followers", value: userSummary?.following_count },
          ])}
        </div>
      </div>
    </section>
  );
};

export default ProfileAnalytics;
