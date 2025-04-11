import React, { useEffect } from "react";
import { Table } from "@/components/Elements/CustomTable";
import { CopyAreaButton, NoWrap } from "@/components/Elements/elements";
import TitleText from "@/components/TitleText";
import { MLOPS_API_URL } from "@/config";
import { useAuth } from "@/utils/AuthContext";
import { dateFormat, useGetApp } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import { Anchor, Button } from "@mantine/core";
import moment from "moment";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";

const ExperiementsListPage = () => {
  const { app_id } = useParams();
  const { user } = useAuth();
  const { app } = useGetApp(app_id || "");
  const { getData: getExperiments, data: experiments, loading } = useGet();
  const {
    uploadData: createExperiment,
    submitting: creatingExperiment,
    success: createExperimentSuccess,
  } = usePost();

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
  }, [app_id, app, createExperimentSuccess]);

  const oncreateExperiment = () => {
    createExperiment({
      api: `${MLOPS_API_URL}experiments?app_alias=${app?.alias}&user_id=${user?.id}`,
      isExternal: true,
    });
  };
  const tableColumns = [
    {
      header: "ID",
      id: "experiment_id",
    },
    {
      header: "Name",
      id: "name",
    },
    {
      header: "Artifact Location",
      id: "artifact_location",
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
      name: (
        <Anchor
          size="sm"
          href={`/projects/${app?.project_id}/apps/${app?.id}/experiments/${experiment?.experiment_id}`}
        >
          {experiment.name}
        </Anchor>
      ),
      status: experiment.lifecycle_stage,
      artifact_location: (
        <CopyAreaButton value={experiment.artifact_location} />
      ),
      created_at: dateFormat(experiment.creation_time, "DD/MM/YYYY"),
      updated_at: (
        <NoWrap>{moment(experiment.last_update_time).fromNow()}</NoWrap>
      ),
    }));
  };

  return (
    <div>
      <TitleText
        loading={false}
        rightSection={
          <Button
            leftSection={<GoPlus />}
            onClick={oncreateExperiment}
            loading={creatingExperiment}
          >
            Add an Experiment
          </Button>
        }
      >
        Experiments
      </TitleText>
      <Table
        verticalSpacing="xs"
        columns={tableColumns}
        data={(tableData && tableData(experiments?.data)) || []}
        props={{
          verticalSpacing: "sm",
        }}
        showIndex={false}
        // rowHover
        loading={loading}
      />
    </div>
  );
};

export default ExperiementsListPage;
