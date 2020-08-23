import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';
import { Link, matchPath } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import { ReactComponent as Settings } from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const { name, params, pageRoute } = props;

  const isAppPage = (matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps/:appID/metrics",
    exact: true,
    strict: true
  }));

  const pageLocation = (matchPath(pageRoute, {
    path: "/users/:userID/projects/:projectID/apps",
    exact: true,
    strict: true
  }));
  
  const { userID, projectID, appID } = params;
  return (
    <div className="SideBar">
      <div>
        { isAppPage ? (
            <div className="SideBarTopSection">
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/metrics` }}>
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/metrics` }} className="ProjectName">{ name }</Link>
            </div>
          ): ( pageLocation ? (
                <div className="SideBarTopSection">
                  <Link to={{ pathname: `/users/${userID}/projects/` }}>
                    <img src={BackButton} alt="Back Button" />
                    <span>&nbsp; &nbsp; &nbsp;</span>
                  </Link>
                  <Link to={{ pathname: `/users/${userID}/projects/` }} className="ProjectName">{ name }</Link>
                </div>
              ): (
                  <div className="SideBarTopSection">
                    <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}>
                      <img src={BackButton} alt="Back Button" />
                      <span>&nbsp; &nbsp; &nbsp;</span>
                    </Link>
                    <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }} className="ProjectName">{ name }</Link>
                  </div>
                )
        )}
      </div>

      <div className="SideBarBottomSection">
        <div className="SideBarLinks">
          <Link to="#" className="ListItem">Metrics</Link>
          <div>
            <Link to="#" className="SubBarListItem">CPU</Link>
            <Link to="#" className="SubBarListItem">Memory</Link>
            <Link to="#" className="SubBarListItem">Storage</Link>
            <Link to="#" className="SubBarListItem">Network</Link>
          </div>
        </div>

        <div className="SideBarFooterSection">
          {isAppPage ? (
            <div>
              <Link to={{pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/settings`, name : name}} >
                <Settings className="ListItem" />
              </Link>
            </div>
          ): (
            <div>
              <Link to={{pathname: `/users/${userID}/projects/${projectID}/settings`}} >
                <Settings className="ListItem" />
              </Link>
            </div>
          )}
          
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
