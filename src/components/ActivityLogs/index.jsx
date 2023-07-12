import styles from "./ActivityLogs.module.css";
import { handleGetRequest } from "../../apis/apis.js";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
// import { ReactComponent as Upload } from "../../assets/images/upload-cloud.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import DateInput from "../../components/DateInput";
import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filterIcon.svg";
import { ReactComponent as ArrowUpDDown } from "../../assets/images/ArrowUp&Down.svg";
import { DisplayDateTime } from "../../helpers/dateConstants";
import Spinner from "../Spinner";

const ActivityLogs = ({ projectID }) => {
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showOperation, setShowOperation] = useState(false);
  const [operationField, setOperationField] = useState("none");
  const [statusField, setStatusField] = useState("none");
  const [feedback, setFeedback] = useState("none");
  const [queryParams, setQueryParams] = useState("");
  const [dateError, setDateError] = useState("");

  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete"];
  //api
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const baseLinkRef = useRef(`/users/activities?`);
  // const baseLink = baseLinkRef.current;
  useEffect(() => {
    if (projectID) {
      // logs based on a project
      // set filters available per page here
      baseLinkRef.current = `${baseLinkRef.current}a_project_id=${projectID}&`;
    }
  }, [projectID]);

  useEffect(() => {
    fetchActivityLogs(`${baseLinkRef.current}${queryParams}`);
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

  const handleFromDate = (fromTS) => {
    const date = new Date(fromTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setFromTS(formattedDate);
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
  const handleToDate = (toTS) => {
    const date = new Date(toTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setToTS(formattedDate);
    setDateError("");
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

  return (
    <section>
      {/* Logs */}
      <section className={styles.DetailsSection}>
        <div className="SectionTitle">Project logs</div>
        <div className={styles.Header}>
          <div className={styles.Heading}>Activity Feed</div>
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
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.CardArea}>
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
                      <User name="Demo" className={styles.UserAvatar} />
                      <div>
                        <div className={styles.ActivityEmail}>
                          {/* <b>{getUserEmail(item.user_id)}</b>: */}
                          <b>{item.user_id}</b>
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
        </div>
      </section>
    </section>
  );
};

export default ActivityLogs;
