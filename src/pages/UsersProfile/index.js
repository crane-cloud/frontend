import React, { useState, useEffect, useCallback } from "react";

import Header from "../../components/Header";

import InformationBar from "../../components/InformationBar";

import AppFooter from "../../components/appFooter";
import styles from "./UserProfile.module.css";

import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
  handleDeleteRequest,
} from "../../apis/apis";
import ProfileAnalytics from "../../components/ProfileAnalyticsCard";
// import { getYearOptions } from "../../helpers/dateConstants";
import TabItem from "../../components/TabItem";
import UserFeedActivities from "../../components/UserProfileActivitiesComponent";
import UserFeedProjects from "../../components/UserProfileProjectsComponent";
import ProfileCardSmall from "../../components/SmallerProfileCard";
import getUserRecentActivities from "../../redux/actions/getUserRecentActivity";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

import { useParams } from "react-router-dom";

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
  const [projectFollowLoading, setProjectFollowLoading] = useState("");

  //formatted activity data
  const [userActivities, setUserActivities] = useState([]);
  const dispatch = useDispatch();

  const { userID } = useParams();

  const userRecentActivities = useCallback(
    (pageSize=10) => dispatch(getUserRecentActivities(userID, 1, pageSize)),
    [dispatch, userID]
  );
  
  useEffect(() => {
    userRecentActivities();
  }, [userRecentActivities, userID]);

  const getUserDetails = () => {
    setLoadingUserDetails(true);
    handleGetRequest(`/users/${userID}`).then((response) => {
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
      });
  }, [setLoadingUserProjects, setUserProjects, setUserProjectsError]);

  useEffect(() => {
    getUserDetails();
    getUserProjects();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // const selectedYear = (year) => {
  //   return;
  // };

  const onFollowClick = () => {
    setUserFollowLoading(true);
    if (userDetails.requesting_user_follows) {
      handleDeleteRequest(`users/${userID}/following`, {})
        .then(() => {
          window.location.href = `/profile/${userID}`;
        })
        .catch((error) => {
          setUserFollowLoading(false);
        });
    } else {
      handlePostRequestWithOutDataObject({}, `users/${userID}/following`)
        .then(() => {
          window.location.href = `/profile/${userID}`;
        })
        .catch((error) => {
          setUserFollowLoading(false);
        });
    }
  };

  const onProjectFollowClick = async (projectID) => {
    setProjectFollowLoading(projectID);
    const project = await userProjects.find(
      (project) => project.id === projectID
    );
    if (project.is_following) {
      handleDeleteRequest(`projects/${projectID}/following`, {})
        .then(() => {
          window.location.href = `/profile/${userID}`;
        })
        .catch((error) => {
          setProjectFollowLoading("");
        });
    } else {
      handlePostRequestWithOutDataObject({}, `projects/${projectID}/following`)
        .then(() => {
          window.location.href = `/profile/${userID}`;
        })
        .catch((error) => {
          setProjectFollowLoading("");
        });
    }
  };

  const {
    recentActivities,
    pagination,
    isFetchingRecentActivities,
    recentActivitiesFetched,
  } = useSelector((state) => state.userRecentActivitiesReducer);

  const noRecentActivity =
    recentActivities?.length === 0 && recentActivitiesFetched;

    const formatData = (data) => {
      const activitiesByMonth = {};
    
      data.forEach((item) => {
        const date = new Date(item.creation_date);
        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
    
        if (!activitiesByMonth[monthYear]) {
          activitiesByMonth[monthYear] = [];
        }
    
        const activity = {
          type: item.operation,
          description: item.description,
          projects: item?.project
            ? [
                {
                  id: item.project.id,
                  name: item.project.name,
                  apps: item.a_app_id ? 1 : 0,
                },
              ]
            : [],
          users: item?.a_user
            ? [
                {
                  id: item.a_user.id,
                  name: item.a_user.name,
                  email: item.a_user.email,
                },
              ]
            : [],
          apps: item?.app
            ? [
                {
                  id: item.app.id,
                  name: item.app.name,
                  url: item.app.url,
                },
              ]
            : [],
        };
    
        activitiesByMonth[monthYear].push(activity);
      });
    
      return Object.entries(activitiesByMonth).map(
        ([month, activities], index) => ({
          id: index + 1,
          month,
          activities,
        })
      );
    };
    

  useEffect(() => {
    setUserActivities(formatData(recentActivities));
  }, [recentActivities]);

  const fetchMoreActivities = () => {
    const nextPerPage = pagination.per_page * 2;
    userRecentActivities(nextPerPage);
  };

  // const yearOptions = getYearOptions();
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
                      {loadingUserDetails ? (
                        <div className={styles.NoResourcesMessage}>
                          <Spinner />
                        </div>
                      ) : userDetails && (
                        <ProfileAnalytics user={userDetails} />
                      )}
                      {loadingUserError && 
                        <div className={styles.NoResourcesMessage}>
                        Failed to fetch user data
                      </div>
                      }
                    </section>
                    <UserFeedProjects
                      projects={userProjects}
                      loading={loadingUserProjects}
                      error={loadingUserProjectsError}
                      onProjectFollowClick={onProjectFollowClick}
                      projectFollowLoading={projectFollowLoading}
                    />
                    <>
                      <div className={styles.TopProjectsContainer}>
                        {isFetchingRecentActivities ? (
                          <div className={styles.NoResourcesMessage}>
                            <Spinner />
                          </div>
                        ) : userActivities.length > 0  && (
                          <UserFeedActivities
                            activities={userActivities}
                            // yearOptions={yearOptions}
                            // selectedYear={(selectedOption) => selectedOption}
                            expanded={expanded}
                            toggleExpand={toggleExpand}
                            pagination={pagination}
                            fetchMoreActivities={fetchMoreActivities}
                          />
                        )}
                        {noRecentActivity && (
                        <div >
                          No recent activities for this user
                        </div>
                      )}
                      </div>
                    </>
                  </>
                )}
                {activeTab === "Projects" && (
                  <>
                    <div className={styles.TopProjectsContainer}>
                      <UserFeedProjects
                        projects={userProjects}
                        loading={loadingUserProjects}
                        error={loadingUserProjectsError}
                        onProjectFollowClick={onProjectFollowClick}
                        projectFollowLoading={projectFollowLoading}
                      />
                    </div>
                  </>
                )}
                {activeTab === "Activities" && (
                  <>
                    <div className={styles.TopProjectsContainer}>
                      {isFetchingRecentActivities ? (
                        <div className={styles.NoResourcesMessage}>
                          <Spinner />
                        </div>
                      ) : userActivities.length > 0  &&  (
                        <UserFeedActivities
                          activities={userActivities}
                          // yearOptions={yearOptions}
                          // selectedYear={(selectedOption) => selectedOption}
                          expanded={expanded}
                          pagination={pagination}
                          fetchMoreActivities={fetchMoreActivities}
                          toggleExpand={toggleExpand}
                        />
                      )}
                      {noRecentActivity && (
                        <div >
                          No recent activities for this user
                        </div>
                      )}
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
