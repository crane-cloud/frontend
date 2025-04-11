import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitleText from "@/components/TitleText";
import { MLOPS_API_URL } from "@/config";
import { useGetApp } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { Table } from "@/components/Elements/CustomTable";
import moment from "moment";
import {
  BreadCrumb,
  CopyAreaButton,
  NoWrap,
} from "@/components/Elements/Elements";
import DetailsCard from "@/components/Cards/DetailsCard";
import { Stack } from "@mantine/core";

const ExperiementsDetailsPage = () => {
  const { experiment_id, app_id } = useParams();
  const { app } = useGetApp(app_id || "");
  const { getData: getExperiment, data: experiment } = useGet();
  const { getData: getRuns, data: runs, loading: runsLoading } = useGet();
  const navigate = useNavigate();

  const tableColumns = [
    {
      header: "Name",
      id: "run_name",
    },
    {
      header: "Status",
      id: "status",
    },
    {
      header: "Duration",
      id: "duration",
    },
    {
      header: "Artifact URI",
      id: "artifact_uri",
    },
    {
      header: "Created",
      id: "created_at",
    },
  ];
  const tableData = (data: any) => {
    return data.map((run: any) => ({
      ...run,
      run_name: <NoWrap>{run?.run_name}</NoWrap>,
      duration: (
        <NoWrap>
          {moment(run?.end_time).diff(moment(run?.start_time), "seconds")}s
        </NoWrap>
      ),
      created_at: <NoWrap>{moment(run?.start_time).fromNow()}</NoWrap>,
    }));
  };

  useEffect(() => {
    if (app_id && app) {
      getExperiment({
        api: `${MLOPS_API_URL}experiments/${experiment_id}`,
        isExternal: true,
      });
      getRuns({
        api: `${MLOPS_API_URL}experiments/${experiment_id}/runs`,
        isExternal: true,
      });
    }
  }, []);

  const handleRowClick = (item: any) => {
    navigate(
      `/projects/${app?.project_id}/apps/${app?.id}/experiments/${experiment_id}/runs/${item?.run_id}`,
      {
        state: {
          experimentData: experiment?.data,
          appDetails: app,
        },
      }
    );
  };

  const experimentInfo = [
    {
      label: "Experiment ID",
      value: experiment?.data?.experiment_id,
    },
    {
      label: "Artifact Location",
      value: (
        <CopyAreaButton value={experiment?.data?.artifact_location} showIcon />
      ),
    },
    {
      label: "Created At",
      value: moment(experiment?.data?.creation_time).fromNow(),
    },
  ];

  const breadCrumbItems = [
    {
      title: "Experiments",
      link: `/projects/${app?.project_id}/apps/${app_id}/experiments`,
    },
    {
      title: experiment?.data?.name,
      link: `/projects/${app?.project_id}/apps/${app_id}/experiments/${experiment_id}`,
    },
  ];

  return (
    <Stack gap={30}>
      <Stack>
        <BreadCrumb items={breadCrumbItems} />
        <Stack gap={0}>
          <TitleText>
            Experiment:{" "}
            <Link
              to={`/projects/${app?.project_id}/apps/${app?.id}/experiments`}
              style={{ color: "var(--mantine-primary-color-6)" }}
            >
              {experiment?.data?.name}
            </Link>
          </TitleText>
          <DetailsCard data={experimentInfo} />
        </Stack>
      </Stack>
      <Stack gap={0}>
        <TitleText>Runs</TitleText>
        <Table
          verticalSpacing="xs"
          columns={tableColumns}
          data={tableData(runs?.data || [])}
          showIndex={false}
          rowHover
          rowClick={handleRowClick}
          loading={runsLoading}
        />
      </Stack>
    </Stack>
  );
};

export default ExperiementsDetailsPage;
