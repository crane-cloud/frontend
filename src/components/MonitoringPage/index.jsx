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
  const [optionsFor, setOptionsFor] = useState("");
  const openSelectRef = useRef(null);

  const viewAppModules = () => {
    setOptionsFor("Application");
    setShowOptions(true);
  };

  const viewDBModules = () => {
    setOptionsFor("Database");
    setShowOptions(true);
  };

  const viewClusterModules = () => {
    setOptionsFor("Cluster");
    setShowOptions(true);
  };

  const viewMiraModules = () => {
    setOptionsFor("Mira");
    setShowOptions(true);
  };

  const handleClickOutside = (event) => {
    if (
      openSelectRef.current &&
      !openSelectRef.current.contains(event.target)
    ) {
      setShowOptions(false);
      setOptionsFor("");
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

      <div className={styles.PageContainer}>
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

        <div className={styles.StatusSectionTitle}>
          <h1>Current Status by Service</h1>
        </div>

        <div className={styles.StatusSectionContent}>
          <div className={styles.StatusSectionChildContainer}>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewAppModules()}
                    role="presentation"
                  >
                    <DownArrow className={styles.DownArrow} />

                    {optionsFor === "Application" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  Frontend
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  Backend
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
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
                    Application
                  </div>
                  <div>No Issues</div>
                </span>
                <span>
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
                </span>
              </div>
            </div>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewDBModules()}
                    role="presentation"
                  >
                    <DownArrow className={styles.DownArrow} />

                    {optionsFor === "Database" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  MySQL
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  PostgreSQL
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
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
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
                </span>
              </div>
            </div>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewClusterModules()}
                    role="presentation"
                  >
                    <DownArrow className={styles.DownArrow} />

                    {optionsFor === "Cluster" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  Makerere
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  NetLabs
                                </div>
                                <div>Under maintenance</div>
                              </span>
                              <span>
                                <Maintenance className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  ACE
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  CIS
                                </div>
                                <div>Unavailable</div>
                              </span>
                              <span>
                                <Outage className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                <span>
                  <div className={styles.StatusSectionCardTitle}>Clusters</div>
                  <div>No Issues</div>
                </span>
                <span>
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
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
                    Prometheus
                  </div>
                  <div>No Issues</div>
                </span>
                <span>
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
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
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
                </span>
              </div>
            </div>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewMiraModules()}
                    role="presentation"
                  >
                    <DownArrow className={styles.DownArrow} />

                    {optionsFor === "Mira" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  MIRA Frontend
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational className={styles.SmallerIcon} />
                              </span>
                            </div>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <div className={styles.DropDownValue}>
                              <span>
                                <div className={styles.DropDownValueTitle}>
                                  MIRA Backend
                                </div>
                                <div>No issues found</div>
                              </span>
                              <span>
                                <Operational
                                  className={styles.SmallerIcon}
                                  title="Operational"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                <span>
                  <div className={styles.StatusSectionCardTitle}>MIRA</div>
                  <div>No Issues</div>
                </span>
                <span>
                  <Operational
                    className={styles.SmallIcon}
                    title="Operational"
                  />
                </span>
              </div>
            </div>
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

      <div className={styles.FooterSection}>
        <LandingFooter />
      </div>
    </div>
  );
};

export default MonitoringPage;
