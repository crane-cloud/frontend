import React, { useContext, useEffect } from "react";
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
import { useParams } from "react-router-dom";

import { MenuContext } from "../Layouts/DashboardLayout";
import { MembersSection } from "./ProjectUsers";

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
  const projectInfo = [
    {
      label: "Project Name",
      value: project?.name,
    },
    {
      label: "Organization",
      value: project?.organisation,
    },
    {
      label: "Project Type",
      value: project?.project_type,
    },
    {
      label: "Description",
      value: project?.description,
    },
    {
      label: "Age",
      value: project?.age,
    },
    {
      label: "Cluster",
      value: cluster?.name,
    },
  ];
  return (
    <Stack gap={30}>
      <Stack gap={0}>
        <TitleText>Project Details</TitleText>
        <Card p="lg" radius="md" shadow="xs" withBorder>
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
        <Card p="lg" radius="md" shadow="xs" withBorder>
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
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Disable Project</Text>
                <Text className="subtext">
                  Prevent project from being billed by blocking access to it's
                  resources.
                </Text>
              </Stack>
              <Button variant="outline" color="red">
                Disable
              </Button>
            </Group>
            <Divider />
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Delete Project</Text>
                <Text className="subtext">
                  This action is irreversible and will delete the project
                  permanently.
                </Text>
              </Stack>
              <Button variant="outline" color="red">
                Delete
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};
