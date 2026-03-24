import TitleText from "@/components/TitleText";
import { Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetProject } from "@/utils/helpers";
import AppsList from "@/components/Lists/AppsList";
import { AddServiceButton } from "@/components/Elements/Elements";
import { useState } from "react";
const AppsListPage = () => {
  const { project_id } = useParams();
  const { project } = useGetProject(project_id || "");
  const [refresh, setRefresh] = useState(false);

  return (
    <Stack>
      <TitleText
        loading={false}
        rightSection={
          <AddServiceButton
            project={project}
            setRefresh={setRefresh}
            title="Add App"
            dontShowDatabase
          />
        }
      >
        Applications
      </TitleText>
      <AppsList project_id={project_id} refresh={refresh} />
    </Stack>
  );
};

export default AppsListPage;
