import React, { useCallback, useEffect, useState } from "react";
import styles from "./NewUserCard.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  handleDeleteRequest,
  handleGetRequest,
} from "../../apis/apis";
import Spinner from "../Spinner";
import axios from "../../axios";

const NewUserCard = ({ userID, showFollowBtn = true }) => {
  const [userDetails, setUserDetails] = useState({});
  const [sectionLoad, setSectionLoad] = useState(false);
  const [userFollowLoading, setUserFollowLoading] = useState(false);

  const getUserDetails = useCallback(() => {
    setSectionLoad(true);
    handleGetRequest(`/users/${userID}`)
      .then((response) => {
        setUserDetails(response.data.data.user);
        setSectionLoad(false);
      })
      .catch((error) => {
        setSectionLoad(false);
      });
  }, [userID]);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails, userFollowLoading]);

  const onFollowClick = async () => {
    setUserFollowLoading(true);
    if (userDetails?.requesting_user_follows) {
      handleDeleteRequest(`users/${userDetails?.id}/following`, {})
        .then(() => {
          setSectionLoad(true);
          setUserFollowLoading(false);
        })
        .catch((error) => {
          setUserFollowLoading(false);
        });
    } else {
      try {
        const response = await axios.post(`users/${userDetails?.id}/following`);
        if (response.status === 201) {
          setSectionLoad(true);
          setUserFollowLoading(false);
        }
      } catch (error) {
        console.error("Error following user:", error);
        setUserFollowLoading(false);
      }
    }
  };

  return (
    <>
      {sectionLoad ? (
        <div className={styles.noActivity}>
          <div className={styles.NoResourcesMessage}>
            <div className={styles.SpinnerWrapper}>
              <Spinner size="small" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.userCard}>
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <h3 className={styles.title}>
                <Link
                  to={{
                    pathname: `/profile/${userDetails?.id}`,
                  }}
                  className={styles.linkBlue}
                >
                  <strong>{userDetails?.name?.toLowerCase()}</strong>
                </Link>
              </h3>
            </div>
            {showFollowBtn && (
              <div className={styles.followButtonArea}>
                <button className={styles.followButton} onClick={onFollowClick}>
                  {userFollowLoading ? (
                    <Spinner />
                  ) : userDetails?.requesting_user_follows ? (
                    "Unfollow"
                  ) : (
                    "+ Follow"
                  )}
                </button>
              </div>
            )}
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardExtras}>
              <div className={styles.cardSummary}>
                <div className={styles.statItem}>
                  <span>
                    Organisation: {userDetails?.organisation ?? "Not Found"}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span>Joined {userDetails?.age}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewUserCard;
