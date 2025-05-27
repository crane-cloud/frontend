import React, { useEffect, useState } from "react";
import useGet from "@/utils/useGet";
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Pagination,
  Paper,
  Skeleton,
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

const ProjectsList = () => {
  const { data: projectsData, getData, loading, success } = useGet();

  const [projects, setProjects] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, toggleViewMode] = useToggle<"grid" | "list">([
    "grid",
    "list",
  ]);

  useEffect(() => {
    getData({
      api: `${API_PROJECTS}`,
      params: { page: currentPage, per_page: 9 },
    });
  }, [currentPage]);

  useEffect(() => {
    if (success) {
      setProjects(projectsData?.data?.projects);
      setPagination(projectsData?.data?.pagination);
    }
  }, [success, projectsData]);

  return (
    <div>
      <TitleText>Projects</TitleText>
      <Paper py="lg" radius="md">
        <Group justify="space-between" align="center">
          <Search type="projects" wide />
          <Group gap={0}>
            <ActionIcon
              variant={viewMode === "grid" ? "filled" : "default"}
              color={viewMode === "grid" ? "blue" : undefined}
              size="lg"
              radius="5 0 0 5"
              onClick={() => toggleViewMode("grid")}
            >
              <HiOutlineSquares2X2 />
            </ActionIcon>
            <ActionIcon
              variant={viewMode === "list" ? "filled" : "default"}
              color={viewMode === "list" ? "blue" : undefined}
              size="lg"
              radius="0 5 5 0"
              onClick={() => toggleViewMode("list")}
            >
              <RxHamburgerMenu />
            </ActionIcon>
          </Group>
          <Button component={Link} to="/projects/create">
            Add New Project
          </Button>
        </Group>
        <Divider mt="lg" mb="md" />

        {loading ? (
          <GridLayout columns={viewMode === "grid" ? 3 : 1}>
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} height={100} w="100%" radius="md" />
            ))}
          </GridLayout>
        ) : projects && projects.length > 0 ? (
          <GridLayout columns={viewMode === "grid" ? 3 : 1}>
            {projects.map((project: any) => (
              <ProjectsCard key={project.id} project={project} h="100%" />
            ))}
          </GridLayout>
        ) : (
          <DataNotFoundMessage
            title="No projects found"
            helpText="Try creating a new project or check the documentation."
            helpLink={`${DOCS_URL}/projects/`}
          />
        )}

        {pagination?.pages > 1 && (
          <>
            <Divider my="md" />

            <Center mt="md">
              <Pagination
                total={pagination.pages}
                value={currentPage}
                onChange={setCurrentPage}
              />
            </Center>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ProjectsList;
