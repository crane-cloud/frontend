import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const useVolumes = ({ cluster_id }: any) => {
  // set Cluster Sidebar
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "storage_class", header: "Storage Class" },
    { id: "capacity", header: "Capacity" },
    { id: "status", header: "Status" },
    { id: "access_modes", header: "Access Modes" },
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
        // ...item,
        name: item?.metadata?.name,
        access_modes: item?.spec?.accessModes?.[0],
        status: item?.status?.phase,
        capacity: item?.spec?.capacity?.storage,
        storage_class: item?.spec?.storageClassName,
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
      };
      return row;
    });
  };
  const dataParent = "pvs";
  const apiRoute = `/clusters/${cluster_id}/pvs`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useVolumes;
