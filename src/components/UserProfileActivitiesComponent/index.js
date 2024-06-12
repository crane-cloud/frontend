// Activities.jsx
import React from 'react';
import Select from '../Select';
import { ReactComponent as UpdateIcon } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as CreateIcon } from "../../assets/images/check-circle.svg";
import styles from "../../pages/UsersProfile/UserProfile.module.css";
import PrimaryButton from "../../components/PrimaryButton";

const UserFeedActivities = ({ activities, yearOptions, selectedYear, expanded, toggleExpand }) => {
  return (
    <section className="">
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
        {activities.slice(0, 2).map((activity) => (
          <div key={activity.id} className={styles.ActivityMonth}>
            <div className={styles.ActivityMonthTitle}>{activity.month}</div>
            {activity.activities.map((act, index) => (
              <div key={index} className={styles.ActivityItem}>
                <div
                  className={styles.ActivityItemHeader}
                  onClick={() => toggleExpand(activity.id)}
                >
                  <span className={styles.ActivityType}>
                    {act.type === `Updated` ? <UpdateIcon /> : <CreateIcon />}
                  </span>
                  <span className={styles.ActivityDescription}>
                    {act.description}
                  </span>
                  <span
                    className={`${styles.ActivityExpandIcon} ${
                      expanded[activity.id] ? `${styles.expanded}` : ''
                    }`}
                  >
                    &#9650;
                  </span>
                </div>
                {expanded[activity.id] && (
                  <div className={styles.ActivityDetails}>
                    {act.projects.map((project, index) => (
                      <div key={index} className={styles.ActivityProject}>
                        <span className={styles.ActivityProjectName}>
                          {project.name}
                        </span>
                        {project.apps > 0 && (
                          <span className={styles.ProjectApps}>
                            {project.apps} {project.apps > 1 ? 'apps' : 'app'}
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
  );
};

export default UserFeedActivities;
