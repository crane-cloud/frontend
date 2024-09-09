import React, { useEffect, useState } from "react";
import styles from "./FeaturedProjectsSection.module.css";
import NewProjectCard from "../NewProjectCard";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";

const projects = [
  {
    name: "NextJs Boilerplate",
    description:
      "A robust and scalable boilerplate for building Next.js applications, featuring best practices and industry standards for modern web development.",
    number: 1,
    organisation: "Company",
    type: "Charity",
  },
  {
    name: "NodeJs Rate Limiting",
    description:
      "An implementation of rate limiting in a Node.js application to manage traffic and prevent abuse, ensuring smooth and secure performance.",
    number: 2,
    organisation: "Startup",
    type: "Personal",
  },
  {
    name: "Go Playground",
    description:
      "An interactive Go programming environment for testing and experimenting with Go code snippets, designed for learning and quick prototyping.",
    number: 3,
    organisation: "Final Year Project",
    type: "Student",
  },
  {
    name: "Python Scripts",
    description:
      "A collection of Python scripts for automating various tasks and processes, enhancing productivity and efficiency in everyday operations.",
    number: 4,
    organisation: "Startup",
    type: "Personal",
  },
];

const FeaturedProjectsSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.featuredProjects}>
      <h2>Featured Projects</h2>
      {loading ? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {projects?.map((project, index) => (
            <NewProjectCard
              key={index}
              name={project.name}
              description={project.description}
              organization={project.organisation}
              type={project.type}
              number={project.number}
              showFollowButton
              showFollowers={true}
              projectFollowers={0}
            />
          ))}
        </>
      )}

      {!loading && (
        <PrimaryButton className={styles.viewMoreButton}>
          View More
        </PrimaryButton>
      )}
    </div>
  );
};

export default FeaturedProjectsSection;
