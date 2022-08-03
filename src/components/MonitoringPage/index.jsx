import React, { useState, useEffect, useRef } from "react";
import NewHeader from "../NewHeader";
import LandingFooter from "../LandingFooter";
import { ReactComponent as Operational } from "../../assets/images/operational.svg";
import { ReactComponent as Incident } from "../../assets/images/incident.svg";
import { ReactComponent as DownArrow } from "../../assets/images/down-arrow-black.svg";
import { ReactComponent as UpArrow } from "../../assets/images/up-arrow.svg";
import styles from "./MonitoringPage.module.css";
import axios from "axios";
import { CRANE_CLOUD_STATUS } from "../../config";

const statusValue = [
  { type: "success" },
  { type: "partial" },
  { type: "failed" },
];

const MonitoringPage = () => {
  const [statusAvailable, setStatusAvailable] = useState("");
  const [statusData, setStatusData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsFor, setOptionsFor] = useState("");
  const [flip, setFlip] = useState(false);
  const openSelectRef = useRef(null);

  const handleDropdown = () => {
    if (flip) {
      setFlip(false);
    } else {
      setFlip(true);
      setShowOptions(false);
    }
  };

  const viewAppModules = () => {
    setOptionsFor("Application");
    setShowOptions(true);
  };

  const viewDBModules = () => {
    setOptionsFor("Database");
    setShowOptions(true);
  };

  const viewRegistryModules = () => {
    setOptionsFor("Registry");
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
      setFlip(false);
    }
  };
  useEffect(() => {
    getStatusData();
    document.addEventListener("mousedown", handleClickOutside);
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusData = () => {
    axios
      .get(CRANE_CLOUD_STATUS)
      .then((response) => {
        if (response.status !== 200) {
          return false;
        }
        setStatusAvailable(response.data.status);
        setStatusData(response.data.data);
      })
      .catch((e) => {
        setStatusData([]);
      });
  };

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
            {statusAvailable === "success" ? (
              <div className={styles.BannerText}>Services Available</div>
            ) : (
              <div className={styles.BannerText}>Something went wrong</div>
            )}
          </div>
        </div>

        <div className={styles.StatusSectionContent}>
          <div className={styles.StatusSectionTitle}>
            <h1>Current Status by Service</h1>
          </div>
          <div className={styles.StatusSectionChildContainer}>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewAppModules()}
                    role="presentation"
                    className="CardArrow"
                  >
                    {!flip && (
                      <DownArrow
                        className={styles.DownArrow}
                        onClick={handleDropdown}
                      />
                    )}
                    {flip && optionsFor === "Application" && (
                      <UpArrow
                        className={styles.UpArrow}
                        onClick={handleDropdown}
                      />
                    )}

                    {optionsFor === "Application" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.cranecloud_status?.data[0]
                                  .status === statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        Frontend
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        Frontend
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.cranecloud_status?.data[1]
                                  .status === statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        Backend
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        Backend
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                {statusData?.cranecloud_status?.status ===
                statusValue[0].type ? (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Applications
                      </div>
                      <div>No Issues</div>
                    </span>
                    <span>
                      <Operational
                        className={styles.SmallIcon}
                        title="Operational"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Applications
                      </div>
                      <div>Issues detected</div>
                    </span>
                    <span>
                      <Incident className={styles.SmallIcon} title="Incident" />
                    </span>
                  </>
                )}
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
                    {!flip && (
                      <DownArrow
                        className={styles.DownArrow}
                        onClick={handleDropdown}
                      />
                    )}
                    {flip && optionsFor === "Database" && (
                      <UpArrow
                        className={styles.UpArrow}
                        onClick={handleDropdown}
                      />
                    )}

                    {optionsFor === "Database" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.database_status?.data[0].status ===
                                statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        MySQL
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        MySQL
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.database_status?.data[1].status ===
                                statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        PostgreSQL
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        PostgreSQL
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                {statusData?.database_status?.status === statusValue[0].type ? (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Databases
                      </div>
                      <div>No Issues</div>
                    </span>
                    <span>
                      <Operational
                        className={styles.SmallIcon}
                        title="Operational"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Databases
                      </div>
                      <div>Issues detected</div>
                    </span>
                    <span>
                      <Incident className={styles.SmallIcon} title="Incident" />
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.StatusSectionItem}>
              <div className={styles.StatusSection}>
                <span>
                  <div
                    ref={openSelectRef}
                    onClick={() => viewRegistryModules()}
                    role="presentation"
                  >
                    {!flip && (
                      <DownArrow
                        className={styles.DownArrow}
                        onClick={handleDropdown}
                      />
                    )}
                    {flip && optionsFor === "Registry" && (
                      <UpArrow
                        className={styles.UpArrow}
                        onClick={handleDropdown}
                      />
                    )}

                    {optionsFor === "Registry" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.registry?.data[0].status ===
                                statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        Image Registry
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        Image Registry
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                {statusData?.registry?.status === statusValue[0].type ? (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Registry
                      </div>
                      <div>No Issues</div>
                    </span>
                    <span>
                      <Operational
                        className={styles.SmallIcon}
                        title="Operational"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Registry
                      </div>
                      <div>Issues detected</div>
                    </span>
                    <span>
                      <Incident className={styles.SmallIcon} title="Incident" />
                    </span>
                  </>
                )}
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
                    {!flip && (
                      <DownArrow
                        className={styles.DownArrow}
                        onClick={handleDropdown}
                      />
                    )}
                    {flip && optionsFor === "Mira" && (
                      <UpArrow
                        className={styles.UpArrow}
                        onClick={handleDropdown}
                      />
                    )}

                    {optionsFor === "Mira" && showOptions && (
                      <div className={styles.DropDownContainer}>
                        <div className={styles.DropDownContent}>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.mira_status?.data[0].status ===
                                statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        MIRA Frontend
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        MIRA Frontend
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                          <div
                            className={styles.DropDownDetails}
                            role="presentation"
                          >
                            <>
                              <div className={styles.DropDownValue}>
                                {statusData?.mira_status?.data[1].status ===
                                statusValue[0].type ? (
                                  <>
                                    <span>
                                      <div
                                        className={styles.DropDownValueTitle}
                                      >
                                        MIRA Backend
                                      </div>
                                      <div>No issues found</div>
                                    </span>
                                    <span>
                                      <Operational
                                        className={styles.SmallerIcon}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      <div
                                        className={
                                          styles.StatusSectionCardTitle
                                        }
                                      >
                                        MIRA Backend
                                      </div>
                                      <div>Issues detected</div>
                                    </span>
                                    <span>
                                      <Incident
                                        className={styles.SmallIcon}
                                        title="Incident"
                                      />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </span>
                {statusData?.mira_status?.status === statusValue[0].type ? (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Mira Service
                      </div>
                      <div>No Issues</div>
                    </span>
                    <span>
                      <Operational
                        className={styles.SmallIcon}
                        title="Operational"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className={styles.StatusSectionCardTitle}>
                        Mira Service
                      </div>
                      <div>Issues detected</div>
                    </span>
                    <span>
                      <Incident className={styles.SmallIcon} title="Incident" />
                    </span>
                  </>
                )}
              </div>
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
