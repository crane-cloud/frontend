import { formatDate, shortenID } from "@/utils/helpers";
import { Link } from "react-router-dom";

export const useProjects = () => {
  const tableColumns = () => [
    { id: "id", header: "ID" },
    {
      id: "name",
      header: "Name",
      filter: { key: "keywords", type: "text", placeholder: "Search by name" },
    },
    { id: "apps_count", header: "Apps" },
    { id: "is_public", header: "Public" },
    { id: "supports_ml", header: "ML" },
    { id: "organisation", header: "Organisation" },
    { id: "project_type", header: "Project Type", filter: true },
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
    { id: "age", header: "Age" },
    // { id: "cluster", header: "Cluster" },
    { id: "owner_id", header: "Owner ID" },
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
      const row = {
        ...item,
        id: <Link to={`/projects/${item.id}`}>{shortenID(item.id)}</Link>,
        owner_id: (
          <Link to={`/profile/${item.owner_id}`}>
            {shortenID(item.owner_id)}
          </Link>
        ),
        date_created: formatDate(item.date_created),
        apps_count: item?.apps_count || "0",
        is_public: item.verified ? "Yes" : "No",
        disabled: item.disabled ? "Yes" : "No",
        supports_ml: item.supports_ml ? "Yes" : "No",
      };
      return row;
    });
  };

  return { tableColumns, tableData };
};
