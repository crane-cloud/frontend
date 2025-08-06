import { Box, Card, Divider, Group, Stack, Text, Tooltip } from "@mantine/core";
import { PiBuildingsBold } from "react-icons/pi";
import { ProfileAvatar } from "../Common";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS_DATA } from "@/utils/constants";

function UserProfileCard({ user }: { user: any }) {
  const userStats = [
    { value: user?.follower_count, label: "Followers" },
    { value: user?.following_count, label: "Follows" },
    { value: user?.apps_count, label: "Apps" },
  ];
  const socialLinks = user?.social_links || {};

  const links = Object.entries(socialLinks).map(([key, value]) => ({
    platform: key,
    url: value,
  }));

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
      <Box mx="auto" mt={-90}>
        <ProfileAvatar user={user} size={140} />
      </Box>
      <Text ta="center" fz="1.3rem" fw={500} mt="sm">
        {user?.username}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user?.email}
      </Text>
      <StatsList stats={userStats} />
      <Divider my="md" />
      <Stack gap={7}>
        <Text fz="sm" c="dimmed" ta="center">
          Joined Cranecloud {user?.age}
        </Text>

        {user?.biography && (
          <Text fz="sm" ta="center" lineClamp={3} fw={500}>
            {user?.biography}
          </Text>
        )}
      </Stack>
      <Divider my="md" />
      <Stack gap={7} fz="sm" fw={500}>
        {user?.organisation && (
          <Group gap={10}>
            <PiBuildingsBold size={16} />
            {user?.organisation}
          </Group>
        )}
        {links.map((link, index) => {
          const platform = SOCIAL_LINKS_DATA.find(
            (p) => p.value === link.platform,
          );
          const IconComponent = platform?.icon;

          return (
            <Link key={index} to={link.url as string} target="_blank">
              <Group gap={10} align="center">
                {IconComponent && (
                  <IconComponent size={16} color={platform?.color} />
                )}
                <Text size="sm" style={{ flex: 1 }}>
                  {link.url as string}
                </Text>
              </Group>
            </Link>
          );
        })}
      </Stack>
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
