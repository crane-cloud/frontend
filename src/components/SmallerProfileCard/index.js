import React from 'react';
import Avatar from '../Avatar';
import moment from 'moment'; 
import styles from './SmallerProfileCard.module.css' 
import PrimaryButton from '../PrimaryButton';

const ProfileCardSmall = ({ user }) => {
  return (
    <div className={styles.ProfileCard}>
      <div className={styles.UserProfileInfoHeader}>
        <Avatar
          name={user.name}
          className={styles.UserAvatarLarge}
        />
        <div className={styles.Identity}>
          <div className={styles.IdentityName}>
            {user.name}
          </div>
          <div className={styles.IdentityEmail}>{user.email}</div>
          <div className={styles.Organization}>
           Organization: <span>{user.organization || "Not Found"}</span>
          </div>
          <div className={styles.DateStyles}>
        Joined:
        <span className={styles.dateStyle}>
          {moment(user.dateJoined).utc().format("ddd, MMMM DD, yyyy")}
        </span>
      </div>
      <div className={styles.AdminProfileRowInfo}>
        <div className={styles.AdminProfileRowItem}>
          Following: {user.following}
        </div>
        
        <div className={styles.AdminProfileRowItem}>
          Followers: {user.followers}
        </div>
      </div>
        </div>
        
      </div>
      
      <PrimaryButton
          className={styles.FollowButton}
          onClick={() => {}}
        >
          + Follow
      </PrimaryButton>
    </div>
  );
};

export default ProfileCardSmall;
