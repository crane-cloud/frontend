import ProjectsList from "@/components/Lists/ProjectsList";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import React from "react";

const ProjectListPage = () => {
  useSetNoSidebar();
  useSetContainerSize("xl");
  return <ProjectsList />;
};

export default ProjectListPage;
