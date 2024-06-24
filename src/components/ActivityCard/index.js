import React from 'react';
import  './activityCard.css';

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card">
      <div className="card-header">
        <img src={activity.avatarUrl} alt="User avatar" width='50px'/>
        <div className="user-info">
          <h3>{activity.userName}</h3>
          <p>{activity.action}</p> 
          <p> - {activity.timestamp}</p> 
        </div>
      </div>
      <div className="card-body">
        {activity.projectName && (
          <div className="project-info">
            <h4>{activity.projectName}</h4>
            <p>{activity.projectDescription}</p>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
