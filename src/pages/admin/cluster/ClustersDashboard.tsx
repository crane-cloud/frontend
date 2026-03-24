import { formatDate, useGetAdminCluster } from "@/utils/helpers";
import React from "react";
import { Stack, Skeleton } from "@mantine/core";
import TitleText from "@/components/TitleText";
import { useParams } from "react-router-dom";
import DetailsCard, { SimpleDetailsCard } from "@/components/Cards/DetailsCard";

const LoadingSkeleton = () => (
  <Stack>
    <Skeleton height={40} width={300} mb={20} />
    <Skeleton height={100} radius="md" mb={20} />
  </Stack>
);

const ClustersDashboard = () => {
  const { cluster_id } = useParams();
  const { clusterData, loading, success } = useGetAdminCluster(
    cluster_id || "",
  );
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
      <ClusterDetailsCard clusterData={clusterData} />
    </Stack>
  );
};

export default ClustersDashboard;

export const ClusterDetailsCard = ({
  clusterData,
  loading = false,
}: {
  clusterData: any;
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <Stack gap="md">
        {[...Array(1)].map((_, index) => (
          <Skeleton key={index} height={200} radius="sm" />
        ))}
      </Stack>
    );
  }
  return (
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
  );
};
