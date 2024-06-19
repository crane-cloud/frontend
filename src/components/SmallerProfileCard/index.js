import React from "react";
import Avatar from "../Avatar";
import moment from "moment";
import styles from "./SmallerProfileCard.module.css";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";

const ProfileCardSmall = ({ user, loading, error, onFollowClick, userFollowLoading }) => {

  return (
    <div className={styles.ProfileCard}>
      {loading ? (
        <div className="AdminNoResourcesMessage">
          <Spinner />
        </div>
      ) : null}
      {error ? (
        <div className="AdminNoResourcesMessage">
          No user information returned.
        </div>
      ) : null}
      {user && !loading && !error ? (
        <>
          <div className={styles.UserProfileInfoHeader}>
            <Avatar name={user.name} className={styles.UserAvatarLarge} />
            <div className={styles.Identity}>
              <div className={styles.IdentityName}>{user.name}</div>
              <div className={styles.IdentityEmail}>{user.email}</div>
              <div className={styles.Organization}>
                Organization: <span>{user.organisation || "Not Found"}</span>
              </div>
              <div className={styles.DateStyles}>
                Joined:
                <span className={styles.dateStyle}>
                  {moment(user.dateJoined).utc().format("ddd, MMMM DD, yyyy")}
                </span>
              </div>
              <div className={styles.AdminProfileRowInfo}>
                <div className={styles.AdminProfileRowItem}>
                  Following: {user.following_count}
                </div>

                <div className={styles.AdminProfileRowItem}>
                  Followers: {user.follower_count}
                </div>
              </div>
            </div>
          </div>

          <PrimaryButton className={styles.FollowButton} onClick={onFollowClick}>
            {userFollowLoading? <Spinner/> : user.requesting_user_follows ?  "Unfollow" : "+ Follow" }
          </PrimaryButton>
        </>
      ) : null}
    </div>
  );
};

export default ProfileCardSmall;
