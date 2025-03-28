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
import { HiLockClosed } from "react-icons/hi2";
import { RiBookLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";
import { LiaUserSolid } from "react-icons/lia";
import { IoRocketOutline } from "react-icons/io5";

const ProjectsCard = (props: any) => {
  const { project } = props;
  return (
    <Card p="md" radius="md" withBorder shadow="xs" {...props}>
      <Stack gap={10} justify="space-between" h="100%">
        <Stack gap={7}>
          <Group justify="space-between" wrap="nowrap">
            <Flex gap={10} align="center" justify="start">
              {project.disabled ? (
                <HiLockClosed size={16} color="black" />
              ) : (
                <RiBookLine size={16} color="black" />
              )}
              <Anchor
                c="blue"
                size="1.1rem"
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
          </Group>

          <Text size="0.9rem" c="gray">
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
                {project.tags.map((tag: any) => (
                  <Pill key={tag.id} size="xs" fw={500}>
                    {tag.name}
                  </Pill>
                ))}
              </Flex>
            </Stack>
          )}
        </Stack>

        <Flex gap="md" align="center" justify="start">
          <Tooltip label="Number of applications" withArrow>
            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-dark-4)"
              w="fit-content"
            >
              <Flex gap={5} align="center" justify="center" wrap="nowrap">
                <IoRocketOutline size={16} />
                <Text size="sm">{project.apps_count} apps</Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Members" withArrow>
            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-dark-4)"
              w="fit-content"
            >
              <Flex gap={5} align="center" justify="center" wrap="nowrap">
                <LiaUserSolid size={16} />
                <Text size="sm">{project?.members || 1} members</Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Age of project" withArrow>
            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-dark-4)"
              w="fit-content"
            >
              <Flex gap={5} align="center" justify="center" wrap="nowrap">
                <GoClock size={15} />
                <Text size="sm">{project.age}</Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ProjectsCard;
