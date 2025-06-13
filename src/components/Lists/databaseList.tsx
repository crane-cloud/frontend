import React, { useEffect } from "react";
import useGet from "@/utils/useGet";
import { Group, Text } from "@mantine/core";
import { DATABASE_API_URL } from "@/config";
import { Table } from "../Elements/CustomTable";
import moment from "moment";
import { BiLogoPostgresql } from "react-icons/bi";
import { beautify } from "@/utils/helpers";
import { TbBrandMysql } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const DatabaseFlavour = ({ flavour }: { flavour: string }) => {
  return (
    <Group gap="xs" align="center">
      {flavour === "postgres" ? (
        <BiLogoPostgresql size={16} color="#0064a5" />
      ) : (
        <TbBrandMysql size={16} color="#00758f" />
      )}
      <Text size="sm" fw={500}>
        {beautify(flavour)}
      </Text>
    </Group>
  );
};
const DatabaseList = (props: any) => {
  const { project_id, refresh } = props;
  const { getData: getDatabases, data: databases, loading } = useGet();
  const navigate = useNavigate();

  useEffect(() => {
    getDatabases({
      api: `${DATABASE_API_URL}/databases`,
      params: {
        project_id,
      },
      isExternal: true,
    });
  }, [project_id, refresh]);

  const tableColumns = [
    { id: "name", header: "Name" },
    { id: "type", header: "Type" },
    { id: "status", header: "Status" },
    { id: "age", header: "Age" },
  ];

  const tableData = (data: any) => {
    return data?.map((database: any) => ({
      ...database,
      name: database.name,
      type: <DatabaseFlavour flavour={database.database_flavour_name} />,
      age: moment(database.date_created).fromNow(),
    }));
  };

  const handleRowClick = (item: any) => {
    navigate(`/projects/${project_id}/databases/${item.id}`);
  };

  return (
    <div>
      <Table
        verticalSpacing="sm"
        columns={tableColumns}
        data={tableData(databases?.data?.databases)}
        props={{
          verticalSpacing: "sm",
        }}
        showIndex={false}
        rowHover
        rowClick={handleRowClick}
        loading={loading}
      />
    </div>
  );
};

export default DatabaseList;
