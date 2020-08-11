import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';
import { Link } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import { ReactComponent as Settings } from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const { projectName, userId } = props;

  return (
    <div className="SideBar">
      <div className="SideBarTopSection">
        <Link to={{ pathname: `/users/${userId}/projects/` }}>
          <img src={BackButton} alt="Back Button" />
          <span>&nbsp; &nbsp; &nbsp;</span>
        </Link>
        <Link to={{ pathname: `/users/${userId}/projects/` }} className="ProjectName">{ projectName }</Link>
      </div>

      <div className="SideBarBottomSection">
        <div className="SideBarLinks">
          <Link to="#" className="ListItem">Metrics</Link>
          <div>
            <Link to="#" className="SubBarListItem">All</Link>
            <Link to="#" className="SubBarListItem">CPU</Link>
            <Link to="#" className="SubBarListItem">Memory</Link>
            <Link to="#" className="SubBarListItem">Storage</Link>
            <Link to="#" className="SubBarListItem">Network</Link>
          </div>
        </div>

        <div className="SideBarFooterSection">
          
          <Link to={{pathname: `users/${userId}/projects/${projectID}/settings`}} className="">
            <Settings className="ListItem" />
          </Link>
          <div className="SideFooter StickBottom">
            Copyright © 2020 Crane Cloud.
            <br />
            {' '}
            All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  projectName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default SideBar;
