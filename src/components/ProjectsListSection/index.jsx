import React from "react";
import styles from "./ProjectsListSection.module.css";
import NewProjectCard from "../NewProjectCard";
import PrimaryButton from "../PrimaryButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner";

const ProjectListSection = () => {
  const history = useHistory();

  const handleViewMoreClick = () => {
    history.push("/projects");
  };

  const { isRetrieved, isRetrieving, projects } = useSelector(
    (state) => state.userProjectsReducer
  );

  return (
    <div className={styles.projectCards}>
      <h2>Projects</h2>

      {isRetrieving && !isRetrieved ? (
        <div className={styles.NoResourcesMessage}>
          <div className={styles.SpinnerWrapper}>
            <Spinner size="small" />
          </div>
        </div>
      ) : (
        <>
          {projects.slice(0, 5).map((project, index) => (
            <NewProjectCard
              key={index}
              name={project.name}
              description={project.description}
              number={project.apps_count}
            />
          ))}
        </>
      )}

      <PrimaryButton
        className={styles.viewMoreButton}
        onClick={handleViewMoreClick}
      >
        View More
      </PrimaryButton>
    </div>
  );
};

export default ProjectListSection;
