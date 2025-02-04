import React, { useEffect, useState } from "react";
import useGet from "@/utils/useGet";
import { Skeleton, Title } from "@mantine/core";
import ProjectsCard from "@/components/Cards/ProjectsCard";
import { GridLayout } from "@/components/Layouts/ListLayouts";

const ProjectsPage = () => {


  const { data: projectsData, getData, loading, success } = useGet();
  const [projects, setProjects] = useState<any[]>([]);

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
      <Title order={4} mb="md">
        Projects
      </Title>
      <GridLayout columns={3}>
        {loading
          ? [...Array(6)].map((_, index) => (
              <Skeleton key={index} height={100} w="100%" radius="md" />
            ))
          : projects &&
            projects?.map((project: any) => (
              <ProjectsCard project={project} h="100%" />
            ))}
      </GridLayout>
    </div>
  );
};

export default ProjectsPage;
