import { beautify, formatDate } from "@/utils/helpers";

export const useUsers = () => {
  const tableColumns = () => [
    {
      id: "name",
      header: "Name",
      filter: { key: "keywords", type: "text", placeholder: "Search by name" },
    },
    { id: "email", header: "Email" },
    {
      id: "role",
      header: "Role",
    },
    {
      id: "verified",
      header: "Verified",
      filter: {
        type: "select",
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    },
    { id: "last_seen", header: "Last Seen" },
    { id: "age", header: "Age" },
    {
      id: "date_joined",
      header: "Date Joined",
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
        date_joined: formatDate(item.date_created),
        last_seen: formatDate(item.last_seen, "DD MMM YYYY, HH:mm:ss"),
        role: beautify(item.roles?.[0]?.name),
        verified: item.verified ? "Yes" : "No",
      };
      return row;
    });
  };

  const metaData = (data: any) => {
    return {
      total: data?.total_users || 0,
      verified: (data?.total_users || 0) - (data?.none_verified || 0),
      unverified: data?.none_verified || 0,
      disabled: data?.disabled || 0,
      beta_users: data?.beta_users || 0,
    };
  };

  const formRoute = "#";

  return { tableColumns, tableData, formRoute, metaData };
};
