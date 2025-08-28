import React, { useEffect } from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Badge,
  Text,
  Divider,
  Anchor,
  Button,
} from "@mantine/core";
import { FiCode, FiUsers } from "react-icons/fi";
import useGet from "@/utils/useGet";
import { API_PROJECTS } from "@/utils/apis";
import { Link } from "react-router-dom";

interface TrendingProjectsProps {
  title?: string;
  compact?: boolean;
}

export default function TrendingProjects({
  title = "Trending Projects",
  compact = false,
}: TrendingProjectsProps) {
  const { data: response, getData } = useGet();

  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 3 },
    });
  }, []);

  const trendingProjects = response?.data?.projects || [];

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiCode size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>
      <Stack gap={0}>
        {trendingProjects?.map((project, index) => (
          <React.Fragment key={project.name}>
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
                      {project?.name}
                    </Anchor>
                  </Group>
                  <Text size="xs" c="dimmed" mb={4}>
                    by {project?.owner_id}
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
                    {project?.tags &&
                      project?.tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          size="xs"
                          color="blue"
                          variant="light"
                        >
                          #{tag.name}
                        </Badge>
                      ))}
                  </Group>

                  <Group gap={2} mt={6}>
                    <FiUsers size={10} color="#6c757d" />
                    <Text size="xs" c="dimmed" fw={500} ml={2}>
                      {project.followers_count || 0} followers
                    </Text>
                  </Group>
                </div>
              </Group>
            </div>
            {index < trendingProjects.length - 1 && <Divider color="gray.3" />}
          </React.Fragment>
        ))}
      </Stack>
      <Button
        component={Link}
        to="/explore"
        variant="subtle"
        size="xs"
        fullWidth
        mt="sm"
      >
        +200 more
      </Button>
    </Card>
  );
}
