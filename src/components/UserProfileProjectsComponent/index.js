// Projects.jsx
import React from "react";
import styles from "../../pages/UsersProfile/UserProfile.module.css";
import { ReactComponent as RightArrowIcon } from "../../assets/images/blue-right-arrow.svg";
import Spinner from "../Spinner";

const UserFeedProjects = ({
  projects,
  loading,
  error,
  onProjectFollowClick,
  projectFollowLoading
}) => {
  return (
    <section className={styles.ProfileProjectsSection}>
      <div className="SectionTitle">Projects</div>
      {loading ? (
        <div className={styles.NoResourcesMessage}>
          <Spinner />
        </div>
      ) : null}
      {error ? (
        <div className={styles.NoResourcesMessage}>
          Failed to fetch user projects
        </div>
      ) : null}
      {projects && projects?.length > 0 ? (
        <>
          <div className={styles.ProjectsContainer}>
            {projects.slice(0, 12).map((project) => (
              <div key={project.id} className={styles.FollowProjectCard}>
                <div className={styles.ProjectName}>{project.name}</div>
                <div className={styles.ProjectDescription}>
                  {project.description}
                </div>
                <button
                  className={styles.FollowButtonProjects}
                  onClick={() => {
                    onProjectFollowClick(project.id);
                  }}
                >
                  {projectFollowLoading === project.id? <Spinner/> : project.is_following ?  "Unfollow" :  <><span style={{ fontWeight: 700, fontSize: "18px" }}>+</span>{" "}
                  Follow</>}
                </button>
              </div>
            ))}
          </div>
          {projects?.length > 12 && (
            <div className={styles.ShowMoreProjectsContainer}>
              <div className={styles.ShowMoreProjectsLink}>
                Show More <RightArrowIcon />
              </div>
            </div>
          )}
        </>
      ) : null}
      {projects?.length < 1 && !error && !loading && (
        <div className={styles.NoResourcesMessage}>User has no projects</div>
      )}
    </section>
  );
};

export default UserFeedProjects;
