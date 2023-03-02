import React from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
// import PrimaryButton from "../../components/PrimaryButton";
import styles from "./ProjectLogs.module.css";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
// import { ReactComponent as Upload } from "../../assets/images/upload-cloud(1).svg";
// import { ReactComponent as Trash } from "../../assets/images/trash-2.svg";
// import { ReactComponent as Startup } from "../../assets/images/trending-up.svg";
import { handleGetRequest } from "../../apis/apis.js";
import DateInput from "../../components/DateInput";
import getProjectDatabases from "../../redux/actions/databaseList";
import getAppsList from "../../redux/actions/appsList";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filterIcon.svg";
import { ReactComponent as ArrowUpDDown } from "../../assets/images/ArrowUp&Down.svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { DisplayDateTime } from "../../helpers/dateConstants";

const ProjectLogs = (props) => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [feedback, setFeedback] = useState("");
  const { data } = useSelector((state) => state.user);
  const { projectID } = useParams();
  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { databases, databasesFetched } = useSelector(
    (state) => state.projectDatabasesReducer
  );
  const { apps, isRetrieved } = useSelector((state) => state.appsListReducer);
  const getProjectName = (id) => {
    return projects?.find((project) => project.id === id).name;
  };
  const baseLink = `/users/activities?a_project_id=${projectID}&`;
  const [filterOpen, setFilterOpen] = useState(false);
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

  //dates
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");

  //apps
  const [showApps, setShowApps] = useState(false);
  const [appsField, setAppsField] = useState("none");

  //databases
  const [showDatabases, setShowDatabases] = useState(false);
  const [databasesField, setDatabasesField] = useState("none");

  //constant lists
  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete"];
  const modelsList = ["Project"];

  useEffect(() => {
    fetchActivityLogs(baseLink);
    // fetch apps
    // fetch dbs
    getProjectDatabases(projectID);
    getAppsList(projectID);
  }, [projectID,baseLink]);

  useEffect(() => {
    fetchActivityLogs(`${baseLink}${queryParams}`);
    setFeedback("");
  }, [queryParams,baseLink]);

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
  };
  const handleToDate = (toTS) => {
    const date = new Date(toTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setToTS(formattedDate);
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
      if (queryParams.includes("&end=")) {
        setQueryParams(queryParams.replace(/&end=.+?(&|$)/, ""));
      } else if (queryParams.includes("end=")) {
        setQueryParams(queryParams.replace(/end=.+?(&|$)/, ""));
      }
    }
    if (showFromCalendar) {
      setFromTS("none");
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
  const handleAppsFilter = (item) => {
    setAppsField(item.name);
    setShowApps(false);
    if (item.name === "none") {
      if (queryParams.includes("&a_app_id=")) {
        setQueryParams(queryParams.replace(/&a_app_id=[^&]+/, ""));
      } else if (queryParams.includes("a_app_id=")) {
        setQueryParams(queryParams.replace(/a_app_id=.+?(&|$)/, ""));
      }
    } else {
      let currentParams = queryParams;
      const NewParameter = `a_app_id=${projects[item.index].id}`;
      if (currentParams.includes("&a_db_id=")) {
        setQueryParams(queryParams.replace(/&a_db_id=[^&]+/, ""));
      }
      if (currentParams.includes("a_db_id=")) {
        setQueryParams(queryParams.replace(/a_db_id=.+?(&|$)/, ""));
      }
      if (currentParams.includes("&a_app_id=")) {
        let value = currentParams;
        value = value.replace(/&a_app_id=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        // setQueryParams(queryParams.replace(/&a_app_id=.+?(&|$)/, `&${NewParameter}`))
      } else if (currentParams.includes("a_app_id=")) {
        let value = currentParams;
        value = value.replace(/a_app_id=.+?(&|$)/, ``);
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (currentParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
  };
  const handleDataBasesFilter = (item) => {
    setDatabasesField(item.name);
    setShowDatabases(false);
    if (item.name === "none") {
      if (queryParams.includes("&a_db_id=")) {
        setQueryParams(queryParams.replace(/&a_db_id=[^&]+/, ""));
      } else if (queryParams.includes("a_db_id=")) {
        setQueryParams(queryParams.replace(/a_db_id=.+?(&|$)/, ""));
      }
    } else {
      // remove spacified app
      let currentParams = queryParams;
      const NewParameter = `a_db_id=${projects[item.index].id}`;
      if (currentParams.includes("&a_app_id=")) {
        setQueryParams(queryParams.replace(/&a_app_id=[^&]+/, ""));
      }
      if (currentParams.includes("a_app_id=")) {
        setQueryParams(queryParams.replace(/a_app_id=.+?(&|$)/, ""));
      }

      if (currentParams.includes("&a_db_id=")) {
        let value = currentParams;
        value = value.replace(/&a_db_id=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
        // setQueryParams(queryParams.replace(/&a_db_id=.+?(&|$)/, `&${NewParameter}`))
      } else if (currentParams.includes("a_db_id=")) {
        let value = currentParams;
        value = value.replace(/a_db_id=.+?(&|$)/, ``);
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
      } else if (currentParams === "") {
        setQueryParams(NewParameter);
      } else {
        setQueryParams(`${queryParams}&${NewParameter}`);
      }
    }
  };

  return (
    <DashboardLayout header="Project Activity" name={getProjectName(projectID)}>
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
                      <div className={styles.SelectOption}>{statusField}</div>
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
                <div className={styles.FilterItemContainer}>
                  <div className={styles.FilterItem}>
                    Model
                    <div className={styles.SelectorBox}>
                      <div className={styles.SelectOption}>{modelField}</div>
                      <ArrowUpDDown
                        onClick={() => {
                          setShowModel(!showModel);
                        }}
                      />
                    </div>
                    {showModel && (
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
                  className={`${styles.FilterItemContainer} ${styles.opacityClass}`}
                >
                  <div className={styles.FilterItem}>
                    Project
                    <div className={styles.SelectorBox}>
                      <div className={styles.SelectOption}>
                        {getProjectName(projectID)}
                      </div>
                      <ArrowUpDDown />
                    </div>
                  </div>
                </div>
                <div
                  className={
                    databasesField !== "none"
                      ? `${styles.FilterItemContainer} ${styles.opacityClass}`
                      : styles.FilterItemContainer
                  }
                >
                  <div className={styles.FilterItem}>
                    Applications
                    <div className={styles.SelectorBox}>
                      <div className={styles.SelectOption}>{appsField}</div>
                      <ArrowUpDDown
                        onClick={() => {
                          if (databasesField === "none") {
                            setShowApps(!showApps);
                          }
                        }}
                      />
                    </div>
                    {showApps && databasesField === "none" && (
                      <div className={styles.InnerDropDownLowerhalf}>
                        <div
                          onClick={() => {
                            handleAppsFilter({
                              name: "none",
                              index: -1,
                            });
                          }}
                          className={styles.InnerDropDownItem}
                        >
                          none
                        </div>
                        {!isRetrieved && (
                          <div className={styles.InnerDropDownItem}>
                            loading...
                          </div>
                        )}
                        {apps.apps.length > 0 &&
                          isRetrieved &&
                          apps?.apps?.map((item, index) => (
                            <div
                              key={index}
                              className={styles.InnerDropDownItem}
                              onClick={() => {
                                handleAppsFilter({
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
                <div
                  className={
                    appsField !== "none"
                      ? `${styles.FilterItemContainer} ${styles.opacityClass}`
                      : styles.FilterItemContainer
                  }
                >
                  <div className={styles.FilterItem}>
                    Databases
                    <div className={styles.SelectorBox}>
                      <div className={styles.SelectOption}>
                        {databasesField}
                      </div>
                      <ArrowUpDDown
                        onClick={() => {
                          if (appsField === "none") {
                            setShowDatabases(!showDatabases);
                          }
                        }}
                      />
                    </div>
                    {showDatabases && appsField === "none" && (
                      <div className={styles.InnerDropDownLowerhalf}>
                        <div
                          onClick={() => {
                            handleDataBasesFilter({
                              name: "none",
                              index: -1,
                            });
                          }}
                          className={styles.InnerDropDownItem}
                        >
                          none
                        </div>
                        {!databasesFetched && (
                          <div className={styles.InnerDropDownItem}>
                            loading...
                          </div>
                        )}
                        {databases.length > 0 &&
                          databasesFetched &&
                          databases?.map((item, index) => (
                            <div
                              key={index}
                              className={styles.InnerDropDownItem}
                              onClick={() => {
                                handleDataBasesFilter({
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
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="BigCard">
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
                    <Avatar name={data.name} className={styles.UserAvatar} />
                    <div>
                      <div className={styles.ActivityEmail}>{data.email}:</div>
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
        {/* comment section below should be kept
       as a guide on how to render different types of logs */}
        {/* <div className={styles.TableRow}>
          <CheckMark className={styles.Success} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.ActivityEmail}>{data.email}:</div>
                <div className={styles.ActivityDate}>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div >
                Creating application{" "}
                <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.ActivityDescription}>
              <div>Successfully created application</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />

        <div className={styles.TableRow}>
          <Danger className={styles.Danger} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.username} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>Muwonge@gmail.com</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Updating project{" "}
                <span className={styles.Entity}>dsesdwe23</span>{" "}
                <span className={styles.Danger}>Failed</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Project update description failed.</div>
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
                Deploying app <span className={styles.Entity}>4344ewe23</span>{" "}
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
                Deploying app <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Successfully deployed application.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <Trash className={styles.Danger} />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Deleting app <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Successfully deleted application.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.TableRow}>
          <Startup />
          <div className={styles.Row}>
            <div className={styles.RowCell}>
              <Avatar name={data.name} className={styles.UserAvatar} />
              <div>
                <div className={styles.Bold}>{data.email}</div>
                <div>Tuesday 12-12-2022 16:00:03</div>
              </div>
              <div>
                Create project <span className={styles.Entity}>4344ewe23</span>{" "}
                <span className={styles.Success}>Successful</span>
              </div>
            </div>
            <div className={styles.LastCell}>
              <div>Created project.</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} /> */}
      </div>
    </DashboardLayout>
  );
};
export default ProjectLogs;
