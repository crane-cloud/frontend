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
} from "@mantine/core";
import {
  TbArrowLeft,
  TbClock,
  TbAlertCircle,
  TbCalendar,
  TbUser,
} from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import BuildLogsTerminal from "@/components/BuildLogsTerminal";
import StaticLogsDisplay from "@/components/StaticLogsDisplay";
import TitleText from "@/components/TitleText";
import { TBuild } from "@/types/common";
import moment from "moment";

const AppDeploymentDetailPage = () => {
  const { build_id, app_id, project_id } = useParams();
  const { app } = useGetApp(app_id || "");
  const { getData, data: logsData, loading, success } = useGet();
  const [build, setBuild] = useState<TBuild | null>(null);

  useSetContainerSize("lg");

  useEffect(() => {
    if (build_id) {
      getData({
        api: `${MIRA_API_URL}/api/logs/`,
        params: {
          buildId: build_id,
        },
        isExternal: true,
      });
    }
  }, [build_id]);

  useEffect(() => {
    if (success && logsData?.logs) {
      setBuild(logsData.logs);
    }
  }, [success, logsData]);

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

  // Function to refresh logs
  const refreshLogs = () => {
    if (build_id) {
      getData({
        api: `${MIRA_API_URL}/api/logs/`,
        params: {
          buildId: build_id,
        },
        isExternal: true,
      });
    }
  };

  // Check if we have static logs data
  const hasStaticLogs = logsData && Array.isArray(logsData.logs);
  const metaData = logsData?.build_metadata;

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
            to={`/projects/${project_id}/apps/${app_id}/build_logs`}
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
      <Card p="md" radius="md" withBorder>
        <Stack gap="sm">
          {/* Header with status and deployment info */}
          <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
            <Group gap="sm">
              {metaData && getStatusBadge(metaData.status)}
              <Text size="sm" fw={600}>
                Deployment #{metaData ? shortenID(metaData.build_id) : ""}
              </Text>
            </Group>
            <Text size="xs" c="dimmed" ff="mono">
              {build_id}
            </Text>
          </Flex>

          {/* Compact details grid */}
          <Flex wrap="wrap" gap="lg" mt="xs">
            <Flex align="center" gap={3}>
              <TbUser size={13} color="var(--mantine-color-gray-6)" />
              <Text size="xs" c="gray.7" fw={700}>
                <Text size="xs" c="dimmed" component="span" fw={500}>
                  App Name:
                </Text>{" "}
                {metaData?.app_name || app?.name || "Unknown"}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <TbCalendar size={14} color="var(--mantine-color-gray-6)" />
              <Text size="xs" c="gray.7" fw={700}>
                <Text size="xs" c="dimmed" component="span" fw={500}>
                  Started:
                </Text>{" "}
                {metaData?.started_at
                  ? moment(metaData.started_at).format("MMM DD, HH:mm")
                  : "N/A"}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <TbClock size={14} color="var(--mantine-color-gray-6)" />
              <Text size="xs" c="gray.7" fw={700}>
                <Text size="xs" c="dimmed" component="span" fw={500}>
                  Duration:
                </Text>{" "}
                {metaData
                  ? formatDuration(metaData.started_at, metaData.completed_at)
                  : "N/A"}
              </Text>
            </Flex>

            {metaData?.completed_at && (
              <Flex align="center" gap={3}>
                <TbCalendar size={14} color="var(--mantine-color-gray-6)" />
                <Text size="xs" c="gray.7" fw={700}>
                  <Text size="xs" c="dimmed" component="span" fw={500}>
                    Completed:
                  </Text>{" "}
                  {moment(metaData.completed_at).format("MMM DD, HH:mm")}
                </Text>
              </Flex>
            )}
          </Flex>

          {/* Error alert - only show if there's an error */}
          {metaData?.error && (
            <Alert
              icon={<TbAlertCircle size={16} />}
              color="red"
              variant="light"
              p="sm"
              mt="xs"
            >
              <Text size="xs" fw={500} mb={4}>
                Deployment Error
              </Text>
              <Text size="xs" style={{ wordBreak: "break-word" }}>
                {metaData.error}
              </Text>
            </Alert>
          )}
        </Stack>
      </Card>

      {/* Build Logs Section */}
      <div>
        {build_id ? (
          hasStaticLogs ? (
            <StaticLogsDisplay
              logsData={logsData}
              buildId={build_id}
              onRefresh={refreshLogs}
            />
          ) : (
            <BuildLogsTerminal
              logsSocketUrl={getLogsSocketUrl()}
              buildId={build_id}
            />
          )
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
      </div>
    </Stack>
  );
};

export default AppDeploymentDetailPage;
