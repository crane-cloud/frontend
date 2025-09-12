import React from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Badge,
  Text,
  Divider,
  Anchor,
  Loader,
  Center,
} from "@mantine/core";
import { FiCode, FiLayers } from "react-icons/fi";
import { formatPlural, beautify } from "@/utils/helpers";

interface TrendingProject {
  id: string | number;
  name: string;
  author: string;
  apps: number;
  tags: string[];
  description: string;
  avatar: string;
  link?: string;
}

interface TrendingProjectsProps {
  projects?: TrendingProject[];
  title?: string;
  compact?: boolean;
  loading?: boolean;
}

export default function TrendingProjects({
  projects = [],
  title = "Trending Projects",
  compact = false,
  loading = false,
}: TrendingProjectsProps) {
  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiCode size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>

      {loading ? (
        <Center py="lg">
          <Loader size="sm" />
        </Center>
      ) : projects.length === 0 ? (
        <Text size="sm" c="dimmed" ta="center" py="md">
          No projects found
        </Text>
      ) : (
        <Stack gap={0}>
          {projects.map((project, index) => (
            <React.Fragment key={project.id}>
              <div style={{ padding: "8px 0" }}>
                <Group mb={4} align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Group justify="space-between" align="flex-start" mb={2}>
                      <Anchor
                        href={project.link || "#"}
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
                        {beautify(project.name)}
                      </Anchor>
                    </Group>
                    {/* <Text size="xs" c="dimmed" mb={4}>
                      by {project.author}
                    </Text> */}
                    <Group
                      gap="xs"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      {project.tags.map((tag) => (
                        <Badge size="xs" variant="light" key={tag.id}>
                          {tag.name}
                        </Badge>
                      ))}
                    </Group>

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

                    <Group gap={4} mt={4}>
                      <FiLayers size={11} color="#6c757d" />
                      <Text size="sm" c="dimmed">
                        {formatPlural(project.apps, "app")}
                      </Text>
                    </Group>
                  </div>
                </Group>
              </div>
              {index < projects.length - 1 && <Divider color="gray.3" />}
            </React.Fragment>
          ))}
        </Stack>
      )}
    </Card>
  );
}
