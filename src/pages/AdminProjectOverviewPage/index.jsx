import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleGetRequest } from "../../apis/apis.js";
import SideNav from "../../components/SideNav";
import ResourceCard from "../../components/ResourceCard";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import MetricsCard from "../../components/MetricsCard";
import { Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";
import { retrieveProjectTypes } from "../../helpers/projecttypes.js";
import "./AdminProjectOverviewPage.css";

const AdminProjectOverviewPage = () => {
  const { clusterID } = useParams();
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("all");
  const projectTypeCounts = {};
  const graphDataArray = [];
  const graphData = {};
  let filteredGraphData = [];

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

  // this function call will creates the graph data
  createGraphData();

  const filterGraphData = (graphDataArray, period) => {
    // Get the latest year from the graphDataArray
    let latestYear = graphDataArray[graphDataArray.length - 1]?.Year;

    // Define the period of months you want to filter for (3, 4, or 6 etc)
    let periodMonths = period;

    // Calculate the start and end index for the period
    let endIndex = graphDataArray?.findIndex(
      (data) => data.Year === latestYear
    );

    // this value caters for months for latest year that are not in the period
    let numberOfMonthsInLatestYear = graphDataArray?.filter(
      (record) => record.Year === latestYear
    )?.length;

    let startIndex = endIndex - periodMonths + numberOfMonthsInLatestYear;

    // Use the slice() method to extract the period of data from the graphDataArray
    let filteredData = graphDataArray?.slice(
      startIndex,
      endIndex + numberOfMonthsInLatestYear
    );

    // return the filtered data
    return (filteredGraphData = filteredData);
  };

  // this function call will filter the graph data basing on a particular period
  filterGraphData(graphDataArray, period);

  const handleChange = ({ target }) => {
    setPeriod(target.getAttribute("value"));
  };

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
            <InformationBar header="Projects Overview" showBtn={false} />
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
                          <span className="SummaryTitleText">
                            Projects Created
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
                      <AreaChart
                        width={800}
                        height={300}
                        syncId="anyId"
                        data={
                          period !== "all" ? filteredGraphData : graphDataArray
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
                      </AreaChart>
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
