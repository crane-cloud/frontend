import { NoWrap } from "@/components/Elements/Elements";
import { useSetAdminClusterSidebar } from "@/utils/helpers";
import { Text, Tooltip, Group, Box } from "@mantine/core";
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
      const namespace = item?.metadata?.namespace;
      const controlledBy = item?.metadata?.ownerReferences
        ? item?.metadata?.ownerReferences[0]?.kind
        : "N/A";

      // Get container statuses for determining running/failed state
      const containerStatuses = item?.status?.containerStatuses || [];
      const containers = item?.spec?.containers || [];

      // Create container status mapping
      const containerStatusMap = containerStatuses.reduce(
        (acc: any, status: any) => {
          acc[status.name] = status;
          return acc;
        },
        {},
      );

      const row = {
        name: <NoWrap>{item?.metadata?.name}</NoWrap>,
        namespace: (
          <Tooltip label={namespace} withArrow>
            <NoWrap>{namespace}</NoWrap>
          </Tooltip>
        ),
        containers: (
          <Group gap={3} style={{ cursor: "pointer" }}>
            {containers.map((container: any, index: number) => {
              const status = containerStatusMap[container.name];
              const isRunning = status?.ready && status?.state?.running;
              const isFailed =
                status?.state?.waiting?.reason === "CrashLoopBackOff" ||
                status?.state?.terminated?.reason === "Error" ||
                status?.state?.terminated?.exitCode !== 0;

              return (
                <Tooltip label={container.name} withArrow>
                  <Box
                    key={index}
                    w={10}
                    h={10}
                    style={{
                      backgroundColor: isRunning
                        ? "#40c057"
                        : isFailed
                          ? "#fa5252"
                          : "#868e96",
                    }}
                  />
                </Tooltip>
              );
            })}
          </Group>
        ),
        restarts: item?.status?.containerStatuses?.reduce(
          (acc: number, c: any) => acc + (c.restartCount || 0),
          0,
        ),
        controlled_by: <Text size="xs">{controlledBy}</Text>,
        node: (
          <Tooltip label={item?.spec?.nodeName || "N/A"} withArrow>
            <NoWrap>{item?.spec?.nodeName || "N/A"}</NoWrap>
          </Tooltip>
        ),
        qos: <Text size="xs">{item?.status?.qosClass || "N/A"}</Text>,
        age: (
          <NoWrap>{moment(item?.metadata?.creationTimestamp).fromNow()}</NoWrap>
        ),
        status: (
          <Text
            c={item?.status?.phase === "Running" ? "green" : "red"}
            fw={500}
          >
            {item?.status?.phase || "Unknown"}
          </Text>
        ),
      };
      return row;
    });
  };

  const dataParent = "pods";
  const apiRoute = `/clusters/${cluster_id}/pods`;

  return { tableColumns, tableData, apiRoute, dataParent };
};

export default usePods;
