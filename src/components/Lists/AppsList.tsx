import React, { useEffect } from "react";
import AppsCard from "../Cards/AppsCard";
import useGet from "@/utils/useGet";
import { Skeleton } from "@mantine/core";
import { GridLayout } from "../Layouts/ListLayouts";

const AppsList = (props: any) => {
  const { project_id, refresh } = props;
  const { getData: getApps, data: apps, loading } = useGet();
  useEffect(() => {
    getApps({
      api: `/projects/${project_id}/apps`,
    });
  }, [project_id, refresh]);

  return (
    <GridLayout columns={2}>
      {loading
        ? [...Array(6)].map((_, index) => (
            <Skeleton key={index} height={100} w="100%" radius="md" />
          ))
        : apps?.data?.apps?.map((app: any) => (
            <AppsCard key={app.id} app={app} project_id={project_id} />
          ))}
    </GridLayout>
  );
};

export default AppsList;
