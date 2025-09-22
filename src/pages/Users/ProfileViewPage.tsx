import {
  Button,
  Card,
  Flex,
  Stack,
  Text,
  Grid,
  Group,
  ActionIcon,
  Box,
  Container,
  Title,
  SimpleGrid,
  Timeline,
  ScrollArea,
  Divider,
  Skeleton,
  Center,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  FiActivity,
  FiCheck,
  FiCode,
  FiEdit,
  FiLayers,
  FiTag,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { ProfileAvatar } from "@/components/Common";
import { LuUserCheck, LuUsers } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { FaCircleDot, FaUsersViewfinder, FaXTwitter } from "react-icons/fa6";
import { ACTIVITY_LOGS_API_URL } from "@/config";
import { Project } from "@/types/project";
import ActivityTimeline from "@/components/Elements/Timeline";
import ProjectSocialsCard from "@/components/Cards/ProjectSocialsCard";
import { TbFolderOff } from "react-icons/tb";
import usePost from "@/utils/usePost";
import { API_USERS } from "@/utils/apis";

const ProfileViewPage = () => {
  useSetNoSidebar();
  useSetContainerSize("xl");

  const navigate = useNavigate();
  const { user } = useAuth();
  const { username } = useParams<{ username: string }>();

  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const {
    getData: getUserDetails,
    data: userData,
    loading: fetchingUserDetails,
    refreshData: updateUserDetails,
  } = useGet();
  const {
    getData: getUserProjects,
    data: userProjectData,
    loading: fetchingUserProjects,
    refreshData,
  } = useGet();
  const {
    getData: getRecentActivity,
    data: activitiesData,
    loading: fetchingUserActivities,
  } = useGet();

  // Handle user follow/unfollow
  const {
    uploadData: followUser,
    submitting: following,
    success: follow_success,
    data: follow_response,
  } = usePost();
  const {
    uploadData: unfollowUser,
    submitting: unfollowing,
    success: unfollow_success,
    data: unfollow_response,
  } = usePost();

  useEffect(() => {
    getUserDetails({ api: `/users/${username}` });
  }, [username]);

  useEffect(() => {
    if (userData?.data?.user?.id) {
      getRecentActivity({
        api: `${ACTIVITY_LOGS_API_URL}/activities`,
        params: {
          general: true,
          user_id: userData?.data?.user?.id,
          status: "Success",
          per_page: 20,
          page: 1,
        },
        isExternal: true,
      });
    }
  }, [userData?.data?.user?.id]);

  useEffect(() => {
    if (userData?.data?.user?.id) {
      getUserProjects({
        api: `/users/${userData?.data?.user?.id}/projects`,
        params: { per_page: 6 },
      });
    }
  }, [userData?.data?.user?.id, username]);

  // Get user follow status
  useEffect(() => {
    if (userData?.data?.user?.id) {
      setIsFollowingUser(
        userData?.data?.user?.requesting_user_follows || false,
      );
    }
  }, [userData?.data?.user?.id]);

  // Handle follow success
  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingUser(true);
      refreshUserDetails();
    }
  }, [follow_success, follow_response]);

  // Handle unfollow success
  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingUser(false);
      refreshUserDetails();
    }
  }, [unfollow_success, unfollow_response]);

  const onFollowClick = () => {
    if (isFollowingUser) {
      unfollowUser({
        api: `${API_USERS}/${userData?.data?.user?.id}/following`,
        method: "DELETE",
      });
    } else {
      followUser({
        api: `${API_USERS}/${userData?.data?.user?.id}/following`,
      });
    }
  };

  const isLoading = following || unfollowing;

  // Handle refresh after events
  const refreshUserProjects = () =>
    refreshData({
      api: `/users/${userData?.data?.user?.id}/projects`,
      params: { per_page: 6 },
    });
  const refreshUserDetails = () =>
    updateUserDetails({ api: `/users/${username}` });

  const socialLinks = [
    {
      icon: FaGithub,
      url: userData?.data?.user?.social_links?.github || null,
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      url: userData?.data?.user?.social_links?.linkedin || null,
      label: "LinkedIn",
    },
    {
      icon: FaXTwitter,
      url: userData?.data?.user?.social_links?.twitter || null,
      label: "Twitter",
    },
  ];

  const userStats = [
    {
      value: userData?.data?.user?.owned_projects_count || 0,
      label: "Projects",
      icon: FiCode,
      color: "gray",
    },
    {
      value: userData?.data?.user?.apps_count || 0,
      label: "Apps",
      icon: FiLayers,
      color: "gray",
    },
    {
      value: userData?.data?.user?.collaborative_projects_count || 0,
      label: "Collaborations",
      icon: FiUsers,
      color: "gray",
    },
    {
      value: userData?.data?.user?.projects_followers_count || 0,
      label: "Project Followers",
      icon: FaUsersViewfinder,
      color: "gray",
    },
    {
      value: userData?.data?.user?.followed_projects_count || 0,
      label: "Projects Followed",
      icon: FiUserCheck,
      color: "gray",
    },
    {
      value: userData?.data?.user?.followed_tags_count || 0,
      label: "Tags Followed",
      icon: FiTag,
      color: "gray",
    },
  ];

  const isCurrentUser = useMemo(() => {
    if (!user?.id || !userData?.data?.user?.id) {
      return false;
    }
    return user.id === userData.data.user.id;
  }, [user?.id, userData?.data?.user?.id]);

  return (
    <Container size="xl" py="md">
      <Stack>
        <>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Group justify="space-between">
                <Title order={3}>User Details</Title>
              </Group>
              <Divider my="md" />
              {fetchingUserDetails && !userData?.data?.user ? (
                <ProfileHeaderSkeleton />
              ) : (
                <Card
                  p="xl"
                  radius="md"
                  withBorder
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    [`@media (min-width: 992px)`]: {
                      height: "280px",
                    },
                  }}
                  mb={20}
                >
                  <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, lg: 10 }}>
                      <Flex
                        gap="xl"
                        align="flex-start"
                        direction={{ base: "column", sm: "row" }}
                      >
                        <ProfileAvatar user={userData?.data?.user} size={140} />
                        <Stack gap="xs" flex={1}>
                          <Group gap="sm" wrap="nowrap">
                            <Title order={2}>
                              {userData?.data?.user?.name || "N/A"}
                            </Title>
                          </Group>

                          <Text c="dimmed" size="md">
                            @{userData?.data?.user?.username || "johndoe"}
                          </Text>

                          <Text size="md" maw={600} lineClamp={3}>
                            {userData?.data?.user?.biography}
                          </Text>

                          <Group gap="xl" mt={20}>
                            <Group gap={6}>
                              <LuUserCheck size={18} />
                              <Text size="sm" fw={500}>
                                {userData?.data?.user?.following_count || 0}
                              </Text>
                              <Text size="sm" c="dimmed">
                                Following
                              </Text>
                            </Group>

                            <Group gap={6}>
                              <LuUsers size={18} />
                              <Text size="sm" fw={500}>
                                {userData?.data?.user?.followers_count || 0}
                              </Text>
                              <Text size="sm" c="dimmed">
                                Followers
                              </Text>
                            </Group>
                          </Group>

                          <Group gap="md" mt="xs">
                            <Group gap={4}>
                              <Text size="sm" c="dimmed">
                                Member Since{" "}
                                {new Date(
                                  userData?.data?.user?.date_created,
                                ).getFullYear()}
                              </Text>
                            </Group>

                            <Group gap="xs">
                              {socialLinks?.map(
                                (social, index) =>
                                  social.url !== null && (
                                    <>
                                      <FaCircleDot size="4" color="gray" />
                                      <ActionIcon
                                        key={index}
                                        variant="subtle"
                                        size="lg"
                                        component="a"
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <social.icon size={18} />
                                      </ActionIcon>
                                    </>
                                  ),
                              )}
                            </Group>
                          </Group>
                        </Stack>
                      </Flex>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 2 }}>
                      <Stack align="flex-end" gap="md" h="100%">
                        {isCurrentUser ? (
                          <Button
                            variant="outline"
                            size="sm"
                            color="blue"
                            onClick={() => navigate("/users/profile/settings")}
                            leftSection={<FiEdit size={20} />}
                          >
                            Edit Profile
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            color="blue"
                            onClick={onFollowClick}
                            leftSection={
                              isFollowingUser ? (
                                <FiCheck size={20} />
                              ) : (
                                <FiUserPlus size={20} />
                              )
                            }
                            loading={isLoading}
                            disabled={isLoading}
                          >
                            {isLoading
                              ? isFollowingUser
                                ? "Unfollowing..."
                                : "Following..."
                              : isFollowingUser
                                ? "Following"
                                : "Follow"}
                          </Button>
                        )}
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Card>
              )}

              <Grid.Col span={{ base: 12, lg: 12 }} p={0}>
                {fetchingUserProjects && !userProjectData?.data?.pinned ? (
                  <ProjectsSkeleton />
                ) : userProjectData?.data?.pinned?.length === 0 ? null : (
                  <>
                    <Stack gap="md" mb={40} mt={30}>
                      <Group justify="space-between">
                        <Title order={3}>Pinned Projects</Title>
                      </Group>

                      <Divider />
                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        {userProjectData?.data?.pinned?.map(
                          (project: Project) => (
                            <ProjectSocialsCard
                              project={project}
                              refreshUserProjects={refreshUserProjects}
                            />
                          ),
                        )}
                      </SimpleGrid>
                    </Stack>
                  </>
                )}

                {fetchingUserProjects && !userProjectData?.data?.projects ? (
                  <ProjectsSkeleton />
                ) : (
                  <>
                    <Stack>
                      <Group justify="space-between">
                        <Title order={3}>
                          {isCurrentUser ? "My Projects" : "User Projects"}
                        </Title>
                      </Group>

                      <Divider />

                      {userProjectData?.data?.projects?.length === 0 && (
                        <>
                          <Center
                            mih={200}
                            style={{
                              flexDirection: "column",
                              textAlign: "center",
                            }}
                          >
                            <TbFolderOff
                              size={50}
                              color="gray"
                              style={{ marginBottom: 8 }}
                            />
                            <Text size="xl" c="dimmed">
                              No projects found
                            </Text>
                          </Center>
                        </>
                      )}

                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        {userProjectData?.data?.projects?.map(
                          (project: Project) => (
                            <ProjectSocialsCard
                              project={project}
                              refreshUserProjects={refreshUserProjects}
                            />
                          ),
                        )}
                      </SimpleGrid>
                      {/* <Group justify="flex-end">
                        <PaginationInfo
                          total={userProjectData?.data?.pagination.total}
                          limit={6}
                        />
                      </Group> */}
                    </Stack>
                  </>
                )}
              </Grid.Col>
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 4 }}>
              <Stack gap="md" mb={15}>
                <Group justify="space-between">
                  <Title order={3}>Overview</Title>
                </Group>
                <Divider />
                {fetchingUserDetails ? (
                  <UserStatsSkeleton />
                ) : (
                  <SimpleGrid cols={{ base: 2, sm: 3, md: 2 }} spacing="lg">
                    {userStats.map((stat, index) => (
                      <Card
                        key={index}
                        withBorder
                        radius="md"
                        p="md"
                        style={{
                          position: "relative",
                          height: "fit-content",
                        }}
                      >
                        <stat.icon
                          size={28}
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            color: stat.color,
                          }}
                        />
                        <Text size="xl" fw={700}>
                          {stat.value}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {stat.label}
                        </Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                )}
              </Stack>

              <Stack gap="lg" mt={38}>
                <Title order={3}>Recent Activity</Title>
                <Divider />

                {fetchingUserActivities ? (
                  <UserActivitiesSkeleton />
                ) : activitiesData?.data?.activity?.length === 0 ? (
                  <Center
                    mih={200}
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <FiActivity
                      size={40}
                      color="gray"
                      style={{ marginBottom: 8 }}
                    />
                    <Text size="xl" c="dimmed">
                      No recent activity
                    </Text>
                  </Center>
                ) : (
                  <ActivityTimeline
                    activities={activitiesData?.data?.activity}
                  />
                )}
              </Stack>
            </Grid.Col>
          </Grid>
        </>
      </Stack>
    </Container>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Card
      p="xl"
      radius="md"
      withBorder
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Flex
            gap="xl"
            align="flex-start"
            direction={{ base: "column", sm: "row" }}
          >
            {/* Avatar */}
            <Skeleton circle height={140} width={140} />

            <Stack gap="xs" flex={1}>
              {/* Name */}
              <Group gap="sm" wrap="nowrap">
                <Skeleton height={28} width={200} />
              </Group>

              {/* Username */}
              <Skeleton height={18} width={120} />

              {/* Biography */}
              <Skeleton height={50} width="80%" />

              {/* Following + Followers */}
              <Group gap="xl">
                <Skeleton height={16} width={80} />
                <Skeleton height={16} width={80} />
              </Group>

              {/* Member Since + Socials */}
              <Group gap="md" mt="sm">
                <Skeleton height={14} width={150} />
              </Group>
            </Stack>
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack align="flex-end" gap="md" h="100%">
            <Skeleton height={36} width={100} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export const ProjectsSkeleton = () => {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
      {[...Array(4)].map((_, i) => (
        <Card key={i} withBorder radius="md" p="md">
          <Stack gap="sm">
            {/* Project title + button */}
            <Group justify="space-between">
              <Skeleton height={16} width="70%" radius="sm" />
              <Skeleton height={24} width={60} radius="sm" />
            </Group>

            {/* Project description */}
            <Skeleton height={12} width="100%" radius="sm" />
            <Skeleton height={12} width="80%" radius="sm" />

            {/* Tags */}
            <Group gap="sm">
              <Skeleton height={20} width={50} radius="sm" />
              <Skeleton height={20} width={40} radius="sm" />
              <Skeleton height={20} width={60} radius="sm" />
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
};

const UserStatsSkeleton: React.FC = () => {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 2 }} spacing="lg">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          withBorder
          radius="md"
          p="md"
          style={{ position: "relative", height: "fit-content" }}
        >
          {/* Fake icon placeholder */}
          <Skeleton
            circle
            height={28}
            width={28}
            style={{ position: "absolute", top: 12, right: 12 }}
          />

          {/* Value placeholder */}
          <Skeleton height={24} width={60} mt={4} />

          {/* Label placeholder */}
          <Skeleton height={14} width={80} mt={8} />
        </Card>
      ))}
    </SimpleGrid>
  );
};

const UserActivitiesSkeleton: React.FC = () => {
  return (
    <Card withBorder radius="md" p="md">
      <ScrollArea h={400}>
        <Timeline bulletSize={28} lineWidth={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Timeline.Item
              key={index}
              lineVariant="dashed"
              bullet={<Skeleton circle height={20} width={20} />}
            >
              <Box mb="md">
                <Skeleton height={14} width="70%" mb={6} />
                <Skeleton height={12} width="40%" />
              </Box>
            </Timeline.Item>
          ))}
        </Timeline>
      </ScrollArea>
    </Card>
  );
};

export default ProfileViewPage;
