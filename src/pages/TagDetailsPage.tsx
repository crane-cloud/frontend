import { useState, useEffect, Fragment } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Button,
  Anchor,
  SimpleGrid,
  ThemeIcon,
  Breadcrumbs,
  Tabs,
  Center,
  Skeleton,
  Notification,
  Card,
  Box,
  Grid,
  LoadingOverlay,
} from "@mantine/core";
import {
  FiUsers,
  FiCode,
  FiTag,
  FiXCircle,
  FiCheck,
  FiUserPlus,
  FiTrendingUp,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {
  getTagColor,
  useSetContainerSize,
  useSetNoSidebar,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import { API_TAGS } from "@/utils/apis";
import { Tag } from "@/types/tag";
import ProjectExploreCard from "@/components/Cards/ProjectExploreCard";
import UserCard from "@/components/Cards/UserCard";
import { User } from "@/types/user";
import PaginationInfo from "@/components/PaginationInfo";

interface Project {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  date_created: string;
  followers_count: number;
  apps_count: number;
  cluster_id: string;
  prometheus_url: string;
  is_public: boolean;
  project_type: string;
  alias: string;
  is_following: boolean;
  admin_disabled: boolean;
  members_count: number;
  disabled: boolean;
  organisation: string;
  tags: Array<{
    id: string;
    name: string;
    is_following: boolean;
    is_super_tag: boolean;
    followers_count: number;
  }>;
  tags_count: number;
  supports_ml: boolean | null;
}

interface Follower {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_picture: string | null;
  biography: string | null;
  organisation: string | null;
  date_created: string;
  last_seen: string;
  following_count: number;
  followers_count: number;
  followed_projects_count: number;
  owned_projects_count: number;
  collaborative_projects_count: number;
  followed_tags_count: number;
  is_beta_user: boolean;
  verified: boolean;
  is_public: boolean | null;
  admin_disabled: boolean | null;
  disabled: boolean | null;
  social_links: {
    github: string | null;
    linkedin: string | null;
  } | null;
  roles: Array<{ id: string; name: string }>;
  credits: Array<{
    id: string;
    user_id: string;
    purchased_credits: number | null;
    promotion_credits: number | null;
    amount: number;
  }>;
  age: string;
}

const TagDetailsPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const [projectPage, setProjectPage] = useState(1);
  const { tagName } = useParams<{ tagName: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tagId, setTagId] = useState<string | null>(null);

  const {
    data: tagResponse,
    getData: getTagData,
    loading: tagLoading,
  } = useGet();
  const {
    data: tagDetailsResponse,
    getData: getTagDetails,
    loading: tagDetailsLoading,
  } = useGet();
  const {
    data: tagProjectsResponse,
    getData: getTagProjects,
    loading: tagProjectsLoading,
  } = useGet();
  const { data: tagFollowersResponse, getData: getTagFollowers } = useGet();

  const {
    data: moreTagsResponse,
    getData: getMoreTags,
    loading: moreTagsLoading,
  } = useGet();

  const [tagData, setTagData] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [sidebarTags, setSidebarTags] = useState<Tag[]>([]);

  const {
    uploadData: followUnfollowTag,
    submitting: followSubmitting,
    success: followSuccess,
    error: followError,
  } = usePost();

  useEffect(() => {
    if (tagName) {
      getTagData({
        api: `${API_TAGS}?keywords=${tagName}`,
        params: { page: 1, per_page: 5 },
      });
      getMoreTags({ api: API_TAGS, params: { page: 1, per_page: 10 } });
    }
  }, [tagName]);

  useEffect(() => {
    if (moreTagsResponse?.data) {
      const filteredTags = moreTagsResponse.data.filter(
        (t: Tag) => t.name.toLowerCase() !== tagName?.toLowerCase(),
      );
      setSidebarTags(filteredTags.slice(0, 10));
    }
  }, [moreTagsResponse, tagName]);

  useEffect(() => {
    if (tagResponse && tagResponse.data) {
      const exactTag = tagResponse.data.find(
        (tag: Tag) => tag.name.toLowerCase() === tagName?.toLowerCase(),
      );
      const targetTag = exactTag || tagResponse.data[0];

      if (targetTag) {
        setTagId(targetTag.id);
      }
    }
  }, [tagResponse, tagName]);

  useEffect(() => {
    if (tagId) {
      getTagDetails({
        api: `${API_TAGS}/${tagId}`,
      });
      getTagFollowers({
        api: `${API_TAGS}/${tagId}/following`,
        params: { page: 1, per_page: 10 },
      });
    }
  }, [tagId]);

  useEffect(() => {
    if (tagId) {
      getTagProjects({
        api: `${API_TAGS}/${tagId}/projects`,
        params: { page: projectPage, per_page: 8 },
      });
    }
  }, [tagId, projectPage]);

  useEffect(() => {
    if (tagDetailsResponse && tagDetailsResponse.data) {
      const tagDetails = tagDetailsResponse.data;
      setTagData({ ...tagDetails, color: getTagColor(tagDetails.name) });
      setIsFollowing(tagDetails.is_following || false);
    }
  }, [tagDetailsResponse]);

  useEffect(() => {
    if (tagProjectsResponse?.data) {
      setProjects(
        Array.isArray(tagProjectsResponse.data.projects)
          ? tagProjectsResponse.data.projects
          : Array.isArray(tagProjectsResponse.data)
            ? tagProjectsResponse.data
            : [],
      );
    }
  }, [tagProjectsResponse]);

  useEffect(() => {
    if (tagFollowersResponse?.data) {
      setFollowers(
        Array.isArray(tagFollowersResponse.data.followers)
          ? tagFollowersResponse.data.followers
          : Array.isArray(tagFollowersResponse.data)
            ? tagFollowersResponse.data
            : [],
      );
    }
  }, [tagFollowersResponse]);

  useEffect(() => {
    if (tagDetailsResponse && tagDetailsResponse.data) {
      const tagDetails = tagDetailsResponse.data;
      setTagData({
        ...tagDetails,
        color: getTagColor(tagDetails.name),
      });
      setIsFollowing(tagDetails.is_following || false);
    }
  }, [tagDetailsResponse]);

  useEffect(() => {
    if (followSuccess) {
      setError(null);
      if (tagId) {
        getTagDetails({ api: `${API_TAGS}/${tagId}` });
      }
    }
    if (followError && hasInteracted) {
      setIsFollowing((prev) => !prev);
    }
  }, [followSuccess, followError, hasInteracted, tagId]);

  const handleFollowToggle = () => {
    if (!tagId) {
      return;
    }
    setHasInteracted(true);
    setError(null);
    setIsFollowing((prev) => !prev);
    followUnfollowTag({
      api: `${API_TAGS}/${tagId}/following`,
      method: isFollowing ? "DELETE" : "POST",
    });
  };

  const breadcrumbItems = [
    { title: "Explore", href: "/explore" },
    { title: "Tags", href: "/explore#tags" },
    { title: tagData?.name || tagName || "Tag", href: "#" },
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

  const isNotFound = tagResponse?.data && tagResponse.data.length === 0;

  const loading = tagLoading || tagDetailsLoading;

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              <Skeleton height={20} width={200} radius="sm" />
              <Card p="xl" radius="lg" withBorder shadow="sm">
                <Skeleton height={80} width="100%" radius="sm" />
              </Card>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height={220} radius="lg" />
                ))}
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={300} radius="lg" />
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  if (isNotFound || !tagData) {
    return (
      <Stack gap="xl">
        <Card withBorder radius="lg" py={80} shadow="sm">
          <Center>
            <Stack align="center" gap="md">
              <ThemeIcon size={80} radius="100%" variant="light" color="gray">
                <FiTag size={40} />
              </ThemeIcon>
              <Title order={2} fw={700}>
                Tag not found
              </Title>
              <Text c="dimmed" size="lg">
                The tag "{tagName}" could not be found.
              </Text>
              <Button
                component={Link}
                to="/explore#tags"
                variant="light"
                size="md"
                radius="xl"
                mt="md"
              >
                Browse all tags
              </Button>
            </Stack>
          </Center>
        </Card>
      </Stack>
    );
  }

  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack gap="xl">
          {error && (
            <Notification
              icon={<FiXCircle size={18} />}
              color="red"
              title="Error"
              onClose={() => setError(null)}
              radius="md"
            >
              {error}
            </Notification>
          )}

          <Breadcrumbs separator="/">{breadcrumbItems}</Breadcrumbs>

          <Card p={{ base: "md", md: "xl" }} radius="lg" withBorder shadow="sm">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group gap="lg" wrap="nowrap">
                <ThemeIcon
                  size={80}
                  radius="xl"
                  variant="light"
                  color={tagData.color}
                >
                  <FiTag size={40} />
                </ThemeIcon>
                <Box>
                  <Group gap="sm" mb={4}>
                    <Title
                      tt="uppercase"
                      order={1}
                      fw={800}
                      style={{ fontSize: 32, letterSpacing: "-0.5px" }}
                    >
                      #{tagData.name}
                    </Title>
                  </Group>
                  <Text size="lg" c="dimmed" maw={600} lh={1.4}>
                    Explore projects and developers working with {tagData.name}
                  </Text>
                </Box>
              </Group>

              <Group gap="sm">
                <Button
                  variant={isFollowing ? "light" : "filled"}
                  radius="md"
                  size="md"
                  leftSection={
                    isFollowing ? (
                      <FiCheck size={18} />
                    ) : (
                      <FiUserPlus size={18} />
                    )
                  }
                  onClick={handleFollowToggle}
                  loading={followSubmitting}
                  disabled={followSubmitting}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Group>
            </Group>

            <Group gap="xl" mt="xl">
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <FiCode size={16} />
                </ThemeIcon>
                <Text size="sm" fw={600}>
                  {tagData.projects_count?.toLocaleString() || 0}{" "}
                  <Text component="span" c="dimmed" fw={500}>
                    Projects
                  </Text>
                </Text>
              </Group>
              <Group gap="xs">
                <ThemeIcon variant="subtle" color="gray" size="sm">
                  <FiUsers size={16} />
                </ThemeIcon>
                <Text size="sm" fw={600}>
                  {tagData.followers_count?.toLocaleString() || 0}{" "}
                  <Text component="span" c="dimmed" fw={500}>
                    Followers
                  </Text>
                </Text>
              </Group>
            </Group>
          </Card>

          <Tabs
            defaultValue="projects"
            variant="pills"
            radius="xl"
            color="blue"
          >
            <Tabs.List mb="xl">
              <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
                Projects{" "}
                <Badge size="sm" variant="transparent" c="inherit" p={0} ml={4}>
                  {(tagData.projects_count || 0).toLocaleString()}
                </Badge>
              </Tabs.Tab>
              <Tabs.Tab value="developers" leftSection={<FiUsers size={16} />}>
                Developers{" "}
                <Badge size="sm" variant="transparent" c="inherit" p={0} ml={4}>
                  {(tagData.followers_count || 0).toLocaleString()}
                </Badge>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="projects">
              {tagProjectsLoading && projects.length === 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                  {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} height={200} radius="lg" />
                  ))}
                </SimpleGrid>
              ) : projects.length > 0 ? (
                <Stack gap="lg">
                  <Box style={{ position: "relative", minHeight: 200 }}>
                    <LoadingOverlay
                      visible={tagProjectsLoading}
                      zIndex={1000}
                      overlayProps={{ radius: "sm", blur: 2 }}
                      loaderProps={{ color: "blue", type: "dots" }}
                    />
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                      {projects.map((project) => (
                        <ProjectExploreCard
                          key={project.id}
                          project={project}
                        />
                      ))}
                    </SimpleGrid>
                  </Box>

                  <Group justify="flex-end" mt="md">
                    <PaginationInfo
                      total={
                        tagProjectsResponse?.data?.pagination?.total ||
                        tagData?.projects_count ||
                        0
                      }
                      limit={8}
                      page={projectPage}
                      setPage={setProjectPage}
                    />
                  </Group>
                </Stack>
              ) : (
                // 3. Empty State: No projects found
                <Card withBorder radius="lg" py={80} shadow="sm">
                  <Center
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <FiCode
                      size={48}
                      color="var(--mantine-color-gray-4)"
                      style={{ marginBottom: 16 }}
                    />
                    <Title order={4} fw={600} mb={8}>
                      No projects yet
                    </Title>
                    <Text size="md" c="dimmed">
                      There are currently no projects using the #{tagData?.name}{" "}
                      tag.
                    </Text>
                  </Center>
                </Card>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="developers">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {followers.map((developer) => (
                  <Fragment key={developer.username}>
                    <UserCard user={developer as User} isCard showBorder />
                  </Fragment>
                ))}
              </SimpleGrid>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Box style={{ position: "sticky", top: 85 }}>
          <Card withBorder radius="lg" shadow="sm" p="lg">
            <Group gap="sm" mb="md" align="center">
              <ThemeIcon variant="light" color="blue" size="md" radius="md">
                <FiTrendingUp size={16} />
              </ThemeIcon>
              <Title order={3} size="h5" fw={700}>
                Discover Tags
              </Title>
            </Group>

            {moreTagsLoading ? (
              <Stack gap="md">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} height={36} radius="md" />
                ))}
              </Stack>
            ) : (
              <Stack gap="sm">
                {sidebarTags.map((tag) => (
                  <Box
                    key={tag.id}
                    component={Link}
                    to={`/tags/${tag.name}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      padding: "8px 12px",
                      borderRadius: "var(--mantine-radius-md)",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <Group justify="space-between" wrap="nowrap">
                      <Group gap="xs" wrap="nowrap">
                        <ThemeIcon
                          size={24}
                          variant="light"
                          color={getTagColor(tag.name)}
                          radius="xl"
                        >
                          <FiTag size={12} />
                        </ThemeIcon>
                        <Text size="md" tt="uppercase" fw={600} lineClamp={1}>
                          #{tag.name}
                        </Text>
                      </Group>
                      <Badge
                        tt="capitalize"
                        size="sm"
                        variant="outline"
                        color="gray"
                        radius="xl"
                      >
                        {tag.projects_count || 0} projects
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

export default TagDetailsPage;
