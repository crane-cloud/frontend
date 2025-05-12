import React from "react";
import ProjectsList from "@/components/Lists/ProjectsList";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
const LandingPage = () => {
  useSetNoSidebar();
  useSetContainerSize("lg");
  return (
    <div>
      <ProjectsList />
    </div>
  );
};

export default LandingPage;
