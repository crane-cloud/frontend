import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideBar from "../SideBar";
import "./AppLogsPage.css";
import LogsFrame from "../LogsFrame";
import getAppLogs from "../../redux/actions/getAppLogs";

const AppLogsPage = () => {
  const location = useLocation();
  const params = useParams();
  const { projectID, appID } = params;

  useEffect(() => {
    getAppLogs({ projectID, appID }, { timestamps: true });
  }, [projectID, appID]);

  const myApps = useSelector((state) => state.appsListReducer);
  const appLogs = useSelector((state) => state.appLogsReducer);

  const getAppInfo = (id) => {
    const { apps } = myApps;
    const found = apps?.apps.find((app) => app.id === id);
    const info = {
      name: found?.name,
      status: found?.app_running_status,
      url: found?.url,
    };

    return info;
  };

  const { logs, retrieveingLogs } = appLogs;
  const appInfo = getAppInfo(appID);

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
            pageRoute={location.pathname}
            allMetricsLink={`/projects/${projectID}/apps/${appID}/dashboard`}
            cpuLink={`/projects/${projectID}/apps/${appID}/cpu/`}
            memoryLink={`/projects/${projectID}/apps/${appID}/memory/`}
            databaseLink={`/projects/${projectID}/databases`}
            networkLink={`/projects/${projectID}/apps/${appID}/network/`}
            appLogsLink={`/projects/${projectID}/apps/${appID}/logs/`}
          />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header={appInfo.url} status={appInfo.status} />
          </div>
          <div className="ContentSection SmallContainer">
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
};

export default AppLogsPage;
