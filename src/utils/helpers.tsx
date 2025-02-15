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
  const { setMenuType, setProjectId, setTitle, setSubtitle } =
    useContext(MenuContext);
  const { data: projectData, getData, success, loading } = useGet();
  const [project, setProject] = useState<any>({});
  const [cluster, setCluster] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData({
      id: project_id,
      api: `projects`,
    });
  }, []);
  useEffect(() => {
    getData({
      id: project_id,
      api: `projects`,
    });
  }, [refresh]);

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
      if (project?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [setMenuType, setProjectId, project_id, project]);

  return { project, cluster, loading, success, refresh, setRefresh };
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

export const useSetContainerSize = (size: string) => {
  const { setContainerSize } = useContext(MenuContext);
  useEffect(() => {
    setContainerSize(size);
    return () => {
      setContainerSize("xl");
    };
  }, [setContainerSize, size]);
};
