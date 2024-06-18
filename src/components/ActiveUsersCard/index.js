import React from 'react';
import  styles from './activeUser.module.css';

const ActiveUserCard = ({ mostActiveUser }) => {
  return (
    <div className={`${styles.activeUserCard}`}>
        <div className={`${styles.cardHeader}`}>
            <img src={mostActiveUser.avatarUrl} alt="User avatar" width='50px'/>
            <h3>{mostActiveUser.userName}</h3> &nbsp;&nbsp;&nbsp;&nbsp;
            <button btntype="new" class="Primary-Btn undefined false SmallBtn undefined undefined undefined">+ Follow</button>
        </div>
        <div className={`${styles.user_info}`}>
          <p>Followers: <b>{mostActiveUser.followers}</b> </p> 
          <p>Projects : <b>{mostActiveUser.projects} </b>| Apps : <b>{mostActiveUser.apps}</b></p>
        </div>
      </div>
  );
};

export default ActiveUserCard;
