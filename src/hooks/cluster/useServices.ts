import {
  formatClusterServicePorts,
  useSetAdminClusterSidebar,
} from "@/utils/helpers";
import moment from "moment";

const useServices = ({ cluster_id }: any) => {
  useSetAdminClusterSidebar();

  const tableColumns = () => [
    { id: "name", header: "Name" },
    { id: "type", header: "Type" },
    { id: "clusterIP", header: "Cluster IP" },
    { id: "ports", header: "Ports" },
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
        type: item?.spec?.type,
        clusterIP: item?.spec?.clusterIP,
        ports: formatClusterServicePorts(item?.spec?.ports),
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
      };
      return row;
    });
  };
  const dataParent = "services";
  const apiRoute = `/clusters/${cluster_id}/services`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useServices;
