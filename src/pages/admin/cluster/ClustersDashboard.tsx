import { formatDate, useSetAdminClusterSidebar } from "@/utils/helpers";
import React, { useEffect } from "react";
import { Stack, Skeleton } from "@mantine/core";
import TitleText from "@/components/TitleText";
import { useParams } from "react-router-dom";
import useGet from "@/utils/useGet";
import DetailsCard, { SimpleDetailsCard } from "@/components/Cards/DetailsCard";

const LoadingSkeleton = () => (
  <Stack>
    <Skeleton height={40} width={300} mb={20} />
    <Skeleton height={100} radius="md" mb={20} />
    <Stack gap="md">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} height={30} radius="sm" />
      ))}
    </Stack>
  </Stack>
);

const ClustersDashboard = () => {
  useSetAdminClusterSidebar();
  const { cluster_id } = useParams();
  const {
    getData: getClusterInfo,
    data: clusterData,
    loading,
    success,
  } = useGet();

  useEffect(() => {
    if (cluster_id) {
      getClusterInfo({ api: `/clusters/${cluster_id}` });
    }
  }, [cluster_id]);
  const getMetaData = () => {
    const metaData = clusterData?.data?.resource_count?.reduce(
      (acc: any, item: any) => {
        acc[item.name] = item.count;
        return acc;
      },
      {},
    );
    return metaData;
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <Stack>
      <TitleText>
        {clusterData?.data?.cluster?.name} Cluster Dashboard
      </TitleText>
      <SimpleDetailsCard data={success ? getMetaData() : {}} />
      <DetailsCard
        data={[
          { label: "Name", value: clusterData?.data?.cluster?.name },
          { label: "Host", value: clusterData?.data?.cluster?.host },
          {
            label: "Sub Domain",
            value: clusterData?.data?.cluster?.sub_domain,
          },
          {
            label: "Cost Modal URL",
            value: clusterData?.data?.cluster?.cost_modal_url,
          },
          {
            label: "Supports ML",
            value: clusterData?.data?.cluster?.supports_ml ? "Yes" : "No",
          },
          {
            label: "Prometheus URL",
            value: clusterData?.data?.cluster?.prometheus_url,
          },
          {
            label: "Description",
            value: clusterData?.data?.cluster?.description,
          },
          {
            label: "Date Created",
            value: formatDate(clusterData?.data?.cluster?.date_created),
          },
        ]}
      />
    </Stack>
  );
};

export default ClustersDashboard;
