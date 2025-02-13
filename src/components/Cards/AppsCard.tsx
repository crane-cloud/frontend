import { beautify } from "@/utils/helpers";
import { Anchor, Card, Flex, Group, Pill, Stack, Text } from "@mantine/core";
import { HiMiniCubeTransparent, HiOutlineCalendar } from "react-icons/hi2";
import { PiCubeLight } from "react-icons/pi";

const AppsCard = (props: any) => {
  const { app } = props;

  return (
    <Card p="sm" radius="md" withBorder shadow="sm">
      <Group wrap="nowrap" gap={10}>
        <PiCubeLight size={30} color="gray" />
        <Stack gap={0} flex={1}>
          <Group justify="space-between" wrap="nowrap">
            <Flex gap="sm" align="center">
              <Anchor
                fw={600}
                href={`/apps/${app.id}`}
                truncate
                style={{ flex: 1 }}
                c="var(--mantine-color-text)"
              >
                {beautify(app.name)}
              </Anchor>
            </Flex>
          </Group>

          <Anchor href={app.url} target="_blank" c="var(--mantine-color-text)">
            <Group gap={4} align="center" wrap="nowrap">
              <Text size="xs" truncate maw={250}>
                {new URL(app.url).hostname}
              </Text>
            </Group>
          </Anchor>
        </Stack>
      </Group>

      <Pill bg="gray.1" w="fit-content" mt="sm" c="gray.8">
        <Flex gap={5} wrap="nowrap" w="fit-content" align="center">
          <HiMiniCubeTransparent size={14} />
          <Text size="sm" truncate>
            {app.image}
          </Text>
        </Flex>
      </Pill>

      <Group justify="space-between" mt="md">
        <Flex gap={5} c="dimmed">
          <HiOutlineCalendar size={15} />
          <Text size="xs" c="dimmed">
            {app.age}
          </Text>
        </Flex>
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
    unknown: { background: "#f5f5f5", text: "#666" },
  };
  return colors[status.toLowerCase()] || colors.unknown;
};

export default AppsCard;
