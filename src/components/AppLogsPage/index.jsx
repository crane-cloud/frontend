import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import "./AppLogsPage.css";
import LogsFrame from "../LogsFrame";
import getAppLogs from "../../redux/actions/getAppLogs";

class AppLogsPage extends React.Component {
  componentDidMount() {
    const {
      getAppLogs,
      match: { params },
    } = this.props;
    const { projectID, appID } = params;

    getAppLogs({ projectID, appID }, { timestamps: true });
  }

  getAppInfo(id) {
    const { apps } = this.props;
    const found = apps.apps.find((app) => app.id === id);
    const info = {
      name: found.name,
      status: found.app_running_status,
      url: found.url,
    };

    return info;
  }

  render() {
    const {
      match: { params },
    } = this.props;
    const { projectID, userID, appID } = params;
    const { logs, retrieveingLogs } = this.props;
    const appInfo = this.getAppInfo(appID);

    return (
      <div className="Page">
        <div className="TopBarSection">
          <Header />
        </div>
        <div className="MainSection">
          <div className="SideBarSection">
            <SideBar
              name={appInfo.name}
              params={params}
              pageRoute={this.props.location.pathname}
              allMetricsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/metrics/`}
              cpuLink={`/users/${userID}/projects/${projectID}/apps/${appID}/cpu/`}
              memoryLink={`/users/${userID}/projects/${projectID}/apps/${appID}/memory/`}
              databaseLink={`/users/${userID}/projects/${projectID}/databases`}
              networkLink={`/users/${userID}/projects/${projectID}/apps/${appID}/network/`}
              appLogsLink={`/users/${userID}/projects/${projectID}/apps/${appID}/logs/`}
            />
          </div>
          <div className="MainContentSection">
            <div className="InformationBarSection">
              <InformationBar header={appInfo.url} status={appInfo.status} />
            </div>
            <div className="ContentSection">
              <div className="LogsSection">
                <LogsFrame
                  loading={retrieveingLogs}
                  data={logs}
                  title={`${appInfo.name} logs`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppLogsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      appID: PropTypes.string.isRequired,
      projectID: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getAppLogs: PropTypes.func.isRequired,
  apps: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
  retrieveingLogs: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { apps } = state.appsListReducer;
  const { logs, retrievedLogs, retrieveingLogs } = state.appLogsReducer;

  return {
    apps,
    logs,
    retrievedLogs,
    retrieveingLogs,
  };
};

const mapDispatchToProps = {
  getAppLogs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppLogsPage));
