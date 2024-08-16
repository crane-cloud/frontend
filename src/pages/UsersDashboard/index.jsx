import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import ProjectListSection from "../../components/ProjectsListSection";
import RecentActivitySection from "../../components/RecentActivitySection";
import FeaturedProjectsSection from "../../components/FeaturedProjectsSection";
import FeaturedUsersSection from "../../components/FeaturedUsersSection";
import { useGenericSearch } from "../../hooks/useGenericSearch";
import styles from "./UsersDashboard.module.css";
import SkeletonLoader from "../../components/SkeletonLoader";
import NewProjectCard from "../../components/NewProjectCard";
import NewUserCard from "../../components/NewUserCard";

const UsersDashboardPage = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchword, setSearchword] = useState("");
  const projectSectionRef = useRef(null);

  const { data, isPending, isRefetching, isSuccess, error, refetch } = useGenericSearch(searchword);

  useEffect(() => {
    const handleScroll = () => {
      if (projectSectionRef.current) {
        const topOffset = projectSectionRef.current.getBoundingClientRect().top;
        if (topOffset <= 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCallbackSearchword = (searchword) => {
    setSearchword(searchword);
    refetch(searchword);
  };

  return (
    <div className="APage">
      <Header />
      <div className="TopRow">
        <InformationBar
          header={"Dashboard"}
          showBtn={false}
          showSearchBar
          placeholder="Search through cranecloud"
          searchAction={handleCallbackSearchword}
        />
      </div>

      <div className={styles.dashboard}>
        {(isPending || isRefetching)  && searchword && <SkeletonLoader />}

        {error && !isSuccess && !isPending && !isRefetching && searchword && (
          <div className={styles.errorMessageSection}>
            <div className={styles.errorText}>{`Failed to fetch results for " ${searchword} ", please try again.`}</div>
          </div>
        )}
        {/* Display only search results if they exist */}
        {searchword && data?.data?.data?.projects?.items.length > 0 && isSuccess && !isPending && !isRefetching&& (
          <div className={styles.searchListSection}>
            {data?.data?.data?.projects?.items.length > 0 && (
              <div className={styles.resourceContainer}>
                <div className={styles.resourceLabel}>Projects</div>
                <div className={styles.resourceRaw}>
                  {data?.data?.data?.projects?.items.map((project, index) => (
                    <div key={index} className={styles.resource}>
                      <NewProjectCard
                        projectID={project.id}
                        name={project.name}
                        description={project.description}
                        organization={project.organisation}
                        type={project.project_type}
                        number={project.apps_count}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
         {/* Tags will follow a similar structure */}
         {searchword &&  data?.data?.data?.users?.items.length > 0  && isSuccess && !isPending && !isRefetching&& (
          <div className={styles.searchListSection}>
            {data?.data?.data?.users?.items.length > 0 && (
              <div className={styles.resourceContainer}>
                <div className={styles.resourceLabel}>Users</div>
                <div className={styles.resourceRaw}>
                  {data?.data?.data?.users?.items.map((user, index) => (
                    <div key={index} className={styles.resource}>
                      <NewUserCard key={index} userID={user?.id} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* If no resources are found */}
        {!data?.data?.data?.users?.items.length > 0  &&!data?.data?.data?.projects?.items.length > 0  &&!error && !isPending && !isRefetching&&  isSuccess && searchword&& (
          <div className={styles.errorMessageSection}>
            <div className={styles.errorText}>{`No results have been found for " ${searchword} ".`}</div>
          </div>
        )}
        
        {!searchword && (
          <>
            <div
              className={`${styles.projectSection} ${
                isSticky ? styles.sticky : ""
              }`}
              ref={projectSectionRef}
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
          </>
        )}
      </div>
    </div>
  );
};

export default UsersDashboardPage;
