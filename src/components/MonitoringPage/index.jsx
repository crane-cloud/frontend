import React, { useState, useEffect, useRef } from "react";
import NewHeader from "../NewHeader";
import LandingFooter from "../LandingFooter";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Maintenance } from "../../assets/images/maintenance.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import { ReactComponent as Outage } from "../../assets/images/off.svg";
import { ReactComponent as DownArrow } from "../../assets/images/down-arrow-black.svg";
import styles from "./MonitoringPage.module.css";

const MonitoringPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const openSelectRef = useRef(null);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleChange = () => {
    toggleOptions();
  };
  const handleClickOutside = (event) => {
    if (
      openSelectRef.current &&
      !openSelectRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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

      <div className={styles.StatusSectionTitle}>
        <h1>Current Status by Service</h1>
      </div>

      <div className={styles.StatusSectionContent}>
        <div className={styles.StatusSectionChildContainer}>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>Application</div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <div ref={openSelectRef} className="SelectWrapper">
                  <div onClick={() => toggleOptions()} role="presentation">
                    <div className={`${showOptions}`}>
                      <DownArrow className={styles.DownArrow} />
                    </div>
                  </div>
                  {showOptions && (
                    <div className="SelectOptionsWrapper">
                      <div onClick={() => handleChange()} role="presentation">
                        <div className={styles.StatusSectionItem}>
                          <div className={styles.StatusSection}>
                            <span>
                              <div className={styles.StatusSectionCardTitle}>
                                MySQL
                              </div>
                              <div>No Issues</div>
                            </span>
                            <span>
                              <Operational className={styles.SmallIcon} />
                            </span>
                          </div>
                        </div>
                        <hr />
                        <div className={styles.StatusSectionItem}>
                          <div className={styles.StatusSection}>
                            <span>
                              <div className={styles.StatusSectionCardTitle}>
                                PostgreSQL
                              </div>
                              <div>No Issues</div>
                            </span>
                            <span>
                              <Operational className={styles.SmallIcon} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>
                  Database Servers
                </div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>Clusters</div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>Prometheus</div>
                <div>Issues detected</div>
              </span>
              <span>
                <Incident className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>
                  Harbor Registry
                </div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>MIRA</div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
          <div className={styles.StatusSectionItem}>
            <div className={styles.StatusSection}>
              <span>
                <DownArrow className={styles.DownArrow} />
              </span>
              <span>
                <div className={styles.StatusSectionCardTitle}>
                  Integrations
                </div>
                <div>No Issues</div>
              </span>
              <span>
                <Operational className={styles.SmallIcon} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.FooterSection}>
        <LandingFooter />
      </div>
    </div>
  );
};

export default MonitoringPage;
