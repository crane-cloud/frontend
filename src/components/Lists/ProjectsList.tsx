import React, { useEffect, useState, useMemo } from "react";
import useGet from "@/utils/useGet";
import {
  Badge,
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
import { useAuth } from "@/utils/AuthContext";

const ProjectsList = () => {
  const { user } = useAuth();
  const { data: projectsData, getData, loading, success } = useGet();
  const {
    data: membersData,
    getData: getProjectMembers,
    success: membersSuccess,
  } = useGet();

  const [membersLoaded, setMembersLoaded] = useState(false);
  const [projectMembersMap, setProjectMembersMap] = useState<
    Record<string, any[]>
  >({});
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const [viewMode, toggleViewMode] = useToggle<"grid" | "list">([
    "grid",
    "list",
  ]);

  const { items: projects, lastElementRef } = useInfiniteScrollWithPagination({
    loading,
    success,
    data: projectsData,
    extractItems: (data) => data?.data?.projects || [],
    extractPagination: (data) => data?.data?.pagination || {},
    extractItemId: (project) => project.id,
    onLoadMore: (page) => {
      getData({
        api: `${API_PROJECTS}`,
        params: { page, per_page: 20 },
      });
    },
  });

  // Initial data fetch
  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 20 },
    });
  }, []);

  // Fetch members for each project
  useEffect(() => {
    if (projects.length > 0) {
      const projectsToFetch = projects.filter(
        (project: any) => !projectMembersMap[project.id],
      );

      if (projectsToFetch.length > 0 && !currentProjectId) {
        const nextProject = projectsToFetch[0];
        setCurrentProjectId(nextProject.id);
        getProjectMembers({
          api: `${API_PROJECTS}/${nextProject.id}/users`,
        });
      }
    }
  }, [projects, projectMembersMap, currentProjectId]);

  // Store members data when fetched
  useEffect(() => {
    if (membersSuccess && membersData && currentProjectId) {
      setProjectMembersMap((prev) => ({
        ...prev,
        [currentProjectId]: membersData?.data?.project_users || [],
      }));

      // Reset to fetch next project
      setCurrentProjectId(null);

      // Check if we've loaded all projects' members
      const allMembersLoaded = projects.every(
        (project) =>
          projectMembersMap[project.id] || project.id === currentProjectId,
      );

      if (allMembersLoaded) {
        setMembersLoaded(true);
      }
    }
  }, [membersSuccess, membersData, currentProjectId, projects]);

  const { invitedProjects, personalProjects } = useMemo(() => {
    const invited: any[] = [];
    const personal: any[] = [];

    projects.forEach((project: any) => {
      const projectMembers = projectMembersMap[project.id] || [];

      // Find the current user's record in this project's members
      const currentUserRecord = projectMembers.find(
        (member: any) => member.user?.id === user?.id,
      );

      // Check if current user has a pending invitation
      if (
        currentUserRecord &&
        currentUserRecord.accepted_collaboration_invite === false
      ) {
        invited.push(project);
      } else {
        personal.push(project);
      }
    });

    return { invitedProjects: invited, personalProjects: personal };
  }, [projects, projectMembersMap, user?.id]);

  const renderProjectSection = (
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

      <Paper py="lg" radius="md">
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
              renderProjectSection(
                "Pending Invitations",
                invitedProjects,
                true,
              )}

            {personalProjects.length > 0 &&
              renderProjectSection("Projects List", personalProjects)}

            {!membersLoaded && (
              <GridLayout columns={viewMode === "grid" ? 3 : 1}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} height={100} w="100%" radius="md" />
                ))}
              </GridLayout>
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
      </Paper>
    </div>
  );
};

export default ProjectsList;
