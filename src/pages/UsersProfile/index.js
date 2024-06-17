import React, { useState } from "react";

import Avatar from "../../components/Avatar";
import Header from "../../components/Header";

import InformationBar from "../../components/InformationBar";

import AppFooter from "../../components/appFooter";
import styles from "./UserProfile.module.css";
import moment from "moment";
import PrimaryButton from "../../components/PrimaryButton";
import ProfileAnalytics from "../../components/ProfileAnalyticsCard";
import { getYearOptions } from "../../helpers/dateConstants";
import TabItem from "../../components/TabItem";
import UserFeedActivities from "../../components/UserProfileActivitiesComponent";
import UserFeedProjects from "../../components/UserProfileProjectsComponent";
import ProfileCardSmall from "../../components/SmallerProfileCard";

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
const user = {
  name: "Khalifan Muwonge",
  isBetaUser: true,
  email: "khalifanmuwonge@gmail.com",
  organization: "Makerere",
  dateJoined: "2020-12-04",
  following: 1,
  followers: 7,
  projects: 38,
};
const user2 = {
  name: 'Khalifan Muwonge',
  email: 'khalifanmuwonge@gmail.com',
  organization: 'Makerere',
  dateJoined: '12/04/2020',
  apps: 10,
  projects: 15,
  databases: 5,
  followingProjects: 7,
  followers: 12,
  isBeta: true,
};
const tabNames = ["Overview", "Projects", "Activities"];
const UsersProfile = () => {
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("Overview");

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

          <div className="SmallContainer">
            <section className={styles.TabOptionLayout}>
              <div className={styles.TopProfileCardContainer}>
                <ProfileCardSmall user={user} />
              </div>
              <div className={styles.OverviewContainer}>
                
                  <div className={styles.tabsContainer}>
                    {tabNames.map((tabName) => (
                      <TabItem
                        key={tabName}
                        tabName={tabName}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />
                    ))}
                  </div>
                
                {activeTab === "Overview" && (
                  <>
                    <section className="">
                      {/* 
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
                                  <div className={styles.BetaUserDiv}>
                                    Beta User
                                  </div>
                                </div>
                                <div className={styles.IdentityEmail}>
                                  {"khalifanmuwonge@gmail.com"}
                                </div>
                                <div className="AdminProfileRowItem">
                                  Organization:
                                  <span>Makerere</span>
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
                      </div> */}
                      <div className="SectionTitle">Analytics</div>
                      <ProfileAnalytics user={user2}/>
                    </section>
                    <UserFeedProjects projects={dummyProjects} />
                    <UserFeedActivities
                      activities={dummyActivities}
                      yearOptions={yearOptions}
                      selectedYear={(selectedOption) => selectedOption}
                      expanded={expanded}
                      toggleExpand={toggleExpand}
                    />
                  </>
                )}
                {activeTab === "Projects" && (
                  <>
                    <div className={styles.TopProjectsContainer}>
                      <UserFeedProjects projects={dummyProjects} />
                    </div>
                  </>
                )}
                {activeTab === "Activities" && (
                  <>
                    <div className={styles.TopProjectsContainer}>
                      <UserFeedActivities
                        activities={dummyActivities}
                        yearOptions={yearOptions}
                        selectedYear={(selectedOption) => selectedOption}
                        expanded={expanded}
                        toggleExpand={toggleExpand}
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
          <AppFooter/>
        </div>
      </div>
    </div>
  );
};
export default UsersProfile;
