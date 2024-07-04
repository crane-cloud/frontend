import React, { useEffect } from "react";
import styles from "./ProjectsListSection.module.css";
import NewProjectCard from "../NewProjectCard";
import PrimaryButton from "../PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "../Spinner";
import getUserProjects from "../../redux/actions/projectsList";
import { ReactComponent as InfoSvg } from "../../assets/images/infosvg.svg";

const ProjectListSection = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isRetrieved, isRetrieving, projects } = useSelector(
    (state) => state.userProjectsReducer
  );

  useEffect(() => {
    dispatch(getUserProjects(1));
  }, [dispatch]);

  const noProjectsFound = projects?.length === 0 && isRetrieved;

  const handleViewMoreClick = () => {
    history.push("/projects");
  };

  return (
    <div className={styles.projectCards}>
      <h2>Projects</h2>

      {isRetrieving && !isRetrieved ? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {noProjectsFound ? (
            <div className={styles.noActivity}>
              <InfoSvg />
              <p className={styles.noActivityMessage}>No Projects Found</p>
            </div>
          ) : (
            projects
              ?.slice(0, 5)
              .map((project, index) => (
                <NewProjectCard
                  key={index}
                  projectID={project.id}
                  name={project.name}
                  description={project.description}
                  organization={project.organisation}
                  type={project.project_type}
                  number={project.apps_count}
                />
              ))
          )}

          {!noProjectsFound && (
            <PrimaryButton
              className={styles.viewMoreButton}
              onClick={handleViewMoreClick}
            >
              View More
            </PrimaryButton>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectListSection;
