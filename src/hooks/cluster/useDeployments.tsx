import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

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
    return data.map((item: any) => ({
      name: item?.metadata?.name,
      namespace: item?.metadata?.namespace,
      pods: `${item?.status?.readyReplicas || 0}/${item?.status?.replicas || 0}`,
      replicas: item?.status?.replicas || 0,
      age: moment(item?.metadata?.creationTimestamp).fromNow(),
      status: (item?.status?.availableReplicas || 0) === (item?.status?.replicas || 0) 
        ? "Ready" 
        : "Not Ready",
    }));
  };

  const dataParent = "deployments";
  const apiRoute = `/clusters/${cluster_id}/deployments`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useDeployments;