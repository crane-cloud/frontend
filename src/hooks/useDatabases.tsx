import { DatabaseFlavour } from "@/components/Lists/databaseList";
import { DATABASE_API_URL } from "@/config";
import { beautify, formatDate, shortenID } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const useDatabases = () => {
  const { getData: getMetaData, data: metaDataData } = useGet();
  useEffect(() => {
    getMetaData({
      api: `${DATABASE_API_URL}/databases/stats`,
      isExternal: true,
    });
  }, []);
  const tableColumns = () => [
    {
      id: "database_flavour_name",
      header: "Flavour",
      filter: {
        type: "select",
        placeholder: "Search by flavour",
        options: [
          { label: "PostgreSQL", value: "postgres" },
          { label: "MySQL", value: "mysql" },
        ],
      },
    },
    {
      id: "name",
      header: "Name",
      filter: { key: "keywords", type: "text", placeholder: "Search by name" },
    },
    { id: "email", header: "Email" },
    { id: "project_id", header: "Project ID" },
    { id: "disabled", header: "Disabled" },
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
        date_created: formatDate(item.date_created),
        last_seen: formatDate(item.last_seen, "DD MMM YYYY, HH:mm:ss"),
        role: beautify(item.roles?.[0]?.name),
        verified: item.verified ? "Yes" : "No",
        disabled: item.disabled ? "Yes" : "No",
        project_id: (
          <Link to={`/projects/${item.project_id}`}>
            {shortenID(item.project_id)}
          </Link>
        ),
        database_flavour_name: (
          <DatabaseFlavour flavour={item.database_flavour_name} />
        ),
      };
      return row;
    });
  };
  const metaData = (_data: any) => {
    return {
      total: metaDataData?.data?.databases?.total_database_count || 0,
      postgres:
        metaDataData?.data?.databases?.dbs_stats_per_flavour
          ?.postgres_db_count || 0,
      mysql:
        metaDataData?.data?.databases?.dbs_stats_per_flavour?.mysql_db_count ||
        0,
    };
  };

  const isExternalRoute = true;
  const showTitle = false;

  return { tableColumns, tableData, isExternalRoute, showTitle, metaData };
};
