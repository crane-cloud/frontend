import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Code, Flex, Loader, Stack, Text } from "@mantine/core";
import TitleText from "@/components/TitleText";
import usePost from "@/utils/usePost";
import { useGetApp } from "@/utils/helpers";

const AppLogsPage = () => {
  const { app_id, project_id } = useParams();
  useGetApp(app_id || "");
  return (
    <div>
      <LogsCard project_id={project_id || ""} app_id={app_id || ""} />
    </div>
  );
};

export default AppLogsPage;

type TLogsCardProps = {
  project_id: string;
  app_id: string;
};
const LogsCard = ({ project_id, app_id }: TLogsCardProps) => {
  const {
    uploadData: getAppLogs,
    data: appLogs,
    success: appLogsSuccess,
    submitting: appLogsLoading,
  } = usePost();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    getAppLogs({
      api: `projects/${project_id}/apps/${app_id}/logs`,
    });
  }, [app_id]);

  useEffect(() => {
    if (appLogsSuccess) {
      setLogs(appLogs?.data?.pods_logs || []);
    }
  }, [appLogsSuccess]);

  return (
    <Stack gap={10}>
      <TitleText className="title">Logs</TitleText>
      <Card radius="md" withBorder>
        <Card.Section>
          <Code
            p="lg"
            block
            mah="80vh"
            bg="dark.7"
            c="white"
            style={{
              overflow: "auto",
            }}
          >
            {appLogsLoading ? (
              <Flex justify="center" align="center" h="100%">
                <Loader size="sm" />
              </Flex>
            ) : logs.length <= 0 ? (
              <Text size="xs" py="lg" ta="center">
                No logs found
              </Text>
            ) : (
              logs.map((log) => (
                <Text size="xs" key={log}>
                  {log}
                </Text>
              ))
            )}
          </Code>
        </Card.Section>
      </Card>
    </Stack>
  );
};
