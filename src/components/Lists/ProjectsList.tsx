import React, { useEffect, useMemo } from "react";
import useGet from "@/utils/useGet";
import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import ProjectsCard from "@/components/Cards/ProjectsCard";
import { GridLayout } from "@/components/Layouts/ListLayouts";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useToggle } from "@mantine/hooks";
import TitleText from "../TitleText";
import { Link } from "react-router-dom";
import Search from "../Elements/Search";
import { API_PROJECTS } from "@/utils/apis";
import { DOCS_URL } from "@/config";
import DataNotFoundMessage from "@/pages/common/DataFoundMessage";
import { useInfiniteScrollWithPagination } from "@/hooks/generic/useInfiniteScroll";

const ProjectsList = () => {
  const { data: projectsData, getData, loading, success } = useGet();

  const [viewMode, toggleViewMode] = useToggle<"grid" | "list">([
    "grid",
    "list",
  ]);

  const { items: projects, lastElementRef } = useInfiniteScrollWithPagination({
    loading,
    success,
    data: projectsData,
    extractItems: (data) => {
      const owned = data?.data?.projects || [];
      const invited = (data?.data?.pending_invitations || []).map(
        (project: any) => ({
          ...project,
          is_invited: true,
        }),
      );
      return [...invited, ...owned];
    },
    extractPagination: (data) => data?.data?.pagination || {},
    extractItemId: (project) => project.id,
    onLoadMore: (page) => {
      getData({
        api: `${API_PROJECTS}`,
        params: { page, per_page: 20 },
      });
    },
  });

  // Initial fetch
  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 20 },
    });
  }, []);

  const { invitedProjects, personalProjects } = useMemo(() => {
    const invited = projects.filter((p: any) => p.is_invited === true);
    const personal = projects.filter((p: any) => !p.is_invited);
    return { invitedProjects: invited, personalProjects: personal };
  }, [projects]);

  const ProjectListSection = (
    title: string,
    projects: any[],
    showBadge = false,
  ) => {
    if (projects.length === 0) {
      return null;
    }

    return (
      <Stack gap="md">
        <Group gap="xs" align="center">
          <Text size="lg" fw={600} c="dimmed">
            {title}
          </Text>
          {showBadge && (
            <Badge color="red" variant="filled" size="sm">
              {projects.length}
            </Badge>
          )}
        </Group>
        <GridLayout columns={viewMode === "grid" ? 3 : 1}>
          {projects.map((project: any, index: number) => {
            const isLast = index === projects.length - 1;
            return (
              <div
                key={project.id}
                ref={isLast ? lastElementRef : null}
                style={{ height: "100%" }}
              >
                <ProjectsCard project={project} h="100%" />
              </div>
            );
          })}
        </GridLayout>
      </Stack>
    );
  };

  return (
    <div>
      <TitleText>Projects</TitleText>

      <Box py="lg">
        <Group justify="space-between" align="center">
          <Search type="projects" wide />
          <Group gap={0}>
            <Button.Group>
              <Button
                variant={viewMode === "grid" ? "filled" : "default"}
                onClick={() => toggleViewMode("grid")}
              >
                <HiOutlineSquares2X2 />
              </Button>
              <Button
                variant={viewMode === "list" ? "filled" : "default"}
                onClick={() => toggleViewMode("list")}
              >
                <RxHamburgerMenu />
              </Button>
            </Button.Group>
          </Group>
          <Button component={Link} to="/projects/create">
            Add New Project
          </Button>
        </Group>

        <Divider mt="lg" mb="md" />

        {!loading && projects.length === 0 ? (
          <DataNotFoundMessage
            title="No projects found"
            helpText="Try creating a new project or check the documentation."
            helpLink={`${DOCS_URL}/projects/`}
          />
        ) : (
          <Stack gap="xl">
            {invitedProjects.length > 0 &&
              ProjectListSection("Pending Invitations", invitedProjects, true)}

            {personalProjects.length > 0 &&
              ProjectListSection(
                invitedProjects.length > 0 ? "Projects List" : "",
                personalProjects,
              )}

            {loading && (
              <GridLayout columns={viewMode === "grid" ? 3 : 1}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} height={100} w="100%" radius="md" />
                ))}
              </GridLayout>
            )}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default ProjectsList;
