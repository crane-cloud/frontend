import React from "react";
import styles from "./ProjectsListSection.module.css";
import NewProjectCard from "../NewProjectCard";
import PrimaryButton from "../PrimaryButton";

const projects = [
  {
    name: "My Project 1",
    description:
      "This is my description description description description description description description description",
    number: 0,
  },
  {
    name: "My Project 2",
    description: "This is my description",
    number: 0,
  },
  { name: "My Project 3", description: "This is my description", number: 3 },
  { name: "My Project 4", description: "This is my description", number: 4 },
  { name: "My Project 5", description: "This is my description", number: 5 },
];

const ProjectListSection = () => {
  return (
    <div className={styles.projectCards}>
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <NewProjectCard
          key={index}
          name={project.name}
          description={project.description}
          number={project.number}
        />
      ))}

      <PrimaryButton className={styles.viewMoreButton}>View More</PrimaryButton>
    </div>
  );
};

export default ProjectListSection;
