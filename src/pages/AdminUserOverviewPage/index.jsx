import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import { handleGetRequest } from "../../apis/apis.js";
import ResourceCard from "../../components/ResourceCard";
import Spinner from "../../components/Spinner";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import MetricsCard from "../../components/MetricsCard";
import { filterGraphData } from "../../helpers/filterGraphData.js";
import { retrieveMonthNames } from "../../helpers/monthNames.js";
import AdminInactiveUsers from "../../components/AdminInactiveUsers";

const AdminUserOverviewPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("all");

  const graphDataArray = [];
  let filteredGraphData = [];

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);

    try {
      const response = await handleGetRequest("/users");
      if (response.data.data.users.length > 0) {
        const totalNumberOfUsers = response.data.data.pagination.total;
        handleGetRequest(`/users?per_page=${totalNumberOfUsers}`)
          .then((response) => {
            if (response.data.data.users.length > 0) {
              setUsers(response.data.data.users);
              setLoading(false);
            } else {
              throw new Error("No users found");
            }
          })
          .catch(() => {
            setFeedback("Failed to fetch all users, please try again");
          });
      } else {
        setFeedback("No users found");
      }
    } catch (error) {
      setFeedback("Failed to fetch users, please try again");
    }
  };

  const userCounts = {
    total: users.length,
    verified: users.filter((user) => user.verified === true).length,
    unverified: users.filter((user) => user.verified === false).length,
    beta: users.filter((user) => user.is_beta_user === true).length,
  };

  const handleChange = ({ target }) => {
    setPeriod(target.getAttribute("value"));
  };

  // Filter out verified users
  const verifiedUsers = users.filter((user) => user.verified === true);

  // Create graphDataArray
  const createUserGraphData = () => {
    verifiedUsers.forEach((user) => {
      const date = new Date(user.date_created);
      const year = date.getFullYear();
      const month = parseInt(
        date.toLocaleString("default", { month: "2-digit" }),
        10
      );

      // Check if an entry with the same year and month already exists
      const existingEntryIndex = graphDataArray.findIndex(
        (entry) => entry.Year === year.toString() && entry.Month === month
      );

      if (existingEntryIndex !== -1) {
        // If entry exists, increment the Value
        graphDataArray[existingEntryIndex].Value += 1;
      } else {
        // Otherwise, create a new entry
        graphDataArray.push({ Year: year.toString(), Month: month, Value: 1 });
      }
    });

    return graphDataArray.sort((a, b) => {
      if (a.Year === b.Year) {
        // Sort by month if years are equal
        return a.Month - b.Month;
      } else {
        // Sort by year
        return a.Year.localeCompare(b.Year);
      }
    });
  };

  // function call to create the user graph data
  createUserGraphData();

  // calling the filterGraphData() to filter basing on period
  filteredGraphData = filterGraphData(graphDataArray, period);

  // view user account listing
  const viewUsersListing = () => {
    history.push(`/users-listing`);
  };

  return (
    <div className="APage">
      <div className="TopRow">
        <Header />
        <InformationBar
          header="Users Overview"
          showBtn
          buttontext="View Listing"
          btnAction={viewUsersListing}
          showBackBtn
        />
      </div>
      <div className="AMainSection">
        <div className="ContentSection1">
          <div className="TitleArea">
            <div className="SectionTitle">Users Summary</div>
          </div>
          {loading ? (
            <div className="ResourceSpinnerWrapper">
              <Spinner size="big" />
            </div>
          ) : feedback !== "" ? (
            <div className="NoResourcesMessage">{feedback}</div>
          ) : Object.keys(userCounts).length > 0 ? (
            <div className="ClusterContainer1">
              {Object.keys(userCounts).map((countType) => (
                <ResourceCard
                  key={countType}
                  title={countType}
                  count={userCounts[countType]}
                />
              ))}
            </div>
          ) : null}

          <div className="TitleArea">
            <div className="SectionTitle">Graph Summary</div>
          </div>

          <div className="SummaryCardContainer">
            <div className="UserSection">
              <div className="LeftDBSide">
                <div className="MetricsGraph">
                  <MetricsCard
                    className="ClusterMetricsCardGraph"
                    title={
                      <div className="GraphSummaryTitle">
                        <span className="SummaryTitleText">Verified Users</span>
                        <span>
                          <div className="PeriodContainer">
                            <div className="PeriodButtonsSection">
                              <div
                                className={`${
                                  period === "3" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="3month"
                                value="3"
                                role="presentation"
                                onClick={handleChange}
                              >
                                3m
                              </div>
                              <div
                                className={`${
                                  period === "4" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="4months"
                                value="4"
                                role="presentation"
                                onClick={handleChange}
                              >
                                4m
                              </div>
                              <div
                                className={`${
                                  period === "6" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="6months"
                                value="6"
                                role="presentation"
                                onClick={handleChange}
                              >
                                6m
                              </div>
                              <div
                                className={`${
                                  period === "8" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="8months"
                                value="8"
                                role="presentation"
                                onClick={handleChange}
                              >
                                8m
                              </div>
                              <div
                                className={`${
                                  period === "12" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="1year"
                                value="12"
                                role="presentation"
                                onClick={handleChange}
                              >
                                1y
                              </div>
                              <div
                                className={`${
                                  period === "all" && "PeriodButtonActive"
                                } PeriodButton`}
                                name="all"
                                value="all"
                                role="presentation"
                                onClick={handleChange}
                              >
                                all
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    }
                  >
                    <div className="AChartsArea">
                      <div>
                        <AreaChart
                          width={1200}
                          height={300}
                          syncId="anyId"
                          data={
                            period !== "all"
                              ? filteredGraphData
                              : graphDataArray
                          }
                        >
                          <Line
                            type="monotone"
                            dataKey="Value"
                            stroke="#8884d8"
                          />
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="Month" />
                          <XAxis
                            xAxisId={1}
                            dx={10}
                            label={{
                              value: "Time",
                              angle: 0,
                              position: "bottom",
                            }}
                            interval={10}
                            dataKey="Year"
                            tickLine={false}
                            tick={{ fontSize: 12, angle: 0 }}
                          />
                          <CartesianGrid strokeDasharray="3 3" />
                          <YAxis
                            label={{
                              value: "Number of Users",
                              angle: 270,
                              position: "outside",
                            }}
                            width={100}
                          />
                          <Area
                            type="monotone"
                            dataKey="Value"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                          />
                          <Tooltip
                            labelFormatter={(value) => {
                              const monthNames = retrieveMonthNames();
                              const month = parseInt(value) - 1;
                              return monthNames[month].name;
                            }}
                            formatter={(value) => {
                              if (value === 1) {
                                return [`${value} user`];
                              } else {
                                return [`${value} users`];
                              }
                            }}
                          />
                        </AreaChart>
                      </div>
                    </div>
                  </MetricsCard>
                </div>
              </div>
            </div>
          </div>

          <AdminInactiveUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminUserOverviewPage;
