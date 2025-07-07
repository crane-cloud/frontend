import { NoWrap } from "@/components/Elements/Elements";
import { useSetAdminClusterSidebar } from "@/utils/helpers";
import { Anchor, Text, Tooltip } from "@mantine/core";
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
      const nodeName = item?.spec?.nodeName || "N/A";

      const row = {
        name: <NoWrap lineClamp={1}>{item?.metadata?.name}</NoWrap>,
        namespace: (
          <Tooltip label={namespace} withArrow>
            <Text lineClamp={1}>{namespace}</Text>
          </Tooltip>
        ),
        containers: (
          <Tooltip
            label={item?.spec?.containers?.map((c: any) => c.name).join(", ")}
            withArrow
          >
            <Text lineClamp={1}>
              {item?.spec?.containers?.map((c: any) => c.name).join(", ")}
            </Text>
          </Tooltip>
        ),
        restarts: item?.status?.containerStatuses?.reduce(
          (acc: number, c: any) => acc + (c.restartCount || 0),
          0,
        ),
        controlled_by: (
          <Text lineClamp={1}>
            <Anchor
              href="#"
              target="_blank"
              underline="always"
              onClick={(e) => e.preventDefault()}
            >
              {controlledBy}
            </Anchor>
          </Text>
        ),
        node: (
          <Tooltip label={nodeName} withArrow>
            <Text lineClamp={1}>
              <Anchor
                href="#"
                target="_blank"
                underline="always"
                onClick={(e) => e.preventDefault()}
              >
                {nodeName}
              </Anchor>
            </Text>
          </Tooltip>
        ),
        qos: item?.status?.qosClass || "N/A",
        age: moment(item?.metadata?.creationTimestamp).fromNow(),
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
