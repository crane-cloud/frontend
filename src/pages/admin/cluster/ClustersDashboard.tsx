import { formatDate, useSetAdminClusterSidebar } from "@/utils/helpers";
import React, { useEffect } from "react";
import { Stack } from "@mantine/core";
import TitleText from "@/components/TitleText";
import { useParams } from "react-router-dom";
import useGet from "@/utils/useGet";
import DetailsCard, { SimpleDetailsCard } from "@/components/Cards/DetailsCard";
const clusterData = {
  status: "succcess",
  data: {
    cluster: {
      description: "RENU cluster dev",
      id: "87c7bfb3-a467-4256-ac3d-3bbd22ad785f",
      date_created: "2025-01-15T08:05:51.077858",
      host: "https://102.34.160.59:6443",
      disabled: false,
      cost_modal_url: "",
      prometheus_url: "http://prom.renu-01.cranecloud.io",
      name: "Renu-dev",
      sub_domain: "renu-01.cranecloud.io",
      supports_ml: null,
    },
    resource_count: [
      {
        name: "nodes",
        count: 6,
      },
      {
        name: "PVCs",
        count: 2,
      },
      {
        name: "pods",
        count: 119,
      },
      {
        name: "services",
        count: 70,
      },
      {
        name: "deployments",
        count: 68,
      },
      {
        name: "namespaces",
        count: 168,
      },
    ],
  },
};

const ClustersDashboard = () => {
  useSetAdminClusterSidebar();
  // const { cluster_id } = useParams();
  // const {
  //   getData: getClusterInfo,
  //   data: clusterData,
  //   loading,
  //   success,
  // } = useGet();

  // useEffect(() => {
  //   if (cluster_id) {
  //     getClusterInfo({ api: `/clusters/${cluster_id}` });
  //   }
  // }, [cluster_id]);
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
  return (
    <Stack>
      <TitleText>
        {clusterData?.data?.cluster?.name} Cluster Dashboard
      </TitleText>
      <SimpleDetailsCard data={getMetaData()} />
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
