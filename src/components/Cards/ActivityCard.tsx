import {
  beautify,
  formatAbsoluteDate,
  formatRelativeDate,
  getActivityDescription,
  getActivityOperationIcon,
  getStatusColor,
} from "@/utils/helpers";
import { Box, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { ProfileAvatar } from "../Common";
import { useAuth } from "@/utils/AuthContext";
import { UserActivity } from "@/types/activity";

interface ActivityItemProps {
  activity: UserActivity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const { user } = useAuth();

  return (
    <Card key={activity._id.$oid} p="md" radius="lg" withBorder>
      <Stack gap="sm">
        <Group align="flex-start" justify="space-between">
          <Group align="flex-start">
            <ProfileAvatar user={user} size={40} />
            <Box>
              <Stack gap={2}>
                <Text size="sm" fw={600}>
                  {activity.user_name || user.name}
                </Text>
                <Group gap={4} align="center">
                  {getActivityOperationIcon(activity)}
                  <Text size="sm" c="dimmed">
                    {beautify(activity.operation)}
                  </Text>
                </Group>
              </Stack>
            </Box>
          </Group>
          <Stack align="flex-end" gap={4}>
            <Tooltip
              label={formatAbsoluteDate(activity.creation_date)}
              withArrow
            >
              <Text size="xs" c="dimmed" style={{ cursor: "pointer" }}>
                {formatRelativeDate(activity.creation_date)}
              </Text>
            </Tooltip>
            {activity.status && (
              <Text size="xs" fw={700} c={getStatusColor(activity.status)}>
                {activity.status}
              </Text>
            )}
          </Stack>
        </Group>

        <Text size="sm" mt={4}>
          {getActivityDescription(activity.description ?? "")}
        </Text>
      </Stack>
    </Card>
  );
}
