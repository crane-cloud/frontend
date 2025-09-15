import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Stack,
  Text,
  Flex,
  Alert,
  Badge,
  Group,
  Button,
  ActionIcon,
  Tooltip,
  Code,
  Skeleton,
} from "@mantine/core";
import {
  TbAlertCircle,
  TbClock,
  TbPlayerPlay,
  TbRefresh,
} from "react-icons/tb";
import { Table, TColumn } from "@/components/Elements/CustomTable";
import TitleText from "@/components/TitleText";
import { shortenID, useSetContainerSize, useGetApp } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { TBuild } from "@/types/common";
import { MIRA_API_URL } from "@/config";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";

const AppDeploymentPage = () => {
  useSetContainerSize("md");
  const { app_id } = useParams();
  const { app, loading: appLoading } = useGetApp(app_id || "");
  const [builds, setBuilds] = useState<TBuild[]>([]);
  const { getData: getBuilds, data, loading, success } = useGet();

  useSetContainerSize("lg");

  useEffect(() => {
    if (app?.name) {
      getBuilds({
        api: `${MIRA_API_URL}/api/builds`,
        isExternal: true,
        params: {
          app_name: app?.name,
        },
      });
    }
  }, [app]);

  useEffect(() => {
    if (success && data?.builds) {
      setBuilds(data.builds);
    }
  }, [success, data]);

  const getStatusBadge = (status: string) => {
    const config = {
      completed: {
        color: "green",
        icon: <FaCheck />,
        text: "Deployed",
        variant: "filled" as const,
      },
      failed: {
        color: "red",
        icon: <IoClose />,
        text: "Failed",
        variant: "filled" as const,
      },
      running: {
        color: "yellow",
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
      <Flex align="center" gap="xs">
        <ActionIcon
          color={statusConfig.color}
          variant={statusConfig.variant}
          size={15}
          radius="xl"
          p={2}
          fw={700}
        >
          {statusConfig.icon}
        </ActionIcon>
      </Flex>
    );
  };

  const formatTimeAgo = (timestamp: string) => {
    return moment(timestamp).fromNow();
  };

  const formatDuration = (startedAt: string, completedAt: string) => {
    if (!startedAt || !completedAt) {
      return "N/A";
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

  const columns: TColumn[] = [
    {
      id: "deployment",
      header: "Deployment",
    },
    {
      id: "app_name",
      header: "App",
    },

    {
      id: "started_at",
      header: "Started",
    },
    {
      id: "duration",
      header: "Duration",
    },
    {
      id: "error",
      header: "Details",
    },
  ];

  const tableData = builds.map((build) => ({
    app_name: (
      <Flex align="center" gap="xs">
        <Text size="sm">{build.app_name}</Text>
      </Flex>
    ),

    deployment: (
      <Group gap="xs" align="flex-start">
        <div style={{ marginTop: 2 }}>{getStatusBadge(build.status)}</div>
        <Link
          to={`/projects/${app?.project_id}/apps/${app_id}/deployments/${build.build_id}`}
          style={{ textDecoration: "none" }}
        >
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              Deployment
            </Text>
            <div>
              <Code c="dimmed" fz="xs">
                #{shortenID(build.build_id)}
              </Code>
            </div>
          </Stack>
        </Link>
      </Group>
    ),

    started_at: (
      <Flex direction="column" gap={2}>
        <Text size="sm">{formatTimeAgo(build.started_at)}</Text>
        <Text size="xs" c="dimmed">
          {moment(build.started_at).format("MMM DD, HH:mm")}
        </Text>
      </Flex>
    ),

    duration: (
      <Flex align="center" gap="xs">
        <TbClock size={14} color="var(--mantine-color-gray-6)" />
        <Text size="sm" c="dimmed">
          {formatDuration(build.started_at, build.completed_at)}
        </Text>
        {build.status === "building" && (
          <Badge size="xs" color="blue" variant="dot">
            In progress
          </Badge>
        )}
      </Flex>
    ),

    error: build.error ? (
      <Tooltip
        label={build.error}
        multiline
        w={400}
        position="left"
        offset={10}
      >
        <Text size="sm" c="red" truncate style={{ cursor: "help" }}>
          {build.error.length > 70
            ? `${build.error.substring(0, 70)}...`
            : build.error}
        </Text>
      </Tooltip>
    ) : (
      <Text size="sm" c="dimmed">
        No issues
      </Text>
    ),
  }));

  // Show loading skeleton while app data is loading
  if (appLoading) {
    return (
      <Stack gap="lg">
        {/* Header Loading */}
        <Flex justify="space-between" align="center">
          <Skeleton height={32} width={150} />
          <Group gap="sm">
            <Skeleton height={28} width={120} />
            <Skeleton height={28} width={28} radius="md" />
          </Group>
        </Flex>

        {/* Table Loading */}
        <Stack gap="md">
          <Skeleton height={50} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      {/* Header */}
      <Flex justify="space-between" align="center">
        <TitleText>Deployments</TitleText>
        <Group gap="sm">
          {loading ? (
            <Skeleton height={28} width={120} />
          ) : (
            <Badge variant="light" color="gray" size="lg">
              {builds.length} deployment{builds.length !== 1 ? "s" : ""}
            </Badge>
          )}
          <ActionIcon
            variant="filled"
            size="md"
            onClick={() => window.location.reload()}
            color="blue"
            loading={loading}
            disabled={loading}
          >
            <TbRefresh size={16} />
          </ActionIcon>
        </Group>
      </Flex>

      {/* Enhanced Table */}
      <Table
        columns={columns}
        data={tableData}
        loading={loading || appLoading}
        showIndex={false}
        hideFilters
        verticalSpacing="md"
        striped="odd"
        rowHover
      />

      {/* Empty State */}
      {builds.length === 0 && !loading && !appLoading && (
        <Alert
          icon={<TbPlayerPlay size={20} />}
          title="No deployments yet"
          color="blue"
          variant="light"
          p="xl"
          radius="md"
        >
          <Text size="sm" c="dimmed" mb="md">
            No deployment history available for this app. Deployments will
            appear here once you start deploying your application.
          </Text>
          <Button
            leftSection={<TbPlayerPlay size={16} />}
            variant="light"
            size="sm"
          >
            Start your first deployment
          </Button>
        </Alert>
      )}
    </Stack>
  );
};

export default AppDeploymentPage;
