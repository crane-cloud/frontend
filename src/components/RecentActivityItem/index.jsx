import React from "react";
import styles from "./RecentActivityItem.module.css";
import { useUserDetails } from "../../hooks/useUserDetails";
import { formatDistanceToNow } from "date-fns";
import {
  FiDatabase,
  FiTrash2,
  FiPlus,
  FiUser,
  FiCornerDownRight,
  FiCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RecentActivityItem = ({ item }) => {
  const { data, isLoading } = useUserDetails(item?.user_id);

  const getInitial = () => {
    if (isLoading) return "...";
    if (data?.data?.data?.user?.name) {
      return data.data.data.user.name.charAt(0).toUpperCase();
    }
    if (item.user_name) {
      return item.user_name.charAt(0).toUpperCase();
    }
    return "U";
  };

  const formattedTime = formatDistanceToNow(new Date(item.creation_date), {
    addSuffix: true,
  });

  const getOperationIcon = () => {
    const operation = item.operation;
    const model = item.model;

    if (operation.includes("DELETE"))
      return <FiTrash2 className={styles.operationIcon} />;
    if (operation === "Create")
      return <FiPlus className={styles.operationIcon} />;
    if (operation === "Follow")
      return <FiUser className={styles.operationIcon} />;
    if (operation.includes("ENABLE"))
      return <FiCheck className={styles.operationIcon} />;

    if (model === "Database")
      return <FiDatabase className={styles.operationIcon} />;

    return null;
  };

  const getStatusBadge = () => {
    if (item.status === "Success") {
      return (
        <span className={`${styles.statusBadge} ${styles.successBadge}`}>
          Success
        </span>
      );
    }
    return null;
  };

  // Scenarios to show the "View" button
  const showViewProject =
    (item.operation === "Create" && item.model === "Project") ||
    (item.operation === "Follow" && item.model === "Project");
  const showViewDatabase =
    item.operation === "Create" && item.model === "Database";
  const showViewProfile = item.operation === "Follow" && item.model === "User";

  console.log("item", item);

  return (
    <div className={styles.activityItem}>
      <div className={styles.activityAvatar}>
        <div className={styles.avatarCircle}>{getInitial()}</div>
      </div>

      <div className={styles.activityContent}>
        <div className={styles.activityHeader}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {isLoading
                ? "Loading..."
                : data?.data?.data?.user?.name ||
                  item.user_name ||
                  "Anonymous User"}
            </span>
            <div className={styles.operationBadge}>
              {getOperationIcon()}
              <span>{item.operation.toLowerCase()}</span>
            </div>
          </div>
          <span className={styles.activityTime}>{formattedTime}</span>
        </div>

        <div className={styles.activityDescription}>
          {item.description}
          {getStatusBadge()}
        </div>

        {showViewProject && (
          <>
            <Link to={`/projects/${item?.a_project_id}/dashboard`}>
              <button className={styles.viewProjectButton}>
                <FiCornerDownRight /> View Project
              </button>
            </Link>
          </>
        )}

        {showViewDatabase && (
          <button className={styles.viewProjectButton}>
            <FiCornerDownRight /> View Database
          </button>
        )}

        {showViewProfile && (
          <>
            <Link to={`/profile/${item?.a_user_id}`}>
              <button className={styles.viewProjectButton}>
                <FiCornerDownRight /> View Profile
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentActivityItem;
