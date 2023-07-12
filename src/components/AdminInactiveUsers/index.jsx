import React, { useState, useEffect } from "react";
import { handleGetRequest } from "../../apis/apis.js";
import Spinner from "../../components/Spinner";
import { dateInWords } from "../../helpers/dateConstants";
import DateInput from "../../components/DateInput";
import styles from "./AdminInactiveUsers.css";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import PrimaryButton from "../PrimaryButton";

const AdminInactiveUsers = () => {
  const baseLink = "/users/inactive_users?";
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [inactiveUsers, setInactiveUsers] = useState([]);

  const [showToCalendar, setShowToCalendar] = useState(false);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [toTS, setToTS] = useState("none");
  const [fromTS, setFromTS] = useState("none");

  const range = 30;

  useEffect(() => {
    getInactiveUsers(`${baseLink}range=${range}`);
  }, []);

  useEffect(() => {
    if (queryParams !== "" && toTS !== "none") {
      getInactiveUsers(`${baseLink}${queryParams}`);
    }
  }, [queryParams, toTS]);

  const getInactiveUsers = async (link) => {
    console.log(link);
    setLoading(true);
    try {
      const response = await handleGetRequest(link);
      if (response.data.data.users.length > 0) {
        setInactiveUsers(response.data.data.users);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setFeedback("No active users found, please try again");
    }
  };

  const handleFromDate = (fromTS) => {
    const date = new Date(fromTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setFromTS(formattedDate);
    console.log(setFromTS(formattedDate));
  };
  const handleToDate = (toTS) => {
    const date = new Date(toTS);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    setToTS(formattedDate);
    console.log(formattedDate);
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

  const handleReload = () => {
    getInactiveUsers(`${baseLink}range=${range}`);
  };

  console.log(inactiveUsers);

  return (
    <>
      <div className="TitleArea">
        <div className="SectionTitle">
          Active Users{" "}
          <PrimaryButton onClick={handleReload} className="RefreshButton">
            Refresh List
          </PrimaryButton>
        </div>
      </div>

      {loading ? (
        <div className="SpinnerArea">
          <Spinner />
        </div>
      ) : feedback !== "" ? (
        <div className="NoResourcesMessage">{feedback}</div>
      ) : inactiveUsers.length === 0 ? (
        <div className="NoResourcesMessage">No inactive users found.</div>
      ) : (
        <>
          <div className="TableHeader">
            <div className="SearchArea">
              <div className="SearchBar">
                <div className="AdminSearchInput">
                  <input
                    type="text"
                    className="searchTerm"
                    name="Searchword"
                    placeholder="Search for account"
                  />
                  <SearchButton className="SearchIcon" />
                </div>
              </div>
            </div>
            <div className="CalendarSection">
              <div className="OuterFilterItem">
                <div className="DateItem">
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
                <div className="DateItem">
                  <div>To:</div>
                  <DateInput
                    handleChange={handleToDate}
                    showCalendar={showToCalendar}
                    className={styles.dateField}
                    position={styles.CalenderToposition}
                    onClick={switchCalendars}
                    onCancel={closeCalendar}
                    onSubmit={handleCalenderSubmission}
                    value="to"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ResourcesTable">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Created</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {inactiveUsers.map((inactiveUser) => (
                  <tr key={inactiveUser.id}>
                    <td>{inactiveUser.name}</td>
                    <td>{inactiveUser.email}</td>
                    <td>{dateInWords(new Date(inactiveUser.date_created))}</td>
                    <td>{dateInWords(new Date(inactiveUser.last_seen))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default AdminInactiveUsers;
