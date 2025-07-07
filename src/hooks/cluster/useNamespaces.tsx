import { useSetAdminClusterSidebar } from "@/utils/helpers";
import moment from "moment";
import { NoWrap } from "@/components/Elements/Elements";
import { Text } from "@mantine/core";

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
        name: <NoWrap>{item?.metadata?.name}</NoWrap>,
        labels: (
          <Text size="xs" lineClamp={1}>
            {Object.entries(item?.metadata?.labels || {})
              .map(([key, value]) => `${key}=${value}`)
              .join(", ")}
          </Text>
        ),
        age: (
          <NoWrap>{moment(item?.metadata?.creationTimestamp).fromNow()}</NoWrap>
        ),
        status: item?.status?.phase,
      };
      return row;
    });
  };
  const dataParent = "namespaces";
  const apiRoute = `/clusters/${cluster_id}/namespaces`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default useNamespaces;
