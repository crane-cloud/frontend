import React, { useState, useEffect, useCallback } from "react";

import Header from "../../components/Header";

import InformationBar from "../../components/InformationBar";

import AppFooter from "../../components/appFooter";
import styles from "./UserProfile.module.css";

import { handleGetRequest, handlePostRequestWithOutDataObject, handleDeleteRequest } from "../../apis/apis";
import ProfileAnalytics from "../../components/ProfileAnalyticsCard";
import { getYearOptions } from "../../helpers/dateConstants";
import TabItem from "../../components/TabItem";
import UserFeedActivities from "../../components/UserProfileActivitiesComponent";
import UserFeedProjects from "../../components/UserProfileProjectsComponent";
import ProfileCardSmall from "../../components/SmallerProfileCard";

import { useParams } from "react-router-dom";


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

const user2 = {
  name: "Khalifan Muwonge",
  email: "khalifanmuwonge@gmail.com",
  organization: "Makerere",
  dateJoined: "12/04/2020",
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
  //users
  const [userDetails, setUserDetails] = useState({});
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [loadingUserError, setLoadingUserError] = useState(false);
  const [userFollowLoading, setUserFollowLoading] = useState(false);
  //projects
  const [userProjects, setUserProjects] = useState({});
  const [loadingUserProjects, setLoadingUserProjects] = useState(false);
  const [loadingUserProjectsError, setUserProjectsError] = useState(false);
  const [projectFollowLoading, setProjectFollowLoading] = useState('');

  const { userID } = useParams();

  const getUserDetails = () => {
    handleGetRequest(`/users/${userID}`)
      .then((response) => {
        setUserDetails(response.data.data.user);
        setLoadingUserDetails(false);
      })
      .catch((error) => {
        setLoadingUserError("Failed to fetch user details");
        setLoadingUserDetails(false);
      });
  };

  const getUserProjects = useCallback(async () => {
    setLoadingUserProjects(true);
    handleGetRequest(`users/${userID}/projects`)
      .then((response) => {
        setUserProjects(response.data.data.projects);
        setLoadingUserProjects(false);
      })
      .catch(() => {
        setUserProjectsError("Failed to userprojects, please try again");
        setLoadingUserProjects(false);
      })
     
  }, [setLoadingUserProjects,setUserProjects, setUserProjectsError]);

  useEffect(() => {
    getUserDetails();
    getUserProjects()
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedYear = (year) => {
    return;
  };

  const onFollowClick = () => {
    setUserFollowLoading(true);
    if(userDetails.requesting_user_follows){
      handleDeleteRequest(`users/${userID}/following`,{})
      .then(() => {
        window.location.href = `/profile/${userID}`;
      })
      .catch((error) => {
         setUserFollowLoading(false);
      });
    }else{
      handlePostRequestWithOutDataObject({}, `users/${userID}/following`)
      .then(() => {
        window.location.href = `/profile/${userID}`;
      })
      .catch((error) => {
        setUserFollowLoading(false);
      });
    }
  };

  const onProjectFollowClick =  async (projectID) => {
    setProjectFollowLoading(projectID)
    const project = await userProjects.find((project)=> project.id === projectID)
    if(project.is_follower){
      handleDeleteRequest(`projects/${projectID}/following`,{})
      .then(() => {
        window.location.href = `/profile/${userID}`;
      })
      .catch((error) => {
        setProjectFollowLoading('');
      });
    }else{
      handlePostRequestWithOutDataObject({}, `projects/${projectID}/following`)
      .then(() => {
        window.location.href = `/profile/${userID}`;
      })
      .catch((error) => {
        setProjectFollowLoading('');
      });
    }
   
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
              header={userDetails.name}
              showBtn={false}
              showBackBtn
            />
          </div>

          <div className="SmallContainer">
            <section className={styles.TabOptionLayout}>
              <div className={styles.TopProfileCardContainer}>
                <ProfileCardSmall
                  user={userDetails}
                  loading={loadingUserDetails}
                  error={loadingUserError}
                  onFollowClick={onFollowClick}
                  userFollowLoading={userFollowLoading}
                />
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
                      <div className="SectionTitle">Analytics</div>
                      <ProfileAnalytics user={user2} />
                    </section>
                    <UserFeedProjects projects={userProjects} loading={loadingUserProjects} error={loadingUserProjectsError} onProjectFollowClick={onProjectFollowClick} projectFollowLoading={projectFollowLoading}/>
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
                      <UserFeedProjects projects={userProjects} loading={loadingUserProjects} error={loadingUserProjectsError} onProjectFollowClick={onProjectFollowClick}  projectFollowLoading={projectFollowLoading} />
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
          <AppFooter />
        </div>
      </div>
    </div>
  );
};
export default UsersProfile;
