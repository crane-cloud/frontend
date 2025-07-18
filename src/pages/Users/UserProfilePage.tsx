import UserProfileCard, { StatsList } from "@/components/Cards/OtherCards";
import TitleText from "@/components/TitleText";
import { useAuth } from "@/utils/AuthContext";
import { useSetContainerSize, useSetNoSidebar } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { Card, Flex, Stack } from "@mantine/core";
import React, { useEffect } from "react";

const UserProfilePage = () => {
  const { user } = useAuth();
  const { getData: getUser, data: userData } = useGet();

  useSetNoSidebar();
  useSetContainerSize("lg");
  useEffect(() => {
    if (user) {
      getUser({ api: `/users/${user?.id}` });
    }
  }, []);

  const userStats = (user: any) => [
    { value: user?.projects_count, label: "Projects" },
    { value: user?.apps_count, label: "Apps" },
    {
      value: user?.followed_projects_count,
      label: "Projects Followed",
      tooltip: "The total number of projects you follow",
    },
    {
      value: user?.projects_followers_count,
      label: "Projects Followers",
      tooltip: "The total number of users who follow your projects",
    },
  ];

  return (
    <div>
      <TitleText>User Profile</TitleText>
      <Flex gap={20}>
        <UserProfileCard user={userData?.data?.user || {}} />
        <Stack style={{ flex: 1 }}>
          <TitleText>Stats</TitleText>
          <Card withBorder padding="xl" radius="md">
            <StatsList
              justify="space-between"
              stats={userStats(userData?.data?.user)}
            />
          </Card>
        </Stack>
      </Flex>
    </div>
  );
};

export default UserProfilePage;
 