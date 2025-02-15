import React, { useContext, useEffect, useState } from "react";
import TitleText from "@/components/TitleText";
import { useGetProject } from "@/utils/helpers";
import {
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import { MenuContext } from "../../components/Layouts/DashboardLayout";
import { MembersSection } from "./ProjectUsers";
import usePost from "@/utils/usePost";
import { HiLockClosed, HiLockOpen, HiTrash } from "react-icons/hi2";
import { API_PROJECTS } from "@/utils/apis";
import { ModalConfirm } from "@/components/Elements/Modals";

const ProjectSettingsPage = () => {
  const { project_id } = useParams();
  const { project, cluster } = useGetProject(project_id || "");
  const { setContainerSize } = useContext(MenuContext);

  useEffect(() => {
    setContainerSize("md");
    return () => {
      setContainerSize("xl");
    };
  }, [setContainerSize]);

  return (
    <div>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt={10}>
          <GeneralTab project={project} cluster={cluster} />
        </Tabs.Panel>

        <Tabs.Panel value="members" pt={10}>
          <MembersSection project={project} />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt={10}>
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default ProjectSettingsPage;

const GeneralTab = ({ project, cluster }: { project: any; cluster: any }) => {
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [disableConfirmOpened, setDisableConfirmOpened] = useState(false);
  const [enableConfirmOpened, setEnableConfirmOpened] = useState(false);

  const {
    uploadData: deleteProject,
    submitting: deletingProject,
    success: deletedProjectSuccess,
  } = usePost();
  const {
    uploadData: disableProject,
    submitting: disablingProject,
    success: disabledProjectSuccess,
  } = usePost();
  const {
    uploadData: enableProject,
    submitting: enablingProject,
    success: enabledProjectSuccess,
  } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if (deletedProjectSuccess || disabledProjectSuccess) {
      navigate("/");
    }
  }, [deletedProjectSuccess, disabledProjectSuccess]);

  useEffect(() => {
    if (enabledProjectSuccess) {
      navigate(`/projects/${project?.id}`);
    }
  }, [enabledProjectSuccess]);

  const handleDelete = () => {
    deleteProject({
      id: project?.id,
      api: API_PROJECTS,
      method: "DELETE",
    });
  };

  const handleDisable = () => {
    disableProject({
      api: `${API_PROJECTS}/${project?.id}/disable`,
    });
  };

  const handleEnable = () => {
    enableProject({
      api: `${API_PROJECTS}/${project?.id}/enable`,
    });
  };

  const projectInfo = [
    {
      label: "Project Name",
      value: project?.name,
    },
    {
      label: "Organization",
      value: project?.organisation || "N/A",
    },
    {
      label: "Project Type",
      value: project?.project_type || "N/A",
    },
    {
      label: "Description",
      value: project?.description,
    },
    {
      label: "Age",
      value: project?.age || "N/A",
    },
    {
      label: "Datacenter",
      value: cluster?.name,
    },
  ];

  return (
    <Stack gap={30}>
      <Stack gap={0}>
        <TitleText>Project Details</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Grid>
            {projectInfo.map((info) => (
              <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
                <Flex>
                  <Stack gap={1}>
                    <Text className="subtitle">{info.label}</Text>
                    <Text>{info.value}</Text>
                  </Stack>
                </Flex>
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      </Stack>
      <Stack gap={0}>
        <TitleText>Danger Zone</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10}>
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Update Project</Text>
                <Text className="subtext">
                  Modify the project name and description
                </Text>
              </Stack>
              <Button variant="outline">Update</Button>
            </Group>
            <Divider />
            {project.disabled ? (
              <Group justify="space-between" align="center">
                <Stack gap={0}>
                  <Text className="title">Enable Project</Text>
                  <Text className="subtext">
                    Enable project to allow access to resources.
                  </Text>
                </Stack>
                <Button
                  variant="outline"
                  color="green"
                  onClick={() => setEnableConfirmOpened(true)}
                  leftSection={<HiLockOpen />}
                >
                  Enable
                </Button>
              </Group>
            ) : (
              <Group justify="space-between" align="center">
                <Stack gap={0}>
                  <Text className="title">Disable Project</Text>
                  <Text className="subtext">
                    Prevent project from being billed by blocking access to it's
                    resources.
                  </Text>
                </Stack>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => setDisableConfirmOpened(true)}
                  leftSection={<HiLockClosed />}
                >
                  Disable
                </Button>
              </Group>
            )}
            <Divider />
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Delete Project</Text>
                <Text className="subtext">
                  This action is irreversible and will delete the project
                  permanently.
                </Text>
              </Stack>
              <Button
                variant="outline"
                color="red"
                onClick={() => setDeleteConfirmOpened(true)}
                leftSection={<HiTrash />}
              >
                Delete
              </Button>
            </Group>
          </Stack>
          <ModalConfirm
            opened={deleteConfirmOpened}
            onClose={() => setDeleteConfirmOpened(false)}
            title="Delete Project"
            buttonColor="red"
            buttonText="Delete"
            onConfirm={handleDelete}
            loading={deletingProject}
            leftSection={<HiTrash />}
          >
            Are you sure you want to delete <b>{project?.name}</b> project
            permanently? This action cannot be undone.
          </ModalConfirm>
          <ModalConfirm
            opened={disableConfirmOpened}
            onClose={() => setDisableConfirmOpened(false)}
            title="Disable Project"
            buttonText="Disable"
            onConfirm={handleDisable}
            loading={disablingProject}
            buttonColor="red"
            leftSection={<HiLockClosed />}
          >
            Are you sure you want to disable <b>{project?.name}</b> project?
            This action will prevent the project contents from being accessed.
          </ModalConfirm>
          <ModalConfirm
            opened={enableConfirmOpened}
            onClose={() => setEnableConfirmOpened(false)}
            title="Enable Project"
            buttonText="Enable"
            buttonColor="green"
            onConfirm={handleEnable}
            loading={enablingProject}
            leftSection={<HiLockOpen />}
          >
            Are you sure you want to enable <b>{project?.name}</b> project? This
            action will allow the project contents to be accessed.
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};
