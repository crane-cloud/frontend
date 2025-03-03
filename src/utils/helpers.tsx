import { useContext, useEffect, useState } from "react";
import useGet from "./useGet";
import { MenuContext } from "@/components/Layouts/DashboardLayout";
import { Badge } from "@mantine/core";
import { TbCheck, TbX } from "react-icons/tb";

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
      api: `/projects`,
    });
  }, [refresh]);

  useEffect(() => {
    if (success) {
      setProject(projectData?.data?.project || {});
      setCluster(projectData?.data?.cluster || {});
      if (setTitle) {
        setTitle(projectData?.data?.project?.name || "");
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
  }, [setMenuType, project_id, project]);

  return { project, cluster, loading, success, refresh, setRefresh };
};

export const useGetApp = (app_id: string) => {
  const { setMenuType, setProjectId, setAppId, setTitle, setSubtitle } =
    useContext(MenuContext);
  const { data: appData, getData, success, loading } = useGet();
  const [app, setApp] = useState<any>({});
  useEffect(() => {
    getData({
      id: app_id,
      api: `/apps`,
    });
  }, []);

  useEffect(() => {
    if (success) {
      setApp(appData?.data?.apps || {});
      setProjectId(appData?.data?.apps?.project_id || "");
      if (setTitle) {
        setTitle(appData?.data?.apps?.name);
      }
      if (app?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [success, appData]);

  useEffect(() => {
    setMenuType("app");
    if (setAppId) {
      setAppId(app_id || "");
    }
    if (setTitle && success) {
      setTitle(app?.name);

      if (app?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [setMenuType, setAppId, app_id]);

  return { app, loading, success };
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

export const getDatabaseStatus = (status: string) => {
  if (status) {
    return (
      <Badge
        color="green"
        variant="outline"
        size="xs"
        leftSection={<TbCheck />}
      >
        Ready
      </Badge>
    );
  }
  return (
    <Badge color="red" variant="outline" size="xs" leftSection={<TbX />}>
      Not Ready
    </Badge>
  );
};

export const numberFormat = (value: number) =>
  Number(value || 0).toLocaleString();

export const getConnectionString = (database: any) => {
  if (!database) {
    return "";
  }
  if (database?.database_flavour_name === "postgres") {
    return `postgresql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
  }
  return `mysql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
};
