import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const useNamespaces = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "labels", header: "Labels" },
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
        // ...item,
        name: item?.metadata?.name,
        labels: Object.entries(item?.metadata?.labels || {})
          .map(([key, value]) => `${key}=${value}`)
          .join(", "),
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
        status: item?.status?.phase,
      };
      return row;
    });
  };
  const dataParent = "Namespaces";
  const apiRoute = `/clusters/${cluster_id}/namespaces`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useNamespaces;
