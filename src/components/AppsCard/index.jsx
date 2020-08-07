import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppStatus from '../AppStatus';
import LineChartComponent from '../LineChart';
import './AppsCard.css';

const sampleData = [
  { name: 'Sample Metric 1', uv: 250 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 10 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 70 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 60 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 190 },
  { name: 'Sample Metric 2', uv: 290 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 130 },
  { name: 'Sample Metric 2', uv: 0 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 280 },
  { name: 'Sample Metric 2', uv: 300 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 170 },
  { name: 'Sample Metric 2', uv: 290 },
];

// this function is meant to shuffle the dummy data array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const AppsCard = (props) => {
  const {
    name, appStatus, url, appId, otherData
  } = props;

  return (
    <Link
      to={{
        pathname: `/users/${otherData.userID}/projects/${otherData.projectID}/apps/${appId}/metrics`, appName: name, liveAppStatus: appStatus, appUrl: url
      }}
      key={otherData.projectID}
      className="AppName"
    >
      <div className="AppCard">
        <div className="AppCardHeader">
          <div className="AppNameSection">
            {name}
          </div>
          <div className="AppIconsSection">
            <div className="StatusData">
              <AppStatus appStatus={appStatus} />
            </div>
          </div>
        </div>
        <div className="AppCardBottomSection">
          <div className="AppGraphSummaryLabel">Memory (1d)</div>
          <div className="AppGraphSummary">
            <LineChartComponent data={shuffle(sampleData)} />
          </div>
        </div>
      </div>
    </Link>
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
