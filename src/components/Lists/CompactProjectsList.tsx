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
import {
  FiCode,
  FiLock,
  FiUsers,
  FiPlus,
  FiLayers,
  FiGlobe,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useGet from "@/utils/useGet";
import { API_PROJECTS } from "@/utils/apis";
import { beautify } from "@/utils/helpers";

interface CompactProjectsListProps {
  title?: string;
  maxItems?: number;
  showCreateButton?: boolean;
  showPrivacyIcons?: boolean;
}

const CompactProjectsList = ({
  title = "Your Projects",
  maxItems = 7,
  showCreateButton = false,
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
      p="sm"
      radius="md"
      withBorder
      component={Link}
      to={`/projects/${project.id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
      }}
      className="hover:shadow-md hover:border-blue-300"
    >
      <Group wrap="nowrap" align="flex-start" gap="sm" style={{ flex: 1 }}>
        <Avatar size="md" radius="md" color="blue" variant="light">
          <FiCode size={18} />
        </Avatar>

        <Stack gap={4} style={{ flex: 1, minWidth: 0, height: "100%" }}>
          <Text size="sm" fw={600} truncate="end">
            {beautify(project.name)}
          </Text>

          {project.description && (
            <Text
              size="xs"
              c="dimmed"
              truncate="end"
              style={{ lineHeight: 1.4, flex: 1 }}
            >
              {project.description}
            </Text>
          )}

          <Group justify="space-between" align="flex-end" mt="auto" pt="xs">
            <Group gap="md">
              <Group gap={4} align="center">
                <FiLayers size={12} color="#868e96" />
                <Text size="xs" c="dimmed" fw={500}>
                  {project.apps_count || 0} apps
                </Text>
              </Group>

              {project.members_count !== undefined && (
                <Group gap={4} align="center">
                  <FiUsers size={12} color="#868e96" />
                  <Text size="xs" c="dimmed" fw={500}>
                    {project.members_count}
                  </Text>
                </Group>
              )}

              <Group gap={4} align="center">
                {project.is_public ? (
                  <FiGlobe size={12} color="#868e96" />
                ) : (
                  <FiLock size={12} color="#868e96" />
                )}
              </Group>
            </Group>

            {showPrivacyIcons && (
              <Group gap="xs" wrap="nowrap">
                {project.is_invited && (
                  <Badge size="xs" color="orange" variant="light">
                    Invited
                  </Badge>
                )}

                <Badge
                  size="sm"
                  color={project.is_public ? "green" : "gray"}
                  variant="light"
                  tt="capitalize"
                >
                  {project.is_public ? "Public" : "Private"}
                </Badge>
              </Group>
            )}
          </Group>
        </Stack>
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
