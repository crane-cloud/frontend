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

  const viewData = (item: any) => {
    return {
      sections: [
        {
          title: "User Details",
          fields: {
            username: item?.username,
            first_name: item?.first_name,
            last_name: item?.last_name,
            other_name: item?.other_name,
            email: item?.email,
            phone_number: item?.phone_number,
            alternative_phone_number: item?.alternative_phone_number,
            organisation: item?.organisation_name,
            is_active: item?.is_active ? "Active" : "Disabled",
            date_joined: formatDate(item?.date_joined),
          },
        },
        {
          title: "Profile Details",
          fields: {
            nationality: item?.profile?.type_of_nationality,
            department: item?.profile?.department_name,
            NIN: item?.profile?.nin,
            TIN: item?.profile?.tin,
          },
        },
      ],
    };
  };

  const formRoute = "/users/create";

  return { tableColumns, tableData, formRoute, viewData };
};
