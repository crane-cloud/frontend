import React, { useEffect, useState } from "react";
import styles from "./FeaturedUsersSection.module.css";
import NewUserCard from "../NewUserCard";
import { useDispatch, useSelector } from "react-redux";
import getUsersList from "../../redux/actions/users";
import Spinner from "../Spinner";

const FeaturedUsersSection = () => {
  const dispatch = useDispatch();

  const { isFetching, users, isFetched, pagination } = useSelector(
    (state) => state.usersListReducer
  );

  const [currentPage, setCurrentPage] = useState(
    Math.floor(Math.random() * pagination?.pages) + 1
  );

  useEffect(() => {
    dispatch(getUsersList(null, null, currentPage, null));
  }, [dispatch, currentPage]);

  const handleRefresh = () => {
    setCurrentPage((prevPage) => {
      const totalPages = pagination?.pages;
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

      {isFetching && !isFetched ? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="big" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {users?.map((user, index) => (
            <NewUserCard key={index} userID={user?.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedUsersSection;
