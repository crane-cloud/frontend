import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppStatus from "../AppStatus";
import LineChartComponent from "../LineChart";
import "./AppsCard.css";
import {  ReactComponent as AlertWarning }  from "../../assets/images/alert.svg";
import getAppMemory, { clearAppMemory } from "../../redux/actions/appMemory";
import { formatAppMemoryMetrics } from "../../helpers/formatMetrics";
import { ReactComponent as JupyterNoteBookApp } from "../../assets/images/jupyter_notebook.svg";
import { ReactComponent as TrainedAIAppIcon } from "../../assets/images/trained_model.svg";

const AppsCard = (props) => {
  const { getAppMemory, name, appStatus, appId, otherData, appMemoryMetrics, url, disabled,
    admin_disabled=false, is_ai, is_notebook } =
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
    <div className={`${admin_disabled ? "unclickable":""}  ${disabled || admin_disabled ? "opequeCard":""}`} title={(disabled === true && !admin_disabled) ? "Disabled app": admin_disabled ? "Admin disabled this app": name}>
      <Link
        to={{
          pathname: `/projects/${otherData.projectID}/apps/${appId}/dashboard`,
        }}
        key={otherData.projectID}
        className="AppName"
      >
        <div className={!url ? "FailAppCard": "AppCard"}>
          <div className="AppCardHeader">
            <div className="AppNameSection">{name} <span>{is_notebook? <JupyterNoteBookApp width="20" height="20" />: is_ai ? <TrainedAIAppIcon width="20" height="20" />: ''}</span> </div>
            <div className="AppIconsSection">
              <div className="StatusData">
                <AppStatus appStatus={appStatus} />
              </div>
              {!url && <div className="AlertIcon" title="App url has to be re-genereted">
              <AlertWarning/>
              </div> }
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
    </div>
  );
};

// inititate props
AppsCard.propTypes = {
  name: PropTypes.string.isRequired,
  appStatus: PropTypes.string.isRequired, // this is static
  url: PropTypes.string,
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
