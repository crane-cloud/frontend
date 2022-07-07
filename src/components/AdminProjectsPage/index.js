import React, { useEffect, useCallback, useState } from "react";
import "./AdminProjectsPage.css";
import InformationBar from "../InformationBar";
import Header from "../Header";
import SideNav from "../SideNav";
import Modal from "../Modal";
import BlackInputText from "../BlackInputText";
import { ReactComponent as MoreIcon } from "../../assets/images/more-verticle.svg";
import PrimaryButton from "../PrimaryButton";
import getAdminProjects from "../../redux/actions/adminProjects";
import getUsersList from "../../redux/actions/users";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./AdminProjectsPage.css";

const AdminProjectsPage = () => {
  const { clusterID } = useParams();
  const dispatch = useDispatch();

  const getAdminProps = useCallback(
    () => dispatch(getAdminProjects()),
    [dispatch]
  );
  const getUsersProps = useCallback(() => dispatch(getUsersList), [dispatch]);
  const adminProjects = useSelector((state) => state.adminProjectsReducer);
  const usersList = useSelector((state) => state.usersListReducer);

  const [contextMenu, setContextMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [addCredits, setAddCredits] = useState(false);

  useEffect(() => {
    getAdminProps();
    getUsersProps();
  }, [getAdminProps, getUsersProps]);

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

  const showModal = () => {
    setAddCredits(true);
  };
  const hideModal = () => {
    setAddCredits(false);
    setContextMenu(false);
  };
  const showContextMenu = (id) => {
    setContextMenu(true);
    setSelectedProject(id);
  };

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
                          <td onClick={() => showContextMenu(project.id)}>
                            <MoreIcon />

                            {contextMenu && project.id === selectedProject && (
                              <div className="BelowHeader bg-light">
                                <div className="context-menu">
                                  <div
                                    className="DropDownLink"
                                    role="presentation"
                                    onClick={() => showModal()}
                                  >
                                    Add Credits
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
              <Modal showModal={addCredits} onClickAway={() => hideModal()}>
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
                      label="Cancel"
                      onClick={() => hideModal()}
                    />
                    <PrimaryButton type="button" label="Add" />
                  </div>
                </div>
              </Modal>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
