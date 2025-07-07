import { NoWrap } from "@/components/Elements/Elements";
import { formatDate, shortenID } from "@/utils/helpers";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const useApps = () => {
  const tableColumns = () => [
    { id: "id", header: "ID", filter: { key: "app_id", type: "text" } },
    {
      id: "name",
      header: "Name",
      filter: { key: "keyword", type: "text" },
    },
    { id: "image", header: "Image" },
    { id: "port", header: "Port" },
    {
      id: "url",
      header: "App url",
      filter: { key: "app_url", type: "text", placeholder: "Search by url" },
    },
    { id: "project_id", header: "Project" },
    {
      id: "status",
      header: "Status",
      filter: {
        type: "select",
        options: [
          { label: "up", value: "running" },
          { label: "down", value: "down" },
        ],
      },
    },
    {
      id: "is_notebook",
      header: <NoWrap fw="inherit">Is Notebook</NoWrap>,
      filter: {
        type: "select",
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    },
    {
      id: "is_modal",
      header: <NoWrap fw="inherit">Is Modal</NoWrap>,
      filter: {
        type: "select",
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    },
    {
      id: "disabled",
      header: "Disabled",
      filter: {
        type: "select",
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    },
    { id: "age", header: "Age", filter: false },
    {
      id: "date_created",
      header: "Date Created",
      filter: { type: "date_range" },
    },
  ];
  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => {
      let statusValue = "Unknown";
      if (Array.isArray(item.app_status) && item.app_status.length > 0) {
        if (item.app_status.some((s: any) => s.status === "running")) {
          statusValue = "Running";
        } else if (item.app_status.some((s: any) => s.status === "failed")) {
          statusValue = "Down";
        }
      }
      const row = {
        ...item,
        id: <Link to={`/admin/apps/${item.id}`}>{shortenID(item.id)}</Link>,
        name: <NoWrap size="sm">{item.name}</NoWrap>,
        project_id: (
          <Link to={`/projects/${item.project_id}`}>
            {shortenID(item.project_id)}
          </Link>
        ),
        owner_id: (
          <Link to={`/profile/${item.owner_id}`}>
            {shortenID(item.owner_id)}
          </Link>
        ),
        url: (
          <Link to={item.url} target="_blank">
            <Text size="xs" c="dimmed" lineClamp={1}>
              {item.url}
            </Text>
          </Link>
        ),
        date_created: formatDate(item.date_created),
        image: <NoWrap>{item.image}</NoWrap>,
        age: <NoWrap>{item.age}</NoWrap>,
        is_public: item.verified ? "Yes" : "No",
        disabled: item.disabled ? "Yes" : "No",
        status: statusValue,
        is_notebook: item.is_notebook ? "Yes" : "No",
        is_modal: item.is_modal ? "Yes" : "No",
      };
      return row;
    });
  };

  const metaData = (data: any) => {
    return {
      total_apps: data?.total_apps || 0,
      running_apps: data?.running_apps || 0,
      notebooks: data?.is_notebook || 0,
      failing_apps: data?.failing_apps || 0,
      disabled: data?.disabled || 0,
    };
  };

  return { tableColumns, tableData, metaData };
};
