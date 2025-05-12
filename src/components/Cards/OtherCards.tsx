import {
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { PiBuildingsBold } from "react-icons/pi";

function UserProfileCard({ user }: { user: any }) {
  const userStats = [
    { value: user?.follower_count, label: "Followers" },
    { value: user?.following_count, label: "Follows" },
    { value: user?.apps_count, label: "Apps" },
  ];

  return (
    <Card withBorder padding="xl" radius="md" w={350}>
      <Card.Section
        h={140}
        style={{
          backgroundColor:
            "light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-9))",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23dde2e7' fill-opacity='0.54' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <Avatar
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
        size={140}
        radius={80}
        mx="auto"
        mt={-90}
      />
      <Text ta="center" fz="1.3rem" fw={500} mt="sm">
        {user?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.email}
      </Text>
      <StatsList stats={userStats} />
      <Divider my="md" />
      <Stack gap={2}>
        <Text>
          <Group gap={5} fz="0.9rem">
            <PiBuildingsBold size={17} />
            {user?.organization || "Makerere University"}
          </Group>
        </Text>
        <Text fz="sm" c="dimmed">
          Joined Cranecloud {user?.age}
        </Text>
      </Stack>
      {/* {authUser?.id !== user?.id && (
        <Button fullWidth radius="md" mt="xl" size="md" variant="default">
          Follow
        </Button>
      )} */}
    </Card>
  );
}

export default UserProfileCard;
export const StatsList = ({
  stats,
  justify = "center",
}: {
  stats: any;
  justify?: string;
}) => {
  return (
    <Group mt="md" justify={justify} gap={30}>
      {stats.map((stat: any) => (
        <div key={stat.label}>
          <Text ta="center" fz="lg" fw={500}>
            {stat.value}
          </Text>
          {stat?.tooltip ? (
            <Tooltip label={stat.tooltip} withArrow position="bottom">
              <Text
                ta="center"
                fz="sm"
                c="dimmed"
                lh={1}
                style={{ cursor: "pointer" }}
              >
                {stat.label}
              </Text>
            </Tooltip>
          ) : (
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
              {stat.label}
            </Text>
          )}
        </div>
      ))}
    </Group>
  );
};
