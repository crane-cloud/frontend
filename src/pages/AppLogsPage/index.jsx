import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import "./AppLogsPage.css";
import LogsFrame from "../../components/LogsFrame";
import {handlePostRequestWithDataObject} from "../../apis/apis";
import { useState } from "react";

const AppLogsPage = () => {
  const location = useLocation();
  const params = useParams();
  const { projectID, appID } = params;
  const [ fetchingLogs, setFetchinLogs ] = useState(true);
  const [logs, setLogs] = useState([])
  const [logsError, setlogsError] = useState('')

  useEffect(() => {
    handlePostRequestWithDataObject({ timestamps: true },
    `/projects/${projectID}/apps/${appID}/logs`).then((response)=>{
      setLogs(response.data.data.pods_logs)
      setFetchinLogs(false)
    }).catch((error)=>{
      setlogsError("Failed to fetch logs")
      setFetchinLogs(false)
    })
  }, [projectID, appID]);

  const myApps = useSelector((state) => state.appsListReducer);

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
                loading={fetchingLogs}
                data={logs}
                title={`${appInfo.name} logs`}
                error={logsError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogsPage;
