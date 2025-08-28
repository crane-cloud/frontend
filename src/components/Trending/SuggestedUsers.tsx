import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

interface SuggestedUser {
  name: string;
  username: string;
  bio: string;
  followers: number;
  projects: number;
  profile_picture: string;
  tags: string[];
  link?: string;
}

const dummyUsers: SuggestedUser[] = [
  {
    name: "Jane Doe",
    username: "janedoe",
    bio: "AI researcher and open source enthusiast.",
    followers: 1200,
    projects: 8,
    profile_picture: "https://randomuser.me/api/portraits/women/44.jpg",
    tags: ["AI", "ML", "Open Source"],
    link: "/users/janedoe",
  },
  {
    name: "John Smith",
    username: "johnsmith",
    bio: "Kubernetes expert and cloud infrastructure engineer",
    followers: 980,
    projects: 5,
    profile_picture: "https://randomuser.me/api/portraits/men/32.jpg",
    tags: ["React", "Node.js", "DevOps"],
    link: "/users/johnsmith",
  },
  {
    name: "Alice Lee",
    username: "alicelee",
    bio: "Cloud architect and mentor.",
    followers: 1500,
    projects: 12,
    profile_picture: "https://randomuser.me/api/portraits/women/65.jpg",
    tags: ["Cloud", "Mentorship", "Kubernetes"],
    link: "/users/alicelee",
  },
];

export default function SuggestedUsers() {
  const [users, setUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(dummyUsers);
    }, 500);
  }, []);

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          Suggested For You
        </Title>
      </Group>
      <Stack gap={0}>
        {users.map((user, index) => (
          <React.Fragment key={user.username}>
            <div style={{ padding: "8px 0" }}>
              <Group mb={4} align="flex-start">
                <Avatar src={user.profile_picture} size="xs" />
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
                    <Button variant="outline" size="xs">
                      Follow
                    </Button>
                  </Group>
                  <Text size="xs" c="dimmed" mb={4} style={{ lineHeight: 1.3 }}>
                    {user.bio}
                  </Text>
                  <Group gap={4} mt={4}>
                    {user.tags.map((tag) => (
                      <Badge key={tag} size="xs" color="blue" variant="light">
                        {tag}
                      </Badge>
                    ))}
                    <Group gap="sm">
                      <Text size="xs" c="dimmed">
                        {user.followers} followers
                      </Text>
                      <Text size="xs" c="dimmed">
                        {user.projects} projects
                      </Text>
                    </Group>
                  </Group>
                </div>
              </Group>
            </div>
            {index < users.length - 1 && <Divider color="gray.3" />}
          </React.Fragment>
        ))}

        <Button
          component={Link}
          to="/explore"
          variant="subtle"
          size="xs"
          fullWidth
          mt="sm"
        >
          +100 more
        </Button>
      </Stack>
    </Card>
  );
}
