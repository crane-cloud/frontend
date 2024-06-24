import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import ProjectListSection from "../../components/ProjectsListSection";
import RecentActivitySection from "../../components/RecentActivitySection";
import FeaturedProjectsSection from "../../components/FeaturedProjectsSection";
import FeaturedUsersSection from "../../components/FeaturedUsersSection";
import styles from "./UsersDashboard.module.css";

const UsersDashboardPage = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.querySelector(
        `.${styles.projectSection}`
      );
      const topOffset = projectSection.getBoundingClientRect().top;

      if (topOffset <= 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="APage">
      <Header />

      <div className="TopRow">
        <InformationBar header={"Dashboard"} />
      </div>

      <div className={styles.dashboard}>
        <div
          className={`${styles.projectSection} ${
            isSticky ? styles.sticky : ""
          }`}
        >
          <ProjectListSection />
        </div>
        <div className={styles.activitySection}>
          <RecentActivitySection />
        </div>
        <div className={styles.rightSection}>
          <FeaturedProjectsSection />
          <FeaturedUsersSection />
        </div>
      </div>
    </div>
  );
};

export default UsersDashboardPage;
