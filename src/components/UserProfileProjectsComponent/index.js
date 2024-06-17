// Projects.jsx
import React from 'react';
import styles from "../../pages/UsersProfile/UserProfile.module.css";
import { ReactComponent as RightArrowIcon } from "../../assets/images/blue-right-arrow.svg";

const UserFeedProjects = ({ projects }) => {
  return (
    <section className={styles.ProfileProjectsSection}>
      <div className="SectionTitle">Projects</div>
      <div className={styles.ProjectsContainer}>
        {projects.slice(0, 12).map((project) => (
          <div key={project.id} className={styles.FollowProjectCard}>
            <div className={styles.ProjectName}>{project.name}</div>
            <div className={styles.ProjectDescription}>
              {project.description}
            </div>
            <button className={styles.FollowButtonProjects}>
              <span style={{ fontWeight: 700, fontSize: "18px" }}>+</span> Follow
            </button>
          </div>
        ))}
      </div>
      {projects.length > 12 && (
        <div className={styles.ShowMoreProjectsContainer}>
          <div className={styles.ShowMoreProjectsLink}>
            Show More <RightArrowIcon />
          </div>
        </div>
      )}
    </section>
  );
};

export default UserFeedProjects;
