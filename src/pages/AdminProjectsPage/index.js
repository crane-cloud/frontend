import React, { useState, useEffect, useCallback } from "react";
import "./AdminProjectsPage.css";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import getAdminProjects from "../../redux/actions/adminProjects";
import getAdminProjectsList from "../../redux/actions/adminProjectsList";
import getUsersList from "../../redux/actions/users";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { handleGetRequest } from "../../apis/apis.js";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AppFooter from "../../components/appFooter";

const AdminProjectsPage = () => {
  const [currentPage, handleChangePage] = usePaginator();
  const clusterID = localStorage.getItem("clusterID");
  const dispatch = useDispatch();
  const [word, setWord] = useState("");
  const history = useHistory();

  const { isRetrieved, isRetrieving, projects, pagination } = useSelector(
    (state) => state.adminProjectsReducer
  );

  const AdminProjects = useCallback(
    (page, keyword = "") => dispatch(getAdminProjectsList(page, keyword)),
    [dispatch]
  );

  const getAdminProps = useCallback(
    (page, keyword = "") =>
      dispatch(getAdminProjects(clusterID, currentPage, page, keyword)),
    [dispatch, clusterID, currentPage]
  );
  const getUsersProps = useCallback(() => dispatch(getUsersList), [dispatch]);

  // const adminProjects = useSelector((state) => state.adminProjectsReducer);
  // const usersList = useSelector((state) => state.usersListReducer);
  const [contextMenu, setContextMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  // const [addCredits, setAddCredits] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AdminProjects(currentPage);
    getAdminProps(currentPage);
  }, [currentPage, getAdminProps, AdminProjects]);

  useEffect(() => {
    getAdminProps(currentPage);
    getUsersProps();
    fetchUsersList();
    AdminProjects(currentPage);
  }, [getAdminProps, getUsersProps, currentPage, AdminProjects]);

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
    AdminProjects(1, keyword);
  };

  const handleCallbackSearchword = ({ target }) => {
    const { value } = target;
    setWord(value);
    if (value !== "") {
      searchThroughProjects(value);
    }
    if (value === "") {
      handleChangePage(1);
      AdminProjects(1);
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

  const showContextMenu = (id) => {
    setContextMenu(true);
    setSelectedProject(id);
  };
  const clusterName = localStorage.getItem("clusterName");

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    AdminProjects();
  };

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
            <InformationBar
              header={
                <span>
                  <Link
                    className="breadcrumb"
                    to={`/clusters/${clusterID}/projects`}
                  >
                    Overview
                  </Link>
                  / Projects Listing
                </span>
              }
              showBtn={false}
            />
          </div>
          <div className="ContentSection">
            <div className="SearchBar">
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
                    <th>Actions</th>
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
                    {isRetrieved &&
                      projects !== undefined &&
                      projects.map((project) => (
                        <tr
                          onClick={() => {
                            history.push(`/projects/${project.id}/details`);
                          }}
                          key={projects.indexOf(project)}
                        >
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
                          <td
                            onClick={(e) => {
                              showContextMenu(project.id);
                            }}
                          >
                            <MoreIcon />

                            {contextMenu && project.id === selectedProject && (
                              <div className="BelowHeader bg-light">
                                <div className="context-menu">
                                  <div
                                    className="DropDownLink"
                                    role="presentation"
                                  >
                                    <Link
                                      to={{
                                        pathname: `/projects/${selectedProject}/details`,
                                      }}
                                    >
                                      View Project Details
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {isRetrieved && projects.length === 0 && (
                <div className="AdminNoResourcesMessage">
                  <p>No projects available</p>
                </div>
              )}
              {!isRetrieving && !isRetrieved && (
                <div className="AdminNoResourcesMessage">
                  <p>
                    Oops! Something went wrong! Failed to retrieve projects.
                  </p>
                </div>
              )}
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
            <AppFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;