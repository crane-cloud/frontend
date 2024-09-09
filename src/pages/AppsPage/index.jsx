import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AppsList from "../../components/AppsList";
import CreateApp from "../../components/CreateApp";
import "./AppsPage.css";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

const AppsPage = () => {
  
  const [word, setWord] = useState("");

  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search); 
  const initialOpenModal = queryParams.get("initialOpenModal") === "true"; 
  const [openModal, setOpenModal] = useState(initialOpenModal);

  const { projectID } = useParams();

  const projects = useSelector((state) => state.userProjectsReducer.projects);

  const getProjectDetails = (projects, id) => {
    return projects?.find((project) => project.id === id);
  };

  const projectDetails = getProjectDetails(projects, projectID);

  const filteredDetails = {
    name: projectDetails?.name,
    description: projectDetails?.description,
    organisation: projectDetails?.organisation,
    project_type: projectDetails?.project_type,
  };

  localStorage.setItem("project", JSON.stringify(filteredDetails));

  const showForm = () => setOpenModal(true);
  const hideForm = () => {
    setOpenModal(false);
  };

  const handleCallbackSearchword = (word) => {
    setWord(word);
  };

  return (
    <div>
      {openModal ? (
        <DashboardLayout
          name={projectDetails?.name}
          header="Create App"
          showBtn
          buttontext="Close"
          btntype="close"
          btnAction={hideForm}
        >
          <CreateApp params={{ projectID }} />
        </DashboardLayout>
      ) : (
        <DashboardLayout
          name={projectDetails?.name}
          header="Apps"
          showBtn
          buttontext="+ New App"
          showSearchBar
          placeholder="Search through apps"
          searchAction={handleCallbackSearchword}
          btnAction={showForm}
        >
          <AppsList
            params={{ projectID }}
            word={word}
            openComponent={showForm}
          />
        </DashboardLayout>
      )}
    </div>
  );
};

AppsPage.propTypes = {
  initialOpenModal: PropTypes.bool, 
};

export default AppsPage;
