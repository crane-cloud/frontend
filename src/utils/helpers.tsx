import { useContext, useEffect, useState } from "react";
import useGet from "./useGet";
import { MenuContext } from "@/components/Layouts/DashboardLayout";
import { Badge } from "@mantine/core";
import { TbCheck, TbX } from "react-icons/tb";
import moment from "moment";
import { BiTrash } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
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
      setTitle(projectData?.data?.project?.name);
      if (projectData?.data?.project?.disabled && setSubtitle) {
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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData({
      id: app_id,
      api: `/apps`,
    });
  }, [refresh]);

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
    if (setAppId) {
      setAppId(app_id || "");
    }
    if (appData?.data?.apps?.is_notebook) {
      setMenuType("mlops");
    } else {
      setMenuType("app");
    }
    if (setTitle && success) {
      setTitle(appData?.data?.apps?.name);

      if (appData?.data?.apps?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [setMenuType, setAppId, app_id, appData, success]);

  return { app, loading, success, refresh, setRefresh };
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

export const dateFormat = (date: string, format = "DD/MMM/YYYY") =>
  moment(date).format(format);

export const getConnectionString = (database: any) => {
  if (!database) {
    return "";
  }
  if (database?.database_flavour_name === "postgres") {
    return `postgresql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
  }
  return `mysql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
};

export const convertArrayToObject = (arrayData: any[]) => {
  // Create an object from the array of env variables
  if (!arrayData) {
    return {};
  }
  const envObject = arrayData.reduce(
    (acc, env) => {
      if (env.key && env.key.trim() !== "") {
        acc[env.key] = env.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return envObject;
};
export const convertObjectToArray = (objectData: any) => {
  if (!objectData) {
    return [];
  }
  return Object.entries(objectData).map(([key, value]) => ({
    key,
    value,
  }));
};

export const createColumn = (id: any) => {
  return {
    id,
    header: beautify(id),
  };
};

export const removeUnnecessaryFields = (data: any, keys: string[] = []) => {
  const newData = { ...data };
  keys.forEach((item) => {
    delete newData[item];
  });
  return newData;
};

export const createEditAction = (url: string) => {
  return {
    label: "Edit",
    to: url,
    icon: <TiEdit color="var(--mantine-primary-color-7)" size={18} />,
  };
};

export const createDeleteAction = ({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  return {
    label: "Delete",
    to: url,
    icon: <BiTrash color="var(--mantine-color-red-7)" size={18} />,
    params,
  };
};
