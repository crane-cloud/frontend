import { useParams } from "react-router-dom";
import AppsList from "@/components/Layouts/AppsList";
import { Button, Menu } from "@mantine/core";
import TitleText from "@/components/TitleText";
import { IoIosArrowDown } from "react-icons/io";
import { PiCubeLight } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { useGetProject } from "@/utils/helpers";

const ProjectDetailsPage = () => {
  const { project_id } = useParams();
  const { project, loading, success } = useGetProject(project_id || "");

  return (
    <div>
      {success && (
        <TitleText loading={loading} rightSection={<AddServiceButton />}>
          {project?.name} Dashboard
        </TitleText>
      )}

      <AppsList project_id={project_id} />
      {/* <DatabaseList project_id={id} /> */}
    </div>
  );
};

export default ProjectDetailsPage;

const AddServiceButton = () => {
  const menuItems = [
    { label: "Add Application", icon: <PiCubeLight /> },
    {
      label: "Add Database",
      icon: <GoDatabase />,
    },
  ];
  return (
    <Menu transitionProps={{ transition: "pop-top-right" }}>
      <Menu.Target>
        <Button rightSection={<IoIosArrowDown />}>Add Service</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {menuItems.map((item) => (
          <Menu.Item key={item.label} leftSection={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
