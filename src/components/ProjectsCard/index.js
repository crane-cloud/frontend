import React from 'react';

import './ProjectsCard.css';

const ProjectsCard = (props) => {
  const { name, description, icon } = props;
  return (
    <div className="ProjectsCard">
      <div className="CardImageDiv" style={{ backgroundImage: `url(${icon})` }} />
      <div className="BottomContainer">
        <div className="ProjectsCardName">{name}</div>
        <div className="ProjectsCardDesc">{description}</div>
      </div>
    </div>

  );
};

export default ProjectsCard;
