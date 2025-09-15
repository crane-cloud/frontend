import {
  Timeline,
  Card,
  ScrollArea,
  Text,
  Box,
  Badge,
  Group,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { UserActivity } from "@/types/activity";
import { FiCalendar, FiCheck, FiClock, FiX } from "react-icons/fi";
import { formatRelativeDate, getActivityOperationIcon } from "@/utils/helpers";

const ActivityTimeline = ({ activities }: { activities: UserActivity[] }) => {
  const height =
    activities?.length < 2 ? 150 : activities?.length < 5 ? 200 : 500;

  return (
    <Card withBorder radius="md" p="lg" shadow="sm">
      <ScrollArea h={height}>
        <Timeline bulletSize={32} lineWidth={2} color="gray.3">
          {activities?.map((activity) => (
            <Timeline.Item
              key={activity._id.$oid}
              lineVariant="dashed"
              bullet={getActivityOperationIcon(activity)}
            >
              <Card p="md" radius="md" withBorder>
                <Stack gap="xs">
                  <Group justify="space-between" align="flex-start">
                    <Box flex={1}>
                      <Text size="sm" fw={500} mb={4}>
                        {activity.description ||
                          `${activity.operation} ${activity.model}`}
                      </Text>

                      <Group justify="space-between" align="center" mt={2}>
                        <Badge
                          size="sm"
                          variant="light"
                          color={
                            activity.status === "Success" ? "green" : "red"
                          }
                          leftSection={
                            activity.status === "Success" ? (
                              <FiCheck size={10} />
                            ) : (
                              <FiX size={10} />
                            )
                          }
                          mt={0}
                        >
                          {activity.status}
                        </Badge>

                        <Group gap="xs" align="center">
                          <FiClock
                            size={12}
                            style={{ color: "var(--mantine-color-gray-6)" }}
                          />
                          <Text size="xs" c="dimmed">
                            {formatRelativeDate(activity.creation_date)}
                          </Text>
                        </Group>
                      </Group>
                    </Box>
                  </Group>
                </Stack>
              </Card>
            </Timeline.Item>
          ))}

          <Timeline.Item
            bullet={
              <ActionIcon size="lg" radius="xl" color="gray" variant="light">
                <FiCalendar size={18} />
              </ActionIcon>
            }
          >
            <Text size="sm" c="dimmed" ta="center" py="md">
              No more activity to show
            </Text>
          </Timeline.Item>
        </Timeline>
      </ScrollArea>
    </Card>
  );
};

export default ActivityTimeline;
