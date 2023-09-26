import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import { handleGetRequest } from "../../apis/apis.js";
import InformationBar from "../../components/InformationBar";
import styles from "./UserActivity.module.css";
import DateInput from "../../components/DateInput";
import getUserProjects from "../../redux/actions/projectsList";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as UpArrow } from "../../assets/images/up-arrow.svg";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filterIcon.svg";
import { ReactComponent as ArrowUpDDown } from "../../assets/images/ArrowUp&Down.svg";
import { DisplayDateTime } from "../../helpers/dateConstants";
import Spinner from "../../components/Spinner";
import AppFooter from "../../components/appFooter";

const UserActivity = (props) => {
  const { data } = useSelector((state) => state.user);
  const { projects, isFetched } = useSelector(
    (state) => state.userProjectsReducer
  );
  const baseLink = "/users/activities?";
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  //filter states
  //status
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [statusField, setStatusField] = useState("none");
  //operation
  const [showOperation, setShowOperation] = useState(false);
  const [operationField, setOperationField] = useState("none");
  //model
  const [showModel, setShowModel] = useState(false);
  const [modelField, setModelField] = useState("none");
  //projects
  const [showProjects, setShowProjects] = useState(false);
  const [projectsField, setProjectsField] = useState("none");
  //dates
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");
  const [dateError, setDateError] = useState("");
  
  //constant lists
  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete"];
  const modelsList = ["Project", "App", "Database"];

  useEffect(() => {
    fetchActivityLogs(baseLink);
    getUserProjects(data.id);
  }, [data]);

  useEffect(() => {
    fetchActivityLogs(`${baseLink}${queryParams}`);
    setFeedback("");
  }, [queryParams]);

  const fetchActivityLogs = (link) => {
    setLoading(true);
    //projectID
    handleGetRequest(link)
      .then((response) => {
        if (response.data.data.activity.length > 0) {
          setLogs(response.data.data.activity);
        } else {
          setFeedback("No logs for you");
        }
        setLoading(false);
      })
      .catch((error) => {
        setFeedback("Failed to fetch logs, please try again");
        setLoading(false);
      });
  };
  const handleFromDate = (fromTS) => {
    const date = new Date(fromTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setFromTS(formattedDate);
    setDateError("");
  };
  const handleToDate = (toTS) => {
    const date = new Date(toTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setToTS(formattedDate);
    setDateError("");
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
      //setToTS("none");
      setShowToCalendar(false);
      if (queryParams.includes("&end=")) {
        setQueryParams(queryParams.replace(/&end=.+?(&|$)/, ""));
      } else if (queryParams.includes("end=")) {
        setQueryParams(queryParams.replace(/end=.+?(&|$)/, ""));
      }
    }
    if (showFromCalendar) {
      //setFromTS("none");
      setShowFromCalendar(false);
      if (queryParams.includes("&start=")) {
        setQueryParams(queryParams.replace(/&start=.+?(&|$)/, ""));
      } else if (queryParams.includes("start=")) {
        setQueryParams(queryParams.replace(/start=.+?(&|$)/, ""));
      }
    }
  };
  const handleCalenderSubmission = () => {
    //add to link
    const toDate = new Date(toTS) 
    const fromDate = new Date(fromTS)
    if(toTS !== "none" && fromTS !== "none" && (toDate < fromDate )){
      setDateError("The 'end' date must be greater than the 'start' date");
      setFromTS("none");
      setToTS("none");
      closeCalendar();
      return;
    }
    if (toTS !== "none") {
      if (queryParams === "") {
        setQueryParams(`end=${toTS}`);
      } else {
        setQueryParams(`${queryParams}&end=${toTS}`);
      }
    }
    if (fromTS !== "none") {
      if (queryParams === "") {
        setQueryParams(`start=${fromTS}`);
      } else {
        setQueryParams(`${queryParams}&start=${fromTS}`);
      }
    }
    closeCalendar();
  };
  const handleStatusFilter = (item) => {
    setStatusField(item);
    if (item === "none") {
      if (queryParams.includes("&status=")) {
        setQueryParams(queryParams.replace(/&status=[^&]+/, ""));
      } else if (queryParams.includes("status=")) {
        setQueryParams(queryParams.replace(/status=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `status=${item}`;
      if (queryParams.includes("&status=")) {
        let value = queryParams;
        value = value.replace(/&status=.[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        //setQueryParams(queryParams.replace(/&status=.+?(&|$)/, `&${NewParameter}`))
      } else if (queryParams.includes("status=")) {
        let value = queryParams;
        value = value.replace(/status=.+?(&|$)/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (queryParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
    setShowStatusFilter(false);
  };
  const handleOperationFilter = (item) => {
    setOperationField(item);
    if (item === "none") {
      if (queryParams.includes("&operation=")) {
        setQueryParams(queryParams.replace(/&operation=[^&]+/, ""));
      } else if (queryParams.includes("operation=")) {
        setQueryParams(queryParams.replace(/operation=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `operation=${item}`;
      if (queryParams.includes("&operation=")) {
        let value = queryParams;
        value = value.replace(/&operation=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        //setQueryParams(queryParams.replace(/&operation=.+?(&|$)/, `&${NewParameter}`))
      } else if (queryParams.includes("operation=")) {
        let value = queryParams;
        value = value.replace(/operation=.+?(&|$)/, ``);
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (queryParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
    setShowOperation(false);
  };
  const handleModelFilter = (item) => {
    setModelField(item);

    if (item === "none") {
      if (queryParams.includes("&model=")) {
        setQueryParams(queryParams.replace(/&model=[^&]+/, ""));
      } else if (queryParams.includes("model=")) {
        setQueryParams(queryParams.replace(/model=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `model=${item}`;
      if (queryParams.includes("&model=")) {
        let value = queryParams;
        value = value.replace(/&model=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        // setQueryParams(queryParams.replace(/&model=.+?(&|$)/, `&${NewParameter}`))
      } else if (queryParams.includes("model=")) {
        let value = queryParams;
        value = value.replace(/model=.+?(&|$)/, ``);
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (queryParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
    setShowModel(false);
  };
  const handleProjectFilter = (item) => {
    setProjectsField(item.name);
    setShowProjects(false);

    if (item.name === "none") {
      if (queryParams.includes("&a_project_id=")) {
        setQueryParams(queryParams.replace(/&a_project_id=[^&]+/, ""));
      } else if (queryParams.includes("a_project_id=")) {
        setQueryParams(queryParams.replace(/a_project_id=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `a_project_id=${projects[item.index].id}`;
      if (queryParams.includes("&a_project_id=")) {
        let value = queryParams;
        value = value.replace(/&a_project_id=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        // setQueryParams(queryParams.replace(/&a_project_id=.+?(&|$)/, `&${NewParameter}`))
      } else if (queryParams.includes("a_project_id=")) {
        let value = queryParams;
        value = value.replace(/a_project_id=.+?(&|$)/, ``);
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (queryParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
  };

  return (
      <div className={styles.Page}>
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div>
            <InformationBar header="User Activity" />
          </div>
          <div className={styles.SmallContainer}>
            <div className={styles.Header}>
              <div className={styles.Heading}>
                <div className={styles.ActivityHeader}>
                  <span className={styles.BackIconArea}>
                    <Link to={`/projects`}>
                      <BackButton
                        color="#f7b21f"
                        className={styles.BackIconSize}
                      />
                    </Link>
                  </span>
                  <span className={styles.ActivityPageTitle}>
                    Activity Feed
                  </span>
                </div>
              </div>
              <div className={styles.SimpleForm}>
                <div className={styles.OuterFilterItem}>
                  <div className={styles.DateSection}>
                    <div className={styles.DateItem}>
                      <div>Start:</div>
                      <DateInput
                        handleChange={handleFromDate}
                        showCalendar={showFromCalendar}
                        className={styles.dateField}
                        position={styles.CalenderFromposition}
                        dateValue={fromTS}
                        onClick={switchCalendars}
                        onCancel={closeCalendar}
                        onSubmit={handleCalenderSubmission}
                        value="from"
                      />
                    </div>
                    <div className={styles.DateItem}>
                      <div>End:</div>
                      <DateInput
                        handleChange={handleToDate}
                        showCalendar={showToCalendar}
                        position={styles.CalenderToposition}
                        className={styles.dateField}
                        dateValue={toTS}
                        onClick={switchCalendars}
                        onCancel={closeCalendar}
                        onSubmit={handleCalenderSubmission}
                        value="to"
                      />
                    </div>
                  </div>
                  <div className={styles.errorSection}>{dateError}</div>
                </div>
                <div className={styles.Filter}>
                  <FilterIcon />
                  <div className={styles.FilterText}>Filter</div>
                  {!filterOpen && (
                    <DownArrow
                      className={styles.DownArrow}
                      onClick={() => {
                        setFilterOpen(!filterOpen);
                      }}
                    />
                  )}
                  {filterOpen && (
                    <UpArrow
                      className={styles.UpArrow}
                      onClick={() => {
                        setFilterOpen(!filterOpen);
                      }}
                    />
                  )}
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
                              className={styles.DoubleArrow}
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
                              className={styles.DoubleArrow}
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
                      <div
                        className={
                          projectsField !== "none"
                            ? `${styles.FilterItemContainer} ${styles.opacityClass}`
                            : styles.FilterItemContainer
                        }
                      >
                        <div className={styles.FilterItem}>
                          Model
                          <div className={styles.SelectorBox}>
                            <div className={styles.SelectOption}>
                              {modelField}
                            </div>
                            <ArrowUpDDown
                              className={styles.DoubleArrow}
                              onClick={() => {
                                if (projectsField === "none") {
                                  setShowModel(!showModel);
                                }
                              }}
                            />
                          </div>
                          {showModel && projectsField === "none" && (
                            <div className={styles.InnerDropDownLowerhalf}>
                              <div
                                onClick={() => {
                                  handleModelFilter("none");
                                }}
                                className={styles.InnerDropDownItem}
                              >
                                none
                              </div>
                              {modelsList.map((item, i) => (
                                <div
                                  key={i}
                                  className={styles.InnerDropDownItem}
                                  onClick={() => {
                                    handleModelFilter(item);
                                  }}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          modelField === "App" || modelField === "Database"
                            ? `${styles.FilterItemContainer} ${styles.opacityClass}`
                            : styles.FilterItemContainer
                        }
                      >
                        <div className={styles.FilterItem}>
                          Project
                          <div className={styles.SelectorBox}>
                            <div className={styles.SelectOption}>
                              {projectsField}
                            </div>
                            <ArrowUpDDown
                              className={styles.DoubleArrow}
                              onClick={() => {
                                if (
                                  modelField === "none" ||
                                  modelField === "Project"
                                ) {
                                  setShowProjects(!showProjects);
                                }
                              }}
                            />
                          </div>
                          {showProjects &&
                            (modelField === "none" ||
                              modelField === "Project") && (
                              <div className={styles.InnerDropDownLowerhalf}>
                                <div
                                  onClick={() => {
                                    handleProjectFilter({
                                      name: "none",
                                      index: -1,
                                    });
                                  }}
                                  className={styles.InnerDropDownItem}
                                >
                                  none
                                </div>
                                {!isFetched && (
                                  <div className={styles.InnerDropDownItem}>
                                    loading...
                                  </div>
                                )}
                                {projects.length > 0 &&
                                  isFetched &&
                                  projects?.map((item, index) => (
                                    <div
                                      key={index}
                                      className={styles.InnerDropDownItem}
                                      onClick={() => {
                                        handleProjectFilter({
                                          name: item.name,
                                          index: index,
                                        });
                                      }}
                                    >
                                      {item.name}
                                    </div>
                                  ))}
                              </div>
                            )}
                        </div>
                      </div>
                      {/* <div className={styles.FilterItemContainer}>
                        <div className={styles.FilterItem}>
                          Applications
                          <div className={styles.SelectorBox}>
                            <div className={styles.SelectOption}>none</div>
                            <ArrowUpDDown />
                          </div>
                        </div>
                      </div>
                      <div className={styles.FilterItemContainer}>
                        <div className={styles.FilterItem}>
                          Databases
                          <div className={styles.SelectorBox}>
                            <div className={styles.SelectOption}>none</div>
                            <ArrowUpDDown />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`${styles.LogsContainer}`}>
              {loading ? (
                <Spinner />
              ) : feedback !== "" ? (
                <div className={styles.NoResourcesMessage}>{feedback}</div>
              ) : (
                logs.map((item, index) => (
                  <div key={index}>
                    <div className={styles.TableRow}>
                      {item.status === "Success" ? (
                        <CheckMark className={styles.Success} />
                      ) : (
                        <Danger className={styles.Danger} />
                      )}
                      <div className={styles.Row}>
                        <div className={styles.RowCell}>
                          <Avatar
                            name={data.name}
                            className={styles.UserAvatar}
                          />
                          <div>
                            <div className={styles.ActivityEmail}>
                              {data.email}:
                            </div>
                            <div className={styles.ActivityDate}>
                              {DisplayDateTime(new Date(item.creation_date))}
                            </div>
                          </div>
                          <div>
                            {item.operation}
                            <span className={styles.Entity}>
                              {item._id.$oid}
                            </span>{" "}
                            <span
                              className={
                                item.status === "Success"
                                  ? styles.Success
                                  : styles.Danger
                              }
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <div className={styles.ActivityDescription}>
                          <div>{item.description}</div>
                        </div>
                      </div>
                    </div>
                    {index !== logs.length - 1 && <hr className={styles.hr} />}
                  </div>
                ))
              )}

              {/* <div className={styles.TableRow}>
              <Danger className={styles.Danger} />
              <div className={styles.Row}>
                <div className={styles.RowCell}>
                  <Avatar name={data.name} className={styles.UserAvatar} />
                  <div>
                    <div className={styles.Bold}>{data.email}</div>
                    <div>Tuesday 12-12-2022 16:00:03</div>
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
                  <Avatar name={data.name} className={styles.UserAvatar} />
                  <div>
                    <div className={styles.Bold}>{data.email}</div>
                    <div>Tuesday 12-12-2022 16:00:03</div>
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
                  <Avatar name={data.name} className={styles.UserAvatar} />
                  <div>
                    <div className={styles.Bold}>{data.email}</div>
                    <div>Tuesday 12-12-2022 16:00:03</div>
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
            <hr className={styles.hr} /> */}
            </div>
          </div>
        </div>
         <AppFooter position="absolute"/>
      </div>
  );
};
export default UserActivity;
