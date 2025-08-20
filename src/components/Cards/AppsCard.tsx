import { beautify } from "@/utils/helpers";
import { Anchor, Card, Flex, Group, Pill, Stack, Text } from "@mantine/core";
import { FiLayers } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { HiMiniCubeTransparent } from "react-icons/hi2";
import { PiShareFatThin } from "react-icons/pi";
import { SiJupyter } from "react-icons/si";

const AppsCard = (props: any) => {
  const { app, project_id } = props;

  return (
    <Card p="md" radius="md" withBorder>
      <Group wrap="nowrap" gap={10}>
        {app.is_notebook ? (
          <SiJupyter size={35} color="#f57c00" />
        ) : (
          <FiLayers size={20} color="gray" />
        )}
        <Stack gap={3} flex={1}>
          <Anchor
            fw={600}
            href={`/projects/${project_id}/apps/${app.id}`}
            truncate
            style={{ flex: 1 }}
            c="var(--mantine-color-text)"
            className="no-scale"
          >
            {beautify(app.name)}
          </Anchor>

          <Anchor
            href={app.url}
            target="_blank"
            c="var(--mantine-color-text)"
            maw="95%"
            className="no-scale"
          >
            <Group gap={4} align="center" wrap="nowrap">
              <Text size="0.8rem" truncate>
                {new URL(app.url).hostname}
              </Text>
              <PiShareFatThin size={15} />
            </Group>
          </Anchor>
        </Stack>
      </Group>

      {app?.image && !app?.is_notebook && (
        <Pill w="fit-content" mt="sm">
          <Flex gap={5} wrap="nowrap" w="fit-content" align="center">
            <HiMiniCubeTransparent size={14} />
            <Text size="sm" truncate>
              {app?.image}
            </Text>
          </Flex>
        </Pill>
      )}

      <Group justify="space-between" mt="md">
        <Group gap={10} align="center">
          {app?.is_notebook && (
            <Pill w="fit-content">
              <Flex
                gap={5}
                wrap="nowrap"
                w="fit-content"
                align="center"
                justify="center"
              >
                <SiJupyter size={13} color="#f57c00" />
                <Text size="xs" truncate>
                  Notebook
                </Text>
              </Flex>
            </Pill>
          )}
          <Flex gap={5} c="var(--mantine-color-dark-3)" align="center">
            <GoClock size={13} />
            <Text size="xs">{app.age}</Text>
          </Flex>
        </Group>

        <Pill
          size="xs"
          fw={500}
          bg={getStatusColor(app.app_running_status).background}
          c={getStatusColor(app.app_running_status).text}
        >
          {app.app_running_status}
        </Pill>
      </Group>
    </Card>
  );
};

// Helper function for status colors
const getStatusColor = (status: string) => {
  const colors: Record<string, { background: string; text: string }> = {
    running: { background: "#e3fbe3", text: "#1a7a1a" },
    deployed: { background: "#e3f2fd", text: "#1a4a7a" },
    unknown: { background: "", text: "" },
  };
  return colors[status.toLowerCase()] || colors.unknown;
};

export default AppsCard;
