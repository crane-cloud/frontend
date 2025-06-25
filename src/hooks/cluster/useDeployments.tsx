import { useSetAdminClusterSidebar } from "@/utils/helpers";
import { Anchor, Text, Tooltip } from "@mantine/core";
import moment from "moment";
import React from "react";

const useDeployments = ({ cluster_id }: { cluster_id: string }) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "namespace", header: "Namespace" },
    { id: "pods", header: "Pods" },
    { id: "replicas", header: "Replicas" },
    { id: "age", header: "Age" },
    { id: "status", header: "Status" },
  ];

  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => {
      const namespace = item?.metadata?.namespace;
      const readyReplicas = item?.status?.readyReplicas || 0;
      const replicas = item?.status?.replicas || 0;
      const availableReplicas = item?.status?.availableReplicas || 0;
      const unavailableReplicas = item?.status?.unavailableReplicas || 0;

      const row = {
        name: (
          <Tooltip label={item?.metadata?.name} withArrow>
            <Text lineClamp={1}>{item?.metadata?.name}</Text>
          </Tooltip>
        ),
        namespace: (
          <Tooltip label={namespace} withArrow>
            <Text lineClamp={1}>
              <Anchor
                href="#"
                target="_blank"
                underline="always"
                onClick={(e) => e.preventDefault()}
              >
                {namespace}
              </Anchor>
            </Text>
          </Tooltip>
        ),
        pods: (
          <Tooltip label={`Ready: ${readyReplicas}/${replicas}\nAvailable: ${availableReplicas}\nUnavailable: ${unavailableReplicas}`} withArrow>
            <Text lineClamp={1}>
              {`${readyReplicas}/${replicas}`}
            </Text>
          </Tooltip>
        ),
        replicas: (
          <Text lineClamp={1}>{replicas}</Text>
        ),
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
        status: (
          <Text
            c={availableReplicas === replicas ? "green" : "red"}
            fw={500}
          >
            {availableReplicas === replicas ? "Ready" : "Not Ready"}
          </Text>
        ),
      };
      return row;
    });
  };

  const dataParent = "deployments";
  const apiRoute = `/clusters/${cluster_id}/deployments`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useDeployments;