import React, { useState } from "react";

import Avatar from "../../components/Avatar";
import Header from "../../components/Header";

import InformationBar from "../../components/InformationBar";

import AppFooter from "../../components/appFooter";
import styles from "./UserProfile.module.css";
import moment from "moment";
import PrimaryButton from "../../components/PrimaryButton";
import { ReactComponent as UpdateIcon } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as CreateIcon } from "../../assets/images/check-circle.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/images/blue-right-arrow.svg";
import Select from "../../components/Select";
import { getYearOptions } from "../../helpers/dateConstants";

const dummyProjects = [
  { id: 1, name: "My Project 1", description: "This is my description" },
  { id: 2, name: "My Project 1", description: "This is my description" },
  { id: 3, name: "My Project 1", description: "This is my description" },
  { id: 4, name: "My Project 1", description: "This is my description" },
  { id: 5, name: "My Project 1", description: "This is my description" },
  { id: 6, name: "My Project 1", description: "This is my description" },
  { id: 7, name: "My Project 1", description: "This is my description" },
  { id: 8, name: "My Project 1", description: "This is my description" },
  { id: 9, name: "My Project 1", description: "This is my description" },
  { id: 10, name: "My Project 1", description: "This is my description" },
  { id: 11, name: "My Project 1", description: "This is my description" },
  { id: 12, name: "My Project 1", description: "This is my description" },
  { id: 13, name: "My Project 1", description: "This is my description" },
  { id: 14, name: "My Project 1", description: "This is my description" },
  { id: 15, name: "My Project 1", description: "This is my description" },
  { id: 16, name: "My Project 1", description: "This is my description" },
];

const dummyActivities = [
  {
    id: 1,
    month: "May 2024",
    activities: [
      {
        type: "Updated",
        description: "Updated 5 apps in 3 projects",
        projects: [
          { name: "Project1", apps: 2 },
          { name: "Project2", apps: 1 },
          { name: "Project3", apps: 2 },
        ],
      },
      {
        type: "Created",
        description: "Created 1 project",
        projects: [{ name: "MyNewProject", apps: 0 }],
      },
    ],
  },
  {
    id: 2,
    month: "June 2024",
    activities: [
      {
        type: "Updated",
        description: "Updated 5 apps in 3 projects",
        projects: [
          { name: "Project1", apps: 2 },
          { name: "Project2", apps: 1 },
          { name: "Project3", apps: 2 },
        ],
      },
      {
        type: "Created",
        description: "Created 1 project",
        projects: [{ name: "MyNewProject", apps: 0 }],
      },
    ],
  },

  {
    id: 2,
    month: "July 2024",
    activities: [
      {
        type: "Deployed",
        description: "Deployed 5 apps in 3 projects",
        projects: [
          { name: "Project1", apps: 2 },
          { name: "Project2", apps: 1 },
          { name: "Project3", apps: 2 },
        ],
      },
      {
        type: "Created",
        description: "Created 1 project",
        projects: [{ name: "MyNewProject", apps: 0 }],
      },
    ],
  },
];
const UsersProfile = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const selectedYear = (year) => {
    return;
  };
  const yearOptions = getYearOptions();
  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="Mainsection">
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar
              header={"Muwonge Khalifan"}
              showBtn={false}
              showBackBtn
            />
          </div>
          {/* Information */}
          <div className="ShortContainer">
            <section className="">
              <div className="SectionTitle">Information</div>
              <div className="AdminCardArea">
                <div className="AdminUserProfileCard">
                  <div
                    className="AdminUserProfileInfoSect"
                    style={{ width: "100%" }}
                  >
                    <div className={styles.UserProfileInfoHeader}>
                      <Avatar
                        name={"Khalifan Muwonge"}
                        className={styles.UserAvatarLarge}
                      />
                      <div className={styles.Identity}>
                        <div className={styles.IdentityName}>
                          {"Khalifan Muwonge"}
                          {/* {user?.is_beta_user === true && ( */}
                          <div className={styles.BetaUserDiv}>Beta User</div>
                          {/* )} */}
                        </div>
                        <div className={styles.IdentityEmail}>
                          {"khalifanmuwonge@gmail.com"}
                        </div>
                        <div className="AdminProfileRowItem">
                          Organization:
                          <span>
                            {/* {user?.organisation === null
                                        ? "Not Found"
                                        : user?.organisation} */}
                            Makerere
                          </span>
                        </div>
                        <PrimaryButton
                          className={styles.FollowButton}
                          btntype={"new"}
                          onClick={() => {}}
                        >
                          + Follow
                        </PrimaryButton>
                      </div>
                      <div className={styles.DateStyles}>
                        Date Joined:
                        <span className={styles.dateStyle}>
                          {moment("12/04/2020")
                            .utc()
                            .format("ddd, MMMM DD, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="AdminProfileRowInfo">
                      <div className="AdminProfileRowItem">
                        Following:
                        <span>1</span>
                      </div>
                      |
                      <div className="AdminProfileRowItem">
                        Followers:
                        <span>7</span>
                      </div>
                      |
                      <div className="AdminProfileRowItem">
                        Projects:
                        <span>38</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className={styles.ProfileProjectsSection}>
              <div className="SectionTitle">Projects</div>
              <div className={styles.ProjectsContainer}>
                {dummyProjects.slice(0, 12).map((project) => (
                  <div key={project.id} className={styles.FollowProjectCard}>
                    <div className={styles.ProjectName}>{project.name}</div>
                    <div className={styles.ProjectDescription}>
                      {project.description}
                    </div>
                    <button className={styles.FollowButtonProjects}>
                      <span style={{ fontWeight: 700, fontSize: "18px" }}>
                        +
                      </span>{" "}
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              {dummyProjects.length > 12 && (
                <div className={styles.ShowMoreProjectsContainer}>
                  <div className={styles.ShowMoreProjectsLink}>
                    Show More <RightArrowIcon />
                  </div>
                </div>
              )}
            </section>

            {/* Activities */}
            <section className="">
              {/* <div className="SectionTitle">User Activity Feed</div> */}
              <div className={styles.ActivitiesHeader}>
                <div className="">User Activity Feed</div>
                <div className={styles.YearFilter}>
                  <Select
                    placeholder="2024"
                    options={yearOptions}
                    onChange={(selectedOption) => selectedYear(selectedOption)}
                  />
                </div>
              </div>
              <div className={styles.ActivitiesContainer}>
                {dummyActivities.slice(0, 2).map((activity) => (
                  <div key={activity.id} className={styles.ActivityMonth}>
                    <div className={styles.ActivityMonthTitle}>
                      {activity.month}
                    </div>
                    {activity.activities.map((act, index) => (
                      <div key={index} className={styles.ActivityItem}>
                        <div
                          className={styles.ActivityItemHeader}
                          onClick={() => toggleExpand(activity.id)}
                        >
                          <span className={styles.ActivityType}>
                            {act.type === `Updated` ? (
                              <UpdateIcon />
                            ) : (
                              <CreateIcon />
                            )}
                          </span>
                          <span className={styles.ActivityDescription}>
                            {act.description}
                          </span>
                          <span
                            className={`${styles.ActivityExpandIcon} ${
                              expanded[activity.id] ? `${styles.expanded}` : ""
                            }`}
                          >
                            &#9650;
                          </span>
                        </div>
                        {expanded[activity.id] && (
                          <div className={styles.ActivityDetails}>
                            {act.projects.map((project, index) => (
                              <div
                                key={index}
                                className={styles.ActivityProject}
                              >
                                <span className={styles.ActivityProjectName}>
                                  {project.name}
                                </span>
                                {project.apps > 0 && (
                                  <span className={styles.ProjectApps}>
                                    {project.apps}{" "}
                                    {project.apps > 1 ? "apps" : "app"}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <PrimaryButton className={styles.ShowMoreButton}>
                  Show More Activity
                </PrimaryButton>
              </div>
            </section>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};
export default UsersProfile;
