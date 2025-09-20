import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Grid,
  Card,
  Badge,
  Button,
  Box,
  Avatar,
  Anchor,
  SimpleGrid,
  ThemeIcon,
  Progress,
  Breadcrumbs,
  Select,
  Tabs,
  ActionIcon,
  Tooltip,
  Center,
  Skeleton,
  Notification,
} from "@mantine/core";
import {
  FiUsers,
  FiCode,
  FiTag,
  FiHeart,
  FiBook,
  FiGlobe,
  FiActivity,
  FiFilter,
  FiExternalLink,
  FiGithub,
  FiShare2,
  FiBookmark,
  FiXCircle,
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

  const { tagName } = useParams<{ tagName: string }>();
  const [sortBy, setSortBy] = useState("trending");
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tagId, setTagId] = useState<string | null>(null);

  // Hook for getting tag data
  const {
    data: tagResponse,
    getData: getTagData,
    loading: tagLoading,
  } = useGet();

  // Hook for getting tag details
  const {
    data: tagDetailsResponse,
    getData: getTagDetails,
    loading: tagDetailsLoading,
  } = useGet();

  // Hook for getting tag projects
  const {
    data: tagProjectsResponse,
    getData: getTagProjects,
    loading: tagProjectsLoading,
  } = useGet();

  // Hook for getting tag followers
  const {
    data: tagFollowersResponse,
    getData: getTagFollowers,
    loading: tagFollowersLoading,
  } = useGet();

  const [tagData, setTagData] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [followers, setFollowers] = useState<Follower[]>([]);

  // Use usePost for both follow and unfollow operations
  const {
    uploadData: followUnfollowTag,
    submitting: followSubmitting,
    success: followSuccess,
    error: followError,
  } = usePost();

  // Fetch tag details
  useEffect(() => {
    if (tagName) {
      getTagData({
        api: `${API_TAGS}?keywords=${tagName}`,
        params: { page: 1, per_page: 5 },
      });
    }
  }, [tagName]);

  // Process tag data when response is received
  useEffect(() => {
    if (tagResponse && tagResponse.data) {
      // Find the exact tag match
      const exactTag = tagResponse.data.find(
        (tag: Tag) => tag.name.toLowerCase() === tagName?.toLowerCase(),
      );

      if (exactTag) {
        setTagId(exactTag.id);

        // Fetch detailed tag information
        getTagDetails({
          api: `${API_TAGS}/${exactTag.id}`,
        });

        // Fetch tag projects
        getTagProjects({
          api: `${API_TAGS}/${exactTag.id}/projects`,
          params: { page: 1, per_page: 10 },
        });

        // Fetch tag followers
        getTagFollowers({
          api: `${API_TAGS}/${exactTag.id}/following`,
          params: { page: 1, per_page: 10 },
        });
      } else if (tagResponse.data.length > 0) {
        // Use the first result if no exact match
        const firstTag = tagResponse.data[0];
        setTagId(firstTag.id);

        // Fetch detailed tag information
        getTagDetails({
          api: `${API_TAGS}/${firstTag.id}`,
        });

        // Fetch tag projects
        getTagProjects({
          api: `${API_TAGS}/${firstTag.id}/projects`,
          params: { page: 1, per_page: 10 },
        });

        // Fetch tag followers
        getTagFollowers({
          api: `${API_TAGS}/${firstTag.id}/following`,
          params: { page: 1, per_page: 10 },
        });
      }
    }
  }, [tagResponse, tagName]);

  // Process detailed tag response
  useEffect(() => {
    if (tagDetailsResponse && tagDetailsResponse.data) {
      const tagDetails = tagDetailsResponse.data;
      setTagData({
        ...tagDetails,
        // category: tagDetails.category || "Technology",
        color: getTagColor(tagDetails.name),
        relatedTags: ["javascript", "typescript", "web"], // Default related tags
        officialWebsite: `https://${tagDetails.name}.org`,
        documentation: `https://docs.${tagDetails.name}.org`,
        github: `https://github.com/${tagDetails.name}`,
      });

      // Set the following status based on the API response
      setIsFollowing(tagDetails.is_following || false);
    }
  }, [tagDetailsResponse]);

  // Process tag projects response
  useEffect(() => {
    if (tagProjectsResponse && tagProjectsResponse.data) {
      // Check if the response has the expected structure
      if (
        tagProjectsResponse.data.projects &&
        Array.isArray(tagProjectsResponse.data.projects)
      ) {
        setProjects(tagProjectsResponse.data.projects);
      } else if (Array.isArray(tagProjectsResponse.data)) {
        setProjects(tagProjectsResponse.data);
      }
    }
  }, [tagProjectsResponse]);

  // Process tag followers response
  useEffect(() => {
    if (tagFollowersResponse && tagFollowersResponse.data) {
      // Check if the response has the expected structure
      if (
        tagFollowersResponse.data.followers &&
        Array.isArray(tagFollowersResponse.data.followers)
      ) {
        setFollowers(tagFollowersResponse.data.followers);
      } else if (Array.isArray(tagFollowersResponse.data)) {
        setFollowers(tagFollowersResponse.data);
      }
    }
  }, [tagFollowersResponse]);

  // Handle follow success/error
  useEffect(() => {
    if (followSuccess) {
      setError(null);
      // Refresh tag data to update follower count and follow status
      if (tagId) {
        getTagDetails({
          api: `${API_TAGS}/${tagId}`,
        });
      }
    }

    if (followError && hasInteracted) {
      // setError(followError.message || "Failed to update follow status");
      // Revert the follow state on error
      setIsFollowing((prev) => !prev);
    }
  }, [followSuccess, followError, hasInteracted, tagId]);

  // Handle sort change
  const handleSortChange = (value: string | null) => {
    if (value && tagId) {
      setSortBy(value || "trending");
      getTagProjects({
        api: `${API_TAGS}/${tagId}/projects`,
        params: { page: 1, per_page: 10 },
      });
    }
  };

  // Handle follow/unfollow
  const handleFollowToggle = () => {
    if (!tagId) {
      return;
    }

    setHasInteracted(true);
    setError(null);
    // Optimistically update the UI
    setIsFollowing((prev) => !prev);

    followUnfollowTag({
      api: `${API_TAGS}/${tagId}/following`,
      method: isFollowing ? "DELETE" : "POST",
    });
  };

  // Format date to relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    }
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    }
    if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  const breadcrumbItems = [
    { title: "Explore", href: "/explore" },
    { title: "Tags", href: "/explore#tags" },
    { title: tagData?.name || tagName || "Tag", href: "#" },
  ].map((item, index) => (
    <Anchor key={index} component={Link} to={item.href} size="sm">
      {item.title}
    </Anchor>
  ));

  const loading = tagLoading || tagDetailsLoading;

  if (loading) {
    return (
      <Container size="xl" py="lg">
        <Stack gap="xl">
          <Skeleton height={20} width={200} />
          <Stack gap="lg">
            <Group justify="space-between">
              <Group>
                <Skeleton height={50} width={50} circle />
                <div>
                  <Skeleton height={30} width={150} mb="xs" />
                  <Skeleton height={20} width={300} />
                </div>
              </Group>
              <Group>
                <Skeleton height={36} width={100} />
                <Skeleton height={36} width={36} circle />
              </Group>
            </Group>
            <Group>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height={36} width={120} />
              ))}
            </Group>
          </Stack>
          <Skeleton height={400} />
        </Stack>
      </Container>
    );
  }

  if (!tagData) {
    return (
      <Container size="xl" py="lg">
        <Stack gap="xl">
          <Breadcrumbs>
            <Anchor component={Link} to="/explore" size="sm">
              Explore
            </Anchor>
            <Anchor component={Link} to="/explore#tags" size="sm">
              Tags
            </Anchor>
            <Text size="sm">#{tagName}</Text>
          </Breadcrumbs>
          <Center style={{ height: "50vh" }}>
            <Stack align="center">
              <Title order={2}>Tag not found</Title>
              <Text c="dimmed">The tag "{tagName}" could not be found.</Text>
              <Button component={Link} to="/explore#tags" variant="light">
                Browse all tags
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        {/* Error notification */}
        {error && (
          <Notification
            icon={<FiXCircle size={18} />}
            color="red"
            title="Error"
            onClose={() => setError(null)}
          >
            {error}
          </Notification>
        )}

        {/* Breadcrumbs */}
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

        {/* Header Section */}
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Group>
              <ThemeIcon size="xl" variant="light" color={tagData.color}>
                <FiTag size={32} />
              </ThemeIcon>
              <div>
                <Group gap="xs" mb="xs">
                  <Title order={1}>#{tagData.name}</Title>
                  <Badge variant="light" color={tagData.color} size="lg">
                    {tagData.category}
                  </Badge>
                </Group>
                <Text size="lg" c="dimmed" maw={600}>
                  Explore projects and developers working with {tagData.name}
                </Text>
              </div>
            </Group>

            <Group>
              <Tooltip
                label={isFollowing ? "Unfollow this tag" : "Follow this tag"}
              >
                <Button
                  variant={isFollowing ? "filled" : "outline"}
                  leftSection={<FiHeart size={16} />}
                  onClick={handleFollowToggle}
                  loading={followSubmitting}
                  disabled={followSubmitting}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </Tooltip>
              <Tooltip label="Share tag">
                <ActionIcon variant="outline" size="lg">
                  <FiShare2 size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          {/* Tag Statistics */}
          <Group gap="sm">
            <Button
              variant="light"
              leftSection={<FiCode size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              {(tagData.projects_count || 0).toLocaleString()} Projects
            </Button>
            <Button
              variant="light"
              leftSection={<FiUsers size={16} />}
              size="md"
              style={{ minWidth: "auto" }}
            >
              {(tagData.followers_count || 0).toLocaleString()} Followers
            </Button>
            <Button
              variant="light"
              leftSection={<FiGlobe size={16} />}
              rightSection={<FiExternalLink size={14} />}
              component="a"
              href={tagData.officialWebsite}
              target="_blank"
            >
              Official Website
            </Button>
            <Button
              variant="light"
              leftSection={<FiBook size={16} />}
              rightSection={<FiExternalLink size={14} />}
              component="a"
              href={tagData.documentation}
              target="_blank"
            >
              Documentation
            </Button>
            <Button
              variant="light"
              leftSection={<FiGithub size={16} />}
              rightSection={<FiExternalLink size={14} />}
              component="a"
              href={tagData.github}
              target="_blank"
            >
              GitHub
            </Button>
          </Group>
        </Stack>

        <Tabs defaultValue="projects">
          <Tabs.List mb="xl">
            <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
              Projects ({(tagData.projects_count || 0).toLocaleString()})
            </Tabs.Tab>
            <Tabs.Tab value="developers" leftSection={<FiUsers size={16} />}>
              Developers ({(tagData.followers_count || 0).toLocaleString()})
            </Tabs.Tab>
            <Tabs.Tab value="analytics" leftSection={<FiActivity size={16} />}>
              Analytics
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="projects">
            <Grid>
              <Grid.Col span={9}>
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Title order={3}>Projects</Title>
                    <Group>
                      <Select
                        data={[
                          { value: "trending", label: "Trending" },
                          { value: "stars", label: "Most Stars" },
                          { value: "recent", label: "Recently Updated" },
                          { value: "forks", label: "Most Forks" },
                        ]}
                        value={sortBy}
                        onChange={handleSortChange}
                        leftSection={<FiFilter size={16} />}
                      />
                    </Group>
                  </Group>

                  {tagProjectsLoading ? (
                    <Stack gap="md">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} p="lg" withBorder radius="lg">
                          <Grid>
                            <Grid.Col span={8}>
                              <Group mb="sm">
                                <Skeleton height={40} width={40} circle />
                                <div style={{ flex: 1 }}>
                                  <Skeleton height={20} width={200} mb={4} />
                                  <Skeleton height={16} width={150} mb="xs" />
                                  <Skeleton height={16} width={300} mb="sm" />
                                  <Group gap="lg">
                                    <Skeleton height={16} width={100} />
                                    <Skeleton height={16} width={80} />
                                    <Skeleton height={16} width={120} />
                                  </Group>
                                </div>
                              </Group>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Group justify="flex-end" align="flex-start">
                                <Skeleton height={24} width={80} />
                                <Skeleton height={24} width={24} circle />
                                <Skeleton height={24} width={24} circle />
                              </Group>
                            </Grid.Col>
                          </Grid>
                        </Card>
                      ))}
                    </Stack>
                  ) : projects.length > 0 ? (
                    <Stack gap="md">
                      {projects.map((project, index) => (
                        <Card key={project.id} p="lg" withBorder radius="lg">
                          <Grid>
                            <Grid.Col span={8}>
                              <Group mb="sm">
                                <Avatar
                                  size="md"
                                  radius="sm"
                                  color="blue"
                                  variant="gradient"
                                  gradient={{ from: "blue", to: "cyan" }}
                                >
                                  <FiCode size={14} />
                                </Avatar>
                                <div style={{ flex: 1 }}>
                                  <Group gap="xs" mb={4}>
                                    <Anchor
                                      component={Link}
                                      to={`/projects/${project.id}`}
                                      size="lg"
                                      fw={600}
                                      style={{ textDecoration: "none" }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.textDecoration =
                                          "underline";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.textDecoration =
                                          "none";
                                      }}
                                    >
                                      {project.name || "Unnamed Project"}
                                    </Anchor>
                                    <Badge size="sm" variant="light">
                                      #{index + 1}
                                    </Badge>
                                  </Group>
                                  <Text size="sm" c="dimmed" mb="xs">
                                    {project.organisation || "Personal Project"}
                                  </Text>
                                  <Text size="sm" c="dimmed" mb="sm">
                                    {project.description ||
                                      "No description available"}
                                  </Text>
                                  <Group gap="lg">
                                    <Group gap={4}>
                                      <FiCode size={14} color="#6c757d" />
                                      <Text size="sm" c="dimmed">
                                        {project.apps_count || 0} Apps
                                      </Text>
                                    </Group>
                                    <Group gap={4}>
                                      <FiUsers size={14} color="#6c757d" />
                                      <Text size="sm" c="dimmed">
                                        {project.members_count || 0} Members
                                      </Text>
                                    </Group>
                                    <Group gap={4}>
                                      <FiHeart size={14} color="#6c757d" />
                                      <Text size="sm" c="dimmed">
                                        {project.followers_count || 0} Followers
                                      </Text>
                                    </Group>
                                    <Text size="sm" c="dimmed">
                                      Created{" "}
                                      {formatRelativeTime(project.date_created)}
                                    </Text>
                                  </Group>
                                </div>
                              </Group>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Group justify="flex-end" align="flex-start">
                                <Badge variant="light">
                                  {project.project_type || "Unknown"}
                                </Badge>
                                <ActionIcon variant="subtle">
                                  <FiHeart size={16} />
                                </ActionIcon>
                                <ActionIcon variant="subtle">
                                  <FiBookmark size={16} />
                                </ActionIcon>
                              </Group>
                            </Grid.Col>
                          </Grid>

                          {/* Project Tags */}
                          {project.tags && project.tags.length > 0 && (
                            <Group gap="xs" mt="md">
                              {project.tags.slice(0, 5).map((tag) => (
                                <Badge
                                  key={tag.id}
                                  variant="light"
                                  color={getTagColor(tag.name)}
                                  component={Link}
                                  to={`/tags/${tag.name}`}
                                  style={{ cursor: "pointer" }}
                                >
                                  #{tag.name}
                                </Badge>
                              ))}
                              {project.tags.length > 5 && (
                                <Badge variant="outline">
                                  +{project.tags.length - 5} more
                                </Badge>
                              )}
                            </Group>
                          )}
                        </Card>
                      ))}
                    </Stack>
                  ) : (
                    <Center style={{ height: 200 }}>
                      <Text c="dimmed">No projects found for this tag.</Text>
                    </Center>
                  )}
                </Stack>
              </Grid.Col>

              <Grid.Col span={3}>
                <Stack gap="lg">
                  {/* Related Tags */}
                  <Card p="md" withBorder radius="lg">
                    <Title order={4} mb="md">
                      Related Tags
                    </Title>
                    <Stack gap="xs">
                      {tagData.relatedTags.map((tag: string) => (
                        <Group key={tag} justify="space-between">
                          <Badge
                            variant="light"
                            component={Link}
                            to={`/tags/${tag}`}
                            style={{ cursor: "pointer" }}
                          >
                            #{tag}
                          </Badge>
                          <Text size="xs" c="dimmed">
                            {Math.floor(Math.random() * 500) + 100}
                          </Text>
                        </Group>
                      ))}
                    </Stack>
                  </Card>

                  {/* Weekly Activity */}
                  <Card p="md" withBorder radius="lg">
                    <Title order={4} mb="md">
                      Statistics
                    </Title>
                    <Stack gap="sm">
                      <Group justify="space-between">
                        <Text size="sm">Total Projects</Text>
                        <Badge variant="light" color="blue">
                          {tagData.projects_count || 0}
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">Total Followers</Text>
                        <Badge variant="light" color="green">
                          {tagData.followers_count || 0}
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">Super Tag</Text>
                        <Badge
                          variant="light"
                          color={tagData.is_super_tag ? "green" : "gray"}
                        >
                          {tagData.is_super_tag ? "Yes" : "No"}
                        </Badge>
                      </Group>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="developers">
            <Stack gap="lg">
              <Title order={3}>Developers Following This Tag</Title>
              {tagFollowersLoading ? (
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} p="lg" withBorder radius="lg">
                      <Group mb="md">
                        <Skeleton height={50} width={50} circle />
                        <div style={{ flex: 1 }}>
                          <Skeleton height={20} width={150} mb={4} />
                          <Skeleton height={16} width={100} />
                        </div>
                        <Skeleton height={30} width={80} />
                      </Group>
                      <Skeleton height={16} width="100%" mb="md" />
                      <Group justify="space-between">
                        <Skeleton height={16} width={100} />
                        <Skeleton height={16} width={80} />
                      </Group>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : followers.length > 0 ? (
                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                  {followers.map((developer) => (
                    <Card key={developer.id} p="lg" withBorder radius="lg">
                      <Group mb="md">
                        <Avatar
                          src={developer.profile_picture || undefined}
                          size="lg"
                          radius="xl"
                        />
                        <div style={{ flex: 1 }}>
                          <Anchor
                            component={Link}
                            to={`/users/${developer.username}`}
                            size="lg"
                            fw={600}
                            style={{ textDecoration: "none" }}
                          >
                            {developer.name}
                          </Anchor>
                          <Text size="sm" c="dimmed">
                            @{developer.username}
                          </Text>
                        </div>
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </Group>
                      {developer.biography && (
                        <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                          {developer.biography}
                        </Text>
                      )}
                      <Group justify="space-between">
                        <Group gap="lg">
                          <Text size="sm" c="dimmed">
                            {developer.followers_count} followers
                          </Text>
                          <Text size="sm" c="dimmed">
                            {developer.owned_projects_count} projects
                          </Text>
                        </Group>
                      </Group>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Center style={{ height: 200 }}>
                  <Text c="dimmed">
                    No developers are following this tag yet.
                  </Text>
                </Center>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="analytics">
            <Grid>
              <Grid.Col span={8}>
                <Stack gap="lg">
                  <Title order={3}>Growth Analytics</Title>
                  <Card p="lg" withBorder radius="lg">
                    <Stack gap="md">
                      <Title order={4}>Project Growth Over Time</Title>
                      <Box h={300} bg="gray.0" style={{ borderRadius: 8 }}>
                        <Center h="100%">
                          <Text c="dimmed">
                            Chart placeholder - Project growth visualization
                          </Text>
                        </Center>
                      </Box>
                    </Stack>
                  </Card>

                  <Card p="lg" withBorder radius="lg">
                    <Stack gap="md">
                      <Title order={4}>Language Distribution</Title>
                      <Box h={200} bg="gray.0" style={{ borderRadius: 8 }}>
                        <Center h="100%">
                          <Text c="dimmed">
                            Chart placeholder - Language distribution
                          </Text>
                        </Center>
                      </Box>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={4}>
                <Card p="md" withBorder radius="lg">
                  <Title order={4} mb="md">
                    Key Metrics
                  </Title>
                  <Stack gap="md">
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Weekly Activity</Text>
                        <Text size="sm" fw={600}>
                          High
                        </Text>
                      </Group>
                      <Progress value={85} color="green" size="sm" />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Community Health</Text>
                        <Text size="sm" fw={600}>
                          Excellent
                        </Text>
                      </Group>
                      <Progress value={95} color="blue" size="sm" />
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm">Growth Rate</Text>
                        <Text size="sm" fw={600}>
                          +15%
                        </Text>
                      </Group>
                      <Progress value={45} color={tagData.color} size="sm" />
                    </div>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default TagDetailsPage;
