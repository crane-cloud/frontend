import React from "react";
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
  ActionIcon,
  ScrollArea,
  Select,
  Avatar,
} from "@mantine/core";
import {
  FiActivity,
  FiSend,
  FiPlus,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiFilter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import TrendingTags from "@/components/Trending/TrendingTags";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import CompactProjectsList from "@/components/Lists/CompactProjectsList";

const LandingPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  // Mock data for dashboard - can be used for stats cards if needed
  // const userStats = {
  //   projects: 12,
  //   followers: 148,
  //   following: 89,
  //   stars: 342,
  // };

  const quickActions = [
    {
      title: "Create New Project",
      description: "Start a new project and deploy to the cloud",
      icon: FiPlus,
      color: "blue",
      link: "/projects/new",
    },
    // {
    //   title: "Deploy Application",
    //   description: "Deploy your latest application build",
    //   icon: FiSend,
    //   color: "green",
    //   link: "/apps/deploy",
    // },
    // {
    //   title: "Create Database",
    //   description: "Set up a new database instance",
    //   icon: FiDatabase,
    //   color: "purple",
    //   link: "/databases/new",
    // },
    // {
    //   title: "Manage Clusters",
    //   description: "Monitor and configure your clusters",
    //   icon: FiServer,
    //   color: "orange",
    //   link: "/admin/clusters",
    // },
  ];

  const activityFeed = [
    {
      id: 1,
      type: "star",
      user: "sarah-dev",
      avatar: "https://github.com/identicons/sarah-dev.png",
      action: "starred",
      target: "ml-training-pipeline",
      targetType: "project",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "follow",
      user: "mike-ops",
      avatar: "https://github.com/identicons/mike-ops.png",
      action: "started following",
      target: "alex-chen",
      targetType: "user",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "deploy",
      user: "dev-team",
      avatar: "https://github.com/identicons/dev-team.png",
      action: "deployed",
      target: "chat-app v2.1.0",
      targetType: "app",
      timestamp: "6 hours ago",
    },
    {
      id: 4,
      type: "fork",
      user: "jane-coder",
      avatar: "https://github.com/identicons/jane-coder.png",
      action: "forked",
      target: "kubernetes-config",
      targetType: "project",
      timestamp: "8 hours ago",
    },
    {
      id: 5,
      type: "comment",
      user: "tech-lead",
      avatar: "https://github.com/identicons/tech-lead.png",
      action: "commented on",
      target: "microservices-setup",
      targetType: "project",
      timestamp: "1 day ago",
    },
  ];

  // Activity feed data - this could come from API
  const activityFeedData = activityFeed;

  return (
    <Container size="xl" py="sm">
      {/* Welcome Header */}
      {/* <Box mb="xl">
        <Group justify="space-between" align="flex-end">
    <div>
            <Title order={2} mb="xs">
              Welcome back! 👋
            </Title>
            <Text c="dimmed">
              Here's what's happening in your CraneCloud community
            </Text>
          </div>
          <Group>
            <Input
              placeholder="Search projects, users, tags..."
              leftSection={<FiSearch size={16} />}
              w={300}
            />
          </Group>
        </Group>
      </Box> */}

      {/* Quick Stats */}
      {/* <Grid mb="xl">
        <Grid.Col span={3}>
          <Card p="md" withBorder radius="md" ta="center">
            <ThemeIcon size="lg" variant="light" color="blue" mx="auto" mb="xs">
              <FiCode size={20} />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              {userStats.projects}
            </Text>
            <Text size="sm" c="dimmed">
              Your Projects
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card p="md" withBorder radius="md" ta="center">
            <ThemeIcon
              size="lg"
              variant="light"
              color="green"
              mx="auto"
              mb="xs"
            >
              <FiUsers size={20} />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              {userStats.followers}
            </Text>
            <Text size="sm" c="dimmed">
              Followers
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card p="md" withBorder radius="md" ta="center">
            <ThemeIcon
              size="lg"
              variant="light"
              color="purple"
              mx="auto"
              mb="xs"
            >
              <FiHeart size={20} />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              {userStats.following}
            </Text>
            <Text size="sm" c="dimmed">
              Following
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card p="md" withBorder radius="md" ta="center">
            <ThemeIcon
              size="lg"
              variant="light"
              color="yellow"
              mx="auto"
              mb="xs"
            >
              <FiStar size={20} />
            </ThemeIcon>
            <Text size="xl" fw={700}>
              {userStats.stars}
            </Text>
            <Text size="sm" c="dimmed">
              Stars Received
            </Text>
          </Card>
        </Grid.Col>
      </Grid> */}

      {/* Main 3-Column Layout */}
      <Grid>
        {/* Left Column - Quick Actions & Your Activity */}
        <Grid.Col span={3}>
          <Stack gap="lg">
            {/* Quick Actions */}
            <Card p="lg" withBorder radius="lg">
              <Group mb="md">
                <FiSend size={20} />
                <Title order={4}>Quick Actions</Title>
              </Group>
              <Stack gap="sm">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    component={Link}
                    to={action.link}
                    variant="subtle"
                    justify="flex-start"
                    leftSection={<action.icon size={16} />}
                    color={action.color}
                    fullWidth
                  >
                    <Box ta="left">
                      <Text size="sm" fw={500}>
                        {action.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {action.description}
                      </Text>
                    </Box>
                  </Button>
                ))}
              </Stack>
            </Card>

            {/* projects list */}
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
                <Select
                  data={["All Activity", "Following", "Your Activity"]}
                  defaultValue="All Activity"
                  size="xs"
                  w={120}
                />
              </Group>
            </Group>

            <ScrollArea h={600}>
              <Stack gap="md">
                {activityFeedData.map((activity) => (
                  <Paper key={activity.id} p="md" withBorder radius="md">
                    <Group mb="sm">
                      <Avatar src={activity.avatar} size="sm" />
                      <div style={{ flex: 1 }}>
                        <Group gap={4}>
                          <Text size="sm" fw={500}>
                            {activity.user}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {activity.action}
                          </Text>
                          <Text size="sm" fw={500} c="blue">
                            {activity.target}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                          {activity.timestamp}
                        </Text>
                      </div>
                      <Group gap="xs">
                        <ActionIcon variant="subtle" size="sm">
                          <FiHeart size={14} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="sm">
                          <FiMessageCircle size={14} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="sm">
                          <FiShare2 size={14} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </ScrollArea>
          </Card>
        </Grid.Col>

        {/* Right Column - Trending & Suggestions */}
        <Grid.Col span={3}>
          <Stack gap="lg">
            {/* Trending Projects */}
            <TrendingProjects compact />
            {/* Trending Tags */}
            <TrendingTags />
            {/* Suggested Users */}
            <SuggestedUsers />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default LandingPage;
