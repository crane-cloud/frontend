import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const useNodeList = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "taints", header: "Taints" },
    { id: "roles", header: "Roles" },
    { id: "version", header: "Version" },
    { id: "age", header: "Age" },
    { id: "conditions", header: "Conditions" },
  ];

  const getRole = (labels: any) => {
    if (!labels) {
      return "Unknown";
    }
    const keys = Object.keys(labels);
    if (keys.includes("node-role.kubernetes.io/control-plane")) {
      return "Control Plane";
    }
    return "Worker";
  };

  const isNodeReady = (conditions: any[]) => {
    return conditions?.find((condition) => condition.type === "Ready")
      ? "Ready"
      : "Not Ready";
  };

  const parseNode = (item: any) => ({
    name: item?.metadata?.name,
    taints: item?.spec?.taints?.length,
    roles: getRole(item?.metadata?.labels),
    version: item?.status?.nodeInfo?.kubeletVersion,
    age: moment(item?.metadata?.creationTimestamp).fromNow(),
    conditions: isNodeReady(item?.status?.conditions),
  });

  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => parseNode(item));
  };
  const dataParent = "nodes";
  const apiRoute = `/clusters/${cluster_id}/nodes`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useNodeList;
