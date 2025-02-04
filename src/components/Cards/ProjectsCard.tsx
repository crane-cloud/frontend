import React from "react";
import {
  ActionIcon,
  Anchor,
  Tooltip,
  Card,
  Flex,
  Group,
  Text,
  Divider,
  Stack,
  Pill,
} from "@mantine/core";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";

const ProjectsCard = (props: any) => {
  const { project } = props;
  return (
    <Card p="sm" radius="md" withBorder shadow="sm" {...props}>
      <Group justify="space-between" wrap="nowrap">
        <Flex gap="sm" align="center" justify="start">
          <FaProjectDiagram size={16} color="gray" />
          <Anchor
            fw={700}
            c="blue"
            href={`/projects/${project.id}`}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {project.name}
          </Anchor>
        </Flex>
        <Tooltip label="Number of applications" withArrow>
          <ActionIcon variant="transparent" color="theme.black">
            <MdOutlineRocketLaunch size={16} />
            <Text size="sm">{project.apps_count}</Text>
          </ActionIcon>
        </Tooltip>
      </Group>

      <Text size="sm" c="gray">
        {project.description}
      </Text>
      {project.tags.length > 0 && (
        <Stack gap="5">
          <Divider my="xs" />
          {/* <Flex gap="2" align="center" justify="start">
        <IconCalendar size={15} color="gray" />
        <Text size="xs" c="dimmed">
          {moment(project.date_created).format("MMMM Do, YYYY")}
        </Text>
      </Flex> */}
          <Flex gap="xs">
            {project.tags.map((tag: string) => (
              <Pill key={tag} size="xs" fw={500}>
                {tag}
              </Pill>
            ))}
          </Flex>
        </Stack>
      )}
    </Card>
  );
};

export default ProjectsCard;
