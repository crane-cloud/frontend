import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const getRole = (labels: any) => {
  if (!labels) {
    return "Unknown";
  }
  const keys = Object.keys(labels);
  if (keys.includes("job-role.kubernetes.io/control-plane")) {
    return "Control Plane";
  }
  return "not yet";
};

const isJobReady = (conditions: any[]) => {
  return conditions?.find((condition) => condition.type === "Ready")
    ? "Ready"
    : "Not Ready";
};

const parseNode = (item: any) => ({
  name: item?.metadata?.name,
  namespace: item?.metadata?.namespace?.length,
  completion: getRole(item?.metadata?.labels),
  age: moment(item?.metadata?.creationTimestamp).fromNow(),
  conditions: isJobReady(item?.status?.conditions),
});

const useJobs = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "namespace", header: "namespace" },
    { id: "completion", header: "completion" },
    { id: "age", header: "Age" },
    { id: "conditions", header: "Conditions" },
  ];

  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => parseNode(item));
  };
  const dataParent = "jobs";
  const apiRoute = `/clusters/${cluster_id}/jobs`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useJobs;
