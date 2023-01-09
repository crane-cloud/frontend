import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LogsFrame from "../../components/LogsFrame";
import {handlePostRequestWithDataObject} from "../../apis/apis";
import { useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

const AppLogsPage = () => {
  const params = useParams();
  const { projectID, appID } = params;
  const [fetchingLogs, setFetchinLogs] = useState(true);
  const [logs, setLogs] = useState([]);
  const [logsError, setlogsError] = useState("");

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
    <DashboardLayout
      name={appInfo.name}
      header={appInfo.url}
      status={appInfo.status}
    >
      <LogsFrame
        loading={fetchingLogs}
        data={logs}
        title={`${appInfo.name} logs`}
        error={logsError}
      />
    </DashboardLayout>
  );
};

export default AppLogsPage;
