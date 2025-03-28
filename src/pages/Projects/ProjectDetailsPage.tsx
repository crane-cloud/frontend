import { useNavigate, useParams } from "react-router-dom";
import { Button, Menu } from "@mantine/core";
import TitleText from "@/components/TitleText";
import { IoIosArrowDown } from "react-icons/io";
import { PiCubeLight, PiFlask } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { useGetProject } from "@/utils/helpers";
import AppsList from "@/components/Lists/AppsList";
import { RiRobot2Line } from "react-icons/ri";
import { ModalConfirm } from "@/components/Elements/Modals";
import { useState } from "react";
import { DeployNotebookForm } from "@/components/Forms/CreateAppForm";

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

const AddServiceButton = ({
  project,
  setRefresh,
}: {
  project: any;
  setRefresh: (value: boolean) => void;
}) => {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [trainModalOpened, setTrainModalOpened] = useState(false);
  const menuItems = [
    {
      label: "Deploy Application",
      icon: <PiCubeLight />,
      onClick: () => navigate(`/projects/${project_id}/apps/create`),
    },

    {
      label: "Spin Up a Database",
      icon: <GoDatabase />,
      onClick: () => navigate(`/projects/${project_id}/databases`),
    },
    {
      label: "Train a Model",
      icon: <PiFlask />,
      onClick: () => setTrainModalOpened(true),
    },

    {
      label: "Deploy a Trained Model",
      icon: <RiRobot2Line />,
      onClick: () => navigate(`/projects/${project_id}/models/create`),
    },
  ];
  return (
    <div>
      <Menu transitionProps={{ transition: "pop-top-right" }}>
        <Menu.Target>
          <Button rightSection={<IoIosArrowDown />}>Add Service</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.label}
              leftSection={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <ModalConfirm
        opened={trainModalOpened}
        onClose={() => setTrainModalOpened(false)}
        title="Train a Model"
        buttonText="Train"
        onConfirm={() => {}}
        size="xl"
        showFooterActions={false}
      >
        <DeployNotebookForm
          project={project}
          showTitle={false}
          onCancel={() => setTrainModalOpened(false)}
          refresh={() => setRefresh(true)}
        />
      </ModalConfirm>
    </div>
  );
};
