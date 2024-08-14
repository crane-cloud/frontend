import React from "react";
import styles from "./RecentActivityItem.module.css";
import NewProjectCard from "../NewProjectCard";
import tellAge from "../../helpers/ageUtility";
import NewAppCard from "../NewAppCard";
import NewUserCard from "../NewUserCard";

const RecentActivityItem = ({ item }) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.userAvatar}>{item?.user_name[0]}</div>
      <div className={styles.activityContent}>
        <div className={styles.userAction}>
          <strong>{item?.user_name}</strong> -{" "}
          {(item?.description).toLowerCase()}
        </div>
        <div className={styles.time}>{tellAge(item?.creation_date)}</div>
        <div className={styles.projectCard}>
          {item?.a_app_id != null ? (
            <NewAppCard
              name={item?.app?.name}
              url={item?.app?.url}
              image={item?.app?.image}
              port={item?.app?.port}
            />
          ) : item?.a_project_id != null ? (
            <NewProjectCard
              projectID={item?.project?.id}
              name={item?.project?.name}
              description={item?.project?.description}
              organization={item?.project?.organisation}
              type={item?.project?.project_type}
              showFollowers={false}
              projectFollowers={item?.project?.followers_count}
            />
          ) : item?.a_user_id != null ? (
            <NewUserCard userID={item?.a_user_id} showFollowBtn={false} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityItem;
