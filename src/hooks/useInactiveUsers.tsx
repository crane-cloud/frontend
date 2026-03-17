/* eslint-disable no-console */
import { formatDate } from "@/utils/helpers";
import { IoBanOutline, IoEyeOutline, IoPowerOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const useInactiveUsers = () => {
  const navigate = useNavigate();

  const tableColumns = () => [
    {
      id: "name",
      header: "Name",
      filter: { key: "keywords", type: "text", placeholder: "Search by name" },
    },
    { id: "email", header: "Email" },
    { id: "last_seen", header: "Last Seen" },
    {
      id: "date_joined",
      header: "Date Joined",
      filter: { type: "date_range" },
    },
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
        ...item,
        date_joined: formatDate(item.date_created),
        last_seen: formatDate(item.last_seen, "DD MMM YYYY, HH:mm:ss"),
      };
      return row;
    });
  };
  const rowActions = (item: any) => [
    {
      label: "View User",
      icon: <IoEyeOutline size={16} />,
      onClick: (row: any) => {
        navigate(`/admin/users/${row.id}`);
      },
    },
    {
      label: "Enable",
      icon: <IoPowerOutline size={16} />,
      color: "green",
      hidden: !item.disabled,
      onClick: (row: any) => {
        console.log("Enabling user:", row.email);
      },
    },
    {
      label: "Disable",
      icon: <IoBanOutline size={16} />,
      color: "red",
      hidden: item.disabled,
      onClick: (row: any) => {
        console.log("Disabling user:", row.email);
      },
    },
  ];

  const dataParent = "users";
  const apiRoute = `/users/inactive_users?range=60`;

  return { tableColumns, tableData, rowActions, apiRoute, dataParent };
};
