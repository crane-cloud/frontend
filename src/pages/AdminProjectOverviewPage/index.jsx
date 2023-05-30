import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { handleGetRequest } from "../../apis/apis.js";
import SideNav from "../../components/SideNav";
import ResourceCard from "../../components/ResourceCard";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import MetricsCard from "../../components/MetricsCard";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { retrieveProjectTypes } from "../../helpers/projecttypes.js";
import { retrieveMonthNames } from "../../helpers/monthNames.js";
import { filterGraphData } from "../../helpers/filterGraphData.js";
import "./AdminProjectOverviewPage.css";

const AdminProjectOverviewPage = () => {
  const history = useHistory();
  const { clusterID } = useParams();
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("all");
  const projectTypeCounts = {};
  const graphDataArray = [];
  const graphData = {};
  const newGraphData = {};
  const newGraphDataArray = [];
  let createPieChartData = [];
  let filteredGraphData = [];
  let newFilteredGraphData = [];

  const COLORS = ['#0088FE', '#0DBC00', '#F9991A', '#AE0000','#000000','#800080'];

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    setLoading(true);
    try {
      const response = await handleGetRequest("/projects");
      if (response.data.data.projects.length > 0) {
        const totalNumberOfProjects = response.data.data.pagination.total;
        handleGetRequest(`/projects?per_page=${totalNumberOfProjects}`)
          .then((response) => {
            if (response.data.data.projects.length > 0) {
              setProjects(response.data.data.projects);
              setLoading(false);
            } else {
              throw new Error("No projects found");
            }
          })
          .catch(() => {
            setFeedback("Failed to fetch all projects, please try again");
          });
      } else {
        setFeedback("No projects found");
      }
    } catch (error) {
      setFeedback("Failed to fetch projects, please try again");
    }
  };

  const filteredData = projects.filter((project) => {
    const allowedProjectTypes = retrieveProjectTypes().map(
      (type) => type.value
    );
    return allowedProjectTypes.includes(project.project_type);
  });

  filteredData.forEach((project) => {
    const projectType = project.project_type;
    if (!projectTypeCounts[projectType]) {
      projectTypeCounts[projectType] = 1;
    } else {
      projectTypeCounts[projectType]++;
    }
  });

  const othersCount = projects.length - filteredData.length;

  if (othersCount > 0) {
    projectTypeCounts["Others"] = othersCount;
  }

  // create graph data for first graph
  const createGraphData = () => {
    if (!projects) {
      return [];
    }

    projects.forEach((project) => {
      const date = new Date(project.date_created);
      const year = date.getFullYear();
      const month = parseInt(
        date.toLocaleString("default", { month: "2-digit" }),
        10
      );

      const projectType = project.project_type;
      if (!graphData[year]) {
        graphData[year] = {};
      }
      if (!graphData[year][month]) {
        graphData[year][month] = {};
      }
      if (!graphData[year][month][projectType]) {
        graphData[year][month][projectType] = 1;
      } else {
        graphData[year][month][projectType]++;
      }
    });

    Object.keys(graphData).forEach((year) => {
      Object.keys(graphData[year]).forEach((month) => {
        const monthData = graphData[year][month];
        const totalProjects = Object.values(monthData).reduce(
          (acc, val) => acc + val,
          0
        );
        graphDataArray.push({
          Month: `${month}`,
          Year: year,
          Value: totalProjects,
        });
      });
    });

    return graphDataArray;
  };

  // create graph data for second graph
  const createNewGraphData = () => {
    if (!projects) {
      return [];
    }

    projects.forEach((project) => {
      const date = new Date(project.date_created);
      const year = date.getFullYear();
      const month = parseInt(
        date.toLocaleString("default", { month: "2-digit" }),
        10
      );

      const projectType = project.project_type;
      if (!newGraphData[year]) {
        newGraphData[year] = {};
      }
      if (!newGraphData[year][month]) {
        newGraphData[year][month] = {};
      }
      if (!newGraphData[year][month][projectType]) {
        newGraphData[year][month][projectType] = 1;
      } else {
        newGraphData[year][month][projectType]++;
      }
    });

    Object.keys(newGraphData).forEach((year) => {
      Object.keys(newGraphData[year]).forEach((month) => {
        const monthData = newGraphData[year][month];

        const personalCount = monthData["Personal"] || 0;
        const researchCount = monthData["Research"] || 0;
        const studentCount = monthData["Student"] || 0;
        const commercialCount = monthData["Commercial"] || 0;
        const charityCount = monthData["Charity"] || 0;
        const otherCount = monthData["Other"] || 0;

        newGraphDataArray.push({
          Month: `${month}`,
          Year: year,
          Personal: personalCount,
          Research: researchCount,
          Student: studentCount,
          Commercial: commercialCount,
          Charity: charityCount,
          Other: otherCount,
        });
      });
    });

    return newGraphDataArray;
  };

  // this function call will creates the graph data for first graph
  createGraphData();

  // this function call will creates the graph data for second graph
  createNewGraphData();

  // these function calls will filter the first & second graph data basing on a particular period
  filteredGraphData = filterGraphData(graphDataArray, period);
  newFilteredGraphData = filterGraphData(newGraphDataArray, period);

  const handleChange = ({ target }) => {
    setPeriod(target.getAttribute("value"));
  };

  // view project listing
  const viewProjectListing = () => {
    history.push(`/clusters/${clusterID}/projects-listing`);
  };

  createPieChartData = () => {
    const degrees = {};
    if (!projectTypeCounts) {
      return [];
    }
    const totalCount = Object.values(projectTypeCounts).reduce(
      (total, count) => total + count,
      0
    );
    for (const type in projectTypeCounts) {
      const count = projectTypeCounts[type];
      const degree = (count / totalCount) * 100;
      degrees[type]= degree.toFixed(1);
    }
    const pieChartData = Object.entries(degrees).map(
      ([type, degrees]) => ({
        category: type,
        value: parseFloat(degrees),
      })
    );
    return pieChartData;
  };

  createPieChartData();

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName="cis-dev" clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar
              header="Projects Overview"
              showBtn
              buttontext="View Listing"
              btnAction={viewProjectListing}
            />
          </div>
          <div className="ContentSection">
            <div className="TitleArea">
              <div className="SectionTitle">Project Categories</div>
            </div>
            {loading ? (
              <div className="ResourceSpinnerWrapper">
                <Spinner size="big" />
              </div>
            ) : feedback !== "" ? (
              <div className="NoResourcesMessage">{feedback}</div>
            ) : Object.keys(projectTypeCounts).length > 0 ? (
              <div className="ClusterContainer">
                {Object.keys(projectTypeCounts).map((projectType) => (
                  <ResourceCard
                    key={projectType}
                    title={projectType}
                    count={projectTypeCounts[projectType]}
                  />
                ))}
              </div>
            ) : null}
            <div className="TitleArea">
              <div className="SectionTitle">Project Categories Summary</div>
            </div>
            <div className="UserSection">
              <div className="piechart">
                <PieChart width={350} height={350}>
                  <Pie
                      data={createPieChartData()}
                      dataKey="value"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      paddingAngle={3}
                      fill="#8884d8"
                      label={true}
                    >
                        {createPieChartData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            
                          />
                        ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div>
                  <ul style={{display:'flex'}}>
                    {createPieChartData().map((entry, index) => (
                      <li key={`list-item-${index}`} style={{padding: '10px'}}>
                        <span style={{ color: COLORS[index % COLORS.length]}}>{entry.category} : </span>
                        {entry.value} %
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="TitleArea">
              <div className="SectionTitle">Graph Summaries</div>
            </div>

            <div className="SummaryCardContainer">
              <div className="UserSection">
                <div className="LeftDBSide">
                  <div className="MetricsGraph">
                    <MetricsCard
                      className="ClusterMetricsCardGraph"
                      title={
                        <div className="GraphSummaryTitle">
                          <span className="SummaryTitleText">
                            Projects Created and Category Analytics
                          </span>
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
                      <div className="ChartsArea">
                        <div>
                          <AreaChart
                            width={800}
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
                              interval={12}
                              dataKey="Year"
                              tickLine={false}
                              tick={{ fontSize: 12, angle: 0 }}
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis
                              label={{
                                value: "Number of Projects",
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
                                return [`${value} projects`];
                              }}
                            />
                          </AreaChart>
                        </div>
                        <div>
                          <AreaChart
                            width={830}
                            height={300}
                            data={
                              period !== "all"
                                ? newFilteredGraphData
                                : newGraphDataArray
                            }
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 0,
                            }}
                          >
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
                              interval={12}
                              dataKey="Year"
                              tickLine={false}
                              tick={{ fontSize: 12, angle: 0 }}
                            />
                            <YAxis
                              label={{
                                value: "Numbers per Project Type",
                                angle: 270,
                                position: "outside",
                              }}
                              width={100}
                            />
                            <Tooltip
                              labelFormatter={(value) => {
                                const monthNames = retrieveMonthNames();
                                const month = parseInt(value) - 1;
                                return monthNames[month].name;
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="Personal"
                              stackId="1"
                              stroke="#8884d8"
                              fill="#8884d8"
                            />
                            <Area
                              type="monotone"
                              dataKey="Research"
                              stackId="1"
                              stroke="#82ca9d"
                              fill="#82ca9d"
                            />
                            <Area
                              type="monotone"
                              dataKey="Student"
                              stackId="1"
                              stroke="#ffc658"
                              fill="#ffc658"
                            />
                            <Area
                              type="monotone"
                              dataKey="Commercial"
                              stackId="1"
                              stroke="#ffc999"
                              fill="#ffc999"
                            />
                            <Area
                              type="monotone"
                              dataKey="Charity"
                              stackId="1"
                              stroke="#ffc302"
                              fill="#ffc302"
                            />
                          </AreaChart>
                        </div>
                      </div>
                    </MetricsCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectOverviewPage;
