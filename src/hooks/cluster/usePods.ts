import { useSetAdminClusterSidebar } from "@/utils/helpers";

import moment from "moment";

const usePods = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "ready", header: "Ready" },
    { id: "status", header: "Status" },
    { id: "age", header: "Age" },
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
        ready: `${
          item?.status?.containerStatuses?.filter((c: any) => c.ready).length ||
          0
        }/${item?.status?.containerStatuses?.length || 0}`,
        status: item?.status?.phase,
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
      };
      return row;
    });
  };

  const dataParent = "pods";
  const apiRoute = `/clusters/${cluster_id}/pods`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default usePods;
