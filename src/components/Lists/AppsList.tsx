import React, { useEffect, useState } from "react";
import AppsCard from "../Cards/AppsCard";
import useGet from "@/utils/useGet";
import { Center, Divider, Pagination, Skeleton } from "@mantine/core";
import { GridLayout } from "../Layouts/ListLayouts";
import DataNotFoundMessage from "@/pages/common/DataFoundMessage";
import { DOCS_URL } from "@/config";

const AppsList = (props: any) => {
  const { project_id, refresh } = props;

  const { getData: getApps, data: appsData, loading, success } = useGet();

  const [apps, setApps] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getApps({
      api: `/projects/${project_id}/apps`,
      params: { page: currentPage, per_page: 6 },
    });
  }, [project_id, currentPage, refresh]);

  useEffect(() => {
    if (success) {
      setApps(appsData?.data?.apps);
      setPagination(appsData?.data?.pagination);
    }
  }, [success, appsData]);

  return (
    <>
      {loading ? (
        <GridLayout columns={2}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height={100} w="100%" radius="md" />
          ))}
        </GridLayout>
      ) : apps && apps.length > 0 ? (
        <GridLayout columns={2}>
          {apps?.map((app: any) => (
            <AppsCard key={app.id} app={app} project_id={project_id} />
          ))}
        </GridLayout>
      ) : (
        <DataNotFoundMessage
          title="No apps found"
          helpText="Try creating a new app or check the documentation."
          helpLink={`${DOCS_URL}/applications/deploy-singleApp/`}
        />
      )}

      {pagination?.pages > 1 && (
        <>
          <Divider my="md" />

          <Center mt="md">
            <Pagination
              total={pagination.pages}
              value={currentPage}
              onChange={setCurrentPage}
            />
          </Center>
        </>
      )}
    </>
  );
};

export default AppsList;
