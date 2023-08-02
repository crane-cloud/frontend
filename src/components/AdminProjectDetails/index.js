import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import styles from "./AdminProjectDetails.module.css";
import { useParams } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import { handleGetRequest,handlePostRequestWithOutDataObject } from "../../apis/apis.js";
import Avatar from "../Avatar";
import React, { useState, useEffect,useCallback } from "react";
import ActivityLogs from "../ActivityLogs";
import Spinner from "../Spinner";
import { dateInWords } from "../../helpers/dateConstants";
import Modal from "../Modal";
import Feedback from "../Feedback";

import { Link } from "react-router-dom";

const AdminProjectLogs = () => {
  const clusterID = localStorage.getItem("clusterID");
  const clusterName = localStorage.getItem("clusterName");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState({});

  const [disablingProject, setDisablingProject] =useState(false)
  const [disableProjectError, setDisableProjectError] =useState("")
  const [openDisableProjectModel,setOpenDisableProjectModel] = useState(false)

  //need to get all current project details
  const { projectID } = useParams();

 

  const fetchProjectDetails = useCallback(() => {
    setLoading(true);
    handleGetRequest(`/projects/${projectID}`)
      .then((response) => {
        setDetails(response.data.data.project);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch project detail please refresh");
        setLoading(false);
      });
  }, [projectID]);
  

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleDisableProject =(e,disabled) =>{
    e.preventDefault();
    setDisablingProject(true)
    let apiEndpoint
    if(disabled){
      apiEndpoint = `/projects/${projectID}/admin_enable`;
    }else{
      apiEndpoint = `/projects/${projectID}/admin_disable`;
    }
    handlePostRequestWithOutDataObject(
      {},
      apiEndpoint
    ).then(() => {
        //reset to projects page to re populate redux
        window.location.href = `/projects/${projectID}/details`;
      })
      .catch((error) => {
        setDisableProjectError("Process failed, please try again.")
        setDisablingProject(false)
      }); 
  }
  return (
    <section className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className={styles.SideBarSection}>
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className={styles.MainContentSection}>
          <div className="InformationBarSection">
            <InformationBar
              header={
                <span>
                  <Link
                    className="breadcrumb"
                    to={`/clusters/${clusterID}/projects`}
                  >
                    Overview
                  </Link>
                   /
                  <Link
                    className="breadcrumb"
                    to={`/clusters/${clusterID}/projects-listing`}
                  >
                    Projects
                  </Link>
                  <span> / Details</span>
                </span>
              }
              showBtn={false}
            />
          </div>
          <div className={styles.CustomSmallContainer}>
            {loading ? (
              <div className={styles.CentralSpinner}>
                <Spinner />
              </div>
            ) : (
              <>
             {!error &&<>
              {/* Project information */}
              <section className={styles.DetailsSection}>
                <div className="SectionTitle">Project Details</div>
                <div className={styles.ProjectInstructions}>
                  <div>
                    <div className="SectionSubTitle">Name</div>
                    <div className={styles.ProjectButtonRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div>{details.name}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="SectionSubTitle">Description</div>
                    <div className={styles.ProjectButtonRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div>{details.description}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="SectionSubTitle">Date Of Creation</div>
                    <div className={styles.ProjectButtonRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div>{dateInWords(details.date_created)} </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="SectionSubTitle">Applications</div>
                    <div className={styles.ProjectButtonRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div>
                          Project has {details.apps_count} application
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="SectionSubTitle">Databases</div>
                    <div className={styles.ProjectButtonRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div>
                          Project has {details?.databases?.length} databases
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Membership */}
              <section className={styles.DetailsSection}>
                <div className="SectionTitle">Membership</div>
                <div className={styles.ProjectInstructions}>
                  {/* {fetchingProjectMembers ? (
          <Spinner />
        ) : ( */}
                  <>
                    <div className={styles.MembershipHeader}>
                      <div className={styles.MemberSection}>
                        <div className={styles.SettingsSectionInfoHeader}>
                          {details.users?.length === 1 ? (
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
                          <div className={styles.MemberTableRow} key={index}>
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
                                <div className="SubText">Invite pending.</div>
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
              <ActivityLogs projectID={projectID} />
              {/* Management */}
              <section className={styles.DetailsSection}>
                <>
                  <div className="SectionTitle">Manage Project</div>
                  <div className={styles.ProjectInstructions}>
                    <div className={styles.MemberBody}>
                      <div className={styles.MemberTableRow}>
                        <div className={styles.SettingsSectionInfo}>
                          <div className="SubTitle">{details.admin_disabled ?"Enable":"Disable"} project</div>
                          <div>
                            {details.admin_disabled ? "Enable and make all project resources accessible (apps, and databases) to the user." :
                            "Disable and make all project resources inaccessible (apps, and databases) to the user." 
                            }
                          </div>
                        </div>
                        <div className={styles.SectionButtons}>
                          <PrimaryButton
                            onClick={() => {setOpenDisableProjectModel(true)}}
                            small
                            color={details.disabled?"primary":"red"}
                          >
                            {details.admin_disabled ?"Enable":"Disable"}
                          </PrimaryButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </section>
            </>}</>
            )}
            {Object.keys(details).length < 0 && error && (
              <div className={styles.CentralSpinner}>{error}</div>
            )}
          </div>
        </div>
      </div>
      {openDisableProjectModel && (
        <div className={styles.ProjectDeleteModel}>
          <Modal
            showModal={openDisableProjectModel}
            onClickAway={()=>{setOpenDisableProjectModel(false)}}
          >
            <div className={styles.DeleteProjectModel}>
              <div className={styles.DeleteProjectModalUpperSection}>
                <div className={styles.WarningContainer}>
                  <div className={styles.DeleteDescription}>
                    Are you sure you want to {details.admin_disabled ?"enable":"disable"}&nbsp;
                    <span>{details.name}</span>
                    &nbsp;?
                  </div>
                  <div className={styles.DisableSubDescription}>
                    This will {details.disabled? "enable" :"disable"}  billing and external access of resources in this project.
                  </div>
                </div>
              </div>
              <div className={styles.DeleteProjectModalLowerSection}>
                <div className={styles.DeleteProjectModelButtons}>
                  <PrimaryButton
                    className="CancelBtn"
                    onClick={()=>{setOpenDisableProjectModel(false)}}
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton
                    color={details.disabled?"primary":"red"}
                    onClick={(e) =>
                      handleDisableProject(e, details.disabled)
                    }
                  >
                    {disablingProject ? <Spinner /> : details.disabled===true ? "Enable" :"Disable"}
                  </PrimaryButton>
                </div>

                {disableProjectError && (
                  <Feedback message={disableProjectError} type="error" />
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </section>
  );
};

export default AdminProjectLogs;
