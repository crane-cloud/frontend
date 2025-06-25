import {
  useSetAdminClusterSidebar,
} from "@/utils/helpers";
import moment from "moment";

const useJobs = ({ cluster_id }: { cluster_id: string }) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "nameSpace", header: "nameSpace" },
    { id: "completions", header: "completions" },
    { id: "age", header: "Age" },
    { id: "conditions", header: "conditions" },
    
  ];

  const tableData = (data: any[]) => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => ({
      name: item?.metadata?.name,
      completions: item?.spec?.completions ?? "N/A",
      nameSpace: item?.status?.nameSpace ?? 0,
      conditions: item?.status?.conditions
        ? moment(item.status.startTime).fromNow()
        : "N/A",
      age: item?.metadata?.creationTimestamp
        ? moment(item.metadata.creationTimestamp).fromNow()
        : "Unknown",
    }));
  };

  const dataParent = "Jobs";
  const apiRoute = `/clusters/${cluster_id}/jobs`;
 // /clusters/{cluster_id}/jobs

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useJobs;
