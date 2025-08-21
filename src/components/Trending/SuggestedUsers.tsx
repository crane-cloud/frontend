import React from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Badge,
  Text,
  Avatar,
  Button,
  Divider,
  Anchor,
} from "@mantine/core";
import { FiUserPlus } from "react-icons/fi";

interface SuggestedUser {
  name: string;
  username: string;
  bio: string;
  followers: number;
  projects: number;
  avatar: string;
  tags: string[];
  link?: string;
}

interface SuggestedUsersProps {
  users?: SuggestedUser[];
  title?: string;
  showTags?: boolean;
  onFollow?: (username: string) => void;
}

const defaultUsers: SuggestedUser[] = [
  {
    name: "Emily Rodriguez",
    username: "emily-dev",
    bio: "Frontend architect specializing in React and TypeScript",
    followers: 892,
    projects: 24,
    avatar: "https://github.com/identicons/emily-dev.png",
    tags: ["React", "TypeScript"],
    link: "/users/emily-dev",
  },
  {
    name: "David Kim",
    username: "david-k8s",
    bio: "Kubernetes expert and cloud infrastructure engineer",
    followers: 567,
    projects: 18,
    avatar: "https://github.com/identicons/david-k8s.png",
    tags: ["Kubernetes", "DevOps"],
    link: "/users/david-k8s",
  },
  {
    name: "Maria Santos",
    username: "maria-ai",
    bio: "Machine learning engineer building scalable AI solutions",
    followers: 1240,
    projects: 31,
    avatar: "https://github.com/identicons/maria-ai.png",
    tags: ["ML", "Python"],
    link: "/users/maria-ai",
  },
];

export default function SuggestedUsers({
  users = defaultUsers,
  title = "Suggested for You",
  showTags = true,
  onFollow,
}: SuggestedUsersProps) {
  const handleFollow = (username: string) => {
    if (onFollow) {
      onFollow(username);
    }
  };

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>
      <Stack gap={0}>
        {users.map((user, index) => (
          <React.Fragment key={user.username}>
            <div style={{ padding: "8px 0" }}>
              <Group mb={4} align="flex-start">
                <Avatar src={user.avatar} size="xs" />
                <div style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start" mb={2}>
                    <div style={{ flex: 1 }}>
                      <Anchor
                        href={user.link || "#"}
                        size="sm"
                        fw={500}
                        c="dark"
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
                        {user.name}
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

                  <Text size="xs" c="dimmed" mb={4} style={{ lineHeight: 1.3 }}>
                    {user.bio}
                  </Text>

                  {showTags && (
                    <Group gap="xs" mb={4}>
                      {user.tags.map((tag) => (
                        <Badge key={tag} size="xs" variant="light">
                          {tag}
                        </Badge>
                      ))}
                    </Group>
                  )}

                  <Group gap="sm">
                    <Text size="xs" c="dimmed">
                      {user.followers} followers
                    </Text>
                    <Text size="xs" c="dimmed">
                      {user.projects} projects
                    </Text>
                  </Group>
                </div>
              </Group>
            </div>
            {index < users.length - 1 && <Divider color="gray.3" />}
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}
