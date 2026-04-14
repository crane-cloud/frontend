import React, { useEffect, useState } from "react";
import { useGetApp, useSetContainerSize } from "@/utils/helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ActionIcon,
  Button,
  Card,
  Code,
  Flex,
  Grid,
  Pill,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import TitleText, { CustomText } from "@/components/TitleText";
import { TbCopy, TbWorld } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";
import { FaDocker } from "react-icons/fa";
import { LuScreenShare } from "react-icons/lu";
import { SiJupyter } from "react-icons/si";
import { ModalConfirm } from "@/components/Elements/Modals";
import usePost from "@/utils/usePost";
import { RiRefreshLine } from "react-icons/ri";

const AppDetailPage = () => {
  const { app_id } = useParams();
  const { app, loading } = useGetApp(app_id || "");
  useSetContainerSize("md");
  const [refreshModalOpened, setRefreshModalOpened] = useState(false);
  const navigate = useNavigate();

  const {
    uploadData: refreshApp,
    submitting: refreshingApp,
    success: refreshedAppSuccess,
  } = usePost();

  const getAppStatus = (status: string) => {
    if (status === "running") {
      return (
        <Flex align="center" gap="xs">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--mantine-color-green-6)",
              padding: 4,
            }}
          />
          <Text size="xs">Running</Text>
        </Flex>
      );
    }
    if (status === "stopped") {
      return (
        <Flex align="center" gap={5}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--mantine-color-red-6)",
              padding: 4,
            }}
          />
          <Text size="xs">Stopped</Text>
        </Flex>
      );
    }
    return (
      <Flex align="center" gap={5}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--mantine-color-gray-6)",
            padding: 4,
          }}
        />
        <Text size="xs">Unknown</Text>
      </Flex>
    );
  };

  const appInfo = [
    {
      label: "Port",
      value: app?.port,
      icon: <LuScreenShare />,
      visible: !app?.is_notebook,
    },
    { label: "Replicas", value: app?.replicas, icon: <TbCopy /> },
    { label: "Age", value: app?.age },
    {
      label: "Status",
      value: getAppStatus(app?.app_running_status),
    },
  ];

  const handleRefresh = () => {
    refreshApp({
      api: `apps/${app?.id}/restart`,
      params: {
        restart: true,
      },
    });
  };

  useEffect(() => {
    if (refreshedAppSuccess) {
      setRefreshModalOpened(false);
      navigate(
        `/projects/${app?.project_id}/apps/${app?.id}/settings?tab=deployments`,
      );
    }
  }, [refreshedAppSuccess]);

  return (
    <Stack gap={20}>
      <TitleText
        rightSection={
          <Button
            color="gray.9"
            variant="filled"
            size="sm"
            radius="md"
            leftSection={<TbWorld />}
            onClick={() => window.open(app?.url, "_blank")}
          >
            {app?.is_notebook ? "Open Notebook" : "Visit App"}
          </Button>
        }
      >
        {app?.name}
      </TitleText>
      <Card p="lg" radius="md" withBorder>
        {loading ? (
          <AppDetailsSkeleton />
        ) : (
          <Stack gap={20}>
            <Flex gap={20} wrap="wrap" justify="space-between">
              <Flex gap={20} wrap="wrap">
                {app?.image && !app?.is_notebook && (
                  <Stack gap={5}>
                    <Text className="subtitle">Image</Text>
                    <Code>
                      <CustomText
                        size="sm"
                        leftSection={<FaDocker color="gray.7" />}
                      >
                        {app?.image}
                      </CustomText>
                    </Code>
                  </Stack>
                )}
                <Stack gap={5} w="fit-content" flex={app?.is_notebook && 1}>
                  <CustomText className="subtitle" leftSection={<TbWorld />}>
                    Domain
                  </CustomText>
                  <Text
                    component={Link}
                    size="sm"
                    to={app?.url}
                    target="_blank"
                    className="link"
                  >
                    {app?.url}
                    <FiExternalLink />
                  </Text>
                </Stack>
                {app?.is_notebook && (
                  <Pill w="fit-content">
                    <Flex gap={5} wrap="nowrap" w="fit-content" align="center">
                      <SiJupyter size={13} color="#f57c00" />
                      <Text size="sm" truncate>
                        Notebook
                      </Text>
                    </Flex>
                  </Pill>
                )}
              </Flex>
              <Tooltip label="Refresh" withArrow position="bottom">
                <ActionIcon
                  variant="light"
                  color="dark"
                  size="md"
                  radius="xl"
                  onClick={() => setRefreshModalOpened(true)}
                >
                  <RiRefreshLine size={18} />
                </ActionIcon>
              </Tooltip>
            </Flex>

            <ModalConfirm
              opened={refreshModalOpened}
              onClose={() => setRefreshModalOpened(false)}
              title="Refresh App"
              buttonColor="gray.9"
              buttonText="Refresh"
              onConfirm={handleRefresh}
              loading={refreshingApp}
              leftSection={<RiRefreshLine size={18} />}
            >
              Are you sure you want to refresh the app?
              <Text size="sm" mt="md">
                This action will restart the app and pull the latest image. This
                may take a few minutes.
              </Text>
            </ModalConfirm>

            <Grid>
              {appInfo.map((info) => (
                <Grid.Col
                  span={{ base: 12, md: 4, lg: 3 }}
                  key={info.label}
                  hidden={info?.visible === false}
                >
                  <Flex>
                    <Stack gap={5}>
                      <Text className="subtitle">{info.label}</Text>
                      <CustomText size="sm" leftSection={info?.icon}>
                        {info.value}
                      </CustomText>
                    </Stack>
                  </Flex>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        )}
      </Card>
    </Stack>
  );
};

export default AppDetailPage;

const AppDetailsSkeleton = () => {
  return (
    <Stack gap={25}>
      <Flex gap={20} wrap="wrap">
        <Stack gap={10} w={200} flex={1}>
          <Skeleton height={16} width="30%" />
          <Skeleton height={15} />
        </Stack>
        <Stack gap={10} w={200} flex={1}>
          <Skeleton height={16} width="30%" />
          <Skeleton height={15} />
        </Stack>
      </Flex>

      <Grid>
        {[1, 2, 3, 4].map((i) => (
          <Grid.Col span={{ base: 12, md: 4, lg: 3 }} key={i}>
            <Stack gap={10}>
              <Skeleton height={15} width="40%" />
              <Skeleton height={20} width="80%" />
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};
