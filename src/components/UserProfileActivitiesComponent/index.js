import React from "react";
// import Select from "../Select";
import { ReactComponent as UpdateIcon } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as CreateIcon } from "../../assets/images/check-circle.svg";
import styles from "../../pages/UsersProfile/UserProfile.module.css";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserFeedActivities = ({
  activities,
  // yearOptions,
  // selectedYear,
  expanded,
  toggleExpand,
  pagination,
  fetchMoreActivities,
}) => {
  if (!activities) {
    return null;
  }
  const showMore = pagination.page < pagination.pages;

  return (
    <section className="">
      <div className={styles.ActivitiesHeader}>
        <div className="">User Activity Feed</div>
        <div className={styles.YearFilter}>
          {/* <Select
            placeholder="2024"
            options={yearOptions}
            onChange={(selectedOption) => selectedYear(selectedOption)}
          /> */}
        </div>
      </div>
      <div className={styles.ActivitiesContainer}>
        {activities &&
          activities.map((activity) => (
            <div key={activity.id} className={styles.ActivityMonth}>
              <div
                className={styles.ActivityMonthTitle}
                onClick={() => toggleExpand(activity.id)}
              >
                <div>{activity.month}</div>
                <div
                  className={`${styles.ActivityExpandIcon} ${
                    expanded[activity.id] ? `${styles.expanded}` : ""
                  }`}
                >
                  &#9650;
                </div>
              </div>

              {activity.activities.map((act, index) => (
                <div key={index} className={styles.ActivityItem}>
                  <div
                    className={styles.ActivityItemHeader}
                    onClick={() => toggleExpand(activity.id)}
                  >
                    <span className={styles.ActivityType}>
                      {act.type === "Updated" ? <UpdateIcon /> : <CreateIcon />}
                    </span>
                    <span className={styles.ActivityDescription}>
                      {act.description}
                    </span>
                  </div>
                  {expanded[activity.id] && (
                    <div className={styles.ActivityDetails}>
                      {act.apps.length > 0 && (
                        <div className={styles.ActivitySection}>
                          {act.apps.map((app, index) => (
                             <div key={index} className={styles.ActivityProject}>
                              <span>App:</span>
                            <a
                             href={app.url}
                             target="blank"
                            className={styles.ActivityProjectName}
                          >
                            {app.name}
                          </a>
                          </div>
                          ))}
                        </div>
                      )}
                      {act.projects.length > 0 && (
                        <div className={styles.ActivitySection}>
                          {act.projects.map((project, index) => (
                            <div key={index} className={styles.ActivityProject}>
                               <span>Project:</span>
                              <Link
                                to={{
                                  pathname: `/projects/${project?.id}/dashboard`,
                                  name: project.name,
                                }}
                                className={styles.ActivityProjectName}
                              >
                                {project.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                      {act.users.length > 0 && (
                        <div className={styles.ActivitySection}>
                          {act.users.map((user, index) => (
                            <div key={index} className={styles.ActivityUser}>
                              <span>User:</span>
                              <Link
                                to={{
                                  pathname: `/profile/${user?.id}`
                                }}
                                className={styles.ActivityProjectName}
                              >
                                {user.name} ({user.email})
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        {showMore && (
          <PrimaryButton
            className={styles.ShowMoreButton}
            onClick={fetchMoreActivities}
          >
            Show More Activity
          </PrimaryButton>
        )}
      </div>
    </section>
  );
};

export default UserFeedActivities;
