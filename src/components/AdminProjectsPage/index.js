import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./AdminProjectsPage.css";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import getAdminProjects from "../../redux/actions/adminProjects";
import getUsersList from "../../redux/actions/users";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";

const AdminProjectsPage = ({adminProjects, usersList}) => {

  const {clusterID } = useParams();

  const getUserName = (userId) => {
    let username = "";
    if (usersList.isFetched) {
      usersList.users.map((user) => {
        if (userId === user.id) {
          username = user.name;
        }
        return null;
      });
    }
    return username;
  };

  useEffect(() => {
    getAdminProjects();
    getUsersList();
  }, []);

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
            <InformationBar header="Projects" showBtn={false} />
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
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
              {adminProjects.isRetrieved && adminProjects.projects.length === 0 && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminProjects: state.adminProjectsReducer,
    usersList: state.usersListReducer,
  };
};

const mapDispatchToProps = {
  getAdminProjects,
  getUsersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProjectsPage);
