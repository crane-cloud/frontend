import React, { useEffect } from "react";
import useGet from "@/utils/useGet";
import { Button, Divider, Group, Paper, Skeleton, Tabs } from "@mantine/core";
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
  const { data: projectsData, getData, loading, success } = useGet();
  const { user } = useAuth();
  const [viewMode, toggleViewMode] = useToggle<"grid" | "list">([
    "grid",
    "list",
  ]);
  const [activeTab, setActiveTab] = React.useState<string | null>("owned");

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
        params: { page, per_page: 10 },
      });
    },
  });

  // Initial data fetch
  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: 1, per_page: 10 },
    });
  }, []);

  const ownedProjects = projects.filter(
    (project: any) => project.owner_id === user?.id,
  );
  const invitedProjects = projects.filter(
    (project: any) => project.owner_id !== user?.id,
  );

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

        <Tabs value={activeTab} onChange={setActiveTab} mt="md">
          <Tabs.List>
            <Tabs.Tab value="owned">My Projects</Tabs.Tab>
            <Tabs.Tab value="invited">Shared Projects</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="owned" pt="xs">
            {!loading && ownedProjects.length === 0 ? (
              <DataNotFoundMessage
                title="No projects found"
                helpText="Try creating a new project or check the documentation."
                helpLink={`${DOCS_URL}/projects/`}
              />
            ) : (
              <GridLayout columns={viewMode === "grid" ? 3 : 1}>
                {ownedProjects.map((project: any, index: number) => {
                  const isLast = index === ownedProjects.length - 1;
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
            )}
          </Tabs.Panel>

          <Tabs.Panel value="invited" pt="xs">
            {!loading && invitedProjects.length === 0 ? (
              <DataNotFoundMessage
                title="No invited projects"
                helpText="You have not been invited to any projects yet."
                helpLink={`${DOCS_URL}/projects/`}
              />
            ) : (
              <GridLayout columns={viewMode === "grid" ? 3 : 1}>
                {invitedProjects.map((project: any, index: number) => {
                  const isLast = index === invitedProjects.length - 1;
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
            )}
          </Tabs.Panel>
        </Tabs>

        {loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} height={100} w="100%" radius="md" />
          ))}
      </Paper>
    </div>
  );
};

export default ProjectsList;
