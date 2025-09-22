import { useState, useEffect, Fragment } from "react";
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
  Tabs,
  TextInput,
  Select,
  Avatar,
  Anchor,
  Divider,
  SimpleGrid,
  ThemeIcon,
  Flex,
  Loader,
} from "@mantine/core";
import {
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiCode,
  FiTag,
  FiFilter,
  FiGitBranch,
  FiLayers,
  FiGlobe,
  FiZap,
  FiCheck,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  getTagColor,
  useSetContainerSize,
  useSetNoSidebar,
  formatPlural,
  beautify,
} from "@/utils/helpers";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import usePost from "@/utils/usePost";
import { showNotification } from "@mantine/notifications";
import ProjectExploreCard from "@/components/Cards/ProjectExploreCard";
import TrendingTags from "@/components/Trending/TrendingTags";
import { User } from "@/types/user";
import UserCard from "@/components/Cards/UserCard";

const ExplorePage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const { data: socialsResponse, getData: getSocials } = useGet();
  const { data: projectsResponse, getData: getProjects } = useGet();
  const { data: developersResponse, getData: getDevelopers } = useGet();
  const { data: tagsResponse, getData: getTags } = useGet();

  useEffect(() => {
    getSocials({
      api: `${API_SOCIALS}?filter=trending`,
    });
  }, []);

  useEffect(() => {
    getProjects({
      api: `${API_SOCIALS}?entity=projects&per_page=12&page=1`,
    });
  }, []);

  useEffect(() => {
    getDevelopers({
      api: `${API_SOCIALS}?entity=users&per_page=21&page=1`,
    });
  }, []);

  useEffect(() => {
    getTags({
      api: `${API_SOCIALS}?entity=tags&per_page=14&page=1`,
    });
  }, []);

  const categories = [
    { value: "all", label: "All Categories", icon: FiGlobe },
    { value: "web", label: "Web Development", icon: FiCode },
    { value: "mobile", label: "Mobile Apps", icon: FiLayers },
    { value: "ai", label: "AI & Machine Learning", icon: FiZap },
    { value: "devops", label: "DevOps & Infrastructure", icon: FiGitBranch },
    { value: "data", label: "Data Science", icon: FiTrendingUp },
  ];


  type TagType = {
    id: string;
    is_following: boolean;
    [key: string]: any;
  };
  const [tagStates, setTagStates] = useState<{ [id: string]: { is_following: boolean; loading: boolean } }>({});

  useEffect(() => {
    if (tagsResponse?.data?.tags) {
      const initial: { [id: string]: { is_following: boolean; loading: boolean } } = {};
      tagsResponse.data.tags.forEach((tag: TagType) => {
        initial[tag.id] = { is_following: tag.is_following ?? false, loading: false };
      });
      setTagStates(initial);
    }
  }, [tagsResponse]);

  const { uploadData: followTag } = usePost();
  const { uploadData: unfollowTag } = usePost();

  const handleTagFollow = (tag: TagType) => {
    setTagStates((prev) => ({
      ...prev,
      [tag.id]: {
        ...prev[tag.id],
        is_following: !prev[tag.id].is_following,
        loading: true,
      },
    }));
    const wasFollowing = tagStates[tag.id]?.is_following;
    const wait = new Promise((resolve) => setTimeout(resolve, 2000));
    if (wasFollowing) {
      Promise.all([
        unfollowTag({ api: `/tags/${tag.id}/following`, method: "DELETE" }),
        wait,
      ])
        .then(() => {
          setTagStates((prev) => ({
            ...prev,
            [tag.id]: { ...prev[tag.id], is_following: false, loading: false },
          }));
        })
        .catch(() => {
          setTagStates((prev) => ({
            ...prev,
            [tag.id]: { ...prev[tag.id], is_following: true, loading: false },
          }));
        });
    } else {
      Promise.all([
        followTag({ api: `/tags/${tag.id}/following` }),
        wait,
      ])
        .then(() => {
          setTagStates((prev) => ({
            ...prev,
            [tag.id]: { ...prev[tag.id], is_following: true, loading: false },
          }));
        })
        .catch(() => {
          setTagStates((prev) => ({
            ...prev,
            [tag.id]: { ...prev[tag.id], is_following: false, loading: false },
          }));
        });
    }
  };

  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        {/* Header Section */}
        <Stack gap="lg">
          <Stack gap="xs">
            <Title order={1}>Explore Crane Cloud</Title>
            <Text size="lg" c="dimmed">
              Discover trending projects, talented developers, and popular
              technologies in the community
            </Text>
          </Stack>
          {/* Search and Filters */}
          <Card p="lg" radius="lg" withBorder>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Search projects, users, or tags..."
                  leftSection={<FiSearch size={16} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  size="md"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  placeholder="Category"
                  data={categories.map((cat) => ({
                    value: cat.value,
                    label: cat.label,
                  }))}
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value || "all")}
                  leftSection={<FiFilter size={16} />}
                  size="md"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  placeholder="Sort by"
                  data={[
                    { value: "trending", label: "Trending" },
                    { value: "stars", label: "Most Stars" },
                    { value: "recent", label: "Recently Updated" },
                    { value: "newest", label: "Newest" },
                  ]}
                  value={sortBy}
                  onChange={(value) => setSortBy(value || "trending")}
                  leftSection={<FiTrendingUp size={16} />}
                  size="md"
                />
              </Grid.Col>
            </Grid>
          </Card>
        </Stack>

        <Tabs defaultValue="overview">
          <Tabs.List mb="xl">
            <Tabs.Tab value="overview" leftSection={<FiGlobe size={16} />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
              Projects
            </Tabs.Tab>
            <Tabs.Tab value="developers" leftSection={<FiUsers size={16} />}>
              Developers
            </Tabs.Tab>
            <Tabs.Tab value="tags" leftSection={<FiTag size={16} />}>
              Tags
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview">
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Stack gap="lg">
                  <TrendingProjects
                    compact
                    title="Trending Projects"
                    perPage={4}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <SuggestedUsers
                  title="Top Developers"
                  perPage={5}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                <Stack gap="lg">
                  <TrendingTags title="Popular Tags" perPage={10} />
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="projects">
            <Grid>
              <Grid.Col span={12}>
                <Flex wrap="wrap" gap="lg" justify="flex-start">
                  {projectsResponse?.data?.projects?.map((project: any) => (
                    <ProjectExploreCard project={project} />
                  ))}
                </Flex>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="developers">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {developersResponse?.data?.users?.map((user: User) => (
             <Fragment key={user.username}>
               <UserCard user={user} isCard showBorder={true} />
             </Fragment>
             ))}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="tags">
            <Grid>
              <Grid.Col span={12}>
                <SimpleGrid
                  cols={{ base: 1, sm: 2, md: 4, lg: 7 }}
                  spacing="md"
                >
                  {tagsResponse?.data?.tags?.map((tag: TagType) => {
                    const tagState = tagStates[tag.id] || { is_following: tag.is_following, loading: false };
                    return (
                      <Card
                        key={tag.id}
                        p="lg"
                        withBorder
                        radius="lg"
                        ta="center"
                        component={Link}
                        to={`/tags/${tag.name}`}
                        style={{
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "inherit",
                          transition: "all 0.2s ease",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        className="hover:shadow-md"
                        onClick={(e) => {
                          if ((e.target as HTMLElement).closest('button')) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <ThemeIcon
                          size="xl"
                          variant="light"
                          color={getTagColor(tag.name)}
                          mx="auto"
                          mb="md"
                        >
                          <FiTag size={24} />
                        </ThemeIcon>
                        <Stack gap="xs" align="center" style={{ flex: 1 }}>
                          <Title order={4} size="sm">
                            {beautify(tag.name)}
                          </Title>
                          <Text size="sm" c="dimmed" mb="xs">
                            {tag.projects_count} projects
                          </Text>
                          <Button
                            variant="outline"
                            color="blue"
                            size="xs"
                            mt="xs"
                            loading={tagState.loading}
                            disabled={tagState.loading}
                            onClick={(e) => {
                              e.preventDefault();
                              handleTagFollow(tag);
                            }}
                            leftSection={tagState.is_following ? <FiCheck size={14} /> : <FiUserPlus size={14} />}
                          >
                            {tagState.loading
                              ? tagState.is_following
                                ? "Following..."
                                : "Unfollowing..."
                              : tagState.is_following
                                ? "Following"
                                : "Follow"}
                          </Button>
                        </Stack>
                      </Card>
                    );
                  })}
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default ExplorePage;
