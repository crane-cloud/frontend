import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import styles from "./AdminProjectDetails.module.css";
import PrimaryButton from "../PrimaryButton";
import {
  handleGetRequest,
  handlePostRequestWithOutDataObject,
} from "../../apis/apis.js";
import Avatar from "../Avatar";
// import ActivityLogs from "../ActivityLogs";
import Spinner from "../Spinner";
import { dateInWords } from "../../helpers/dateConstants";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";

import NewResourceCard from "../NewResourceCard";
import { useLocation } from 'react-router-dom';
import AppFooter from "../appFooter";

const AdminProjectDetails = () => {
  const clusterID = localStorage.getItem("clusterID");
  const clusterName = localStorage.getItem("clusterName");
  const location = useLocation();
  const isOverviewProject = location.pathname.includes('/projects-overview');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState({});

  //need to get all current project details
  const { projectID } = useParams();

  const projectCount = {
    apps: details?.apps_count,
    databases: details?.databases?.length,
    members: details?.users?.length,
  };

  const fetchProjectDetails = useCallback(() => {
    handleGetRequest(`/projects/${projectID}`)
      .then((response) => {
        setDetails(response.data.data.project);
      })
      .catch((error) => {
        setError("Failed to fetch project detail please refresh");
      })
      .finally(()=>{
        setLoading(false);
      })
  }, [projectID]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleEnableButtonClick = () => {
    try {
      if (details.disabled) {
        handlePostRequestWithOutDataObject(
          projectID,
          `/projects/${projectID}/enable`
        )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("API call error:", error);
            setError(error);
            window.location.reload();
          });
      } else {
        handlePostRequestWithOutDataObject(
          projectID,
          `/projects/${projectID}/disable`
        )
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("API call error:", error);
            setError(error);
            window.location.reload();
          });
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  return (
    <section className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={isOverviewProject? styles.CenterSection : styles.MainSection}>
       {!isOverviewProject && <div className={styles.SideBarSection}>
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        }
        <div className={styles.MainContentSection}>
          <div className={styles.InformationBarSection}>
            <InformationBar
              header={
                <span className={styles.InformationBarTitle}>
                  <Link
                    className={ `${styles.breadcrumb} ${styles.flex_back_link}`}
                    to={isOverviewProject? `/projects-overview` : `/clusters/${clusterID}/projects-listing`}
                  >
                    <BackButton />
                    <div className={styles.back_link}>Project Details</div>
                  </Link>
                </span>
              }
              showBtn={false}
            />
          </div>
          <div className={isOverviewProject ?  styles.CustomOverViewSmallContainer : styles.CustomSmallContainer}>
            {loading ? (
              <div className={styles.CentralSpinner}>
                <Spinner />
              </div>
            ) : (
              <>
                {!error && (
                  <div>
                    {/* Project information */}
                    <section className={styles.DetailsSection}>
                      <div className="SectionTitle">Project Information</div>
                      <div className={styles.ProjectInstructions}>
                        <div className={styles.ProjectInfo}>
                          <div className={styles.ProjectInfoHeader}>
                            <div className={styles.AvatarName}>
                              <Avatar
                                name={details?.name}
                                className={styles.avatar_author}
                              />
                            </div>
                            <div>
                              <div className={styles.flex_name_status}>
                                <div className={styles.ProjectName}>
                                  {details?.name}
                                </div>
                                <div className={styles.ProjectStatus}>
                                  {details?.disabled ? (
                                    <div className={ `${styles.font_status} ${styles.disabled}`}>
                                      Disabled
                                    </div>
                                  ) : (
                                    <div className={ `${styles.font_status} ${styles.active}`}>
                                      Active
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={styles.ProjectDescription}>
                                {details?.description}
                              </div>
                            </div>
                          </div>
                          <div className={styles.ProjectInfoBody}>
                            <div className={styles.ProjectInfoOwner}>
                              <div className={styles.project_details_type}>
                                Project Type:{" "}
                                <span className={styles.boldStyle}>
                                  {details?.project_type}
                                </span>
                              </div>
                              <div className={styles.line_between}></div>
                              <div className={styles.project_details_type}>
                                Organization:{" "}
                                <span className={styles.boldStyle}>
                                  {details?.organisation}
                                </span>
                              </div>
                              <div className={styles.line_between}></div>
                              <div className={styles.project_details_type}>
                                Created:{" "}
                                <span className={styles.boldStyle}>
                                  {dateInWords(details?.date_created)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* Project Metrics */}
                    <section className={styles.DetailsSection}>
                      <div className="SectionTitle">Project Metrics</div>
                      <div className={styles.flex_metrics}>
                        {Object.keys(projectCount).map((key, index) => (
                          <NewResourceCard
                            key={index}
                            title={key}
                            count={projectCount[key]}
                          />
                        ))}
                      </div>
                    </section>
                    {/* Membership */}
                    <section className={styles.DetailsSection}>
                      <div className="SectionTitle">Membership</div>
                      <div className={styles.ProjectInstructions}>
                        <>
                          <div className={styles.MembershipHeader}>
                            <div className={styles.MemberSection}>
                              <div className={styles.SettingsSectionInfoHeader}>
                                {details?.users?.length === 1 ? (
                                  <div className="SectionSubTitle">
                                    Project has 1 Team Member
                                  </div>
                                ) : (
                                  <div>
                                    Project has {details?.users?.length} Team
                                    Members
                                  </div>
                                )}
                              </div>
                              <div className="SubText">
                                Members that have accounts on crane cloud can
                                perform different operations on the project
                                depending on their permission.
                              </div>
                            </div>
                          </div>
                          <div className={styles.MemberTable}>
                            <div className={styles.MemberBody}>
                              {details?.users?.map((entry, index) => (
                                <div
                                  className={styles.MemberTableRow}
                                  key={index}
                                >
                                  <div className={styles.MemberInfo}>
                                    <Avatar
                                      name={entry.user.name}
                                      className={styles.MemberAvatar}
                                    />
                                    <div className={styles.MemberNameEmail}>
                                      <div className={styles.UserHeader}>
                                        {entry.user.name}
                                      </div>
                                      <div className={styles.Wrap}>
                                        {entry.user.email}
                                      </div>
                                    </div>
                                  </div>
                                  {entry.role !== "RolesList.owner" &&
                                    entry.accepted_collaboration_invite ===
                                      false && (
                                      <div className="SubText">
                                        Invite pending.
                                      </div>
                                    )}
                                  <div className={styles.MemberOptions}>
                                    <div className={styles.MemberRole}>
                                      <span>Role:</span>
                                      {entry.role.split(".").pop()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      </div>
                    </section>
                    <section className={styles.DetailsSection}>
                      <>
                        <div className="SectionTitle">Manage Project</div>
                        <div className={styles.ProjectInstructions}>
                          <div className={styles.MemberBody}>
                            <div className={styles.MemberTableRow}>
                              <div className={styles.SettingsSectionInfo}>
                                <div className="SubTitle">
                                  {details?.disabled
                                    ? "Enable"
                                    : "Disable"} project
                                </div>
                                <div>
                                  {details?.disabled
                                    ? "Enable and make all project resources accessible (apps, and databases) to the user."
                                    : "Disable and make all project resources inaccessible (apps, and databases) to the user."}
                                </div>
                              </div>
                              <div className={styles.SectionButtons}>
                                <PrimaryButton
                                  onClick={handleEnableButtonClick}
                                  color={ details?.disabled ? "primary-outline" : "red-outline" }
                                  
                                >
                                  {details?.disabled
                                    ? "Enable"
                                    : "Disable"}
                                </PrimaryButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </section>
                  </div>
                )}
              </>
            )}
            {Object.keys(details).length < 0 && error && (
              <div className={styles.CentralSpinner}>{error}</div>
            )}
          </div>
          <AppFooter/>
        </div>
      </div>
      
    </section>
  );
};

export default AdminProjectDetails;
