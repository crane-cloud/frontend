import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleGetRequest } from "../../apis/apis.js";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import SideNav from "../../components/SideNav";
import styles from "./AdminLogsPage.module.css";
import DateInput from "../../components/DateInput";
import { ReactComponent as DownArrow } from "../../assets/images/downarrow.svg";
import { ReactComponent as UpArrow } from "../../assets/images/up-arrow.svg";
import { ReactComponent as CheckMark } from "../../assets/images/check-circle.svg";
import { ReactComponent as Danger } from "../../assets/images/alert-octagon.svg";
// import { ReactComponent as CloudOff } from "../../assets/images/cloud-off.svg";
import { ReactComponent as FilterIcon } from "../../assets/images/filterIcon.svg";
import { ReactComponent as ArrowUpDDown } from "../../assets/images/ArrowUp&Down.svg";
import { DisplayDateTime } from "../../helpers/dateConstants";
import Spinner from "../../components/Spinner";

const AdminLogsPage = () => {
  const { clusterID } = useParams();

  const baseLink = "/users/activities?";
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);

  //status
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [statusField, setStatusField] = useState("none");
  //operation
  const [showOperation, setShowOperation] = useState(false);
  const [operationField, setOperationField] = useState("none");
  //dates
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");

  //constant lists
  const statusList = ["Success", "Failed"];
  const operationsList = ["Create", "Update", "Delete"];

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

  const clusterName = localStorage.getItem("clusterName");

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName={clusterName} clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header="Users Activity" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div className={styles.SmallContainer}>
              <div className={styles.Header}>
                <div className={styles.Heading}>
                  <div className={styles.ActivityHeader}>
                    <span className={styles.ActivityPageTitle}>Logs Feed</span>
                  </div>
                </div>
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
                        {/* <div className={styles.FilterItemContainer}>
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
                      </div> */}
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
                            <Avatar name="Demo" className={styles.UserAvatar} />
                            <div>
                              <div className={styles.ActivityEmail}>
                                <b>{item.user_id}</b>:
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
                      {index !== logs.length - 1 && (
                        <hr className={styles.hr} />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogsPage;
