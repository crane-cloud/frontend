import React, { useState, useEffect, useCallback } from "react";
import NewHeader from "../../components/NewHeader";
import LandingFooter from "../../components/LandingFooter";
import { STATUS_MONITORING_URL } from "../../config";
import Spinner from "../../components/Spinner";
import { handleGetRequest } from "../../apis/apis";
import "./MonitoringPage.css";
import StatusGraph from "../../components/StatusGraph";
import StatusModule from "../../components/StatusModule";
import { useSelector } from "react-redux";
import { isUserAdmin } from "../../helpers/adminUtils";
import { groupStatusData } from "../../helpers/groupStatusData";
import { filterStatusData } from "../../helpers/filterStatusData";



const MonitoringPage = () => {
  const [statusData, setStatusData] = useState([]);
  const [statusModules, setStatusModules] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [uptime, setUptime] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    async function checkAdminStatus() {
      const userIsAdmin = await isUserAdmin(currentUser);
      setIsAdmin(userIsAdmin);
    }

    checkAdminStatus();
  }, [currentUser]);

  //assuring certain of data rendered per service
  const getAppStatus = useCallback((statusData, appName, variableName="app_name") => {
    if (!statusData) return undefined;
    return statusData.data.find(app => app[variableName] === appName)?.status;
  }, []);

  const getTimestamp30DaysAgo = () => {
    return Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60; 
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statusResponse, graphResponse] = await Promise.all([
          handleGetRequest(`${STATUS_MONITORING_URL}/statuses`),
          handleGetRequest(`${STATUS_MONITORING_URL}/statuses/series?series=true&&start=${getTimestamp30DaysAgo()}`),
        ]);

        if (statusResponse.status === 200) {
           
          setStatusData(statusResponse.data.data);

        } else {
          setStatusData(null);
        }

        if (graphResponse.status === 200) {
          const groupedData = groupStatusData(graphResponse.data.data.graph_data);
          setUptime(graphResponse.data.data.uptime);
          setStatusModules(groupedData);
          setFilteredData(filterStatusData(groupedData));
        } else {
          setStatusModules({});
        }
      } catch (error) {
        setStatusData(null);
        setStatusModules({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterStatusData(statusModules);
    setFilteredData(filtered);
  }, [statusModules]);

  const dataArray = Object.entries(filteredData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div className="MonitoringPageMain">
      <NewHeader />
      
      <div className="PageContainer">
        <div className="PrimaryTitle">Crane Cloud Status</div>

        {loading && statusData.length === 0 ? (
          <>
            <div className="LoadingArea">
              <Spinner size="big" />
            </div>
          </>
        ) : (
          <>
            <div className="StatusSectionContent">
              <div className="StatusSectionChildContainer">
                <StatusModule
                  title="Crane Cloud Frontend"
                  description="The Web Application of the platform"
                  isOperational={
                    getAppStatus(
                      statusData?.cranecloud_status,
                      "cranecloud-frontend"
                    )
                  }
                />

                <StatusModule
                  title="Crane Cloud Backend"
                  description="The API that provides functionality to the Frontend"
                  isOperational={
                    getAppStatus(
                      statusData?.cranecloud_status,
                      "cranecloud-backend"
                    )
                  }
                />

                <StatusModule
                  title="MySQL Databases"
                  description="This is the MySQL database flavor offered by Crane Cloud"
                  isOperational={
                    getAppStatus(
                      statusData?.database_status,
                      "mysql",
                      "database_name"
                    )
                  }
                />

                <StatusModule
                  title="PostgreSQL Databases"
                  description="This is the PostgreSQL database flavor offered by Crane Cloud"
                  isOperational={
                    getAppStatus(
                      statusData?.database_status,
                      "postgres",
                      "database_name"
                    )
                  }
                />

                <StatusModule
                  title="Image Registry"
                  description="This is the repository for storing and retrieving deployment images"
                  isOperational={
                    getAppStatus(statusData?.registry, "habor-registry")
                  }
                />

                <StatusModule
                  title="Mira Service"
                  description="This API manages logic such that applications are seamlessly containerized"
                  isOperational={
                    getAppStatus(statusData?.mira_status, "mira-backend")
                  }
                />

                <StatusModule
                  title="App Logger"
                  description="Logs user activities on the platform"
                  isOperational={
                    getAppStatus(statusData?.services_status, "app-logger-service")
                  }
                />

                <StatusModule
                  title="Monitoring Service"
                  description="Returns metrics used by applications or projects eg. CPU and Memory."
                  isOperational={
                    getAppStatus(statusData?.services_status, "monitoring-service") 
                  }
                />

                <StatusModule
                  title="Database Service"
                  description="This API manages user databases."
                  isOperational={
                    getAppStatus(statusData?.services_status, "monitoring-service")
                  }
                />

                {isAdmin && (
                  <>
                    <StatusModule
                      title="Clusters"
                      description="This includes the infrastructure Crane Cloud runs on"
                      isOperational={
                        statusData?.clusters_status?.status 
                      }
                    />

                    <StatusModule
                      title="Prometheus"
                      description="This is Crane Cloud's alerting toolkit"
                      isOperational={
                        statusData?.prometheus_status?.status
                      }
                    />
                  </>
                )}
              </div>

              {isAdmin && (
                <>
                  <div className="TitleArea">
                    <div className="SectionTitle">
                      System Status Series Graphs
                    </div>
                  </div>
                  <StatusGraph  uptime={uptime} status={statusData} data={dataArray} />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="FooterSection">
        <hr className="RowDivider" />
        <LandingFooter />
      </div>
    </div>
  );
};

export default MonitoringPage;
