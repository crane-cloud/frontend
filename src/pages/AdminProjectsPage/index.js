import React, { useState, useEffect, useCallback } from "react";
import "./AdminProjectsPage.css";
import InformationBar from "../../components/InformationBar";
import Header from "../../components/Header";
import SideNav from "../../components/SideNav";

import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";

import getAdminProjects from "../../redux/actions/adminProjects";
import getUsersList from "../../redux/actions/users";
import Spinner from "../../components/Spinner";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./AdminProjectsPage.css";
import { Link } from "react-router-dom";
import usePaginator from "../../hooks/usePaginator";
import Pagination from "../../components/Pagination";
import { handleGetRequest } from "../../apis/apis.js";

const AdminProjectsPage = () => {
  const [currentPage, handleChangePage] = usePaginator();
  const clusterID = localStorage.getItem("clusterID");
  const dispatch = useDispatch();

  const getAdminProps = useCallback(
    () => dispatch(getAdminProjects(currentPage)),
    [dispatch, currentPage]
  );
  const getUsersProps = useCallback(() => dispatch(getUsersList), [dispatch]);
  const adminProjects = useSelector((state) => state.adminProjectsReducer);
  // const usersList = useSelector((state) => state.usersListReducer);
  const [contextMenu, setContextMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  // const [addCredits, setAddCredits] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdminProps();
    getUsersProps();
    fetchUsersList();
  }, [getAdminProps, getUsersProps]);

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

  const getUserName = (id) => {
    let userName = "";
    users.forEach((user) => {
      if (user.id === id) {
        userName = user.name;
      }
    });
    return userName;
  };

  // const showModal = () => {
  //   setAddCredits(true);
  // };
  // const hideModal = () => {
  //   //setAddCredits(false);
  //   setContextMenu(false);
  // };

  const showContextMenu = (id) => {
    setContextMenu(true);
    setSelectedProject(id);
  };
  const clusterName = localStorage.getItem("clusterName");

  const handlePageChange = (currentPage) => {
    handleChangePage(currentPage);
    getAdminProps();
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
                <>
                  <Link
                    className="breadcrumb"
                    to={`/clusters/${clusterID}/projects`}
                  >
                    Overview
                  </Link>
                  <span> / Projects Listing</span>
                </>
              }
              showBtn={false}
            />
          </div>
          <div className="ContentSection">
            <div
              className={
                adminProjects.isRetrieving
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
                {adminProjects.isRetrieving ? (
                  <tbody>
                    <tr className="TableLoading">
                      <td>
                        <div className="SpinnerWrapper">
                          <Spinner size="big" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {adminProjects.projects !== 0 &&
                      adminProjects.projects !== undefined &&
                      adminProjects.projects.map((project) => (
                        <tr key={adminProjects.projects.indexOf(project)}>
                          <td>{project.name}</td>
                          <td>{getUserName(project.owner_id)}</td>
                          <td>{project.description}</td>
                          <td>
                            {/* optional chai */}
                            <span className="ProjectStatus">
                              {project.disabled !== false
                                ? "Active"
                                : "Disabled"}
                            </span>
                          </td>
                          <td
                            onClick={(e) => {
                              showContextMenu(project.id);
                              this.handleClick(e);
                            }}
                          >
                            <MoreIcon />

                            {contextMenu && project.id === selectedProject && (
                              <div className="BelowHeader bg-light">
                                <div className="context-menu">
                                  {/* <div
                                    className="DropDownLink Section"
                                    role="presentation"
                                  >
                                    Activate
                                  </div>
                                  <div
                                    className="DropDownLink"
                                    role="presentation"
                                  >
                                    Disable
                                  </div> */}
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
              {/* <Modal showModal={addCredits} onClickAway={() => hideModal()}>
                <div className="ModalHeader">
                  <h5 className="ModalTitle">Add Credits</h5>

                  <div className="">Number of credits</div>
                  <div className="ModalContent">
                    <BlackInputText required placeholder="Number of credits" />
                  </div>
                  <div className="CreditsTitle">Description</div>
                  <textarea
                    className="TextArea"
                    type="text"
                    placeholder="Credits description"
                    rows="4"
                    cols="50"
                  />
                </div>
                <div className="ModalFooter">
                  <div className="ModalButtons">
                    <PrimaryButton
                      className="CancelBtn"
                      onClick={() => hideModal()}
                    >
                     Cancel                 
                    </PrimaryButton>
                    <PrimaryButton type="button"  >
                      Add
                    </PrimaryButton>
                  </div>
                </div>
              </Modal> */}
              {adminProjects.isRetrieved &&
                adminProjects.projects.length === 0 && (
                  <div className="NoResourcesMessage">
                    <p>No projects available</p>
                  </div>
                )}
              {!adminProjects.isRetrieving && !adminProjects.isRetrieved && (
                <div className="NoResourcesMessage">
                  <p>
                    Oops! Something went wrong! Failed to retrieve projects.
                  </p>
                </div>
              )}
            </div>
            {adminProjects.pagination?.pages > 1 && (
              <div className="AdminPaginationSection">
                <Pagination
                  total={adminProjects.pagination.pages}
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

export default AdminProjectsPage;
