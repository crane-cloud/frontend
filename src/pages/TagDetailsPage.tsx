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
  ActionIcon,
  Tooltip,
  Center,
  Skeleton,
  Notification,
  Loader,
} from "@mantine/core";
import {
  FiUsers,
  FiCode,
  FiTag,
  FiShare2,
  FiXCircle,
  FiCheck,
  FiUserPlus,
  FiCalendar,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import {
  getTagColor,
  useSetContainerSize,
  useSetNoSidebar,
  formatPlural,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import { API_TAGS } from "@/utils/apis";
import { Tag } from "@/types/tag";
import ProjectExploreCard from "@/components/Cards/ProjectExploreCard";
import UserCard from "@/components/Cards/UserCard";
import { User } from "@/types/user";

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
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());

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
                  variant="outline"
                  leftSection={
                  isFollowing? <FiCheck size={16}/> : <FiUserPlus size={16} />}
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
            <Group gap={4}>
              <FiCode size={16} />
              <Text size="sm">
                {formatPlural(tagData.projects_count || 0, "Project", "Projects")}
             </Text>
            </Group>

            <Group gap={4}>
              <FiUsers size={16} />
              <Text size="sm">
                {formatPlural(tagData.followers_count || 0, "Follower", "Followers")}
              </Text>
            </Group>

            <Group gap={4}>
              <FiCalendar size={16} />
              <Text size="sm">
                 Created on {new Date(tagData.date_created).toLocaleDateString()}
              </Text>
            </Group>
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
          </Tabs.List>

         <Tabs.Panel value="projects">
            {tagProjectsLoading ? (
              <Center w="100%" h="300px">
                <Loader size="xl" type="oval" />
              </Center>
            ) : projects.length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 3, md: 4 }} spacing="md">
                {projects.map((project) => (
                  <ProjectExploreCard key={project.id} project={project} />
                ))}
              </SimpleGrid>
            ) : (
              <Center style={{ height: 200 }}>
                <Text c="dimmed">No projects found for this tag.</Text>
              </Center>
            )}
          </Tabs.Panel>

         <Tabs.Panel value="developers">
            <Stack gap="lg">
              {tagFollowersLoading ? (
                <Center w="100%" h="300px">
                  <Loader size="xl" type="oval" />
                </Center>
              ) : followers.length > 0 ? (
                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                  {followers.map((developer) => (
                    <Fragment key={developer.username}>
                      <UserCard user={developer as User} isCard showBorder />
                    </Fragment>
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
        </Tabs>
      </Stack>
    </Container>
  );
};

export default TagDetailsPage;
