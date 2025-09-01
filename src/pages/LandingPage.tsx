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
  Modal,
  TextInput,
  Radio,
  Divider,
  Skeleton,
  Loader,
  ThemeIcon,
} from "@mantine/core";
import {
  FiActivity,
  FiSend,
  FiPlus,
  FiFilter,
  FiDatabase,
  FiCode,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import TrendingTags from "@/components/Trending/TrendingTags";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import CompactProjectsList from "@/components/Lists/CompactProjectsList";
import CreateProjectForm from "@/components/Forms/CreateProjectForm";
import useGet from "@/utils/useGet";
import { API_PROJECTS } from "@/utils/apis";
import { useAuth } from "@/utils/AuthContext";
import { ACTIVITY_LOGS_API_URL, DATABASE_API_URL } from "@/config";
import { ActivityItem } from "@/components/Cards/ActivityCard";
import { Project } from "@/types/project";
import usePost from "@/utils/usePost";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const { user } = useAuth();
  const navigate = useNavigate();

  const [dbModalOpen, setDbModalOpen] = React.useState(false);
  const [projectModalOpen, setProjectModalOpen] = React.useState(false);
  const [projectSearch, setProjectSearch] = React.useState("");
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null,
  );
  const [selectedDbType, setSelectedDbType] = React.useState<
    "mysql" | "postgres" | ""
  >("");

  const { data: response, getData: getUserProjects } = useGet();
  const { data: activitiesData, getData, loading, error } = useGet();
  const { uploadData, submitting, success, data: created_database } = usePost();

  useEffect(() => {
    getUserProjects({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 5 },
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchActivities();
    }
  }, [user?.id]);

  const userProjects = response?.data?.projects || [];
  const filteredProjects = userProjects.filter((project: Project) =>
    project.name.toLowerCase().includes(projectSearch.toLowerCase()),
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
  const fetchActivities = () => {
    getData({
      api: `${ACTIVITY_LOGS_API_URL}/api/activities`,
      params: {
        user_id: user?.id,
        status: "Success",
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

  const handleDatabaseModalClose = () => {
    setDbModalOpen(false);
    setSelectedProject(null);
    setSelectedDbType("");
    setProjectSearch("");
  };

  const handleSubmit = () => {
    uploadData({
      api: `${DATABASE_API_URL}/databases`,
      params: {
        database_flavour_name: selectedDbType,
        project_id: selectedProject,
      },
      isExternal: true,
    });
  };

  useEffect(() => {
    if (success && created_database) {
      navigate(
        `/projects/${selectedProject}/databases/${created_database.data.database.id}`,
      );
    }
  }, [success, created_database]);

  return (
    <Container size="xl" py="sm">
      <Grid gutter="lg" align="stretch">
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
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

                    {index < quickActions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Stack>
            </Card>
            <CompactProjectsList />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 12, md: 6 }}>
          <Card
            p="lg"
            withBorder
            radius="lg"
            h={activities.length === 0 ? "86%" : "100%"}
          >
            <Group mb="lg" justify="space-between">
              <Group>
                <FiActivity size={20} />
                <Title order={4}>Recent Acitivity</Title>
              </Group>
              <Group gap={2}>
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<FiFilter size={14} />}
                />
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<FiRefreshCw size={14} />}
                  onClick={fetchActivities}
                  loading={loading}
                />
                <Select
                  data={["All Activity", "Following", "Your Activity"]}
                  defaultValue="Your Activity"
                  size="xs"
                  w={120}
                />
              </Group>
            </Group>

            <ScrollArea h={900}>
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
                <Stack gap="lg" align="center" justify="center" h={500}>
                  <Box
                    style={{
                      position: "relative",
                      padding: "20px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--mantine-color-blue-1), var(--mantine-color-cyan-1))",
                    }}
                  >
                    <ThemeIcon
                      size={60}
                      radius="xl"
                      variant="light"
                      color="blue"
                      style={{ background: "transparent" }}
                    >
                      <FiClock size={32} />
                    </ThemeIcon>
                  </Box>

                  <Stack gap="xs" align="center">
                    <Text size="lg" fw={600}>
                      No recent activities
                    </Text>
                    <Text size="md" c="dimmed" ta="center" maw={300} lh={1.4}>
                      Your activity timeline is empty right now. Start exploring
                      and your actions will show up here!
                    </Text>
                  </Stack>
                </Stack>
              ) : (
                <Stack gap="sm">
                  {activities.map((activity: any) => (
                    <ActivityItem key={activity._id.$oid} activity={activity} />
                  ))}
                </Stack>
              )}
            </ScrollArea>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Stack gap="lg" h="100%">
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
        onClose={handleDatabaseModalClose}
        title="Create Database"
        size="xl"
        centered
        overlayProps={{ blur: 2 }}
        radius="md"
        padding="lg"
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl" }}>
          {/* Left Column */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Left Column Content */}
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
                {filteredProjects.map((project: Project) => (
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

          {/* Right Column */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Right Column Content */}
            <Stack gap="sm">
              <Text fw={500} mb={4}>
                Choose Database Type
              </Text>
              {["mysql", "postgres"].map((db) =>
                renderDbTypeCard(
                  db as "mysql" | "postgres",
                  selectedDbType,
                  setSelectedDbType,
                ),
              )}
              <Button
                mt={16}
                fullWidth
                disabled={!selectedProject || !selectedDbType}
                onClick={() => handleSubmit()}
                leftSection={submitting ? <Loader size="xs" /> : <FiPlus />}
              >
                Create Database
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider
          my="md"
          style={{
            display: "block",
            "@media (min-width: 768px)": { display: "none" },
          }}
        />
      </Modal>
    </Container>
  );
};

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
  value: "mysql" | "postgres",
  selectedDbType: string,
  setSelectedDbType: (val: "mysql" | "postgres") => void,
) => {
  const dbInfo = {
    mysql: {
      label: "MySQL",
      description: "Reliable open-source relational database.",
      color: "yellow",
      icon: <FiDatabase size={18} />,
    },
    postgres: {
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

export default LandingPage;
