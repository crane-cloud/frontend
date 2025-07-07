import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const useStorageClasses = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "provisioner", header: "Provisioner" },
    { id: "reclaimPolicy", header: "Reclaim Policy" },
    { id: "default", header: "Default" },
    { id: "age", header: "Age" },
  ];

  const tableData = (data: any) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item) => {
      const isDefault =
        item?.metadata?.annotations?.[
          "storageclass.kubernetes.io/is-default-class"
        ] === "true";

      return {
        name: item?.metadata?.name,
        provisioner: item?.provisioner,
        reclaimPolicy: item?.reclaimPolicy,
        default: isDefault ? "Yes" : "No",
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
      };
    });
  };

  const dataParent = "storage_classes";
  const apiRoute = `/clusters/${cluster_id}/storage_classes`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useStorageClasses;
