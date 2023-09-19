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

const statusValue = [
  { type: "success" },
  { type: "partial" },
  { type: "failed" },
];

const MonitoringPage = () => {
  const [statusAvailable, setStatusAvailable] = useState("");
  const [statusData, setStatusData] = useState([]);
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

  const getStatusData = async () => {
    setLoading(true);
    try {
      await handleGetRequest(`${STATUS_MONITORING_URL}/statuses`).then(
        (response) => {
          if (response.status !== 200) {
            return false;
          }
          setStatusAvailable(response.data.status);
          setStatusData(response.data.data);
          setLoading(false);
        }
      );
    } catch (error) {
      setStatusData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatusData();
  }, []);

  return (
    <div className="MonitoringPageMain">
      <NewHeader />

      <div className="PageContainer">
        <div className="PrimaryTitle">Crane Cloud Status</div>
        <div className="PrimaryContent">
          Welcome to the Crane Cloud status page.
        </div>
        <div className="PrimaryDescription">
          Here you will find real-time information about the status of our
          services reported here.
        </div>

        {statusAvailable === "success" ? (
          <>
            <div className="BannerArea">
              <div className="StatusBanner">
                {statusData?.cranecloud_status &&
                statusData?.database_status &&
                statusData?.mira_status &&
                statusData?.registry &&
                statusData?.clusters_status &&
                statusData?.prometheus_status === "success" ? (
                  <div className="BannerText">Services Available</div>
                ) : (
                  <div className="BannerText">Issues detected</div>
                )}
              </div>
            </div>

            <div className="StatusSectionContent">
              <div className="TitleArea">
                <div className="SectionTitle">Current Status Overview</div>
              </div>
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
                  <StatusGraph />
                </>
              )}
            </div>
          </>
        ) : (
          loading && (
            <>
              <div className="LoadingArea">
                <Spinner size="big" />
              </div>
            </>
          )
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
