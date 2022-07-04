import React from "react";
import NewHeader from "../NewHeader";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Maintenance } from "../../assets/images/maintenance.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import { ReactComponent as Outage } from "../../assets/images/off.svg";
import styles from "./MonitoringPage.module.css";

const MonitoringPage = () => {
  return (
    <div className={styles.MonitoringPageMain}>
      <NewHeader />

      <div className={styles.PrimaryTitle}>Crane Cloud Status</div>
      <div className={styles.PrimaryContent}>
        Welcome to the Crane Cloud status page.
      </div>
      <div className={styles.PrimaryDescription}>
        Here you will find real-time information about the status of our
        services reported here.
      </div>
      <div className={styles.BannerArea}>
        <div className={styles.StatusBanner}>
          <div className={styles.BannerText}>All services operational</div>
        </div>
      </div>

      <div className={styles.StatusTypes}>
        <div className={styles.StatusTypesContainer}>
          <div className={styles.StatusTypeIcon}>
            <Operational />
          </div>
          <div className={styles.StatusTypeName}>
            <h3>Operational</h3>
          </div>
        </div>
        <div className={styles.StatusTypesContainer}>
          <div className={styles.StatusTypeIcon}>
            <Maintenance />
          </div>
          <div className={styles.StatusTypeName}>
            <h3>Maintenance</h3>
          </div>
        </div>
        <div className={styles.StatusTypesContainer}>
          <div className={styles.StatusTypeIcon}>
            <Incident />
          </div>
          <div className={styles.StatusTypeName}>
            <h3>Incident</h3>
          </div>
        </div>
        <div className={styles.StatusTypesContainer}>
          <div className={styles.StatusTypeIcon}>
            <Outage />
          </div>
          <div className={styles.StatusTypeName}>
            <h3>Outage</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
