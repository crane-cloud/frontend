import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import styles from "./AdminProjectDetails.module.css";
import { useParams } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import DateInput from "../../components/DateInput";
import Avatar from "../Avatar";
import React, { useState } from "react";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filterIcon.svg";
import { ReactComponent as ArrowUpDDown } from "../../assets/images/ArrowUp&Down.svg";
import { Link } from "react-router-dom";

const projectUsers = [
  {
    user: {
      email: "khalifanmuwonge@gmail.com",
      name: "khalifan",
    },
    role: "owner",
    accepted_collaboration_invite: true,
  },
  {
    user: {
      email: "blackon.com",
      name: "maxJ",
    },
    role: "member",
    accepted_collaboration_invite: false,
  },
];

const AdminProjectLogs = () => {
  const { clusterID } = useParams();
  const clusterName = localStorage.getItem("clusterName");
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showOperation, setShowOperation] = useState(false);
  const [operationField, setOperationField] = useState("none");
  const [statusField, setStatusField] = useState("none");
  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete"];

  const handleStatusFilter = (item) => {
    setStatusField(item);
    // if (item === "none") {
    //   if (queryParams.includes("&status=")) {
    //     setQueryParams(queryParams.replace(/&status=[^&]+/, ""));
    //   } else if (queryParams.includes("status=")) {
    //     setQueryParams(queryParams.replace(/status=.+?(&|$)/, ""));
    //   }
    // } else {
    //   const NewParameter = `status=${item}`;
    //   if (queryParams.includes("&status=")) {
    //     let value = queryParams;
    //     value = value.replace(/&status=.[^&]+/, "");
    //     value = value === "" ? NewParameter : `${value}&${NewParameter}`;
    //     setQueryParams(value);
    //     //setQueryParams(queryParams.replace(/&status=.+?(&|$)/, `&${NewParameter}`))
    //   } else if (queryParams.includes("status=")) {
    //     let value = queryParams;
    //     value = value.replace(/status=.+?(&|$)/, "");
    //     value = value === "" ? NewParameter : `${value}&${NewParameter}`;
    //     setQueryParams(value);
    //   } else if (queryParams === "") {
    //     setQueryParams(NewParameter);
    //   } else {
    //     setQueryParams(`${queryParams}&${NewParameter}`);
    //   }
    // }
    setShowStatusFilter(false);
  };

  const handleFromDate = (fromTS) => {
    const date = new Date(fromTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setFromTS(formattedDate);
  };
  const switchCalendars = ({ target }) => {
    const calendar = target.getAttribute("value");

    if (calendar === "from" && !showFromCalendar) {
      setShowFromCalendar(true);
      setShowToCalendar(false);
    }

    if (calendar === "to" && !showToCalendar) {
      setShowToCalendar(true);
      setShowFromCalendar(false);
    }
  };
  const closeCalendar = () => {
    if (showToCalendar) {
      setToTS("none");
      setShowToCalendar(false);
      // if (queryParams.includes("&end=")) {
      //   setQueryParams(queryParams.replace(/&end=.+?(&|$)/, ""));
      // } else if (queryParams.includes("end=")) {
      //   setQueryParams(queryParams.replace(/end=.+?(&|$)/, ""));
      // }
    }
    if (showFromCalendar) {
      setFromTS("none");
      setShowFromCalendar(false);
      // if (queryParams.includes("&start=")) {
      //   setQueryParams(queryParams.replace(/&start=.+?(&|$)/, ""));
      // } else if (queryParams.includes("start=")) {
      //   setQueryParams(queryParams.replace(/start=.+?(&|$)/, ""));
      // }
    }
  };
  const handleCalenderSubmission = () => {
    //add to link
    // if (toTS !== "none") {
    //   if (queryParams === "") {
    //     setQueryParams(`end=${toTS}`);
    //   } else {
    //     setQueryParams(`${queryParams}&end=${toTS}`);
    //   }
    // }
    // if (fromTS !== "none") {
    //   if (queryParams === "") {
    //     setQueryParams(`start=${fromTS}`);
    //   } else {
    //     setQueryParams(`${queryParams}&start=${fromTS}`);
    //   }
    // }
    closeCalendar();
  };
  const handleToDate = (toTS) => {
    const date = new Date(toTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setToTS(formattedDate);
  };
  const handleOperationFilter = (item) => {
    setOperationField(item);
    // if (item === "none") {
    //   if (queryParams.includes("&operation=")) {
    //     setQueryParams(queryParams.replace(/&operation=[^&]+/, ""));
    //   } else if (queryParams.includes("operation=")) {
    //     setQueryParams(queryParams.replace(/operation=.+?(&|$)/, ""));
    //   }
    // } else {
    //   const NewParameter = `operation=${item}`;
    //   if (queryParams.includes("&operation=")) {
    //     let value = queryParams;
    //     value = value.replace(/&operation=[^&]+/, "");
    //     value = value === "" ? NewParameter : `${value}&${NewParameter}`;
    //     setQueryParams(value);
    //     //setQueryParams(queryParams.replace(/&operation=.+?(&|$)/, `&${NewParameter}`))
    //   } else if (queryParams.includes("operation=")) {
    //     let value = queryParams;
    //     value = value.replace(/operation=.+?(&|$)/, ``);
    //     value = value === "" ? NewParameter : `${value}&${NewParameter}`;
    //     setQueryParams(value);
    //   } else if (queryParams === "") {
    //     setQueryParams(NewParameter);
    //   } else {
    //     setQueryParams(`${queryParams}&${NewParameter}`);
    //   }
    // }
    setShowOperation(false);
  };

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
                <>
                  <Link
                    className="breadcrumb"
                    to={`/clusters/${clusterID}/projects-listing`}
                  >
                    Projects
                  </Link>
                  <span> / Details</span>
                </>
              }
              showBtn={false}
            />
          </div>

          <div className={styles.CustomSmallContainer}>
            <section className={styles.DetailsSection}>
              <div className="SectionTitle">Project Details</div>
              <div className={styles.ProjectInstructions}>
                <div>
                  <div className="SectionSubTitle">Name</div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div>Black Box Project</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="SectionSubTitle">Description</div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div>Ex-star last projects</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="SectionSubTitle">Date Of Creation</div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div>Tuesday, 13th March, 2022</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="SectionSubTitle">Applications</div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div>Project has 14 application</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="SectionSubTitle">Databases</div>
                  <div className={styles.ProjectButtonRow}>
                    <div className={styles.SettingsSectionInfo}>
                      <div>Project has 50 databases</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                        {projectUsers?.length === 1 ? (
                          <div className="SectionSubTitle">
                            Project has 1 Team Member
                          </div>
                        ) : (
                          <div>
                            Project has {projectUsers?.length} Team Members
                          </div>
                        )}
                      </div>
                      <div className="SubText">
                        Members that have accounts on crane cloud can perform
                        different operations on the project depending on their
                        permission.
                      </div>
                    </div>
                  </div>
                  <div className={styles.MemberTable}>
                    <div className={styles.MemberBody}>
                      {projectUsers?.map((entry, index) => (
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
                          {entry.role !== "owner" &&
                            entry.accepted_collaboration_invite === false && (
                              <div className="SubText">Pending Invitation</div>
                            )}
                          <div className={styles.MemberOptions}>
                            <div
                              className={styles.MemberRole}
                              title="Change Role"
                            >
                              <span>Role:</span>
                              {entry.role}
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
              <div className="SectionTitle">Project logs</div>
              <div className={styles.Header}>
                <div className={styles.Heading}>Activity Feed</div>
                <div className={styles.SimpleForm}>
                  <div className={styles.OuterFilterItem}>
                    <div className={styles.DateSection}>
                      <div className={styles.DateItem}>
                        <div>From:</div>
                        <DateInput
                          handleChange={handleFromDate}
                          showCalendar={showFromCalendar}
                          className={styles.dateField}
                          position={styles.CalenderFromposition}
                          onClick={switchCalendars}
                          onCancel={closeCalendar}
                          onSubmit={handleCalenderSubmission}
                          value="from"
                        />
                      </div>
                      <div className={styles.DateItem}>
                        <div>To:</div>
                        <DateInput
                          handleChange={handleToDate}
                          showCalendar={showToCalendar}
                          position={styles.CalenderToposition}
                          className={styles.dateField}
                          onClick={switchCalendars}
                          onCancel={closeCalendar}
                          onSubmit={handleCalenderSubmission}
                          value="to"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.Filter}>
                    <FilterIcon />
                    <div className={styles.FilterText}>Filter</div>
                    <DownArrow
                      onClick={() => {
                        setFilterOpen(!filterOpen);
                      }}
                      className={styles.DropdownArrowSvg}
                    />
                  </div>
                  {filterOpen && (
                    <div className={styles.RelativeContainer}>
                      <div className={styles.FilterDropdown}>
                        <div className={styles.FilterItemContainer}>
                          <div className={styles.FilterItem}>
                            Status
                            <div className={styles.SelectorBox}>
                              <div className={styles.SelectOption}>
                                {statusField}
                              </div>
                              <ArrowUpDDown
                                onClick={() => {
                                  setShowStatusFilter(!showStatusFilter);
                                }}
                              />
                            </div>
                            {showStatusFilter && (
                              <div className={styles.InnerDropDown}>
                                <div
                                  onClick={() => {
                                    handleStatusFilter("none");
                                  }}
                                  className={styles.InnerDropDownItem}
                                >
                                  none
                                </div>
                                {statusList.map((item, i) => (
                                  <div
                                    key={i}
                                    className={styles.InnerDropDownItem}
                                    onClick={() => {
                                      handleStatusFilter(item);
                                    }}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={styles.FilterItemContainer}>
                          <div className={styles.FilterItem}>
                            Operation
                            <div className={styles.SelectorBox}>
                              <div className={styles.SelectOption}>
                                {operationField}
                              </div>
                              <ArrowUpDDown
                                onClick={() => {
                                  setShowOperation(!showOperation);
                                }}
                              />
                            </div>
                            {showOperation && (
                              <div className={styles.InnerDropDown}>
                                <div
                                  onClick={() => {
                                    handleOperationFilter("none");
                                  }}
                                  className={styles.InnerDropDownItem}
                                >
                                  none
                                </div>
                                {operationsList.map((item, i) => (
                                  <div
                                    key={i}
                                    className={styles.InnerDropDownItem}
                                    onClick={() => {
                                      handleOperationFilter(item);
                                    }}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.Table}>
                <div className={styles.TableRow}>
                  <CheckMark className={styles.Success} />
                  <div className={styles.Row}>
                    <div className={styles.RowCell}>
                      <div>
                        <div className={styles.Bold}>Sample project name</div>
                        <div>1-19-2023 12:14PM</div>
                      </div>
                      <div>
                        Creating project{" "}
                        <span className={styles.Entity}>4344ewe23</span>{" "}
                        <span className={styles.Success}>Successful</span>
                      </div>
                    </div>
                    <div className={styles.LastCell}>
                      <div>Successfully updated project</div>
                    </div>
                  </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.TableRow}>
                  <Danger className={styles.Danger} />
                  <div className={styles.Row}>
                    <div className={styles.RowCell}>
                      <div>
                        <div className={styles.Bold}>Sample project name</div>
                        <div>1-19-2023 12:14PM</div>
                      </div>
                      <div>
                        Creating project{" "}
                        <span className={styles.Entity}>dsesdwe23</span>{" "}
                        <span className={styles.Danger}>Failed</span>
                      </div>
                    </div>
                    <div className={styles.LastCell}>
                      <div>Not right project description</div>
                    </div>
                  </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.TableRow}>
                  <CloudOff className={styles.Danger} />
                  <div className={styles.Row}>
                    <div className={styles.RowCell}>
                      <div>
                        <div className={styles.Bold}>Sample project name</div>
                        <div>1-19-2023 12:14PM</div>
                      </div>
                      <div>
                        Deploying app{" "}
                        <span className={styles.Entity}>4344ewe23</span>{" "}
                        <span className={styles.Danger}>Failed</span>
                      </div>
                    </div>
                    <div className={styles.LastCell}>
                      <div>App deployment has failed.</div>
                    </div>
                  </div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.TableRow}>
                  <Upload className={styles.Success} />
                  <div className={styles.Row}>
                    <div className={styles.RowCell}>
                      <div>
                        <div className={styles.Bold}>Sample project name</div>
                        <div>1-19-2023 12:14PM</div>
                      </div>
                      <div>
                        Deploying app{" "}
                        <span className={styles.Entity}>4344ewe23</span>{" "}
                        <span className={styles.Success}>Successful</span>
                      </div>
                    </div>
                    <div className={styles.LastCell}>
                      <div>Successfully deployed application.</div>
                    </div>
                  </div>
                </div>
                {/* <hr className={styles.hr} /> */}
              </div>
            </section>
            <section className={styles.DetailsSection}>
              <>
                <div className="SectionTitle">Manage Project</div>
                <div className={styles.ProjectInstructions}>
                  <div className={styles.MemberBody}>
                    <div className={styles.MemberTableRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div className="SubTitle">Enable project</div>
                        <div>
                          Enable and make all project resources visible (apps,
                          and databases)
                        </div>
                      </div>
                      <div className={styles.SectionButtons}>
                        <PrimaryButton onClick={() => {}} small color="primary">
                          Enable
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className={styles.MemberTableRow}>
                      <div className={styles.SettingsSectionInfo}>
                        <div className="SubTitle">Disable project</div>
                        <div>
                          Disable all the recsources under this application.
                        </div>
                      </div>
                      <div className={styles.SectionButtons}>
                        <PrimaryButton onClick={() => {}} small color="red">
                          Disable
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProjectLogs;
