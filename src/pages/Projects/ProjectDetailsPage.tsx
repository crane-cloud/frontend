import React, { useContext, useEffect } from "react";
import { MenuContext } from "../Layouts/DashboardLayout";
import { useParams } from "react-router-dom";

const ProjectDetailsPage = () => {
  const { setMenuType, setProjectId } = useContext(MenuContext);
  const { id } = useParams();

  useEffect(() => {
    setMenuType("project");
    setProjectId(id || "");
  }, [setMenuType, setProjectId, id]);

  return <div>ProjectDetailsPage</div>;
};

export default ProjectDetailsPage;
