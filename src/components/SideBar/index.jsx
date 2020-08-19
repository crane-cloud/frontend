import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';
import { Link, matchPath } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import { ReactComponent as Settings } from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const { name, params, description, pageRoute } = props;
  const pageLocation = (matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps",
    exact: true,
    strict: true
  }));
  
  return (
    <div className="SideBar">
      <div>
        { pageLocation ? (
          <div className="SideBarTopSection">
          <Link to={{ pathname: `/users/${params.userID}/projects/` }}>
            <img src={BackButton} alt="Back Button" />
            <span>&nbsp; &nbsp; &nbsp;</span>
          </Link>
          <Link to={{ pathname: `/users/${params.userID}/projects/` }} className="ProjectName">{ name }</Link>
        </div>
        ): (
          <div className="SideBarTopSection">
            <Link to={{ pathname: `/users/${params.userID}/projects/${params.projectID}/apps` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link to={{ pathname: `/users/${params.userID}/projects/${params.projectID}/apps` }} className="ProjectName">{ name }</Link>
          </div>
        )}
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
          
          <Link to={{pathname: `/users/${params.userID}/projects/${params.projectID}/settings`,
            state: { name: name,
              projectID: params.projectID,
              userId: params.userID,
              description: description }}} >
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
  name: PropTypes.string.isRequired
};

export default SideBar;
