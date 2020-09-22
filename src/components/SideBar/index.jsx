import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.css';
import { Link, matchPath } from 'react-router-dom';
import BackButton from '../../assets/images/backButton.svg';
import { ReactComponent as Settings } from '../../assets/images/settings.svg';


const SideBar = (props) => {
  const {
    name,
    params,
    pageRoute,
    cpuLink,
    memoryLink,
    storageLink,
    networkLink,
    allMetricsLink,
    appLogsLink
  } = props;

  const isAppPage = (matchPath(pageRoute, {
    path: '/users/:userID/projects/:projectID/apps/:appID/metrics',
    exact: true,
    strict: true
  }));

  const pageLocation = (matchPath(pageRoute, {
    path: '/users/:userID/projects/:projectID/apps',
    exact: true,
    strict: true
  }));

  const { userID, projectID, appID } = params;

  return (
    <div className="SideBar">
      <div>
      { isAppPage ? (
            <div className="SideBarTopSection">
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }}>
                <img src={BackButton} alt="Back Button" />
                <span>&nbsp; &nbsp; &nbsp;</span>
              </Link>
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }} className="ProjectName">{ name }</Link>
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
        <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps` }} className="ListItem">Apps</Link>
          <Link to={allMetricsLink} className="ListItem">Metrics</Link>
          <div>
            <Link to={cpuLink} className="SubBarListItem">CPU</Link>
            <Link to={memoryLink} className="SubBarListItem">Memory</Link>
            <Link to={storageLink} className="SubBarListItem">Storage</Link>
            <Link to={networkLink} className="SubBarListItem">Network</Link>
            {isAppPage && (
              <Link to={appLogsLink} className="SubBarListItem">Logs</Link>
            )}
          </div>
        </div>

        <div className="SideBarFooterSection">
          {isAppPage ? (
            <div>
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/apps/${appID}/settings`, name }}>
                <Settings className="ListItem" />
              </Link>
            </div>
          ) : (
            <div>
              <Link to={{ pathname: `/users/${userID}/projects/${projectID}/settings` }}>
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

SideBar.defaultProps = {
  appLogsLink: ''
};

SideBar.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  pageRoute: PropTypes.string.isRequired,
  cpuLink: PropTypes.string.isRequired,
  memoryLink: PropTypes.string.isRequired,
  storageLink: PropTypes.string.isRequired,
  networkLink: PropTypes.string.isRequired,
  allMetricsLink: PropTypes.string.isRequired,
  appLogsLink: PropTypes.string
};

export default SideBar;
