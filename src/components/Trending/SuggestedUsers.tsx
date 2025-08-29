import React, { useEffect } from "react";
import { Card, Group, Title, Stack, Divider } from "@mantine/core";
import { FiUserPlus } from "react-icons/fi";
import useGet from "@/utils/useGet";
import { API_USERS } from "@/utils/apis";
import { User } from "@/types/user";
import UserCard from "../Cards/UserCard";

export default function SuggestedUsers() {
  const { data: response, getData } = useGet();

  useEffect(() => {
    getData({ api: `${API_USERS}` });
  }, []);

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          Suggested For You
        </Title>
      </Group>
      <Stack gap={0}>
        {response?.data?.users
          ?.slice(0, 5)
          ?.map((user: User, index: number) => (
            <React.Fragment key={user.username}>
              <UserCard user={user} />
              {index < response?.data?.users?.slice(0, 5).length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
      </Stack>
    </Card>
  );
}
