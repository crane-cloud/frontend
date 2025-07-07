import { NoWrap } from "@/components/Elements/Elements";
import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";

const useVolumeClaims = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "namespace", header: "Namespace" },
    { id: "storage_class", header: "Storage Class" },
    { id: "size", header: "Size" },
    { id: "age", header: "Age" },
    { id: "status", header: "Status" },
  ];
  const tableData = (data: any) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      name: item?.metadata?.name,
      namespace: item?.metadata?.namespace,
      storage_class: item?.spec?.storageClassName,
      size: item?.spec?.resources?.requests?.storage,
      age: moment(item?.metadata?.creationTimestamp).fromNow(),
      status: (
        <NoWrap
          c={
            item?.status?.phase === "Bound"
              ? "green"
              : item?.status?.phase === "Pending"
                ? "orange"
                : "black"
          }
          fw={500}
        >
          {item?.status?.phase}
        </NoWrap>
      ),
    }));
  };
  const dataParent = "pvcs"; // make sure your API response structure matches this
  const apiRoute = `/clusters/${cluster_id}/pvcs`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useVolumeClaims;
