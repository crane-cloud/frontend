import React from "react";
import ProjectsList from "@/components/Lists/ProjectsList";
import { useSetHomeSidebar } from "@/utils/helpers";
const LandingPage = () => {
  useSetHomeSidebar();
  return (
    <div>
      <ProjectsList />
    </div>
  );
};

export default LandingPage;
