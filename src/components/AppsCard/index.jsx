import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppStatus from "../AppStatus";
import LineChartComponent from "../LineChart";
import "./AppsCard.css";
import getAppMemory, { clearAppMemory } from "../../redux/actions/appMemory";
import { formatAppMemoryMetrics } from "../../helpers/formatMetrics";

const AppsCard = (props) => {
  const { getAppMemory, name, appStatus, appId, otherData, appMemoryMetrics } =
    props;
  const { projectID } = props.otherData;
  useEffect(() => {
    clearAppMemory();
    getAppMemory(projectID, appId, {});
  }, [appId, projectID, getAppMemory]);

  const getAppMemoryMetrics = () => {
    return formatAppMemoryMetrics(appId, appMemoryMetrics);
  };

  const formattedMemoryMetrics = getAppMemoryMetrics();

  return (
    <>
      <Link
        to={{
          pathname: `/projects/${otherData.projectID}/apps/${appId}/dashboard`,
        }}
        key={otherData.projectID}
        className="AppName"
      >
        <div className="AppCard">
          <div className="AppCardHeader">
            <div className="AppNameSection">{name}</div>
            <div className="AppIconsSection">
              <div className="StatusData">
                <AppStatus appStatus={appStatus} />
              </div>
            </div>
          </div>
          <div className="AppCardBottomSection">
            <div className="AppGraphSummaryLabel">Memory (1d)</div>
            <div className="AppGraphSummary">
              <LineChartComponent
                lineDataKey="memory"
                preview
                data={formattedMemoryMetrics}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

// inititate props
AppsCard.propTypes = {
  name: PropTypes.string.isRequired,
  appStatus: PropTypes.string.isRequired, // this is static
  url: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  otherData: PropTypes.shape({
    projectID: PropTypes.string.isRequired,
  }).isRequired,
};

export const mapStateToProps = (state) => {
  const { data } = state.user;
  const { appMemoryMetrics, isFetchingAppMemory, appMemoryMessage } =
    state.appMemoryReducer;
  return {
    data,
    appMemoryMetrics,
    isFetchingAppMemory,
    appMemoryMessage,
  };
};

const mapDispatchToProps = {
  getAppMemory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsCard);
