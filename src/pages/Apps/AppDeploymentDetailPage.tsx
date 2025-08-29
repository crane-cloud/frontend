import { MIRA_API_URL } from "@/config";
import { useSetContainerSize, useGetApp, shortenID } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Stack,
  Text,
  Flex,
  Badge,
  Card,
  Group,
  Button,
  Alert,
  Skeleton,
  Code,
  Divider,
} from "@mantine/core";
import {
  TbArrowLeft,
  TbClock,
  TbAlertCircle,
  TbCalendar,
  TbUser,
  TbTerminal,
} from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import BuildLogsTerminal from "@/components/BuildLogsTerminal";
import TitleText from "@/components/TitleText";
import { TBuild } from "@/types/common";
import moment from "moment";

const AppDeploymentDetailPage = () => {
  const { build_id, app_id, project_id } = useParams();
  const { app } = useGetApp(app_id || "");
  const { getData, data, loading, success } = useGet();
  const [build, setBuild] = useState<TBuild | null>(null);

  useSetContainerSize("lg");

  useEffect(() => {
    if (build_id) {
      getData({
        api: `${MIRA_API_URL}/api/logs/${build_id}/history`,
        isExternal: true,
      });
    }
  }, [build_id]);

  useEffect(() => {
    if (success && data?.build) {
      setBuild(data.build);
    }
  }, [success, data]);

  const getStatusBadge = (status: string) => {
    const config = {
      completed: {
        color: "green",
        icon: <FaCheck size={12} />,
        text: "Deployed",
        variant: "filled" as const,
      },
      failed: {
        color: "red",
        icon: <IoClose size={14} />,
        text: "Failed",
        variant: "filled" as const,
      },
      running: {
        color: "blue",
        icon: <TbClock size={12} />,
        text: "Building",
        variant: "filled" as const,
      },
      pending: {
        color: "yellow",
        icon: <MdOutlineAccessTime size={15} />,
        text: "Queued",
        variant: "filled" as const,
      },
    };

    const statusConfig = config[status as keyof typeof config] || {
      color: "gray",
      icon: <TbAlertCircle size={12} />,
      text: "Unknown",
      variant: "filled" as const,
    };

    return (
      <Badge
        color={statusConfig.color}
        variant={statusConfig.variant}
        leftSection={statusConfig.icon}
        size="lg"
        radius="sm"
        fw={500}
      >
        {statusConfig.text}
      </Badge>
    );
  };

  const formatDuration = (startedAt: string, completedAt: string) => {
    if (!startedAt) {
      return "N/A";
    }

    if (!completedAt) {
      // If still running, calculate duration from start to now
      const start = moment(startedAt);
      const now = moment();
      const duration = moment.duration(now.diff(start));

      if (duration.asMinutes() < 1) {
        return `${Math.floor(duration.asSeconds())}s (running)`;
      }
      if (duration.asHours() < 1) {
        return `${Math.floor(duration.asMinutes())}m ${Math.floor(duration.asSeconds() % 60)}s (running)`;
      }
      return `${Math.floor(duration.asHours())}h ${Math.floor(duration.asMinutes() % 60)}m (running)`;
    }

    const start = moment(startedAt);
    const end = moment(completedAt);
    const duration = moment.duration(end.diff(start));

    if (duration.asMinutes() < 1) {
      return `${Math.floor(duration.asSeconds())}s`;
    }
    if (duration.asHours() < 1) {
      return `${Math.floor(duration.asMinutes())}m ${Math.floor(duration.asSeconds() % 60)}s`;
    }
    return `${Math.floor(duration.asHours())}h ${Math.floor(duration.asMinutes() % 60)}m`;
  };

  // Construct WebSocket URL for logs
  const getLogsSocketUrl = () => {
    if (!build_id) {
      return "";
    }
    return `${MIRA_API_URL.replace("http", "ws")}/ws/builds/${build_id}/logs`;
  };

  if (loading) {
    return (
      <Stack gap="lg">
        <Skeleton height={40} radius="md" />
        <Card p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Skeleton height={20} width="40%" />
            <Skeleton height={60} />
            <Skeleton height={400} />
          </Stack>
        </Card>
      </Stack>
    );
  }

  if (!build && !loading) {
    return (
      <Alert
        icon={<TbAlertCircle size={20} />}
        title="Deployment not found"
        color="red"
        variant="light"
      >
        The deployment you're looking for doesn't exist or you don't have
        permission to view it.
      </Alert>
    );
  }

  return (
    <Stack gap="lg">
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Group gap="sm">
          <Button
            component={Link}
            to={`/projects/${project_id}/apps/${app_id}/deployments`}
            variant="subtle"
            leftSection={<TbArrowLeft size={16} />}
            color="gray"
          >
            Back to Deployments
          </Button>
        </Group>
      </Flex>

      <TitleText>Deployment Details</TitleText>

      {/* Deployment Info Card */}
      <Card p="lg" radius="md" withBorder>
        <Stack gap="lg">
          {/* Status and Basic Info */}
          <Flex justify="space-between" align="flex-start" wrap="wrap" gap="md">
            <Group gap="md">
              {build && getStatusBadge(build.status)}
              <div>
                <Text size="sm" fw={600} mb={4}>
                  Deployment #{build ? shortenID(build.build_id) : ""}
                </Text>
                <Text size="xs" c="dimmed">
                  Build ID: {build_id}
                </Text>
              </div>
            </Group>

            {build?.error && (
              <Alert
                icon={<TbAlertCircle size={16} />}
                color="red"
                variant="light"
                maw={400}
              >
                <Text size="sm" fw={500} mb="xs">
                  Deployment Error
                </Text>
                <Text size="xs" style={{ wordBreak: "break-word" }}>
                  {build.error}
                </Text>
              </Alert>
            )}
          </Flex>

          <Divider />

          {/* Deployment Details Grid */}
          <Flex wrap="wrap" gap="xl">
            <div>
              <Flex align="center" gap="xs" mb="xs">
                <TbUser size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" fw={500}>
                  Application
                </Text>
              </Flex>
              <Text size="sm" c="dimmed">
                {build?.app_name || app?.name || "Unknown"}
              </Text>
            </div>

            <div>
              <Flex align="center" gap="xs" mb="xs">
                <TbCalendar size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" fw={500}>
                  Started
                </Text>
              </Flex>
              <Text size="sm" c="dimmed">
                {build?.started_at
                  ? moment(build.started_at).format("MMM DD, YYYY at HH:mm")
                  : "N/A"}
              </Text>
            </div>

            <div>
              <Flex align="center" gap="xs" mb="xs">
                <TbClock size={16} color="var(--mantine-color-gray-6)" />
                <Text size="sm" fw={500}>
                  Duration
                </Text>
              </Flex>
              <Text size="sm" c="dimmed">
                {build
                  ? formatDuration(build.started_at, build.completed_at)
                  : "N/A"}
              </Text>
            </div>

            {build?.completed_at && (
              <div>
                <Flex align="center" gap="xs" mb="xs">
                  <TbCalendar size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm" fw={500}>
                    Completed
                  </Text>
                </Flex>
                <Text size="sm" c="dimmed">
                  {moment(build.completed_at).format("MMM DD, YYYY at HH:mm")}
                </Text>
              </div>
            )}
          </Flex>
        </Stack>
      </Card>

      {/* Build Logs Section */}
      <Card p="lg" radius="md" withBorder>
        <Group mb="md" gap="sm">
          <TbTerminal size={20} color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">
            Build Logs
          </Text>
          {build && (
            <Code c="dimmed" fz="sm">
              {build.build_id}
            </Code>
          )}
        </Group>

        {build_id ? (
          <BuildLogsTerminal
            logsSocketUrl={getLogsSocketUrl()}
            buildId={build_id}
          />
        ) : (
          <Alert
            icon={<TbAlertCircle size={16} />}
            title="No build ID available"
            color="orange"
            variant="light"
          >
            Unable to load build logs without a valid build ID.
          </Alert>
        )}
      </Card>
    </Stack>
  );
};

export default AppDeploymentDetailPage;
