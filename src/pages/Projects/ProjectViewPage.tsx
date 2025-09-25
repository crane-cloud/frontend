import UserCard from "@/components/Cards/UserCard";
import { Tag } from "@/types/tag";
import { User } from "@/types/user";
import { API_PROJECTS } from "@/utils/apis";
import {
  beautify,
  getTagColor,
  timeAgo,
  useSetContainerSize,
  useSetNoSidebar,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiLayers,
  FiShare2,
  FiTag,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../ExplorePage";
import usePost from "@/utils/usePost";

const ProjectViewPage = () => {
  useSetNoSidebar();
  useSetContainerSize("full");

  const { project_id } = useParams<{ project_id: string }>();
  const [isFollowingProject, setIsFollowingProject] = useState<
    boolean | undefined
  >(undefined);

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

  useEffect(() => {
    getProjectDetails({
      api: `${API_PROJECTS}/${project_id}`,
      params: { public_view: "True" },
    });
  }, []);

  useEffect(() => {
    getProjectFollowers({
      api: `${API_PROJECTS}/${project_id}/following`,
    });
  }, []);

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
    }
  }, [follow_success, follow_response]);

  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingProject(false);
    }
  }, [unfollow_success, unfollow_response]);

  if (gettingProjectDetails || gettingFollowers) {
    return (
      <Container size="xl" py="lg">
        <Center w="100%" h="300px">
          <Loader size="xl" type="oval" />
        </Center>
      </Container>
    );
  }

  const breadcrumbItems = [
    { title: "Explore", href: "/explore" },
    { title: "Projects", href: "/explore#projects" },
    { title: projectDetails?.name || "Project", href: "#" },
  ].map((item, index) => (
    <Anchor key={index} component={Link} to={item.href} size="sm">
      {item.title}
    </Anchor>
  ));

  // Handle follow/unfollow click
  const onFollowClick = () => {
    if (isFollowingProject) {
      unfollowProject({
        api: `${API_PROJECTS}/${project_id}/following`,
        method: "DELETE",
      });
    } else {
      followProject({
        api: `${API_PROJECTS}/${project_id}/following`,
      });
    }
  };

  return (
    <>
      <Container size="xl" py="lg">
        <Stack gap="xl">
          <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Group>
                <div>
                  <Group gap="xs" mb="xs">
                    <Title order={1}>{projectDetails?.name}</Title>
                    <Badge variant="light" size="lg" tt="capitalize">
                      {projectDetails?.project_type}
                    </Badge>
                  </Group>
                  <Text size="lg" c="dimmed" maw={600}>
                    {projectDetails?.description}
                  </Text>
                </div>
              </Group>

              <Group>
                <Button
                  variant="outline"
                  leftSection={
                    isFollowLoading ? (
                      <Loader size="xs" />
                    ) : isFollowingProject ? (
                      <FiCheck size={14} />
                    ) : (
                      <FiUserPlus size={14} />
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
                <Tooltip label="Share tag">
                  <ActionIcon variant="outline" size="lg">
                    <FiShare2 size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>

            <Group gap="xl">
              <Group gap={6}>
                <LuUsers size={16} />
                <Text size="md" fw={500}>
                  {projectDetails.followers_count || 0}
                </Text>
                <Text size="md" c="dimmed">
                  Followers
                </Text>
              </Group>
              <Group gap={6}>
                <FiLayers size={16} />
                <Text size="md" fw={500}>
                  {projectDetails?.apps_count || 0}
                </Text>
                <Text size="md" c="dimmed">
                  Apps
                </Text>
              </Group>
              <Group gap={6}>
                <FiTag size={16} />
                <Text size="md" fw={500}>
                  {projectDetails.tags_count || 0}
                </Text>
                <Text size="md" c="dimmed">
                  Tags
                </Text>
              </Group>
              <Group gap={6}>
                <FiCalendar size={16} />
                <Text size="md" c="dimmed" fw={500}>
                  {timeAgo(projectDetails?.date_created)}
                </Text>
              </Group>
            </Group>
          </Stack>

          <Tabs defaultValue="users">
            <Tabs.List mb="xl">
              <Tabs.Tab value="users" leftSection={<FiUsers size={16} />}>
                Followers
              </Tabs.Tab>
              <Tabs.Tab value="tags" leftSection={<FiTag size={16} />}>
                Tags
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="users">
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {projectFollowers.length > 0 ? (
                  projectFollowers?.map((user: User) => (
                    <Fragment key={user.username}>
                      <UserCard user={user} isCard showBorder />
                    </Fragment>
                  ))
                ) : (
                  <Box style={{ gridColumn: "1 / -1" }}>
                    <EmptyState message="No followers found for this project" />
                  </Box>
                )}
              </SimpleGrid>
            </Tabs.Panel>

            <Tabs.Panel value="tags">
              <Grid>
                <Grid.Col span={12}>
                  <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 4, lg: 7 }}
                    spacing="md"
                  >
                    {projectDetails?.tags?.length > 0 ? (
                      projectDetails?.tags?.map((tag: Tag) => {
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
                            </Stack>
                          </Card>
                        );
                      })
                    ) : (
                      <Box style={{ gridColumn: "1 / -1" }}>
                        <EmptyState message="No tags found for this project" />
                      </Box>
                    )}
                  </SimpleGrid>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </>
  );
};

export default ProjectViewPage;
