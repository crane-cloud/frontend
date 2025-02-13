import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../Layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import useGet from "@/utils/useGet";
import TitleText from "@/components/TitleText";
const ProjectDetailsPage = () => {
  const { setMenuType, setProjectId, setTitle } = useContext(MenuContext);
  const { id } = useParams();
  const { data: projectData, getData, loading, success } = useGet();
  const [project, setProject] = useState<any>({});

  useEffect(() => {
    getData({
      id,
      api: `projects`,
    });
  }, []);

  useEffect(() => {
    if (success) {
      setProject(projectData?.data?.project);
    }
    // if (setTitle) {
    //   setTitle(project?.name);
    // }
  }, [success]);

  useEffect(() => {
    setMenuType("project");
    setProjectId(id || "");
    if (setTitle && success) {
      setTitle(project?.name);
    }
  }, [setMenuType, setProjectId, id, setTitle, success]);

  return (
    <div>
      {success && (
        <TitleText loading={loading}>{project?.name} Dashboard</TitleText>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
