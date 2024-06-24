import React from "react";
import styles from "./FeaturedProjectsSection.module.css";
import NewProjectCard from "../NewProjectCard";
import PrimaryButton from "../PrimaryButton";

const projects = [
  {
    name: "My Project 1",
    description:
      "This is my description description description description description description description description",
    number: 1,
  },
  {
    name: "My Project 2",
    description: "This is my description",
    number: 2,
  },
  { name: "My Project 3", description: "This is my description", number: 3 },
  { name: "My Project 4", description: "This is my description", number: 3 },
];

const FeaturedProjectsSection = () => {
  return (
    <div className={styles.featuredProjects}>
      <h2>Featured Projects</h2>
      {projects.map((project, index) => (
        <NewProjectCard
          key={index}
          name={project.name}
          description={project.description}
          number={project.number}
          showFollowButton
          showFollowers={true}
        />
      ))}

      <PrimaryButton className={styles.viewMoreButton}>View More</PrimaryButton>
    </div>
  );
};

export default FeaturedProjectsSection;
