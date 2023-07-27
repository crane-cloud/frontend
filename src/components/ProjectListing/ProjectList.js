import React, { useState, useEffect, useCallback } from "react";
import "./ProjectList.css";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import getAdminProjectsList from "../../redux/actions/adminProjectsList";
import getUsersList from "../../redux/actions/users";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { handleGetRequest } from "../../apis/apis.js";
import { ReactComponent as SearchButton } from "../../assets/images/search.svg";


const AdminProjectsList = () => {
  const [currentPage, handleChangePage] = usePaginator();
  const dispatch = useDispatch();
  const [word, setWord] = useState("");

  const { isRetrieved , isRetrieving, projects, pagination} = useSelector(
    (state) => state.adminProjectsReducer
  );

  const AdminProjects = useCallback(
    (page, keyword='') => dispatch(getAdminProjectsList(page,keyword)),
    [dispatch]
    );

  const getUsersProps = useCallback(() => dispatch(getUsersList), [dispatch]);
 
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    AdminProjects(currentPage);
  },[currentPage,AdminProjects]);


  useEffect(() => {
    getUsersProps();
    fetchUsersList();
    AdminProjects(currentPage);
  }, [getUsersProps,AdminProjects,currentPage]);

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

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    AdminProjects();
  };

  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection1">
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar
              header={
                <>
                  <span>
                    <Link
                      to={{ pathname: `/clusters` }}
                      className="breadcrumb"
                    >
                      Dashboard
                    </Link>
                      / Projects Listing
                  </span>
                 
                </>
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
                       projects.map((project) =>(
                        <tr key={projects.indexOf(project)}>
                           <td>{project?.name}</td>
                            <td>{getUserName(project?.owner_id)}</td>
                            <td >{project?.description}</td>
                            <td>
                              <span className={project?.disabled === false ? "ProjectStatus":"ProjectStatusDisabled"}>
                                {project?.disabled === false
                                  ? "Active"
                                  : "Disabled"}
                              </span>
                            </td>
                        </tr>
                       ))

                    }
                  </tbody>
                )}
              </table>
              {isRetrieved &&
                projects.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No projects available</p>
                  </div>
                )}
              {!isRetrieving && !isRetrieved && (
                <div className="NoResourcesMessage">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsList;