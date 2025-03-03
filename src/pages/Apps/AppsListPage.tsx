import TitleText from "@/components/TitleText";
import { Button, Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProject } from "@/utils/helpers";
import { GoPlus } from "react-icons/go";
import AppsList from "@/components/Lists/AppsList";
const AppsListPage = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");
  const navigate = useNavigate();

  return (
    <Stack>
      <TitleText
        loading={false}
        rightSection={
          <Button
            leftSection={<GoPlus />}
            onClick={() => navigate(`/projects/${project_id}/apps/create`)}
          >
            Add App
          </Button>
        }
      >
        Applications
      </TitleText>
      <AppsList project_id={project_id} />
    </Stack>
  );
};

export default AppsListPage;
