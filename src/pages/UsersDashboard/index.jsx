import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import ProjectListSection from "../../components/ProjectsListSection";
import RecentActivitySection from "../../components/RecentActivitySection";
import FeaturedProjectsSection from "../../components/FeaturedProjectsSection";
import FeaturedUsersSection from "../../components/FeaturedUsersSection";
import { useGenericSearch } from "../../hooks/useGenericSearch";
import styles from "./UsersDashboard.module.css";
import SkeletonLoader from "../../components/SkeletonLoader";

const UsersDashboardPage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchword, setSearchword] = useState("");
  const { data, isPending } = useGenericSearch(searchword);

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

  const handleCallbackSearchword = (searchword) => {
    setSearchword(searchword);
  };

  return (
    <div className="APage">
      <Header />

      <div className="TopRow">
        <InformationBar header={"Dashboard"}
         showBtn={false}
         showSearchBar
         placeholder="Search through cranecloud"
         searchAction={handleCallbackSearchword}
        />
      </div>

      <div className={styles.dashboard}>

        {isPending && <SkeletonLoader/>}
       
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
