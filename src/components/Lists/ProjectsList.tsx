import React, { useEffect, useState } from "react";
import useGet from "@/utils/useGet";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
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

const ProjectsList = () => {
  const { data: projectsData, getData, loading, success } = useGet();
  const [projects, setProjects] = useState<any[]>([]);
  const [viewMode, toggleViewMode] = useToggle<"grid" | "list">([
    "grid",
    "list",
  ]);

  useEffect(() => {
    getData({
      api: "/projects",
    });
  }, []);

  useEffect(() => {
    if (success) {
      setProjects(projectsData?.data?.projects);
    }
  }, [success]);

  return (
    <div>
      <TitleText>Projects</TitleText>
      <Paper py="lg" radius="md">
        <Group justify="space-between" align="center">
          <Search type="projects" />
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
        <GridLayout columns={viewMode === "grid" ? 3 : 1}>
          {loading
            ? [...Array(6)].map((_, index) => (
              <Skeleton key={index} height={100} w="100%" radius="md" />
            ))
            : projects &&
            projects?.map((project: any) => (
              <ProjectsCard key={project?.id} project={project} h="100%" />
            ))}
        </GridLayout>
      </Paper>
    </div>
  );
};

export default ProjectsList;
