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
import AdminPeriod from "../../components/AdminPeriod";
import { retrieveProjectTypes } from "../../helpers/projecttypes.js";
import "./AdminProjectOverviewPage.css";

const AdminProjectOverviewPage = () => {
  const { clusterID } = useParams();
  const [projects, setProjects] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const projectTypeCounts = {};
  const graphDataArray = [];
  const graphData = {};

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

  createGraphData();

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
                            <AdminPeriod />
                          </span>
                        </div>
                      }
                    >
                      <AreaChart
                        width={800}
                        height={300}
                        syncId="anyId"
                        data={graphDataArray}
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
