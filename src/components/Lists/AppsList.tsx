import React, { useEffect } from "react";
import AppsCard from "../Cards/AppsCard";
import useGet from "@/utils/useGet";
import { Skeleton } from "@mantine/core";
import { GridLayout } from "../Layouts/ListLayouts";

const AppsList = (props: any) => {
  const { project_id } = props;
  const { getData: getApps, data: apps, loading } = useGet();
  useEffect(() => {
    getApps({
      api: `projects/${project_id}/apps`,
    });
  }, [project_id]);

  return (
    <GridLayout columns={3}>
      {loading
        ? [...Array(6)].map((_, index) => (
            <Skeleton key={index} height={100} w="100%" radius="md" />
          ))
        : apps?.data?.apps?.map((app: any) => (
            <AppsCard key={app.id} app={app} />
          ))}
    </GridLayout>
  );
};

export default AppsList;
