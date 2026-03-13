import React, { useEffect, useMemo } from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Text,
  Badge,
  Button,
  Avatar,
  Box,
  Skeleton,
} from "@mantine/core";
import { FiCode, FiLock, FiUsers, FiPlus, FiLayers } from "react-icons/fi";
import { Link } from "react-router-dom";
import useGet from "@/utils/useGet";
import { API_PROJECTS } from "@/utils/apis";
import { beautify, formatAgo } from "@/utils/helpers";

interface CompactProjectsListProps {
  title?: string;
  maxItems?: number;
  showCreateButton?: boolean;
  showPrivacyIcons?: boolean;
}

const CompactProjectsList = ({
  title = "Your Projects",
  maxItems = 8,
  showCreateButton = true,
  showPrivacyIcons = true,
}: CompactProjectsListProps) => {
  const { data: projectsData, getData, loading } = useGet();

  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: maxItems },
    });
  }, []);

  const projects = useMemo(() => {
    if (!projectsData?.data?.projects) {
      return [];
    }

    const owned = projectsData.data.projects || [];
    const invited = (projectsData.data.pending_invitations || []).map(
      (project: any) => ({
        ...project,
        is_invited: true,
      }),
    );

    return [...invited, ...owned].slice(0, maxItems);
  }, [projectsData, maxItems]);

  const renderProjectItem = (project: any) => (
    <Card
      key={project.id}
      p="xs"
      radius="md"
      withBorder
      component={Link}
      to={`/projects/${project.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
        minHeight: "75px",
      }}
      className="hover:shadow-md"
    >
      {/* Privacy indicator overlay */}
      {showPrivacyIcons && (
        <Box
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          {project.is_invited && (
            <Badge size="xs" color="orange" variant="filled">
              Invited
            </Badge>
          )}
          {!project.is_invited && (
            <Group gap={5} align="center" justify="flex-end">
              {project.is_private && (
                <FiLock size={10} style={{ color: "#6c757d" }} />
              )}
              <FiLayers size={10} style={{ color: "#6c757d" }} />
              <Text size="xs" fw={500} style={{ color: "#6c757d" }}>
                {project.apps_count || 0} apps
              </Text>
            </Group>
          )}
        </Box>
      )}

      <Group align="center" gap="xs" style={{ height: "100%" }}>
        <Avatar
          size="sm"
          radius="sm"
          color="blue"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
        >
          <FiCode size={14} />
        </Avatar>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group justify="space-between" align="flex-start" mb={2}>
            <Text
              size="sm"
              fw={600}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                lineHeight: 1.2,
              }}
            >
              {beautify(project.name)}
            </Text>
          </Group>

          {/* Project Description */}
          {project.description && (
            <Text
              size="xs"
              c="dimmed"
              mb={4}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                lineHeight: 1.3,
              }}
            >
              {project.description}
            </Text>
          )}

          <Group justify="space-between" align="center">
            <Group gap="sm">
              {/* Users Count */}
              {project.users_count && (
                <Group gap={2}>
                  <FiUsers size={10} color="#6c757d" />
                  <Text size="xs" c="dimmed" fw={500}>
                    {project.users_count}
                  </Text>
                </Group>
              )}

              {/* Last Updated */}
              {project.updated_at && (
                <Text size="xs" c="dimmed">
                  {formatAgo(project.updated_at)}
                </Text>
              )}
            </Group>
          </Group>
        </Box>
      </Group>
    </Card>
  );

  const renderSkeleton = () => (
    <Stack gap="xs">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          p="xs"
          radius="md"
          withBorder
          style={{ minHeight: "75px" }}
        >
          <Group gap="xs" style={{ height: "100%" }}>
            <Skeleton height={32} width={32} radius="sm" />
            <Box style={{ flex: 1 }}>
              <Skeleton height={14} mb={2} width="70%" />
              <Skeleton height={12} mb={4} width="85%" />
              <Group justify="space-between">
                <Group gap="sm">
                  <Skeleton height={10} width={20} />
                  <Skeleton height={10} width={40} />
                </Group>
              </Group>
            </Box>
          </Group>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Card p="md" withBorder radius="lg" h="100%">
      <Group mb="sm" justify="space-between">
        <Group gap="xs">
          <FiCode size={18} />
          <Title order={4} size="md">
            {title}
          </Title>
        </Group>

        {showCreateButton && (
          <Button
            component={Link}
            to="/projects/create"
            variant="light"
            size="xs"
            color="dark"
            leftSection={<FiPlus size={14} />}
          >
            Add
          </Button>
        )}
      </Group>

      {loading ? (
        renderSkeleton()
      ) : projects.length > 0 ? (
        <Stack gap="xs">
          {projects.map(renderProjectItem)}

          {projectsData?.data?.pagination?.total > maxItems && (
            <Button
              component={Link}
              to="/projects"
              variant="subtle"
              size="xs"
              fullWidth
              mt="sm"
            >
              +{projectsData.data.pagination.total - maxItems} more
            </Button>
          )}
        </Stack>
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
              No projects yet
            </Text>
          </Box>
          {showCreateButton && (
            <Button
              component={Link}
              to="/projects/create"
              variant="light"
              size="xs"
              leftSection={<FiPlus size={14} />}
            >
              Create Project
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default CompactProjectsList;
