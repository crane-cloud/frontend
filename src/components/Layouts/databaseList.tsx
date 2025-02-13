import React, { useEffect } from "react";
import useGet from "@/utils/useGet";
import { GridLayout } from "./ListLayouts";
import { Skeleton } from "@mantine/core";
import DatabaseCard from "../Cards/DatabaseCard";

const DatabaseList = (props: any) => {
  const { project_id } = props;
  const { getData: getDatabases, data: databases, loading } = useGet();
  useEffect(() => {
    getDatabases({
      api: `projects/${project_id}/databases`,
    });
  }, [project_id]);

  return (
    <GridLayout columns={3}>
      {/* {loading
        ? [...Array(6)].map((_, index) => (
            <Skeleton key={index} height={100} w="100%" radius="md" />
          ))
        : databases?.data?.databases?.map((database: any) => (
            <DatabaseCard key={database.id} database={database} />
          ))} */}
      <DatabaseCard />
    </GridLayout>
  );
};

export default DatabaseList;
