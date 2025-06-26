import {
  formatClusterServicePorts,
  useSetAdminClusterSidebar,
} from "@/utils/helpers";
import moment from "moment";

const useJobs = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "namespace", header: "Namespace" },
    { id: "completion", header: "Completion" },
    { id: "age", header: "age" },
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
        namespace: item?.spec?.namespace,
        completion: item?.spec?.completion,
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
         conditions: item?.spec?.conditions,
      };
      return row;
    });
  };
  const dataParent = "jobs";
  const apiRoute = `/clusters/${cluster_id}/jobs`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useJobs;
