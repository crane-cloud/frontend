import React, { useEffect } from "react";
import { Card, Group, Title, SimpleGrid } from "@mantine/core";
import { FiUserPlus } from "react-icons/fi";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import { User } from "@/types/user";
import UserCard from "../Cards/UserCard";

export default function SuggestedUsersGrid({
  title,
  perPage = 12, // Slightly higher default for a grid layout
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
      <Group mb="md">
        <FiUserPlus size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>

      {/* SimpleGrid handles the responsive layout automatically. 
        1 column on mobile, 2 on small screens, 3 on medium, 4 on large.
      */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 2 }} spacing="md">
        {response?.data?.users?.map((user: User) => (
          <UserCard
            key={user.username}
            user={user}
            isCard // Changed to true so it looks like a distinct grid item
            showBorder // Keeps the border for definition
          />
        ))}
      </SimpleGrid>
    </Card>
  );
}
