import React from "react";
import { PieChart, Pie, Cell } from "recharts";
// import moment from "moment";
import styles from "./ProfileAnalyticsCard.module.css";
// import PrimaryButton from "../PrimaryButton";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ProfileAnalytics = ({ user }) => {
  const data1 = [
    { name: "Apps", value: user.apps },
    { name: "Projects", value: user.projects },
    { name: "Databases", value: user.databases },
  ];

  const data2 = [
    { name: "Following Projects", value: user.followingProjects },
    { name: "Followers", value: user.followers },
  ];

  const data3 = [
    { name: "Follows", value: 1 },
    { name: "Followers", value: 7 },
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
                  data={data1}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className={styles.ChartLabel}>Apps/Projects/Databases</div>
              <div className={styles.AdminProfileRowInfo}>
                <div className={styles.AdminProfileRowItem}>
                  Apps: <span>{user.apps}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Projects: <span>{user.projects}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Databases: <span>{user.databases}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.Chart}>
            <div className={styles.SingleChart}>
              <h4>Projects</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={data2}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data2.map((entry, index) => (
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
                  Follows: <span>{user.followingProjects}</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Followers: <span>{user.followers}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.Chart}>
            <div className={styles.SingleChart}>
              <h4>Users</h4>
              <PieChart width={200} height={200}>
                <Pie
                  data={data3}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data3.map((entry, index) => (
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
                  Follows: <span>1</span>
                </div>
                <div className={styles.AdminProfileRowItem}>
                  Followers: <span>7</span>
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
