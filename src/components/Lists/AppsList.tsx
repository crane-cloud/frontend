import React, { useEffect } from "react";
import AppsCard from "../Cards/AppsCard";
import useGet from "@/utils/useGet";
import { Skeleton } from "@mantine/core";
import { GridLayout } from "../Layouts/ListLayouts";
import DataNotFoundMessage from "@/pages/common/DataFoundMessage";
import { DOCS_URL } from "@/config";
import { useInfiniteScrollWithPagination } from "@/hooks/useInfiniteScroll";

const AppsList = (props: any) => {
  const { project_id, refresh } = props;

  const { getData, data: appsData, loading, success } = useGet();

  const { items: apps, lastElementRef } = useInfiniteScrollWithPagination({
    loading,
    success,
    data: appsData,
    extractItems: (data) => data?.data?.apps || [],
    extractPagination: (data) => data?.data?.pagination || {},
    extractItemId: (app) => app.id,
    onLoadMore: (page) => {
      getData({
        api: `/projects/${project_id}/apps`,
        params: { page, per_page: 6 },
      });
    },
    resetTrigger: refresh,
  });

  // Initial data fetch
  useEffect(() => {
    getData({
      api: `/projects/${project_id}/apps`,
      params: { page: 1, per_page: 6 },
    });
  }, [project_id]);

  return (
    <>
      {!loading && apps.length === 0 ? (
        <DataNotFoundMessage
          title="No apps found"
          helpText="Try creating a new app or check the documentation."
          helpLink={`${DOCS_URL}/applications/deploy-singleApp/`}
        />
      ) : (
        <GridLayout columns={2}>
          {apps?.map((app: any, index: number) => {
            const isLast = index === apps.length - 1;
            return (
              <div
                key={app.id}
                ref={isLast ? lastElementRef : null}
                style={{ height: "100%" }}
              >
                <AppsCard app={app} project_id={project_id} />
              </div>
            );
          })}

          {loading &&
            [...Array(6)].map((_, index) => (
              <Skeleton
                key={`skeleton-${index}`}
                height={100}
                w="100%"
                radius="md"
              />
            ))}
        </GridLayout>
      )}
    </>
  );
};

export default AppsList;
