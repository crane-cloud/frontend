import { BreadCrumb } from "@/components/Elements/elements";
import TitleText from "@/components/TitleText";
import { MLOPS_API_URL } from "@/config";
import {
  removeUnnecessaryFields,
  returnObject,
  useGetApp,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { Stack, Grid, Flex, Pill } from "@mantine/core";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HorizontalTable } from "@/components/Elements/CustomTable";

const RunsDetailsPage = () => {
  const location = useLocation();
  const { experiment_id, app_id, run_id } = useParams();
  const { app } = useGetApp(app_id || "");
  const { getData: getRun, data: run } = useGet();
  const { experimentData } = location.state || {};

  const breadCrumbItems = [
    {
      title: "Experiments",
      link: `/projects/${app?.project_id}/apps/${app_id}/experiments`,
    },
    ...returnObject(experimentData, [
      {
        title: experimentData?.name,
        link: `/projects/${app?.project_id}/apps/${app_id}/experiments/${experiment_id}`,
      },
    ]),
    {
      title: "Runs",
      link: `/projects/${app?.project_id}/apps/${app_id}/experiments/${experiment_id}/runs`,
    },
  ];

  useEffect(() => {
    if (run_id) {
      getRun({
        api: `${MLOPS_API_URL}run/${run_id}`,
        isExternal: true,
      });
    }
  }, [run_id]);

  const inforTableData = () => {
    return {
      ...removeUnnecessaryFields(run?.data?.info || {}, ["user_id"]),
      tags: (
        <Flex gap={10} wrap="wrap">
          {Object.keys(run?.data?.data?.tags || {}).map((item, idx) => (
            <Pill key={idx}>
              {item}: {run?.data?.data?.tags[item]}
            </Pill>
          ))}
        </Flex>
      ),
    };
  };

  return (
    <Stack gap={30}>
      <Stack>
        <BreadCrumb items={breadCrumbItems} />
        <TitleText>
          Run{" "}
          <span style={{ color: "var(--mantine-primary-color-7)" }}>
            {run?.data?.info?.run_name}
          </span>{" "}
          Details
        </TitleText>
        <HorizontalTable data={inforTableData()} />
      </Stack>
      <Grid>
        <Grid.Col span={6}>
          {/* <Card withBorder p="md" radius="md"> */}
          <TitleText>Parameters</TitleText>
          <HorizontalTable data={run?.data?.data?.params} />
          {/* </Card> */}
        </Grid.Col>
        <Grid.Col span={6}>
          {/* <Card withBorder p="md" radius="md"> */}
          <TitleText>Metrics</TitleText>
          <HorizontalTable data={run?.data?.data?.metrics} />
          {/* </Card> */}
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default RunsDetailsPage;
