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
  Avatar,
  Skeleton,
  Box,
} from "@mantine/core";
import { FiCode } from "react-icons/fi";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import { Link } from "react-router-dom";
import { Project } from "@/types/project";
import { beautify } from "@/utils/helpers";

interface TrendingProjectsProps {
  title?: string;
  compact?: boolean;
  perPage?: number;
}

export default function TrendingProjects({
  title = "Trending Projects",
  compact = false,
  perPage = 6,
}: TrendingProjectsProps) {
  const { data: response, getData, loading } = useGet();

  useEffect(() => {
    getData({
      api: `${API_SOCIALS}`,
      params: { entity: "projects", page: 1, per_page: perPage },
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
        {loading ? (
          <ProjectsSkeleton compact={compact} />
        ) : trendingProjects?.length > 0 ? (
          trendingProjects?.map((project: Project, index: number) => (
            <React.Fragment key={project.id}>
              <div style={{ padding: "8px 0" }}>
                <Group align="flex-start" gap={12} mt={2}>
                  <div style={{ flex: 1 }}>
                    <Anchor
                      href={`/explore/${project.id}`}
                      size="sm"
                      fw={500}
                      style={{
                        lineHeight: 1.2,
                        textDecoration: "none",
                        display: "block",
                        marginBottom: "2px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      {beautify(project?.name)}
                    </Anchor>

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
                  </div>
                </Group>

                <Group gap={4} mt={8}>
                  {project?.tags &&
                    project?.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        size="xs"
                        color="blue"
                        variant="light"
                        component={Link}
                        to={`/tags/${tag.name}`}
                        style={{ cursor: "pointer" }}
                      >
                        {tag.name.toLowerCase()}
                      </Badge>
                    ))}
                </Group>
              </div>
              {index < trendingProjects.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <Stack gap="md" ta="center" py="lg">
            <Box>
              <Avatar
                size="lg"
                radius="md"
                color="gray"
                variant="light"
                mx="auto"
                mb="sm"
              >
                <FiCode size={20} />
              </Avatar>
              <Text size="sm" c="dimmed" fw={500}>
                No trending projects yet
              </Text>
            </Box>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

// Skeleton component for loading state
const ProjectsSkeleton = ({ compact }: { compact?: boolean }) => {
  const projectNames = [120, 95, 140]; // Different widths for project names
  const ownerNames = [80, 65, 90]; // Different widths for owner names
  const descriptions = [200, 180, 220]; // Different widths for descriptions
  const tagCounts = [2, 3, 1]; // Number of tags per project
  const followerCounts = [65, 72, 58]; // Follower count widths

  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <React.Fragment key={index}>
          <div style={{ padding: "8px 0" }}>
            <Group align="flex-start" gap={12} mt={2}>
              {/* Avatar skeleton */}
              <Skeleton height={32} width={32} radius="sm" />

              <div style={{ flex: 1 }}>
                {/* Project name skeleton */}
                <Skeleton
                  height={16}
                  width={projectNames[index]}
                  mb={2}
                  style={{ display: "block" }}
                />

                {/* Owner name skeleton */}
                <Skeleton height={12} width={ownerNames[index]} mb={4} />

                {/* Description skeleton (only if not compact) */}
                {!compact && (
                  <>
                    <Skeleton height={12} width={descriptions[index]} mb={2} />
                    <Skeleton
                      height={12}
                      width={descriptions[index] - 40}
                      mb={4}
                    />
                  </>
                )}
              </div>
            </Group>

            {/* Tags skeleton */}
            <Group gap={4} mt={8}>
              {Array.from({ length: tagCounts[index] }).map((_, tagIndex) => (
                <Skeleton
                  key={tagIndex}
                  height={18}
                  width={Math.random() * 30 + 40}
                  radius="xl"
                />
              ))}
            </Group>

            {/* Followers skeleton */}
            <Group gap={2} mt={6}>
              <Skeleton height={10} width={10} circle />
              <Skeleton height={12} width={followerCounts[index]} ml={2} />
            </Group>
          </div>

          {/* Divider (except for last item) */}
          {index < 2 && <Divider />}
        </React.Fragment>
      ))}
    </>
  );
};
