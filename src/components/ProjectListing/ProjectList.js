import React, { useState, useEffect, useCallback } from "react";
import "./ProjectList.css";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import getAdminProjectsList from "../../redux/actions/adminProjectsList";
import getUsersList from "../../redux/actions/users";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { handleGetRequest } from "../../apis/apis.js";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { namedOrganisations } from "../../helpers/projectOrganisations.js";
import { retrieveProjectTypes } from "../../helpers/projecttypes.js";
import { filterGraphData } from "../../helpers/filterGraphData.js";
// import MetricsCard from "../../components/MetricsCard";
import { retrieveMonthNames } from "../../helpers/monthNames.js";
import NewResourceCard from "../../components/NewResourceCard";
import Select from "../../components/Select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { ReactComponent as BackButton } from "../../assets/images/arrow-left.svg";
import {
  projectPieCategories,
  projectGraphCategories,
  projectLists,
} from "../../helpers/projectPieCat";
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

const AdminProjectsOverview = () => {
  const [currentPage, handleChangePage] = usePaginator();
  const dispatch = useDispatch();
  const [word, setWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [sectionValue, setSectionValue] = useState("Projects");
  const [sectionValue1, setSectionValue1] = useState("Projects");
  const [sectionValue2, setSectionValue2] = useState("");
  const projectTypeCounts = {};
  const projectOrganisationCount = {};
  const [project, setProject] = useState([]);
  const [period, setPeriod] = useState("all");
  const graphDataArray = [];
  const graphData = {};
  const newGraphData = {};
  const newGraphDataArray = [];
  let createPieChartData = [];
  let createNewPieChartData = [];
  let filteredGraphData = [];
  let newFilteredGraphData = [];
  const history = useHistory();

  const COLORS = [
    "#0088FE",
    "#0DBC00",
    "#F9991A",
    "#AE0000",
    "#000000",
    "#800080",
  ];

  const availablePieChartCategories = projectPieCategories();
  const availableGraphCategories = projectGraphCategories();
  const availableProjectListings = projectLists();

  const handleSectionChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setSectionValue(selectedValue);
  };

  const handleGraphChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setSectionValue1(selectedValue);
  };

  const handleListChange = (selectedOption) => {
    const selectedList = selectedOption.value;
    setSectionValue2(selectedList);
  };

  const { isRetrieved, isRetrieving, projects, pagination } = useSelector(
    (state) => state.adminProjectsReducer
  );

  const AdminProjects = useCallback(
    (page, state="", keyword = "" ) => dispatch(getAdminProjectsList(page, keyword, state )),
    [dispatch]
  );

  const getUsersProps = useCallback(() => dispatch(getUsersList), [dispatch]);

  const [users, setUsers] = useState([]);

  const getAllProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await handleGetRequest(`/projects`);
      if (response.data.data.projects.length > 0) {
        const totalNumberOfProjects = response.data.data.pagination.total;
        handleGetRequest(`/projects?per_page=${totalNumberOfProjects}`)
          .then((response) => {
            if (response.data.data.projects.length > 0) {
              setProject(response.data.data.projects);
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
  }, [setProject, setLoading, setFeedback]);

  // create graph data for first graph
  const createGraphData = () => {
    if (!project) {
      return [];
    }

    project.forEach((p) => {
      const date = new Date(p.date_created);
      const year = date.getFullYear();
      const month = parseInt(
        date.toLocaleString("default", { month: "2-digit" }),
        10
      );

      const projectType = p.project_type;
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
    if (!project) {
      return [];
    }

    project.forEach((p) => {
      const date = new Date(p.date_created);
      const year = date.getFullYear();
      const month = parseInt(
        date.toLocaleString("default", { month: "2-digit" }),
        10
      );

      const projectType = p.project_type;
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
  const handleProjectFilterAndFetch = useCallback((page,keyword = "")=>{
    if(sectionValue2 === "Disabled Projects"){
      AdminProjects(page,"true",keyword);
    }else if(sectionValue2 === "Active Projects"){
      AdminProjects(page,"false",keyword);
    }else{
      AdminProjects(page, "",keyword);
    } 
  },[AdminProjects,sectionValue2])

  useEffect(() => {
    handleProjectFilterAndFetch(currentPage)
  }, [sectionValue2, currentPage, handleProjectFilterAndFetch]);

  useEffect(() => {
    getUsersProps();
    fetchUsersList();
    handleProjectFilterAndFetch(currentPage)
    getAllProjects();
  }, [getUsersProps, handleProjectFilterAndFetch, getAllProjects, currentPage]);

  const filteredData = project.filter((p) => {
    const allowedProjectTypes = retrieveProjectTypes().map(
      (type) => type.value
    );
    return allowedProjectTypes.includes(p.project_type);
  });

  filteredData.forEach((p) => {
    const projectType = p.project_type;
    if (!projectTypeCounts[projectType]) {
      projectTypeCounts[projectType] = 1;
    } else {
      projectTypeCounts[projectType]++;
    }
  });

  const othersCount = project.length - filteredData.length;

  if (othersCount > 0) {
    projectTypeCounts["Others"] = othersCount;
  }

  const filteredOrganisationData = project.filter((p) => {
    const defaultProjectOrganisations = namedOrganisations().map(
      (organisation) => organisation.value
    );
    return defaultProjectOrganisations.includes(p.organisation);
  });

  filteredOrganisationData.forEach((p) => {
    const projectOrganisation = p.organisation;

    if (!projectOrganisationCount[projectOrganisation]) {
      projectOrganisationCount[projectOrganisation] = 1;
    } else {
      projectOrganisationCount[projectOrganisation]++;
    }
  });

  const otherOrganisationCount =
    project.length - filteredOrganisationData.length;
  if (otherOrganisationCount > 0) {
    projectOrganisationCount["Others"] = otherOrganisationCount;
  }

  const fetchUsersList = () => {
    handleGetRequest("/users")
      .then((response) => {
        if (response.data.data.users.length > 0) {
          let totalNumberOfUsers = response.data.data.pagination.total;
          handleGetRequest("/users?per_page=" + totalNumberOfUsers)
            .then((response) => {
              if (response.data.data.users.length > 0) {
                setUsers(response.data.data.users);
              } else {
                throw new Error("No users found");
              }
            })
            .catch((error) => {
              throw new Error("Failed to fetch all users, please try again");
            });
        } else {
          throw new Error("No users found");
        }
      })
      .catch((error) => {
        throw new Error("Failed to fetch users, please try again");
      });
  };

  const searchThroughProjects = (keyword) => {
    handleChangePage(1);
    handleProjectFilterAndFetch(1,keyword)
  };

  const handleCallbackSearchword = ({ target }) => {
    const { value } = target;
    setWord(value);
    if (value !== "") {
      searchThroughProjects(value);
    }
    if (value === "") {
      handleChangePage(1);
      handleProjectFilterAndFetch(1) 
    }
  };

  const getUserName = (id) => {
    let userName = "";
    users.forEach((user) => {
      if (user.id === id) {
        userName = user.name;
      }
    });
    return userName;
  };

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    handleProjectFilterAndFetch(currentPage)
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
      degrees[type] = degree.toFixed(1);
    }
    const pieChartData = Object.entries(degrees).map(([type, degrees]) => ({
      category: type,
      value: parseFloat(degrees),
    }));
    return pieChartData;
  };

  createPieChartData();

  createNewPieChartData = () => {
    const percentage = {};
    if (!projectOrganisationCount) {
      return [];
    }

    const totalCount = Object.entries(projectOrganisationCount).reduce(
      (totalCount, [organisation, countOrganisation]) =>
        totalCount + countOrganisation,
      0
    );
    for (const organisation in projectOrganisationCount) {
      const countOrganisation = projectOrganisationCount[organisation];
      const percentages = (countOrganisation / totalCount) * 100;
      percentage[organisation] = percentages.toFixed(1);
    }

    const newPieChartData = Object.entries(percentage).map(
      ([organisation, percentage]) => ({
        category: organisation,
        value: parseFloat(percentage),
      })
    );
    return newPieChartData;
  };

  createNewPieChartData();

  return (
    <div className="APage">
      <div className="TopRow">
        <Header />
      </div>
      <div className="AMainSection">
        <div className="ContentSection">
          <div className="InformationBarSection">
            <InformationBar  header={
                <span className="ProjectsInformationBarTitle">
                  <Link
                    className={ `breadcrumb flex_back_link`}
                    to={`/clusters`}
                  >
                    <BackButton />
                    <div className="back_link">Project Listing</div>
                  </Link>
                </span>
              }
              showBtn={false} />
          </div>

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
            <div className="ResourceClusterContainer">
              {Object.keys(projectTypeCounts).map((projectType) => (
                <NewResourceCard
                  key={projectType}
                  title={projectType}
                  count={projectTypeCounts[projectType]}
                />
              ))}
            </div>
          ) : null}

          <div className="TitleArea">
            <div className="SectionTitle">Organisation Categories</div>
          </div>
          {loading ? (
            <div className="ResourceSpinnerWrapper">
              <Spinner size="big" />
            </div>
          ) : feedback !== "" ? (
            <div className="NoResourcesMessage">{feedback}</div>
          ) : Object.keys(projectOrganisationCount).length > 0 ? (
            <div className="ResourceClusterContainer">
              {Object.keys(projectOrganisationCount).map(
                (projectOrganisation) => (
                  <NewResourceCard
                    key={projectOrganisation}
                    title={projectOrganisation}
                    count={projectOrganisationCount[projectOrganisation]}
                  />
                )
              )}
            </div>
          ) : null}

          <div className="TitleArea">
            <div className="SectionTitle">
              Project Categories And PieChart Summary
              <span>
                <Select
                  placeholder="Project Categories"
                  options={availablePieChartCategories}
                  onChange={(selectedOption) =>
                    handleSectionChange(selectedOption)
                  }
                />
              </span>
            </div>
          </div>
          <div className="ChartContainer">
            <div className="VisualArea">
              <div className="VisualAreaContentSection">
                <div className="VisualAreaHeader">
                  <span className="SectionTitle">
                    <div className="ChartDropDown">
                      <Select
                        placeholder="Platform Projects"
                        options={availableGraphCategories}
                        onChange={(selectedOption) =>
                          handleGraphChange(selectedOption)
                        }
                      />
                    </div>
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
              </div>
              <div className="ChartsArea">
                {sectionValue1 === "Projects" ? (
                  <div>
                    <AreaChart
                      width={550}
                      height={380}
                      syncId="anyId"
                      data={
                        period !== "all" ? filteredGraphData : graphDataArray
                      }
                    >
                      <Line type="monotone" dataKey="Value" stroke="#8884d8" />
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
                ) : (
                  <div className="ChartsArea">
                    <AreaChart
                      width={550}
                      height={380}
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
                )}
              </div>
            </div>

            <div className="VisualArea">
              {sectionValue === "Projects" ? (
                <>
                  <div className="PieContainer">
                    <div className="ChartColumn">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={createPieChartData()}
                          dataKey="value"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={140}
                          paddingAngle={3}
                          fill="#8884d8"
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
                    </div>
                    <div className="PercentageColumn">
                      <ul className="KeyItems">
                        {createPieChartData().map((entry, index) => (
                          <>
                            <li key={`list-item-${index}`}>
                              <span
                                style={{ color: COLORS[index % COLORS.length] }}
                              >
                                {entry.category} :{" "}
                              </span>
                              {entry.value} %
                            </li>
                            <hr style={{ width: "100%" }} />
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="PieContainer">
                    <div className="ChartColumn">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={createNewPieChartData()}
                          dataKey="value"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={140}
                          paddingAngle={3}
                          fill="#8884d8"
                        >
                          {createNewPieChartData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                    <div className="PercentageColumn">
                      <ul className="KeyItems">
                        {createNewPieChartData().map((entry, index) => (
                          <>
                            <li key={`list-item-${index}`}>
                              <span
                                style={{
                                  color: COLORS[index % COLORS.length],
                                }}
                              >
                                {entry.category} :{" "}
                              </span>
                              {entry.value} %
                            </li>
                            <hr style={{ width: "100%" }} />
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="TitleArea">
            <div className="SectionTitle">
              <span>
                <Select
                  placeholder="Projects Listing"
                  options={availableProjectListings}
                  onChange={(selectedOption) =>
                    handleListChange(selectedOption)
                  }
                />
              </span>
              <span>
                <div className="XSearchBar">
                  <div className="AdminSearchInput">
                    <input
                      type="text"
                      className="searchTerm"
                      name="Searchword"
                      placeholder="Search for project"
                      value={word}
                      onChange={(e) => {
                        handleCallbackSearchword(e);
                      }}
                    />
                    <SearchButton className="SearchIcon" />
                  </div>
                </div>
              </span>
            </div>
          </div>

          <div className="SubTableContainer">
            <div className="AMainSection">
              <div className="ContentSection">
                <div className="ResourceTable">
                  <div
                    className={
                      isRetrieving
                        ? "ResourcesTable LoadingResourcesTable"
                        : "ResourcesTable"
                    }
                  >
                    <table>
                      <thead className="uppercase">
                        <tr>
                          <th>name</th>
                          <th>owner</th>
                          <th>description</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      {isRetrieving ? (
                        <tbody>
                          <tr className="TableLoading">
                            <td className="TableTdSpinner">
                              <div className="SpinnerWrapper">
                                <Spinner size="big" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          { isRetrieved &&
                              projects !== undefined &&
                              projects.map((project) => (
                                <tr 
                                onClick={() => {
                                  history.push(`/projects-overview/${project.id}/details`);
                                }}
                                key={projects.indexOf(project)}>
                                  <td>{project?.name}</td>
                                  <td>{getUserName(project?.owner_id)}</td>
                                  <td>{project?.description}</td>
                                  <td>
                                    <span
                                      className={
                                        project?.disabled === false
                                          ? "ProjectStatus"
                                          : "ProjectStatusDisabled"
                                      }
                                    >
                                      {project?.disabled === false
                                        ? "Active"
                                        : "Disabled"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      )}
                    </table>
                    {isRetrieved && projects.length === 0 && (
                      <div className="NoResourcesMessage">
                        <p>No projects available</p>
                      </div>
                    )}
                    {!isRetrieving && !isRetrieved && (
                      <div className="NoResourcesMessage">
                        <p>
                          Oops! Something went wrong! Failed to retrieve
                          projects.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {pagination?.pages > 1 && (
                  <div className="AdminPaginationSection">
                    <Pagination
                      total={pagination.pages}
                      current={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsOverview;
