import React from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Text,
  Avatar,
  Button,
  Divider,
  Anchor,
  Loader,
  Center,
} from "@mantine/core";
import { FiUserPlus } from "react-icons/fi";
import { formatPlural, beautify } from "@/utils/helpers";

interface SuggestedUser {
  id: string | number;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followerCount: number;
  ownedProjects: number;
}

interface SuggestedUsersProps {
  users?: SuggestedUser[];
  title?: string;
  showTags?: boolean;
  onFollow?: (username: string) => void;
  loading?: boolean;
}

export default function SuggestedUsers({
  users = [],
  title = "Suggested for You",
  onFollow,
  loading = false,
}: SuggestedUsersProps) {
  const handleFollow = (username: string) => {
    onFollow?.(username);
  };

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>

      {loading ? (
        <Center py="lg">
          <Loader size="sm" />
        </Center>
      ) : users.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" py="md">
          No suggested users found
        </Text>
      ) : (
        <Stack gap={0}>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <div style={{ padding: "8px 0" }}>
                <Group mb={4} align="flex-start">
                  <Avatar src={user.avatar} size="sm" />
                  <div style={{ flex: 1 }}>
                    <Group justify="space-between" align="flex-start" mb={2}>
                      <div style={{ flex: 1 }}>
                        <Anchor
                          href={user.link || "#"}
                          size="sm"
                          fw={500}
                          style={{
                            lineHeight: 1.2,
                            textDecoration: "none",
                            display: "block",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = "underline";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = "none";
                          }}
                        >
                          {beautify(user.name)}
                        </Anchor>
                        <Text size="xs" c="dimmed" mb={4}>
                          @{user.username}
                        </Text>
                      </div>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleFollow(user.username)}
                      >
                        Follow
                      </Button>
                    </Group>

                    {user.bio && (
                      <Text
                        size="xs"
                        c="dimmed"
                        mb={4}
                        style={{ lineHeight: 1.3 }}
                      >
                        {user.bio}
                      </Text>
                    )}

                    <Group gap="sm">
                      <Text size="sm" c="dimmed">
                        {formatPlural(user.followerCount, "follower")}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {formatPlural(user.ownedProjects, "project")}
                      </Text>
                    </Group>
                  </div>
                </Group>
              </div>
              {index < users.length - 1 && <Divider color="gray.3" />}
            </React.Fragment>
          ))}
        </Stack>
      )}
    </Card>
  );
}
