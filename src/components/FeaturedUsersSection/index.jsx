import React, { useState } from "react";
import styles from "./FeaturedUsersSection.module.css";
import NewUserCard from "../NewUserCard";
import Spinner from "../Spinner";
import { useSuggestedUsers } from "../../hooks/useSuggestedUsers";

const FeaturedUsersSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: suggestedUsers, isFetching } = useSuggestedUsers(currentPage);

 
  const handleRefresh = () => {
    setCurrentPage((prevPage) => {
      const totalPages = suggestedUsers?.data?.data?.users.pagination?.pages || 1;
      return prevPage < totalPages ? prevPage + 1 : 1;
    });
  };

  return (
    <div className={styles.featuredUsers}>
      <div className={styles.titleRow}>
        <h2>Suggested Users</h2>
        <button className={styles.followButton} onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      {isFetching? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {suggestedUsers?.data?.data?.users.map((user, index) => (
            <NewUserCard key={index} userID={user?.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedUsersSection;
