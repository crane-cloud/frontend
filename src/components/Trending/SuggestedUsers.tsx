import React, { useEffect } from "react";
import { Card, Group, Title, Stack, Divider } from "@mantine/core";
import { FiUserPlus } from "react-icons/fi";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import { User } from "@/types/user";
import UserCard from "../Cards/UserCard";

export default function SuggestedUsers({
  title,
  perPage = 6,
}: {
  title: string;
  perPage?: number;
}) {
  const { data: response, getData } = useGet();

  useEffect(() => {
    getData({
      api: `${API_SOCIALS}`,
      params: { entity: "users", page: 1, per_page: perPage },
    });
  }, []);

  return (
    <Card p="md" withBorder radius="lg">
      <Group mb="sm">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>
      <Stack gap={0}>
        {response?.data?.users?.map((user: User, index: number) => (
          <React.Fragment key={user.username}>
            <UserCard user={user} isCard={false} showBorder />
            {index < response?.data?.users?.slice(0, perPage).length - 1 && (
              <Divider />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
}
