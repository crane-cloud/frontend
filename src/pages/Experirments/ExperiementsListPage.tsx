import { Table } from "@/components/Elements/CustomTable";
import { MLOPS_API_URL } from "@/config";
import { dateFormat, useGetApp, useSetContainerSize } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ExperiementsListPage = () => {
  const { app_id } = useParams();
  const { app } = useGetApp(app_id || "");
  const { getData: getExperiments, data: experiments, loading } = useGet();
  useEffect(() => {
    if (app_id && app) {
      getExperiments({
        api: `${MLOPS_API_URL}experiments`,
        params: {
          app_alias: app?.alias,
        },
        isExternal: true,
      });
    }
  }, [app_id, app]);
  const tableColumns = [
    {
      header: "Name",
      id: "name",
    },
    {
      header: "Status",
      id: "status",
    },
    {
      header: "Created At",
      id: "created_at",
    },
    {
      header: "Updated At",
      id: "updated_at",
    },
    {
      header: "Actions",
      id: "actions",
    },
  ];
  const tableData = (data: any) => {
    if (!data || data.length <= 0) {
      return [];
    }
    return data.map((experiment: any) => ({
      ...experiment,
      name: experiment.name,
      status: experiment.lifecycle_stage,
      created_at: dateFormat(experiment.creation_tim, "DD/MM/YYYY HH:mm A"),
      updated_at: dateFormat(experiment.last_update_time, "DD/MM/YYYY HH:mm A"),
    }));
  };

  useSetContainerSize("md");
  return (
    <div>
      <Table
        verticalSpacing="sm"
        columns={tableColumns}
        data={(tableData && tableData(experiments?.data)) || []}
        props={{
          verticalSpacing: "sm",
        }}
        showIndex={false}
        rowHover
        // rowClick={handleRowClick}
        loading={loading}
      />
    </div>
  );
};

export default ExperiementsListPage;
