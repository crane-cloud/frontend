import React, { useEffect } from "react";
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
  Modal,
  TextInput,
  Radio,
  Divider,
} from "@mantine/core";
import {
  FiActivity,
  FiSend,
  FiPlus,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiFilter,
  FiDatabase,
  FiCode,
} from "react-icons/fi";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import TrendingTags from "@/components/Trending/TrendingTags";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import CompactProjectsList from "@/components/Lists/CompactProjectsList";
import CreateProjectForm from "@/components/Forms/CreateProjectForm";
import useGet from "@/utils/useGet";
import { API_PROJECTS } from "@/utils/apis";

const renderProjectCard = (
  project: any,
  selectedProject: string | null,
  setSelectedProject: (id: string) => void,
) => (
  <Card
    key={project.id}
    p="xs"
    radius="md"
    withBorder
    style={{
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer",
      transition: "all 0.2s ease",
      border:
        selectedProject === project.id
          ? "2px solid #1976d2"
          : "0px solid #dee2e6",
      position: "relative",
      overflow: "hidden",
      minHeight: "60px",
    }}
    onClick={() => setSelectedProject(project.id)}
    className="hover:shadow-md"
  >
    <Group align="center" gap="xs" style={{ height: "100%" }}>
      <Avatar
        size="sm"
        radius="sm"
        color="blue"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan" }}
      >
        <FiCode size={14} />
      </Avatar>

      <Box style={{ flex: 1, minWidth: 0 }}>
        <Group justify="space-between" align="flex-start" mb={2}>
          <Text
            size="sm"
            fw={600}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </Text>
        </Group>

        {project.description && (
          <Text
            size="xs"
            c="dimmed"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.3,
            }}
          >
            {project.description}
          </Text>
        )}
      </Box>
    </Group>
  </Card>
);

const renderDbTypeCard = (
  value: "mysql" | "postgresql",
  selectedDbType: string,
  setSelectedDbType: (val: "mysql" | "postgresql") => void,
) => {
  const dbInfo = {
    mysql: {
      label: "MySQL",
      description: "Reliable open-source relational database.",
      color: "yellow",
      icon: <FiDatabase size={18} />,
    },
    postgresql: {
      label: "PostgreSQL",
      description: "Advanced open-source SQL database.",
      color: "blue",
      icon: <FiDatabase size={18} />,
    },
  }[value];

  return (
    <Card
      key={value}
      p="md"
      radius="md"
      withBorder
      style={{
        cursor: "pointer",
        border:
          selectedDbType === value ? "2px solid #1976d2" : "1px solid #dee2e6",
        transition: "all 0.2s ease",
      }}
      onClick={() => setSelectedDbType(value)}
      className="hover:shadow-md"
    >
      <Group align="center" gap="sm">
        <Avatar color={dbInfo.color} radius="sm" size="md">
          {dbInfo.icon}
        </Avatar>
        <Box style={{ flex: 1 }}>
          <Text fw={600} size="sm">
            {dbInfo.label}
          </Text>
          <Text size="xs" c="dimmed">
            {dbInfo.description}
          </Text>
        </Box>
        <Radio
          checked={selectedDbType === value}
          value={value}
          onChange={() => setSelectedDbType(value)}
          aria-label={dbInfo.label}
        />
      </Group>
    </Card>
  );
};

const LandingPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const { data: response, getData } = useGet();

  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 5 },
    });
  }, []);

  const userProjects = response?.data?.projects || [];

  const [dbModalOpen, setDbModalOpen] = React.useState(false);
  const [projectModalOpen, setProjectModalOpen] = React.useState(false);
  const [projectSearch, setProjectSearch] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );
  const [selectedDbType, setSelectedDbType] = React.useState<
    "mysql" | "postgresql" | ""
  >("");

  const filteredProjects = userProjects.filter((p) =>
    p.name.toLowerCase().includes(projectSearch.toLowerCase()),
  );

  const quickActions = [
    {
      title: "Create New Project",
      description: "Start and launch to the cloud",
      icon: FiPlus,
      color: "blue",
      action: () => setProjectModalOpen(true),
    },
    {
      title: "Create Database",
      description: "Set up a new database instance",
      icon: FiDatabase,
      color: "green",
      action: () => setDbModalOpen(true),
    },
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

  const activityFeedData = activityFeed;

  return (
    <Container size="xl" py="sm">
      <Grid>
        <Grid.Col span={3}>
          <Stack gap="lg">
            <Card p="lg" withBorder radius="lg">
              <Group mb="md">
                <FiSend size={20} />
                <Title order={4}>Quick Actions</Title>
              </Group>
              <Stack gap="sm">
                {quickActions.map((action, index) => (
                  <React.Fragment key={action.title}>
                    <Button
                      variant="subtle"
                      justify="flex-start"
                      leftSection={<action.icon size={16} />}
                      color={action.color}
                      fullWidth
                      onClick={action.action}
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

                    {index < quickActions.length - 1 && (
                      <Divider color="gray.3" style={{ width: "100%" }} />
                    )}
                  </React.Fragment>
                ))}
              </Stack>
            </Card>
            <CompactProjectsList />
          </Stack>
        </Grid.Col>

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

        <Grid.Col span={3}>
          <Stack gap="lg">
            <TrendingProjects compact />
            <TrendingTags />
            <SuggestedUsers />
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Create Project Modal */}
      <Modal
        opened={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title="Create New Project"
        size="xl"
        centered
        overlayProps={{ blur: 2 }}
        radius="md"
        padding="lg"
      >
        <CreateProjectForm
          showTitle={false}
          onCancel={() => setProjectModalOpen(false)}
          refresh={() => setProjectModalOpen(false)}
          setContainerSize={false}
        />
      </Modal>

      {/* Create Database Modal */}
      <Modal
        opened={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
        title="Create Database"
        size="xl"
        centered
        overlayProps={{ blur: 2 }}
        radius="md"
        padding="lg"
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} grow>
          {/* Left Column - Project Selection */}
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap="sm">
              <Text fw={500} mb={4}>
                Select Project
              </Text>
              <TextInput
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.currentTarget.value)}
              />
              <Grid gutter="xs" mt={8}>
                {filteredProjects.length === 0 && (
                  <Grid.Col span={12}>
                    <Text size="sm" c="dimmed">
                      No projects found.
                    </Text>
                  </Grid.Col>
                )}
                {filteredProjects.map((project) => (
                  <Grid.Col span={12} key={project.id}>
                    {renderProjectCard(
                      project,
                      selectedProject,
                      setSelectedProject,
                    )}
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Grid.Col>

          {/* Right Column - Database Type Selection */}
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack gap="sm">
              <Text fw={500} mb={4}>
                Choose Database Type
              </Text>
              {["mysql", "postgresql"].map((db) =>
                renderDbTypeCard(
                  db as "mysql" | "postgresql",
                  selectedDbType,
                  setSelectedDbType,
                ),
              )}
              <Button
                mt={16}
                fullWidth
                disabled={!selectedProject || !selectedDbType}
                onClick={() => {
                  setDbModalOpen(false);
                  setSelectedProject(null);
                  setSelectedDbType("");
                  setProjectSearch("");
                }}
              >
                Create Database
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Modal>
    </Container>
  );
};

export default LandingPage;
