import React from 'react';
import DotsImg from '../../assets/images/3dots.svg';
import './ProjectsCard.css';

const ProjectsCard = (props) => {
  const { name, description, icon } = props;
  return (
    <div className="ProjectsCard">
      <div className="CardImageDiv" style={{ backgroundImage: `url(${icon})` }} />
      <div className="BottomContainer">
        <div className="ProjectsCardName">{name}</div>
        <div className="ProjectsCardDesc">{description}</div>
        <div className="AppDropDown" onClick={() => this.toggleDropDown()}>
          <img src={DotsImg} alt="three dots" className="DropDownImg" />
          {openDropDown && (
            <div className="AppDropDownContent">
              <div onClick={() => this.showDeleteAlert()}>Delete</div>
              <div>Update</div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ProjectsCard;
