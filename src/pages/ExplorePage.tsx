import { useState, useEffect, Fragment } from "react";
import {
  Container,
  Title,
  Text,
  Stack,
  Grid,
  Card,
  Button,
  Tabs,
  TextInput,
  Select,
  SimpleGrid,
  ThemeIcon,
  Center,
  Box,
  Loader,
} from "@mantine/core";
import {
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiCode,
  FiTag,
  FiFilter,
  FiGlobe,
  FiCheck,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  getTagColor,
  useSetContainerSize,
  useSetNoSidebar,
  beautify,
} from "@/utils/helpers";
import TrendingProjects from "@/components/Trending/TrendingProjects";
import SuggestedUsers from "@/components/Trending/SuggestedUsers";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import usePost from "@/utils/usePost";
import ProjectExploreCard from "@/components/Cards/ProjectExploreCard";
import TrendingTags from "@/components/Trending/TrendingTags";
import { User } from "@/types/user";
import UserCard from "@/components/Cards/UserCard";
import { TbFolderOff } from "react-icons/tb";
import { useDebouncedValue } from "@mantine/hooks";

const ExplorePage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const [debouncedSearch] = useDebouncedValue(searchQuery, 400);

  const {
    data: searchResponse,
    getData: searchSocials,
    loading: searching,
  } = useGet();
  const { data: projectsResponse, getData: getProjects } = useGet();
  const { data: developersResponse, getData: getDevelopers } = useGet();
  const { data: tagsResponse, getData: getTags } = useGet();

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else if (sortBy) {
      params.set("filter", sortBy);
    }

    if (selectedCategory !== "all") {
      params.set("entity", selectedCategory);
    }

    searchSocials({ api: `${API_SOCIALS}?${params.toString()}` });
  }, [debouncedSearch, selectedCategory, sortBy]);

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
    { value: "all", label: "All", icon: FiGlobe },
    { value: "projects", label: "Projects", icon: FiCode },
    { value: "users", label: "Users", icon: FiUsers },
    { value: "tags", label: "Tags", icon: FiTag },
  ];

  type TagType = {
    id: string;
    is_following: boolean;
    [key: string]: any;
  };
  const [tagStates, setTagStates] = useState<{
    [id: string]: { is_following: boolean; loading: boolean };
  }>({});

  useEffect(() => {
    if (tagsResponse?.data?.tags) {
      const initial: {
        [id: string]: { is_following: boolean; loading: boolean };
      } = {};
      tagsResponse.data.tags.forEach((tag: TagType) => {
        initial[tag.id] = {
          is_following: tag.is_following ?? false,
          loading: false,
        };
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
      Promise.all([followTag({ api: `/tags/${tag.id}/following` }), wait])
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

        <Tabs
          defaultValue="all"
          onChange={(value) => {
            setSelectedCategory(value as "all" | "projects" | "users" | "tags");
            setSearchQuery("");
          }}
        >
          <Tabs.List mb="xl">
            <Tabs.Tab value="all" leftSection={<FiGlobe size={16} />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="projects" leftSection={<FiCode size={16} />}>
              Projects
            </Tabs.Tab>
            <Tabs.Tab value="users" leftSection={<FiUsers size={16} />}>
              Users
            </Tabs.Tab>
            <Tabs.Tab value="tags" leftSection={<FiTag size={16} />}>
              Tags
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            {searchQuery !== "" ? (
              <Stack>
                {searching ? (
                  <Center w="100%" h="300px">
                    <Loader size="xl" type="oval" />
                  </Center>
                ) : (
                  <>
                    {searchResponse?.data?.projects?.length > 0 && (
                      <Box>
                        <Title order={3} mb="md">
                          Projects
                        </Title>
                        <SimpleGrid
                          cols={{ base: 1, sm: 2, md: 3 }}
                          spacing="md"
                        >
                          {searchResponse.data.projects.map((project: any) => (
                            <ProjectExploreCard
                              key={project.id}
                              project={project}
                            />
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}

                    {searchResponse?.data?.users?.length > 0 && (
                      <Box>
                        <Title order={3} mb="md">
                          Developers
                        </Title>
                        <SimpleGrid
                          cols={{ base: 1, sm: 2, md: 3 }}
                          spacing="md"
                        >
                          {searchResponse.data.users.map((user: any) => (
                            <UserCard
                              key={user.username}
                              user={user}
                              isCard
                              showBorder
                            />
                          ))}
                        </SimpleGrid>
                      </Box>
                    )}

                    {searchResponse?.data?.tags?.length > 0 && (
                      <Box>
                        <Title order={3} mb="md">
                          Tags
                        </Title>
                        <SimpleGrid
                          cols={{ base: 2, sm: 3, md: 4, lg: 6 }}
                          spacing="md"
                        >
                          {searchResponse.data.tags.map((tag: any) => {
                            const tagState = tagStates[tag.id] || {
                              is_following: tag.is_following,
                              loading: false,
                            };
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
                                  if (
                                    (e.target as HTMLElement).closest("button")
                                  ) {
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
                                <Stack
                                  gap="xs"
                                  align="center"
                                  style={{ flex: 1 }}
                                >
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
                                    leftSection={
                                      tagState.is_following ? (
                                        <FiCheck size={14} />
                                      ) : (
                                        <FiUserPlus size={14} />
                                      )
                                    }
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
                      </Box>
                    )}

                    {!searchResponse?.data?.projects?.length &&
                      !searchResponse?.data?.users?.length &&
                      !searchResponse?.data?.tags?.length && (
                        <Center w="100%" h="200px">
                          <EmptyState message="No results found" />
                        </Center>
                      )}
                  </>
                )}
              </Stack>
            ) : (
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
                  <SuggestedUsers title="Top Developers" perPage={5} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                  <Stack gap="lg">
                    <TrendingTags title="Popular Tags" perPage={10} />
                  </Stack>
                </Grid.Col>
              </Grid>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="projects">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {searching ? (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Center w="100%" h="300px">
                    <Loader size="xl" type="oval" />
                  </Center>
                </div>
              ) : selectedCategory === "projects" ? (
                searchQuery !== "" ? (
                  searchResponse?.data?.projects?.length > 0 ? (
                    searchResponse.data.projects.map((project: any) => (
                      <ProjectExploreCard key={project.id} project={project} />
                    ))
                  ) : (
                    <EmptyState message="No projects found" />
                  )
                ) : (
                  projectsResponse?.data?.projects?.map((project: any) => (
                    <ProjectExploreCard key={project.id} project={project} />
                  ))
                )
              ) : null}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="users">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {searching ? (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Center w="100%" h="300px">
                    <Loader size="xl" type="oval" />
                  </Center>
                </div>
              ) : selectedCategory === "users" ? (
                searchQuery !== "" ? (
                  searchResponse?.data?.users?.length > 0 ? (
                    searchResponse.data.users.map((user: any) => (
                      <Fragment key={user.username}>
                        <UserCard user={user} isCard showBorder />
                      </Fragment>
                    ))
                  ) : (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <EmptyState message="No users found" />
                    </div>
                  )
                ) : (
                  developersResponse?.data?.users?.map((user: User) => (
                    <Fragment key={user.username}>
                      <UserCard user={user} isCard showBorder />
                    </Fragment>
                  ))
                )
              ) : null}
            </SimpleGrid>
          </Tabs.Panel>

          <Tabs.Panel value="tags">
            <Grid>
              <Grid.Col span={12}>
                <SimpleGrid
                  cols={{ base: 1, sm: 2, md: 4, lg: 7 }}
                  spacing="md"
                >
                  {searching ? (
                    <Box style={{ gridColumn: "1 / -1" }}>
                      <Center w="100%" h="300px">
                        <Loader size="xl" type="oval" />
                      </Center>
                    </Box>
                  ) : selectedCategory === "tags" ? (
                    searchQuery !== "" ? (
                      searchResponse?.data?.tags?.length > 0 ? (
                        searchResponse.data.tags.map((tag: any) => {
                          const tagState = tagStates[tag.id] || {
                            is_following: tag.is_following,
                            loading: false,
                          };
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
                                if (
                                  (e.target as HTMLElement).closest("button")
                                ) {
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
                              <Stack
                                gap="xs"
                                align="center"
                                style={{ flex: 1 }}
                              >
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
                                  leftSection={
                                    tagState.is_following ? (
                                      <FiCheck size={14} />
                                    ) : (
                                      <FiUserPlus size={14} />
                                    )
                                  }
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
                        })
                      ) : (
                        <Box style={{ gridColumn: "1 / -1" }}>
                          <EmptyState message="No tags found" />
                        </Box>
                      )
                    ) : (
                      tagsResponse?.data?.tags?.map((tag: TagType) => {
                        const tagState = tagStates[tag.id] || {
                          is_following: tag.is_following,
                          loading: false,
                        };
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
                              if ((e.target as HTMLElement).closest("button")) {
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
                                leftSection={
                                  tagState.is_following ? (
                                    <FiCheck size={14} />
                                  ) : (
                                    <FiUserPlus size={14} />
                                  )
                                }
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
                      })
                    )
                  ) : null}
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

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = "No data found" }: EmptyStateProps) => {
  return (
    <Center w="100%" h="200px">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#868e96",
        }}
      >
        <TbFolderOff size={48} />
        <Text size="sm" mt="sm" c="dimmed">
          {message}
        </Text>
      </Box>
    </Center>
  );
};
