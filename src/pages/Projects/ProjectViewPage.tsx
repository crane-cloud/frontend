import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  FiCalendar,
  FiCheck,
  FiLayers,
  FiTag,
  FiUserPlus,
  FiUsers,
  FiCompass,
} from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

import UserCard from "@/components/Cards/UserCard";
import { Tag } from "@/types/tag";
import { User } from "@/types/user";
import { API_PROJECTS, API_SOCIALS } from "@/utils/apis";
import {
  beautify,
  getTagColor,
  timeAgo,
  useSetContainerSize,
  useSetNoSidebar,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";

// Reusing your Project interface structure for the sidebar
interface ProjectItem {
  id: string;
  name: string;
  project_type: string;
  followers_count: number;
}

const ProjectViewPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const { project_id } = useParams<{ project_id: string }>();
  const [isFollowingProject, setIsFollowingProject] = useState<
    boolean | undefined
  >(undefined);
  const [sidebarProjects, setSidebarProjects] = useState<ProjectItem[]>([]);

  // --- HOOKS ---
  const {
    uploadData: followProject,
    submitting: following,
    success: follow_success,
    data: follow_response,
  } = usePost();
  const {
    uploadData: unfollowProject,
    submitting: unfollowing,
    success: unfollow_success,
    data: unfollow_response,
  } = usePost();
  const {
    data: projectResponse,
    getData: getProjectDetails,
    loading: gettingProjectDetails,
  } = useGet();
  const {
    data: followersResponse,
    getData: getProjectFollowers,
    loading: gettingFollowers,
  } = useGet();

  // NEW HOOK: Fetch more projects for the sidebar
  const {
    data: moreProjectsResponse,
    getData: getMoreProjects,
    loading: moreProjectsLoading,
  } = useGet();

  useEffect(() => {
    if (project_id) {
      getProjectDetails({
        api: `${API_PROJECTS}/${project_id}`,
        params: { public_view: "True" },
      });
      getProjectFollowers({
        api: `${API_PROJECTS}/${project_id}/following`,
      });
      getMoreProjects({
        api: `${API_SOCIALS}?entity=projects`,
        params: { page: 1, per_page: 8, public_view: "True" },
      });
    }
  }, [project_id]);

  // 2. Process sidebar projects
  useEffect(() => {
    if (moreProjectsResponse?.data?.projects) {
      // Filter out the currently viewed project so it doesn't show in the sidebar
      const filtered = moreProjectsResponse.data.projects.filter(
        (p: ProjectItem) => p.id !== project_id,
      );
      // Keep only top 5 for a clean sidebar
      setSidebarProjects(filtered.slice(0, 10));
    }
  }, [moreProjectsResponse, project_id]);

  const isFollowLoading = following || unfollowing;
  const projectDetails = projectResponse?.data?.project || {};
  const projectFollowers = followersResponse?.data.followers || [];

  useEffect(() => {
    if (projectDetails?.is_following !== undefined) {
      setIsFollowingProject(projectDetails.is_following);
    }
  }, [projectDetails?.is_following]);

  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingProject(true);
      getProjectFollowers({ api: `${API_PROJECTS}/${project_id}/following` });
    }
  }, [follow_success, follow_response]);

  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingProject(false);
      getProjectFollowers({ api: `${API_PROJECTS}/${project_id}/following` });
    }
  }, [unfollow_success, unfollow_response]);

  const onFollowClick = () => {
    if (isFollowingProject) {
      unfollowProject({
        api: `${API_PROJECTS}/${project_id}/following`,
        method: "DELETE",
      });
    } else {
      followProject({ api: `${API_PROJECTS}/${project_id}/following` });
    }
  };

  const breadcrumbItems = [
    { title: "Explore", href: "/explore" },
    { title: "Projects", href: "/explore#projects" },
    { title: projectDetails?.name || "Project", href: "#" },
  ].map((item, index) => (
    <Anchor
      key={index}
      component={Link}
      to={item.href}
      size="md"
      c="dimmed"
      fw={500}
    >
      {item.title}
    </Anchor>
  ));

  // --- MODERN LOADING SKELETON ---
  if (gettingProjectDetails) {
    return (
      <>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              <Skeleton height={20} width={250} radius="sm" />
              <Card p="xl" radius="lg" withBorder shadow="sm">
                <Group justify="space-between" align="flex-start">
                  <Group gap="lg">
                    <Skeleton height={80} width={80} radius="xl" />
                    <Box>
                      <Skeleton height={36} width={250} mb="sm" radius="sm" />
                      <Skeleton height={20} width={400} radius="sm" />
                    </Box>
                  </Group>
                </Group>
              </Card>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={150} radius="lg" />
                ))}
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={300} radius="lg" />
          </Grid.Col>
        </Grid>
      </>
    );
  }

  if (!projectResponse?.data && !gettingProjectDetails) {
    return (
      <>
        <Stack gap="xl">
          <Card withBorder radius="lg" py={80} shadow="sm">
            <Center>
              <Stack align="center" gap="md">
                <ThemeIcon size={80} radius="100%" variant="light" color="gray">
                  <FiLayers size={40} />
                </ThemeIcon>
                <Title order={2} fw={700}>
                  Project not found
                </Title>
                <Text c="dimmed" size="lg">
                  This project could not be found or you don't have access.
                </Text>
                <Button
                  component={Link}
                  to="/explore#projects"
                  variant="light"
                  size="md"
                  radius="xl"
                  mt="md"
                >
                  Browse all projects
                </Button>
              </Stack>
            </Center>
          </Card>
        </Stack>
      </>
    );
  }

  return (
    <Grid gutter="xl">
      {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack gap="xl">
          <Breadcrumbs separator="/">{breadcrumbItems}</Breadcrumbs>

          {/* Header Card */}
          <Card p={{ base: "md", md: "xl" }} radius="lg" withBorder shadow="sm">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group gap="lg" wrap="nowrap">
                <ThemeIcon size={80} radius="xl" variant="light" color="blue">
                  <FiLayers size={40} />
                </ThemeIcon>

                <Box>
                  <Group gap="sm" mb={4}>
                    <Title
                      order={1}
                      fw={800}
                      style={{ fontSize: 32, letterSpacing: "-0.5px" }}
                    >
                      {projectDetails?.name}
                    </Title>
                  </Group>
                  <Text size="lg" c="dimmed" maw={600} lh={1.4}>
                    {projectDetails?.description || "No description provided."}
                  </Text>
                </Box>
              </Group>

              <Group gap="sm">
                <Button
                  variant={isFollowingProject ? "light" : "filled"}
                  color="blue"
                  radius="xl"
                  size="md"
                  leftSection={
                    isFollowLoading ? (
                      <Loader size="xs" color="currentColor" />
                    ) : isFollowingProject ? (
                      <FiCheck size={18} />
                    ) : (
                      <FiUserPlus size={18} />
                    )
                  }
                  onClick={onFollowClick}
                  disabled={isFollowLoading}
                >
                  {isFollowLoading
                    ? isFollowingProject
                      ? "Unfollowing..."
                      : "Following..."
                    : isFollowingProject
                      ? "Following"
                      : "Follow"}
                </Button>
              </Group>
            </Group>

            <Group gap="xl" mt="lg">
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <LuUsers size={16} />
                </ThemeIcon>
                <Text size="sm" fw={600}>
                  {projectDetails?.followers_count?.toLocaleString() || 0}{" "}
                  <Text component="span" c="dimmed" fw={500}>
                    Followers
                  </Text>
                </Text>
              </Group>
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <FiLayers size={16} />
                </ThemeIcon>
                <Text size="sm" fw={600}>
                  {projectDetails?.apps_count?.toLocaleString() || 0}{" "}
                  <Text component="span" c="dimmed" fw={500}>
                    Apps
                  </Text>
                </Text>
              </Group>
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <FiTag size={16} />
                </ThemeIcon>
                <Text size="sm" fw={600}>
                  {projectDetails?.tags_count?.toLocaleString() || 0}{" "}
                  <Text component="span" c="dimmed" fw={500}>
                    Tags
                  </Text>
                </Text>
              </Group>
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <FiCalendar size={16} />
                </ThemeIcon>
                <Text size="sm" c="dimmed" fw={500}>
                  Created {timeAgo(projectDetails?.date_created)}
                </Text>
              </Group>
            </Group>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="users" variant="pills" radius="xl" color="blue">
            <Tabs.List mb="xl">
              <Tabs.Tab value="users" leftSection={<FiUsers size={16} />}>
                Followers{" "}
                <Badge size="sm" variant="transparent" c="inherit" p={0} ml={4}>
                  {(projectDetails?.followers_count || 0).toLocaleString()}
                </Badge>
              </Tabs.Tab>
              <Tabs.Tab value="tags" leftSection={<FiTag size={16} />}>
                Tags{" "}
                <Badge size="sm" variant="transparent" c="inherit" p={0} ml={4}>
                  {(projectDetails?.tags_count || 0).toLocaleString()}
                </Badge>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="users">
              {gettingFollowers ? (
                // Reduced columns to 2 to fit the new 8-column left width
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} height={150} radius="lg" />
                  ))}
                </SimpleGrid>
              ) : projectFollowers.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  {projectFollowers.map((user: User) => (
                    <Fragment key={user.username}>
                      <UserCard user={user} isCard showBorder />
                    </Fragment>
                  ))}
                </SimpleGrid>
              ) : (
                <Card withBorder radius="lg" py={80} shadow="sm">
                  <Center
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <FiUsers
                      size={48}
                      color="var(--mantine-color-gray-4)"
                      style={{ marginBottom: 16 }}
                    />
                    <Title order={4} fw={600} mb={8}>
                      No followers yet
                    </Title>
                    <Text size="md" c="dimmed">
                      Be the first to follow {projectDetails?.name}!
                    </Text>
                  </Center>
                </Card>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="tags">
              {projectDetails?.tags?.length > 0 ? (
                // Reduced columns to 4 max to fit the narrower space safely
                <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} spacing="md">
                  {projectDetails.tags.map((tag: Tag) => (
                    <Card
                      key={tag.id}
                      p="lg"
                      withBorder
                      radius="lg"
                      shadow="sm"
                      ta="center"
                      component={Link}
                      to={`/tags/${tag.name}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "var(--mantine-shadow-md)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "var(--mantine-shadow-sm)";
                      }}
                    >
                      <ThemeIcon
                        size={48}
                        radius="xl"
                        variant="light"
                        color={getTagColor(tag.name)}
                        mx="auto"
                        mb="md"
                      >
                        <FiTag size={24} />
                      </ThemeIcon>
                      <Text fw={600} size="md">
                        {beautify(tag.name)}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Card withBorder radius="lg" py={80} shadow="sm">
                  <Center
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <FiTag
                      size={48}
                      color="var(--mantine-color-gray-4)"
                      style={{ marginBottom: 16 }}
                    />
                    <Title order={4} fw={600} mb={8}>
                      No tags found
                    </Title>
                    <Text size="md" c="dimmed">
                      This project doesn't have any tags associated with it yet.
                    </Text>
                  </Center>
                </Card>
              )}
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>

      {/* --- RIGHT COLUMN (SIDEBAR) --- */}
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Box style={{ position: "sticky", top: 85 }}>
          <Card withBorder radius="lg" shadow="sm">
            <Group gap="sm" mb="md" align="center">
              <ThemeIcon variant="light" color="blue" size="md" radius="md">
                <FiCompass size={16} />
              </ThemeIcon>
              <Title order={3} size="h5" fw={700}>
                Discover Projects
              </Title>
            </Group>

            {moreProjectsLoading ? (
              <Stack gap="md">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} height={42} radius="md" />
                ))}
              </Stack>
            ) : (
              <Stack gap="sm">
                {sidebarProjects.map((proj) => (
                  <Box
                    key={proj.id}
                    component={Link}
                    to={`/explore/${proj.id}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      padding: "10px 12px",
                      borderRadius: "var(--mantine-radius-md)",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon
                          size={28}
                          variant="light"
                          color="blue"
                          radius="md"
                        >
                          <FiLayers size={14} />
                        </ThemeIcon>
                        <Box style={{ overflow: "hidden" }}>
                          <Text size="md" fw={600} lineClamp={1}>
                            {proj.name}
                          </Text>
                          <Text
                            size="sm"
                            c="dimmed"
                            style={{ textTransform: "capitalize" }}
                          >
                            {proj.project_type || "Project"}
                          </Text>
                        </Box>
                      </Group>
                      <Badge
                        size="sm"
                        variant="outline"
                        color="gray"
                        radius="xl"
                        leftSection={<FiUsers size={10} />}
                      >
                        {proj.followers_count || 0}
                      </Badge>
                    </Group>
                  </Box>
                ))}
              </Stack>
            )}
          </Card>

          <Group justify="center" gap="md" mt="lg">
            <Text size="xs" c="dimmed" fw={500}>
              © {new Date().getFullYear()} Crane Cloud. All rights reserved.
            </Text>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Anchor
              href="#"
              size="xs"
              c="dimmed"
              style={{ textDecoration: "none" }}
            >
              Documentation
            </Anchor>
            <Anchor
              href="#"
              size="xs"
              c="dimmed"
              style={{ textDecoration: "none" }}
            >
              Crane Cloud Status
            </Anchor>
            <Anchor
              href="#"
              size="xs"
              c="dimmed"
              style={{ textDecoration: "none" }}
            >
              Privacy Policy
            </Anchor>
            <Anchor
              href="#"
              size="xs"
              c="dimmed"
              style={{ textDecoration: "none" }}
            >
              Terms of Service
            </Anchor>
            <Anchor
              href="#"
              size="xs"
              c="dimmed"
              style={{ textDecoration: "none" }}
            >
              Contact Support
            </Anchor>
          </Group>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default ProjectViewPage;
