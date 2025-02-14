import { useContext, useEffect, useState } from "react";
import useGet from "./useGet";
import { MenuContext } from "@/components/Layouts/DashboardLayout";

export const beautify = (str: string) => {
  return (str || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replaceAll("/", "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const useGetProject = (project_id: string) => {
  const { setMenuType, setProjectId, setTitle } = useContext(MenuContext);
  const { data: projectData, getData, success, loading } = useGet();
  const [project, setProject] = useState<any>({});
  const [cluster, setCluster] = useState<any>({});
  useEffect(() => {
    getData({
      id: project_id,
      api: `projects`,
    });
  }, []);

  useEffect(() => {
    if (success) {
      setProject(projectData.data.project);
      setCluster(projectData.data.cluster);
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

  return { project, cluster, loading, success };
};

export const returnObject = (show: boolean, object: any) => {
  return show ? object : [];
};


export const useSetHomeSidebar = () => {
  const { setMenuType } = useContext(MenuContext);
  useEffect(() => {
    setMenuType("home");
  }, [setMenuType]);
};
