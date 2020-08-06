import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppStatus from '../AppStatus';
import './AppsCard.css';

const AppsCard = (props) => {
  const {
    name, appStatus, url, appId, otherData
  } = props;

  return (
    <div className="AppCard">
      <div className="AppCardHeader">
        <div className="AppNameSection">
          <Link
            to={{
              pathname: `/users/${otherData.userID}/projects/${otherData.projectID}/apps/${appId}/metrics`, appName: name, liveAppStatus: appStatus, appUrl: url
            }}
            key={otherData.projectID}
          >
            {name}
          </Link>
        </div>
        <div className="AppIconsSection">
          <div className="StatusData">
            <AppStatus appStatus={appStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

// inititate props
AppsCard.propTypes = {
  name: PropTypes.string.isRequired,
  appStatus: PropTypes.string.isRequired, // this is static
  url: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  otherData: PropTypes.shape({
    userID: PropTypes.string.isRequired,
    projectID: PropTypes.string.isRequired
  }).isRequired
};

export default AppsCard;
