import React, { useEffect } from "react";
import styles from "./FeaturedUsersSection.module.css";
import NewUserCard from "../NewUserCard";
import { useDispatch, useSelector } from "react-redux";
import getUsersList from "../../redux/actions/users";
import Spinner from "../Spinner";

const FeaturedUsersSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList(null, null, 1, null));
  }, [dispatch]);

  const { isFetching, users, isFetched } = useSelector(
    (state) => state.usersListReducer
  );

  return (
    <div className={styles.featuredUsers}>
      <h2>Suggested Users</h2>

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
          {users?.slice(0, 7).map((user, index) => (
            <NewUserCard key={index} userID={user?.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedUsersSection;
