import React from "react";
import PropTypes from "prop-types";
import styles from "./SideBar.module.css";
import { Link, NavLink, matchPath } from "react-router-dom";
import BackButton from "../../assets/images/backButton.svg";

const SideBar = ({
  name,
  params,
  pageRoute,
  cpuLink,
  memoryLink,
  databaseLink,
  networkLink,
  allMetricsLink,
  appLogsLink,
}) => {
  const isAppPage = matchPath(pageRoute, {
    path: "/projects/:projectID/apps/:appID",
    // exact: true,
    strict: true,
  });

  const isAppMetricsPage = matchPath(pageRoute, {
    path: "/projects/:projectID/apps/:appID/",
    exact: false,
    strict: true,
  });

  // const pageLocation = matchPath(pageRoute, {
  //   path: "/projects/:projectID/apps",
  //   exact: true,
  //   strict: true,
  // });

  // const databaseLocation = matchPath(pageRoute, {
  //   path: "/projects/:projectID/databases/:databaseID/settings",
  //   exact: true,
  //   strict: true,
  // });

  const { projectID, appID } = params;

  return (
    <div className={styles.SideBar}>
      <div>
        {/* {databaseLocation ? (
          <div className={styles.SideBarTopSection}>
            <Link
              to={{
                pathname: `/projects/${projectID}/databases`,
              }}
            >
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{
                pathname: `/projects/${projectID}/databases`,
              }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        ) : isAppPage ? (
          <div className={styles.SideBarTopSection}>
            <Link to={{ pathname: `/projects/${projectID}/apps` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{
                pathname: `/projects/${projectID}/apps/${appId}/dashboard`,
              }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        ) : isAppMetricsPage ? (
          <div className={styles.SideBarTopSection}>
            <Link
              to={{
                pathname: `/projects/${projectID}/apps/${appId}/dashboard`,
              }}
            >
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{
                pathname: `/projects/${projectID}/apps/${appId}/dashboard`,
              }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        ) : pageLocation ? (
          <div className={styles.SideBarTopSection}>
            <Link to={{ pathname: `/projects/` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{ pathname: `/projects/${projectID}/apps` }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        ) : (
          <div className={styles.SideBarTopSection}>
            <Link to={{ pathname: `/projects/${projectID}/apps` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{ pathname: `/projects/${projectID}/apps` }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        )} */}
        {isAppPage ? (
          <div className={styles.SideBarTopSection}>
            <Link to={{ pathname: `/projects/${projectID}/dashboard` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{
                pathname: `/projects/${projectID}/apps/${appID}/dashboard`,
              }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        ) : (
          <div className={styles.SideBarTopSection}>
            <Link to={{ pathname: `/projects` }}>
              <img src={BackButton} alt="Back Button" />
              <span>&nbsp; &nbsp; &nbsp;</span>
            </Link>
            <Link
              to={{ pathname: `/projects/${projectID}/dashboard` }}
              className={styles.ProjectName}
            >
              {name}
            </Link>
          </div>
        )}
      </div>

      <div className={styles.SideBarBottomSection}>
        <div className={styles.SideBarLinks}>
          {isAppPage ? (
            <NavLink
              to={{
                pathname: `/projects/${projectID}/apps/${appID}/dashboard`,
              }}
              className={styles.SubBarListItem}
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to={{ pathname: `/projects/${projectID}/dashboard` }}
              className={styles.SubBarListItem}
            >
              Dashboard
            </NavLink>
          )}
          <Link to="#" className={`${styles.ListItem} ${styles.DisabledLink}`}>
            SERVICES
          </Link>
          <div>
            {!isAppPage && (
              <NavLink
                to={{ pathname: `/projects/${projectID}/apps` }}
                className={styles.SubBarListItem}
              >
                Apps
              </NavLink>
            )}

            <NavLink to={databaseLink} className={styles.SubBarListItem}>
              Databases
            </NavLink>
          </div>
          <Link to="#" className={`${styles.ListItem} ${styles.DisabledLink}`}>
            METRICS
          </Link>
          <div>
            <NavLink to={cpuLink} className={styles.SubBarListItem}>
              CPU
            </NavLink>
            <NavLink to={memoryLink} className={styles.SubBarListItem}>
              Memory
            </NavLink>
            {/* <Link to={storageLink} className={styles.SubBarListItem}>Storage</Link> */}
            <NavLink to={networkLink} className={styles.SubBarListItem}>
              Network
            </NavLink>
            {(isAppMetricsPage || isAppPage) && (
              <>
                <>
                  <div>
                    <NavLink to={appLogsLink} className={styles.SubBarListItem}>
                      Logs
                    </NavLink>
                  </div>
                  <Link
                    to="#"
                    className={`${styles.ListItem} ${styles.DisabledLink}`}
                  >
                    OTHER
                  </Link>
                </>
                <div>
                  <NavLink
                    to={{
                      pathname: `/projects/${projectID}/apps/${appID}/settings`,
                      name,
                    }}
                    className={styles.SubBarListItem}
                  >
                    App Settings
                  </NavLink>
                </div>
              </>
            )}
          </div>

          {isAppPage || isAppMetricsPage ? null : (
            <>
              <Link
                to="/"
                className={`${styles.ListItem} ${styles.DisabledLink}`}
              >
                OTHER
              </Link>
              <div>
                <NavLink
                  to={{
                    pathname: `/projects/${projectID}/settings`,
                  }}
                  className={styles.SubBarListItem}
                >
                  Project settings
                </NavLink>
              </div>
              
              <div>
                <NavLink
                  to={{
                    pathname: `/projects/${projectID}/billing`,
                  }}
                  className={styles.SubBarListItem}
                >
                 Billing
                </NavLink>
                </div>
            </>
          )}
        </div>

        <div className={styles.SideBarFooterSection}>
          <div className={`${styles.SideFooter} ${styles.StickBottom}`}>
            Copyright {new Date().getFullYear()} Crane Cloud. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.defaultProps = {
  appLogsLink: "",
};

SideBar.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  pageRoute: PropTypes.string.isRequired,
  cpuLink: PropTypes.string.isRequired,
  memoryLink: PropTypes.string.isRequired,
  databaseLink: PropTypes.string.isRequired,
  networkLink: PropTypes.string.isRequired,
  allMetricsLink: PropTypes.string.isRequired,
  appLogsLink: PropTypes.string,
};

export default SideBar;
