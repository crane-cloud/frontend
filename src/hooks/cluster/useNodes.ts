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

  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => {
      const row = {
        // ...item,
        name: item?.metadata?.name,
        taints: item?.spec?.taints?.length,
        roles: Object.keys(item?.metadata?.labels).find((key) => {
          return key === "node-role.kubernetes.io/control-plane";
        })
          ? "Control Plane"
          : "Worker",

        version: item?.status?.nodeInfo?.kubeletVersion,
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
        conditions: item?.status?.conditions.find((condition: any) => {
          return condition.type === "Ready";
        })
          ? "Ready"
          : "Not Ready",
      };
      return row;
    });
  };
  const dataParent = "nodes";
  const apiRoute = `/clusters/${cluster_id}/nodes`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useNodeList;
