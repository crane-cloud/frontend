import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const getTableColumns = () => [
  { id: "name", header: "Name" },
  { id: "namespace", header: "Namespace" },
  { id: "pods", header: "Pods" },
  { id: "replicas", header: "Replicas" },
  { id: "age", header: "Age" },
  { id: "status", header: "Status" },
];

const formatDeploymentData = (data: any): Array<{
  name: string | undefined;
  namespace: string | undefined;
  pods: string;
  replicas: number;
  age: string;
  status: string;
}> => {
  if (!Array.isArray(data)) return [];

  return data.map((item: any) => {
    const name = item?.metadata?.name;
    const namespace = item?.metadata?.namespace;
    const readyReplicas = item?.status?.readyReplicas || 0;
    const replicas = item?.status?.replicas || 0;
    const creationTimestamp = item?.metadata?.creationTimestamp;

    return {
      name,
      namespace,
      pods: `${readyReplicas}/${replicas}`,
      replicas,
      age: moment(creationTimestamp).fromNow(),
      status: readyReplicas === replicas ? "Ready" : "Not Ready",
    };
  });
};

const useDeployments = ({ cluster_id }: { cluster_id: string }) => {
  useSetAdminClusterSidebar();

  const dataParent = "deployments";
  const apiRoute = `/clusters/${cluster_id}/deployments`;

  return {
    tableColumns: getTableColumns,
    tableData: formatDeploymentData,
    apiRoute,
    dataParent,
  };
};

export default useDeployments;
