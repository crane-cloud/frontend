import {
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { FaGithub, FaLinkedin, FaTwitter, FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import UserProfileCard, { StatsList } from "@/components/Cards/OtherCards";
import TitleText from "@/components/TitleText";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
};

const UserProfilePage = () => {
  const { user } = useAuth();
  const { getData: getUser, data: userData } = useGet();
  const navigate = useNavigate();

  useSetNoSidebar();
  useSetContainerSize("lg");

  useEffect(() => {
    if (user) {
      getUser({ api: `/users/${user.id}` });
    }
  }, [user?.id]);

  const currentUser = userData?.data?.user || {};

  const userStats = (user: any) => [
    { value: user?.projects_count || 0, label: "Projects" },
    { value: user?.apps_count || 0, label: "Apps" },
    {
      value: user?.followed_projects_count || 0,
      label: "Projects Followed",
      tooltip: "Total number of projects you follow",
    },
    {
      value: user?.projects_followers_count || 0,
      label: "Projects Followers",
      tooltip: "Total users who follow your projects",
    },
  ];

  return (
    <Stack>
      <TitleText>User Profile</TitleText>

      <Flex gap="lg" align="flex-start" justify="space-between" wrap="wrap">
        {/* LEFT: Profile Card */}
        <Stack>
          <UserProfileCard user={currentUser} />
        </Stack>

        {/* RIGHT: Stats + Edit + Social */}
        <Stack flex={1}>
          <TitleText
            rightSection={
              <Button
                variant="filled"
                color="dark"
                onClick={() => navigate("/users/profile/settings")}
              >
                Edit Profile
              </Button>
            }
          >
            Stats
          </TitleText>

          <Card withBorder radius="md" padding="xl">
            <StatsList justify="space-between" stats={userStats(currentUser)} />
          </Card>

          {/* Social Media Section */}
          {currentUser?.social_links?.length > 0 && (
            <Stack mt="lg">
              <TitleText>Social Media</TitleText>
              <Card withBorder radius="md" padding="md">
                <Stack>
                  {currentUser.social_links.map(
                    (
                      link: { platform: string; url: string },
                      index: number,
                    ) => (
                      <Group key={index} justify="space-between">
                        <Group>
                          {socialIconMap[link.platform.toLowerCase()] ?? null}
                          <Text fw={500}>{link.platform}</Text>
                        </Group>
                        <Anchor href={link.url} target="_blank" color="blue">
                          {link.url}
                        </Anchor>
                      </Group>
                    ),
                  )}
                </Stack>
              </Card>
            </Stack>
          )}

          {!currentUser?.social_links?.length && (
            <Text color="dimmed" mt="md"></Text>
          )}
        </Stack>
      </Flex>
    </Stack>
  );
};

export default UserProfilePage;
