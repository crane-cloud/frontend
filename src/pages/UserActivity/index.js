import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import { handleGetRequest } from "../../apis/apis.js";
import InformationBar from "../../components/InformationBar";
import styles from "./UserActivity.module.css";
import DateInput from "../../components/DateInput";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
import { DisplayDateTime } from "../../helpers/dateConstants";
import Spinner from "../../components/Spinner";
import AppFooter from "../../components/appFooter";
import Select from "../../components/Select/index.js";
import Feedback from "../../components/Feedback/index.js";
import {
  transformListForSelect,
  transformProjectsListForSelect,
} from "../../helpers/listTransforms.js";

const UserActivity = () => {
  const { data } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);
  const baseLink = "/users/activities?";
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  //dates
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");
  const [dateError, setDateError] = useState("");

  //constant lists
  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete", "Enable", "Disable"];

  // Transforming values for Select Component
  const transformedStatusList = transformListForSelect(statusList);
  const transformedOperationsList = transformListForSelect(operationsList);
  const transformedProjectNames = transformProjectsListForSelect(projects);

  useEffect(() => {
    fetchActivityLogs(baseLink);
  }, []);

  useEffect(() => {
    fetchActivityLogs(`${baseLink}${queryParams}`);
    setFeedback("");
  }, [queryParams]);

  const fetchActivityLogs = (link) => {
    setLoading(true);
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

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    handleGetRequest("/projects")
      .then((response) => {
        if (response.data.data.projects.length > 0) {
          let totalNumberOfProjects = response.data.data.pagination.total;
          handleGetRequest("/projects?per_page=" + totalNumberOfProjects)
            .then((response) => {
              if (response.data.data.projects.length > 0) {
                setProjects(response.data.data.projects);
              } else {
                setFeedback("No projects found");
              }
            })
            .catch((error) => {
              setFeedback("Failed to fetch all projects, please try again");
            });
        } else {
          setFeedback("No projects found");
        }
      })
      .catch((error) => {
        setFeedback("Failed to fetch projects, please try again");
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
    const toDate = new Date(toTS);
    const fromDate = new Date(fromTS);
    if (toTS !== "none" && fromTS !== "none" && toDate < fromDate) {
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
    if (item === "none") {
      if (queryParams.includes("&status=")) {
        setQueryParams(queryParams.replace(/&status=[^&]+/, ""));
      } else if (queryParams.includes("status=")) {
        setQueryParams(queryParams.replace(/status=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `status=${item.value}`;
      if (queryParams.includes("&status=")) {
        let value = queryParams;
        value = value.replace(/&status=.[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
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
  };

  const handleOperationFilter = (item) => {
    if (item === "none") {
      if (queryParams.includes("&operation=")) {
        setQueryParams(queryParams.replace(/&operation=[^&]+/, ""));
      } else if (queryParams.includes("operation=")) {
        setQueryParams(queryParams.replace(/operation=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `operation=${item.value}`;
      if (queryParams.includes("&operation=")) {
        let value = queryParams;
        value = value.replace(/&operation=[^&]+/, "");
        value = value === "" ? NewParameter : `${value}&${NewParameter}`;
        setQueryParams(value);
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
  };

  const handleProjectFilter = (item) => {
    if (item.name === "none") {
      if (queryParams.includes("&a_project_id=")) {
        setQueryParams(queryParams.replace(/&a_project_id=[^&]+/, ""));
      } else if (queryParams.includes("a_project_id=")) {
        setQueryParams(queryParams.replace(/a_project_id=.+?(&|$)/, ""));
      }
    } else {
      const NewParameter = `a_project_id=${item.id}`;
      let newValue = queryParams;

      if (queryParams.includes("a_project_id=")) {
        newValue = queryParams.replace(/a_project_id=[^&]*/, NewParameter);
      } else {
        newValue = queryParams
          ? `${queryParams}&${NewParameter}`
          : NewParameter;
      }

      setQueryParams(newValue);
    }
  };

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="Mainsection">
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar
              header={
                <span>
                  <Link className="breadcrumb" to={`/projects`}>
                    User Activity
                  </Link>
                  / {user?.data?.name}
                </span>
              }
              showBtn={false}
              showBackBtn
            />
          </div>

          <div className={styles.SmallContainer}>
            <div className={styles.Header}>
              <div className={styles.FilterItemsRow}>
                <div className={styles.ActivityHeader}>
                  <span className={styles.ActivityPageTitle}>Filters</span>
                </div>

                <div className={styles.FilterItemDropdown}>
                  <span className={styles.FilterItemLabel}>Date</span>
                  <div className={styles.DateBtn}>
                    <div className="DateInputsSection">
                      <DateInput
                        label="From"
                        position="from"
                        hideTime={true}
                        handleChange={handleFromDate}
                        showCalendar={showFromCalendar}
                        dateValue={fromTS}
                        onClick={switchCalendars}
                        onCancel={closeCalendar}
                        onSubmit={handleCalenderSubmission}
                        value="from"
                      />
                      <DateInput
                        label="To"
                        position="to"
                        hideTime={true}
                        handleChange={handleToDate}
                        showCalendar={showToCalendar}
                        dateValue={toTS}
                        onClick={switchCalendars}
                        onCancel={closeCalendar}
                        onSubmit={handleCalenderSubmission}
                        value="to"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.FilterItemDropdown}>
                  <span className={styles.FilterItemLabel}>Project</span>
                  <Select
                    placeholder="Choose Project"
                    options={transformedProjectNames}
                    onChange={(selectedOption) =>
                      handleProjectFilter(selectedOption)
                    }
                  />
                </div>

                <div className={styles.FilterItemDropdown}>
                  <span className={styles.FilterItemLabel}>Status</span>
                  <Select
                    placeholder="Choose Status"
                    options={transformedStatusList}
                    onChange={(selectedOption) =>
                      handleStatusFilter(selectedOption)
                    }
                  />
                </div>

                <div className={styles.FilterItemDropdown}>
                  <span className={styles.FilterItemLabel}>Operation</span>
                  <Select
                    placeholder="Choose Operation"
                    options={transformedOperationsList}
                    onChange={(selectedOption) =>
                      handleOperationFilter(selectedOption)
                    }
                  />
                </div>
              </div>
            </div>

            {dateError && (
              <div className={styles.ErrorSection}>
                <Feedback type="error" message={dateError} />
              </div>
            )}

            <div className={`${styles.LogsContainer}`}>
              {loading ? (
                <Spinner />
              ) : feedback !== "" ? (
                <div className={styles.NoResourcesMessage}>{feedback}</div>
              ) : (
                logs?.slice(0, 20).map((item, index, array) => (
                  <div key={item._id.$oid}>
                    <div className={styles.TableRow}>
                      {item.status === "Success" ||
                      item.status === "Successful" ? (
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
                          <div className={styles.ActivityStatus}>
                            <span className={styles.EntityOperation}>
                              {item.operation} -
                            </span>
                            <span className={styles.Entity}>
                              {item.a_project_id}
                            </span>{" "}
                            <span
                              className={
                                item.status.startsWith("Success")
                                  ? styles.Success
                                  : styles.Danger
                              }
                            >
                              {item.status.startsWith("Success")
                                ? "Success"
                                : item.status}
                            </span>
                          </div>
                        </div>
                        <div className={styles.ActivityDescription}>
                          <div>{item.description}</div>
                        </div>
                      </div>
                    </div>
                    {index !== array?.length - 1 && (
                      <hr className={styles.hr} />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};
export default UserActivity;
