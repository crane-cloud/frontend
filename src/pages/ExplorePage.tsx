import { useState, useEffect } from "react";
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
import ProjectExploreCard from "@/components/Cards/ProjectExploreCard";

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
      api: `${API_SOCIALS}?entity=users&per_page=12&page=1`,
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
                    projects={socialsResponse?.data?.projects?.map(
                      (project) => ({
                        id: project.id,
                        name: project.name,
                        author: project.owner_id,
                        apps: project.apps_count,
                        tags: project.tags || [],
                        description: project.description,
                      }),
                    )}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <SuggestedUsers
                  users={socialsResponse?.data?.users?.map((user) => ({
                    id: user.id,
                    name: user.name,
                    avatar: user.profile_picture,
                    username: user.username,
                    followerCount: user.followers_count,
                    ownedProjects: user.owned_projects_count,
                    bio: user.biography,
                  }))}
                  title="Top Developers"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                <Stack gap="lg">
                  <Card p="md" withBorder radius="lg">
                    <Group mb="sm">
                      <FiTag size={18} />
                      <Title order={4} size="md">
                        Popular Tags
                      </Title>
                    </Group>
                    <Stack gap="xs">
                      {socialsResponse?.data?.tags?.map((tag) => (
                        <Group key={tag.id} justify="space-between">
                          <Group gap="xs">
                            <Badge
                              variant="light"
                              color={tag.color}
                              component={Link}
                              to={`/tags/${tag.id}`}
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                            >
                              {tag.name}
                            </Badge>
                            <Text size="sm" c="dimmed">
                              {formatPlural(tag.projects_count, "project")}
                            </Text>
                          </Group>
                        </Group>
                      ))}
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="projects">
            <Grid>
              <Grid.Col span={12}>
                <Flex wrap="wrap" gap="lg" justify="flex-start">
                  {projectsResponse?.data?.projects?.map((project) => (
                    <ProjectExploreCard project={project} />
                  ))}
                </Flex>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="developers">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {developersResponse?.data?.users?.map((user, index) => (
                <Card
                  key={`${user.username}-${index}`}
                  p="lg"
                  withBorder
                  radius="lg"
                  style={{ height: "auto" }}
                >
                  <Group mb="md">
                    <Avatar src={user.profile_picture} size="lg" />
                    <div style={{ flex: 1 }}>
                      <Anchor
                        component={Link}
                        to={user.link}
                        size="lg"
                        fw={600}
                        style={{ textDecoration: "none" }}
                      >
                        {beautify(user.name)}
                      </Anchor>
                      <Text size="sm" c="dimmed">
                        @{user.username}
                      </Text>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </Group>
                  <Text size="sm" c="dimmed" mb="md">
                    {user.biography}
                  </Text>
                  <Group gap="lg">
                    <Text size="sm" c="dimmed">
                      {formatPlural(user.followers_count, "follower")}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {formatPlural(user.owned_projects_count, "project")}
                    </Text>
                  </Group>
                </Card>
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
                  {tagsResponse?.data?.tags?.map((tag, index) => (
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
                    >
                      <ThemeIcon
                        size="xl"
                        variant="light"
                        color={getTagColor(index)}
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
                        <Button variant="outline" size="xs" mt="xs">
                          Follow
                        </Button>
                      </Stack>
                    </Card>
                  ))}
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
