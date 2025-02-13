import AppsList from "@/components/Layouts/AppsList";
import TitleText from "@/components/TitleText";
import { Button, Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetProject } from "@/utils/helpers";
import { GoPlus } from "react-icons/go";
const AppsListPage = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");

  return (
    <Stack>
      <TitleText
        loading={false}
        rightSection={<Button leftSection={<GoPlus />}>Add App</Button>}
      >
        Applications
      </TitleText>
      <AppsList project_id={project_id} />
    </Stack>
  );
};

export default AppsListPage;
