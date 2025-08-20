import React from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Badge,
  Text,
  Avatar,
  Divider,
  Anchor,
} from "@mantine/core";
import { FiCode, FiStar } from "react-icons/fi";

interface TrendingProject {
  name: string;
  author: string;
  stars: number;
  language: string;
  description: string;
  avatar: string;
  link?: string;
}

interface TrendingProjectsProps {
  projects?: TrendingProject[];
  title?: string;
  compact?: boolean;
}

const defaultProjects: TrendingProject[] = [
  {
    name: "ai-chatbot",
    author: "ai-team",
    stars: 892,
    language: "Python",
    description: "Advanced AI chatbot with natural language processing",
    avatar: "https://github.com/identicons/ai-team.png",
    link: "/projects/ai-chatbot",
  },
  {
    name: "k8s-dashboard",
    author: "devops-pro",
    stars: 654,
    language: "React",
    description: "Beautiful Kubernetes cluster management dashboard",
    avatar: "https://github.com/identicons/devops-pro.png",
    link: "/projects/k8s-dashboard",
  },
  {
    name: "auth-service",
    author: "security-team",
    stars: 423,
    language: "Go",
    description: "Microservice for authentication and authorization",
    avatar: "https://github.com/identicons/security-team.png",
    link: "/projects/auth-service",
  },
];

export default function TrendingProjects({
  projects = defaultProjects,
  title = "Trending Projects",
  compact = false,
}: TrendingProjectsProps) {
  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiCode size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>
      <Stack gap={0}>
        {projects.map((project, index) => (
          <React.Fragment key={project.name}>
            <div style={{ padding: "8px 0" }}>
              <Group mb={4} align="flex-start">
                <Avatar src={project.avatar} size="xs" />
                <div style={{ flex: 1 }}>
                  <Group justify="space-between" align="flex-start" mb={2}>
                    <Anchor
                      href={project.link || "#"}
                      size="sm"
                      fw={500}
                      c="dark"
                      style={{
                        lineHeight: 1.2,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      {project.name}
                    </Anchor>
                    <Badge size="xs" variant="light">
                      {project.language}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" mb={4}>
                    by {project.author}
                  </Text>
                  {!compact && (
                    <Text
                      size="xs"
                      c="dimmed"
                      mb={4}
                      style={{ lineHeight: 1.3 }}
                    >
                      {project.description}
                    </Text>
                  )}
                  <Group gap={4}>
                    <FiStar size={10} color="#6c757d" />
                    <Text size="xs" c="dimmed">
                      {project.stars}
                    </Text>
                  </Group>
                </div>
              </Group>
            </div>
            {index < projects.length - 1 && <Divider color="gray.3" />}
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}
