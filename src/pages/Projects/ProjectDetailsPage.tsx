import { useParams } from "react-router-dom";
import TitleText from "@/components/TitleText";
import { useGetProject } from "@/utils/helpers";
import AppsList from "@/components/Lists/AppsList";
import { AddServiceButton } from "@/components/Elements/Elements";
import { useState } from "react";

const ProjectDetailsPage = () => {
  const { project_id } = useParams();
  const { project, loading, success } = useGetProject(project_id || "");

  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      {success && (
        <TitleText
          loading={loading}
          rightSection={
            <AddServiceButton project={project} setRefresh={setRefresh} />
          }
        >
          {project?.name} Dashboard
        </TitleText>
      )}

      <AppsList project_id={project_id} refresh={refresh} />
      {/* <DatabaseList project_id={id} /> */}
    </div>
  );
};

export default ProjectDetailsPage;
