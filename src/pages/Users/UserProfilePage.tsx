import {
  Accordion,
  Anchor,
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Loader,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import {
  FaCheckCircle,
  FaCircle,
  FaCogs,
  FaDatabase,
  FaGithub,
  FaLinkedin,
  FaProjectDiagram,
  FaTimesCircle,
  FaTwitter,
  FaPen,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import UserProfileCard, { StatsList } from "@/components/Cards/OtherCards";
import TitleText from "@/components/TitleText";
import { formatDistanceToNow } from "date-fns";
import { ACTIVITY_LOGS_API_URL } from "@/config";

// social media icons for map
const socialIconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
};

// Activity log type
interface ActivityLog {
  _id: { $oid: string };
  user_id: string;
  user_email: string;
  user_name: string;
  creation_date: string;
  operation: string;
  model: string;
  status: string;
  description: string;
  a_user_id: string | null;
  a_db_id: string | null;
  a_app_id: string | null;
  a_project_id: string | null;
  a_cluster_id: string | null;
  a_tag_ids: string[] | null;
}

const UserProfilePage = () => {
  const { user } = useAuth();
  const { getData: getUser, data: userData } = useGet();
  const { getData: getUserActivities, data: activitiesData, loading: loadingLogs } = useGet();
  const navigate = useNavigate();

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>("All");

  useSetNoSidebar();
  useSetContainerSize("lg");

  // Fetch user profile
  useEffect(() => {
    if (user) {
      try {
        getUser({ api: `/users/${user.id}` });
      } catch {
        setError("Failed to load profile data.");
      }
    }
  }, [user?.id]);

  // Fetch user activities
  useEffect(() => {
    if (user?.id) {
      getUserActivities({
        api: `${ACTIVITY_LOGS_API_URL}/api/activities`,
        params: {
          user_id: user.id,
          page: 1,
          per_page: 10,
          general: false,
        },
        isExternal: true,
      });
    }
  }, [user?.id]);

  // Sync activities data into state
  useEffect(() => {
    if (activitiesData) {
      const activities: ActivityLog[] =
        activitiesData.data?.activity ||
        activitiesData.data ||
        activitiesData.activity ||
        activitiesData ||
        [];

      setLogs(Array.isArray(activities) ? activities : []);
    }
  }, [activitiesData]);

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

  const filteredLogs =
    filter === "All"
      ? logs
      : logs.filter(
          (log) => log.status.toLowerCase() === filter?.toLowerCase(),
        );

  const getStatusIcon = (status: string) => {
    if (status.toLowerCase() === "success") {
      return <FaCheckCircle color="green" />;
    }
    if (status.toLowerCase() === "failed") {
      return <FaTimesCircle color="red" />;
    }
    return <FaCircle color="gray" />;
  };

  const getModelIcon = (model: string) => {
    switch (model.toLowerCase()) {
      case "project":
        return <FaProjectDiagram color="#4a90e2" size={18} />;
      case "database":
        return <FaDatabase color="#f39c12" size={18} />;
      default:
        return <FaCogs color="#8e44ad" size={18} />;
    }
  };

  function formatDescription(raw: string): string {
    if (!raw) return "";

    const looksLikeK8sStatus =
      raw.startsWith("{'kind': 'Status'") || raw.includes("'apiVersion': 'v1'");

    if (!looksLikeK8sStatus) {
      return raw.length > 50 ? `${raw.substring(0, 50).trim()}...` : raw.trim();
    }

    try {
      const jsonString = raw
        .replace(/'/g, '"')
        .replace(/\bNone\b/g, "null")
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false");

      const obj = JSON.parse(jsonString);

      if (obj?.kind === "Status" && obj.message) {
        return obj.message.length > 50
          ? `${obj.message.substring(0, 50).trim()}...`
          : obj.message.trim();
      }
    } catch {
      return raw.length > 50 ? `${raw.substring(0, 50).trim()}...` : raw.trim();
    }

    return raw.length > 50 ? `${raw.substring(0, 50).trim()}...` : raw.trim();
  }

  return (
    <Stack>
      <TitleText>User Profile</TitleText>

      {error && (
        <Card
          withBorder
          padding="md"
          radius="md"
          style={{ background: "#ffe6e6" }}
        >
          <Text color="red">{error}</Text>
        </Card>
      )}

      <Flex gap="lg" align="flex-start" justify="space-between" wrap="wrap">
        {/* LEFT: Profile Card */}
        <Stack>
          <UserProfileCard user={currentUser} />
        </Stack>

        {/* RIGHT: Stats + Activity Logs */}
        <Stack flex={1}>
          <TitleText
            rightSection={
              <Button
                variant="filled"
                color="dark"
                onClick={() => navigate("/users/profile/settings")}
                leftSection={<FaPen />}
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

          {/* Activity Logs */}
          <Stack mt="lg">
            <Flex justify="space-between" align="center" mb="sm">
              <Text fw={700} size="lg">
                Activity Log
              </Text>
              <Select
                value={filter}
                onChange={setFilter}
                data={["All", "Success", "Failed", "Other"]}
                size="sm"
              />
            </Flex>

            <Card withBorder radius="md" padding="md">
              {loadingLogs ? (
                <Loader />
              ) : logs.length === 0 ? (
                <Text size="sm" color="dimmed">
                  No activities found.
                </Text>
              ) : (
                <Stack gap="md">
                  {/* Latest Log */}
                  {filteredLogs[0] && (
                    <Flex gap="md">
                      <Flex
                        direction="column"
                        align="center"
                        style={{ width: 40 }}
                      >
                        <div
                          style={{
                            width: 2,
                            background: "transparent",
                            flex: 1,
                          }}
                        />
                        {getModelIcon(filteredLogs[0].model)}
                        <div
                          style={{
                            width: 2,
                            background:
                              filteredLogs.length > 1
                                ? "#e1e4e8"
                                : "transparent",
                            flex: 1,
                          }}
                        />
                      </Flex>
                      <Card
                        withBorder
                        radius="md"
                        p="sm"
                        style={{ flex: 1, background: "#f6f8fa" }}
                      >
                        <Group justify="space-between" mb="xs">
                          <Text size="sm" fw={500}>
                            {filteredLogs[0].user_name}{" "}
                            {filteredLogs[0].operation.toLowerCase()}{" "}
                            {filteredLogs[0].model.toLowerCase()}
                          </Text>
                          <Badge
                            color={
                              filteredLogs[0].status.toLowerCase() === "success"
                                ? "green"
                                : filteredLogs[0].status.toLowerCase() ===
                                    "failed"
                                  ? "red"
                                  : "gray"
                            }
                            variant="light"
                            leftSection={getStatusIcon(filteredLogs[0].status)}
                          >
                            {filteredLogs[0].status}
                          </Badge>
                        </Group>
                        <Text size="xs" color="dimmed">
                          {formatDescription(filteredLogs[0].description)}
                        </Text>
                        <Text size="xs" color="dimmed" mt={4}>
                          {formatDistanceToNow(
                            new Date(filteredLogs[0].creation_date),
                            { addSuffix: true },
                          )}
                        </Text>
                      </Card>
                    </Flex>
                  )}

                  {/* Older Logs Accordion */}
                  {filteredLogs.length > 1 && (
                    <Accordion variant="contained" radius="md">
                      <Accordion.Item value="older-logs">
                        <Accordion.Control>
                          <Text size="sm" fw={500}>
                            Show Older Activities
                          </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack gap="md">
                            {filteredLogs.slice(1).map((log, idx) => (
                              <Flex key={log._id.$oid} gap="md">
                                <Flex
                                  direction="column"
                                  align="center"
                                  style={{ width: 40 }}
                                >
                                  <div
                                    style={{
                                      width: 2,
                                      background: "#e1e4e8",
                                      flex: 1,
                                    }}
                                  />
                                  {getModelIcon(log.model)}
                                  <div
                                    style={{
                                      width: 2,
                                      background:
                                        idx === filteredLogs.slice(1).length - 1
                                          ? "transparent"
                                          : "#e1e4e8",
                                      flex: 1,
                                    }}
                                  />
                                </Flex>
                                <Card
                                  withBorder
                                  radius="md"
                                  p="sm"
                                  style={{ flex: 1, background: "#f6f8fa" }}
                                >
                                  <Group justify="space-between" mb="xs">
                                    <Text size="sm" fw={500}>
                                      {log.user_name}{" "}
                                      {log.operation.toLowerCase()}{" "}
                                      {log.model.toLowerCase()}
                                    </Text>
                                    <Badge
                                      color={
                                        log.status.toLowerCase() === "success"
                                          ? "green"
                                          : log.status.toLowerCase() ===
                                              "failed"
                                            ? "red"
                                            : "gray"
                                      }
                                      variant="light"
                                      leftSection={getStatusIcon(log.status)}
                                    >
                                      {log.status}
                                    </Badge>
                                  </Group>
                                  <Text size="xs" color="dimmed">
                                    {formatDescription(log.description)}
                                  </Text>
                                  <Text size="xs" color="dimmed" mt={4}>
                                    {formatDistanceToNow(
                                      new Date(log.creation_date),
                                      { addSuffix: true },
                                    )}
                                  </Text>
                                </Card>
                              </Flex>
                            ))}
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  )}
                </Stack>
              )}
            </Card>
          </Stack>

          {/* Social Media */}
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
                          {socialIconMap[link.platform?.toLowerCase()] ?? null}
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
        </Stack>
      </Flex>
    </Stack>
  );
};

export default UserProfilePage;
