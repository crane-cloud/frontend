import {
  beautify,
  formatAbsoluteDate,
  formatRelativeDate,
  getActivityDescription,
  getActivityOperationIcon,
  getStatusColor,
} from "@/utils/helpers";
import { Box, Button, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { ProfileAvatar } from "../Common";
import { useAuth } from "@/utils/AuthContext";
import { Link } from "react-router-dom";
import { UserActivity } from "@/types/activity";
import { FiCornerDownRight } from "react-icons/fi";

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

        <Group gap="xs">
          {activity.a_project_id && (
            <Button
              variant="light"
              size="xs"
              color="blue"
              component={Link}
              to={`/projects/${activity.a_project_id}`}
            >
              <Group gap={4}>
                <FiCornerDownRight />
                View Project
              </Group>
            </Button>
          )}
          {activity.a_db_id && (
            <Button
              variant="light"
              size="xs"
              color="blue"
              component={Link}
              to={`/profile/${activity.a_db_id}`}
            >
              <Group gap={4}>
                <FiCornerDownRight />
                View Database
              </Group>
            </Button>
          )}
          {activity.a_app_id && (
            <Button
              variant="light"
              size="xs"
              color="blue"
              component={Link}
              to={`/projects/${activity.a_project_id}/apps/${activity.a_app_id}`}
            >
              <Group gap={4}>
                <FiCornerDownRight />
                View App
              </Group>
            </Button>
          )}
          {activity.operation === "Follow" && activity.a_user_id && (
            <Button
              variant="light"
              size="xs"
              color="blue"
              component={Link}
              to={`/profile/${activity.a_user_id}`}
            >
              <Group gap={4}>
                <FiCornerDownRight />
                View Profile
              </Group>
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  );
}
