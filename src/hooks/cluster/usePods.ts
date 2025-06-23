import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const usePods = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "namespace", header: "Namespace" },
    { id: "containers", header: "Containers" },
    { id: "restarts", header: "Restarts" },
    { id: "controlled_by", header: "Controlled By" },
    { id: "node", header: "Node" },
    { id: "qos", header: "QoS" },
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
      const row = {
        name: item?.metadata?.name,
        namespace: item?.metadata?.namespace,
        containers: item?.spec?.containers?.map((c: any) => c.name).join(", "),
        restarts: item?.status?.containerStatuses?.reduce(
          (acc: number, c: any) => acc + (c.restartCount || 0),
          0,
        ),
        controlled_by: item?.metadata?.ownerReferences
          ? item?.metadata?.ownerReferences[0]?.kind
          : "N/A",
        node: item?.spec?.nodeName || "N/A",
        qos: item?.status?.qosClass || "N/A",
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
        status: item?.status?.phase || "Unknown",
      };
      return row;
    });
  };

  const dataParent = "pods";
  const apiRoute = `/clusters/${cluster_id}/pods`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default usePods;
