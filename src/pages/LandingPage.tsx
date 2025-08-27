import React, { useEffect, useMemo } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Grid,
  Card,
  Box,
  Paper,
  ScrollArea,
  Select,
  Avatar,
  Skeleton,
  Badge,
  Tooltip,
} from "@mantine/core";
import {
  FiActivity,
  FiSend,
  FiPlus,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import TrendingTags from "@/components/Trending/TrendingTags";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import CompactProjectsList from "@/components/Lists/CompactProjectsList";
import useGet from "@/utils/useGet";
import { useAuth } from "@/utils/AuthContext";
import { ACTIVITY_LOGS_API_URL } from "@/config";

const LandingPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");
  const { user } = useAuth();
  const { data: activitiesData, getData, loading, error } = useGet();

  useEffect(() => {
    if (user?.id) {
      fetchActivities();
    }
  }, [user?.id]);

  const fetchActivities = () => {
    getData({
      api: `${ACTIVITY_LOGS_API_URL}/api/activities`,
      params: {
        user_id: user?.id,
        per_page: 20,
        page: 1,
      },
      isExternal: true,
    });
  };

  const activities = useMemo(() => {
    if (!activitiesData?.data) {
      return [];
    }
    return Array.isArray(activitiesData.data)
      ? activitiesData.data
      : activitiesData.data.activity || [];
  }, [activitiesData]);

  const formatOperation = (operation: string): string => {
    const operationsMap: { [key: string]: string } = {
      create: "created",
      update: "updated",
      delete: "deleted",
      disable: "disabled",
      enable: "enabled",
      deploy: "deployed",
      stop: "stopped",
      start: "started",
      follow: "started following",
      comment: "commented on",
      fork: "forked",
    };
    return operationsMap[operation.toLowerCase()] || operation;
  };

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("success") || statusLower === "completed") {
      return "green";
    }
    if (statusLower.includes("fail") || statusLower === "error") {
      return "red";
    }
    if (statusLower.includes("pending") || statusLower === "in progress") {
      return "yellow";
    }
    return "gray";
  };

  // ✅ Relative time formatting
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) {
      return `${diff} second${diff !== 1 ? "s" : ""} ago`;
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)} minute${
        Math.floor(diff / 60) !== 1 ? "s" : ""
      } ago`;
    }
    if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hour${
        Math.floor(diff / 3600) !== 1 ? "s" : ""
      } ago`;
    }
    if (diff < 2592000) {
      return `${Math.floor(diff / 86400)} day${
        Math.floor(diff / 86400) !== 1 ? "s" : ""
      } ago`;
    }
    if (diff < 31536000) {
      return `${Math.floor(diff / 2592000)} month${
        Math.floor(diff / 2592000) !== 1 ? "s" : ""
      } ago`;
    }

    return `${Math.floor(diff / 31536000)} year${
      Math.floor(diff / 31536000) !== 1 ? "s" : ""
    } ago`;
  };

  // ✅ Full date for tooltip
  const formatAbsoluteDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString(); // e.g. "7/3/2025, 11:06:54 PM"
  };

  return (
    <Container size="xl" py="sm">
      <Grid>
        {/* Left Column */}
        <Grid.Col span={3}>
          <Stack gap="lg">
            <Card p="lg" withBorder radius="lg">
              <Group mb="md">
                <FiSend size={20} />
                <Title order={4}>Quick Actions</Title>
              </Group>
              <Stack gap="sm">
                <Button
                  key="Create New Project"
                  component={Link}
                  to="/projects/new"
                  variant="subtle"
                  justify="flex-start"
                  leftSection={<FiPlus size={16} />}
                  color="blue"
                  fullWidth
                >
                  <Box ta="left">
                    <Text size="sm" fw={500}>
                      Create New Project
                    </Text>
                    <Text size="xs" c="dimmed">
                      Start a new project and deploy to the cloud
                    </Text>
                  </Box>
                </Button>
              </Stack>
            </Card>
            <CompactProjectsList />
          </Stack>
        </Grid.Col>

        {/* Center Column - Activity Feed */}
        <Grid.Col span={6}>
          <Card p="lg" withBorder radius="lg" h="100%">
            <Group mb="lg" justify="space-between">
              <Group>
                <FiActivity size={20} />
                <Title order={4}>Activity Feed</Title>
              </Group>
              <Group gap="xs">
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<FiFilter size={14} />}
                >
                  Filter
                </Button>
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<FiRefreshCw size={14} />}
                  onClick={fetchActivities}
                  loading={loading}
                >
                  Refresh
                </Button>
                <Select
                  data={["All Activity", "Following", "Your Activity"]}
                  defaultValue="Your Activity"
                  size="xs"
                  w={120}
                />
              </Group>
            </Group>

            <ScrollArea h={600}>
              {loading ? (
                <Stack gap="md">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                      <Group gap="sm">
                        <Skeleton height={32} circle />
                        <Box style={{ flex: 1 }}>
                          <Skeleton height={14} width="60%" mb={8} />
                          <Skeleton height={12} width="80%" mb={8} />
                          <Skeleton height={10} width="40%" />
                        </Box>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              ) : error && Object.keys(error).length > 0 ? (
                <Stack gap="md" align="center" justify="center" h={200}>
                  <Text c="red">Failed to load activities</Text>
                  <Button variant="outline" size="sm" onClick={fetchActivities}>
                    Retry
                  </Button>
                </Stack>
              ) : activities.length === 0 ? (
                <Stack gap="md" align="center" justify="center" h={200}>
                  <Text c="dimmed">No activities found</Text>
                  <Text size="sm" c="dimmed">
                    Your recent activities will appear here
                  </Text>
                </Stack>
              ) : (
                <Stack gap="md">
                  {activities.map((activity: any) => (
                    <Paper key={activity.id} p="md" withBorder radius="md">
                      <Group align="flex-start">
                        <Avatar
                          src={`https://github.com/identicons/${encodeURIComponent(
                            activity.user_name,
                          )}.png`}
                          size="sm"
                          mt={4}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              activity.user_name,
                            )}&background=random`;
                          }}
                        />
                        <Box style={{ flex: 1 }}>
                          {/* Username, operation (dimmed), and model/target (blue) */}
                          <Group gap={4} wrap="wrap" align="center">
                            <Text size="sm" fw={600}>
                              {activity.user_name}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {formatOperation(activity.operation)}
                            </Text>
                            <Text size="sm" c="blue">
                              {activity.model || activity.target}
                            </Text>
                          </Group>

                          {/* ✅ Date (relative with tooltip) + status badge */}
                          {activity.creation_date && (
                            <Group gap="xs" mt={4}>
                              <Tooltip
                                label={formatAbsoluteDate(
                                  activity.creation_date,
                                )}
                                withArrow
                              >
                                <Text size="xs" c="dimmed">
                                  {formatDate(activity.creation_date)}
                                </Text>
                              </Tooltip>
                              {activity.status && (
                                <Badge
                                  size="xs"
                                  variant="light"
                                  color={getStatusColor(activity.status)}
                                >
                                  {activity.status}
                                </Badge>
                              )}
                            </Group>
                          )}
                        </Box>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              )}
            </ScrollArea>
          </Card>
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={3}>
          <Stack gap="lg">
            <TrendingProjects compact />
            <TrendingTags />
            <SuggestedUsers />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default LandingPage;
