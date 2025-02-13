import { useContext, useEffect, useState } from "react";
import useGet from "./useGet";
import { MenuContext } from "@/pages/Layouts/DashboardLayout";

export const beautify = (str: string) => {
  return (str || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replaceAll("/", "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const useGetProject = (project_id: string) => {
  const [project, setProject] = useState<any>({});
  const { setMenuType, setProjectId, setTitle } = useContext(MenuContext);
  const { data: projectData, getData, success, loading } = useGet();
  useEffect(() => {
    getData({
      id: project_id,
      api: `projects`,
    });
  }, []);

  useEffect(() => {
    if (success) {
      setProject(projectData.data.project);
      if (setTitle) {
        setTitle(projectData.data.project.name);
      }
    }
  }, [success, projectData]);

  useEffect(() => {
    setMenuType("project");
    setProjectId(project_id || "");
    if (setTitle && success) {
      setTitle(project?.name);
    }
  }, [setMenuType, setProjectId, project_id, project]);

  return { project, loading, success };
};
