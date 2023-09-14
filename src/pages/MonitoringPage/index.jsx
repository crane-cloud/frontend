import React, { useState, useEffect } from "react";
import NewHeader from "../../components/NewHeader";
import LandingFooter from "../../components/LandingFooter";
import { STATUS_MONITORING_URL } from "../../config";
import Spinner from "../../components/Spinner";
import { handleGetRequest } from "../../apis/apis";
import "./MonitoringPage.css";
import StatusGraph from "../../components/StatusGraph";
import StatusModule from "../../components/StatusModule";

const statusValue = [
  { type: "success" },
  { type: "partial" },
  { type: "failed" },
];

const MonitoringPage = () => {
  const [statusAvailable, setStatusAvailable] = useState("");
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStatusData = async () => {
    setLoading(true);
    try {
      await handleGetRequest(`${STATUS_MONITORING_URL}/statuses`).then((response) => {
        if (response.status !== 200) {
          return false;
        }
        setStatusAvailable(response.data.status);
        setStatusData(response.data.data);
        setLoading(false);
      });
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
                  title="Crane Cloud"
                  description="This includes the web application and platform API"
                  isOperational={
                    statusData?.cranecloud_status?.status ===
                    statusValue[0].type
                  }
                />

                <StatusModule
                  title="Databases"
                  description="This includes the MySQL and PostgreSQL database flavors"
                  isOperational={
                    statusData?.database_status?.status === statusValue[0].type
                  }
                />

                <StatusModule
                  title="Registry"
                  description="This is the Crane Cloud image registry"
                  isOperational={
                    statusData?.registry?.status === statusValue[0].type
                  }
                />

                <StatusModule
                  title="Mira Service"
                  description="This includes the Mira frontend and backend services"
                  isOperational={
                    statusData?.mira_status?.status === statusValue[0].type
                  }
                />

                <StatusModule
                  title="Clusters"
                  description="This includes the infrastructure Crane Cloud runs on"
                  isOperational={
                    statusData?.clusters_status?.status === statusValue[0].type
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
              </div>

              <div className="TitleArea">
                <div className="SectionTitle">System Status Series Graphs </div>
              </div>

              <StatusGraph />
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
