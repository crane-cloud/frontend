import React, { useState, useEffect } from "react";
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

const statusValue = [
  { type: "success" },
  { type: "partial" },
  { type: "failed" },
];

const MonitoringPage = () => {
  const [statusData, setStatusData] = useState([]);
  const [statusModules, setStatusModules] = useState({});
  const [filteredData, setFilteredData] = useState([]);
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

  useEffect(() => {
    getStatusData();
    getStatusGraphData();
  }, []);

  const getStatusData = async () => {
    setLoading(true);
    try {
      await handleGetRequest(`${STATUS_MONITORING_URL}/statuses`).then(
        (response) => {
          if (response.status !== 200) {
            return false;
          }
          setStatusData(response.data.data);
          setLoading(false);
        }
      );
    } catch (error) {
      setStatusData([]);
      setLoading(false);
    }
  };

  const getStatusGraphData = async () => {
    setLoading(true);
    try {
      await handleGetRequest(
        `${STATUS_MONITORING_URL}/statuses/series?series=true`
      ).then((response) => {
        if (response.status !== 200) {
          return false;
        }
        // Group the data by parent_name
        const groupedData = groupStatusData(response.data.data.graph_data);
        setStatusModules(groupedData);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = filterStatusData(statusModules);
    setFilteredData(filtered);
  }, [statusModules]);

  useEffect(() => {
    if (!loading && Object.keys(statusModules).length > 0) {
      setLoading(false);
    }
  }, [loading, statusModules]);

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
                    statusData?.cranecloud_status?.data[0].status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="Crane Cloud Backend"
                  description="The API that provides functionality to the Frontend"
                  isOperational={
                    statusData?.cranecloud_status?.data[1].status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="MySQL Databases"
                  description="This is the MySQL database flavor offered by Crane Cloud"
                  isOperational={
                    statusData?.database_status?.data[0].status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="PostgreSQL Databases"
                  description="This is the PostgreSQL database flavor offered by Crane Cloud"
                  isOperational={
                    statusData?.database_status?.data[1].status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="Image Registry"
                  description="This is the repository for storing and retrieving deployment images"
                  isOperational={
                    statusData?.registry?.status === statusValue[0].type
                  }
                />

                <StatusModule
                  title="Mira Frontend"
                  description="This allows users to interact with the mira auto-containerization platform"
                  isOperational={
                    statusData?.mira_status?.data[0].status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="Mira Backend"
                  description="This API manages logic such that applications are seamlessly containerized"
                  isOperational={
                    statusData?.mira_status?.data[1].status ===
                    statusValue[0].type
                  }
                />

                {isAdmin && (
                  <>
                    <StatusModule
                      title="Clusters"
                      description="This includes the infrastructure Crane Cloud runs on"
                      isOperational={
                        statusData?.clusters_status?.status ===
                        statusValue[0].type
                      }
                    />

                    <StatusModule
                      title="Prometheus"
                      description="This is Crane Cloud's alerting toolkit"
                      isOperational={
                        statusData?.prometheus_status?.status ===
                        statusValue[0].type
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
                  <StatusGraph status={statusData} data={dataArray} />
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
