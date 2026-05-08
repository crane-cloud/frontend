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
  Title,
  SimpleGrid,
  Timeline,
  ScrollArea,
  Divider,
  Skeleton,
  Center,
  ThemeIcon,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import {
  beautify,
  useSetContainerSize,
  useSetNoSidebar,
} from "@/utils/helpers";
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
import { useParams, useNavigate } from "react-router-dom";
import { FaCircleDot, FaUsersViewfinder, FaXTwitter } from "react-icons/fa6";
import { ACTIVITY_LOGS_API_URL } from "@/config";
import { Project } from "@/types/project";
import ActivityTimeline from "@/components/Elements/Timeline";
import ProjectSocialsCard from "@/components/Cards/ProjectSocialsCard";
import { TbFolderOff } from "react-icons/tb";
import usePost from "@/utils/usePost";
import { API_USERS } from "@/utils/apis";
import PaginationInfo from "@/components/PaginationInfo";
import { LuUserCheck, LuUsers } from "react-icons/lu";

const ProfileViewPage = () => {
  useSetNoSidebar();
  useSetContainerSize("xl");

  const navigate = useNavigate();
  const { user } = useAuth();
  const { username } = useParams<{ username: string }>();

  const [projectPage, setProjectPage] = useState(1);
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
    error,
  } = useGet();
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
  }, [userData?.data?.user?.id, username]);

  useEffect(() => {
    if (userData?.data?.user?.id) {
      getUserProjects({
        api: `/users/${userData?.data?.user?.id}/projects`,
        params: { page: projectPage, per_page: 6 },
      });
    }
  }, [userData?.data?.user?.id, username, projectPage]);

  useEffect(() => {
    if (userData?.data?.user?.id) {
      setIsFollowingUser(
        userData?.data?.user?.requesting_user_follows || false,
      );
    }
  }, [userData?.data?.user?.id, username, projectPage]);

  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingUser(true);
      refreshUserDetails();
    }
  }, [follow_success, follow_response]);
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
      followUser({ api: `${API_USERS}/${userData?.data?.user?.id}/following` });
    }
  };

  const isLoading = following || unfollowing;
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
      color: "blue",
    },
    {
      value: userData?.data?.user?.apps_count || 0,
      label: "Apps",
      icon: FiLayers,
      color: "teal",
    },
    {
      value: userData?.data?.user?.collaborative_projects_count || 0,
      label: "Collaborations",
      icon: FiUsers,
      color: "violet",
    },
    {
      value: userData?.data?.user?.projects_followers_count || 0,
      label: "Project Followers",
      icon: FaUsersViewfinder,
      color: "orange",
    },
    {
      value: userData?.data?.user?.followed_projects_count || 0,
      label: "Projects Followed",
      icon: FiUserCheck,
      color: "pink",
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
    <Grid gutter={40}>
      {/* LEFT COLUMN - MAIN PROFILE & PROJECTS */}
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Group justify="space-between">
          <Title order={3}>User Details</Title>
        </Group>
        <Divider my="xs" />
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
                      {beautify(userData?.data?.user?.biography)}
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
                          Joined {userData?.data?.user?.age}
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

        {/* PINNED PROJECTS */}
        {fetchingUserProjects && !userProjectData?.data?.pinned ? (
          <ProjectsSkeleton />
        ) : (
          userProjectData?.data?.pinned?.length > 0 && (
            <Stack gap="md" mb={40}>
              <Title order={3} size="h4" fw={700}>
                Pinned Projects
              </Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                {userProjectData?.data?.pinned?.map((project: Project) => (
                  <ProjectSocialsCard
                    key={project.id}
                    project={project}
                    refreshUserProjects={refreshUserProjects}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          )
        )}

        {/* ALL PROJECTS */}
        {fetchingUserProjects && !userProjectData?.data?.projects ? (
          <ProjectsSkeleton />
        ) : (
          <Stack gap="md">
            <Title order={3} size="h4" fw={700}>
              {isCurrentUser ? "My Projects" : "Projects"}
            </Title>

            {userProjectData?.data?.projects?.length === 0 ? (
              <Card withBorder radius="md" py={60}>
                <Center
                  style={{ flexDirection: "column", textAlign: "center" }}
                >
                  <TbFolderOff
                    size={48}
                    color="var(--mantine-color-gray-4)"
                    style={{ marginBottom: 12 }}
                  />
                  <Text size="lg" fw={500} c="dimmed">
                    No projects found
                  </Text>
                </Center>
              </Card>
            ) : (
              <>
                {/* --- THE NEW RELATIVE WRAPPER --- */}
                <Box style={{ position: "relative", minHeight: 200 }}>
                  <LoadingOverlay
                    visible={fetchingUserProjects}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                    loaderProps={{ color: "blue", type: "dots" }}
                  />

                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                    {userProjectData?.data?.projects?.map(
                      (project: Project) => (
                        <ProjectSocialsCard
                          key={project.id}
                          project={project}
                          refreshUserProjects={refreshUserProjects}
                        />
                      ),
                    )}
                  </SimpleGrid>
                </Box>

                <Group justify="flex-end" mt="md">
                  <PaginationInfo
                    total={userProjectData?.data?.pagination?.total || 0}
                    limit={6}
                    page={projectPage}
                    setPage={setProjectPage}
                  />
                </Group>
              </>
            )}
          </Stack>
        )}
      </Grid.Col>

      {/* RIGHT COLUMN - STATS & ACTIVITY */}
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Box
          style={{
            position: "sticky",
            top: 85,
          }}
        >
          <Stack gap="xl">
            {/* UNIFIED OVERVIEW CARD */}
            <Box>
              <Title order={3} size="h4" fw={700} mb="md" lts={0.1}>
                Platform Summary
              </Title>
              {fetchingUserDetails ? (
                <UserStatsSkeleton />
              ) : (
                <Card withBorder radius="md" shadow="sm" p="sm">
                  <SimpleGrid cols={2} spacing="md">
                    {userStats.map((stat, index) => (
                      <Box
                        key={index}
                        p={3}
                        style={{
                          borderRadius: "var(--mantine-radius-md)",
                        }}
                      >
                        <Box key={index} p="xs">
                          <Group gap="md" wrap="nowrap">
                            <ThemeIcon variant="light" size="lg" radius="md">
                              <stat.icon size={18} />
                            </ThemeIcon>
                            <Box>
                              <Text size="xl" fw={800} lh={1}>
                                {stat.value}
                              </Text>
                              <Text
                                size="xs"
                                c="dimmed"
                                fw={600}
                                tt="capitalize"
                                mt={2}
                              >
                                {stat.label}
                              </Text>
                            </Box>
                          </Group>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Card>
              )}
            </Box>

            {/* RECENT ACTIVITY */}
            <Box>
              <Title order={3} size="h4" fw={700} mb="md">
                Recent Activity
              </Title>
              <Card withBorder radius="md" shadow="sm" p="lg">
                {fetchingUserActivities ? (
                  <UserActivitiesSkeleton />
                ) : error || activitiesData?.data?.activity?.length === 0 ? (
                  <Center
                    mih={150}
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <FiActivity
                      size={32}
                      color="var(--mantine-color-gray-4)"
                      style={{ marginBottom: 12 }}
                    />
                    <Text size="sm" fw={500} c="dimmed">
                      No recent activity
                    </Text>
                  </Center>
                ) : (
                  <ActivityTimeline
                    activities={activitiesData?.data?.activity}
                  />
                )}
              </Card>
            </Box>

            <Group justify="center" gap="md" mt="sm">
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
          </Stack>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export const ProfileHeaderSkeleton = () => {
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
        <Card
          key={i}
          withBorder
          radius="lg"
          p="lg"
          shadow="sm"
          style={{ display: "flex", flexDirection: "column", minHeight: 180 }}
        >
          {/* Project title + dropdown icon */}
          <Group
            justify="space-between"
            align="flex-start"
            wrap="nowrap"
            mb="sm"
          >
            <Skeleton height={24} width="70%" radius="sm" />
            <Skeleton height={24} width={24} radius="sm" />
          </Group>

          {/* Project description */}
          <Box mb="xl">
            <Skeleton height={14} width="100%" radius="sm" mb={8} />
            <Skeleton height={14} width="80%" radius="sm" />
          </Box>

          {/* Tags + Visibility Badge (Pushed to bottom) */}
          <Group justify="space-between" align="center" mt="auto" wrap="nowrap">
            <Group gap="xs" wrap="nowrap">
              <Skeleton height={24} width={60} radius="xl" />
              <Skeleton height={24} width={80} radius="xl" />
              <Skeleton height={24} width={50} radius="xl" />
            </Group>
            <Skeleton height={24} width={65} radius="xl" />
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export const UserStatsSkeleton: React.FC = () => {
  return (
    <Card withBorder radius="lg" shadow="sm" p="md">
      <SimpleGrid cols={2} spacing="md">
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={index}
            p="sm"
            style={{
              borderRadius: "var(--mantine-radius-md)",
            }}
          >
            <Group gap="sm" wrap="nowrap">
              {/* Skeleton for the ThemeIcon */}
              <Skeleton height={38} width={38} radius="md" />

              <Box>
                {/* Skeleton for Value */}
                <Skeleton height={20} width={40} mb={6} radius="sm" />
                {/* Skeleton for Label */}
                <Skeleton height={12} width={80} radius="sm" />
              </Box>
            </Group>
          </Box>
        ))}
      </SimpleGrid>
    </Card>
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
