import React, { useEffect } from "react";
import {
  Card,
  Group,
  Title,
  Stack,
  Badge,
  Text,
  Skeleton,
} from "@mantine/core";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import { Tag } from "@/types/tag";
import { getTagColor } from "@/utils/helpers";

interface TrendingTagsProps {
  title?: string;
  perPage?: number;
}

export default function TrendingTags({
  title = "Trending Tags",
  perPage = 5,
}: TrendingTagsProps) {
  const { data: response, getData, loading } = useGet();

  useEffect(() => {
    getData({
      api: `${API_SOCIALS}`,
      params: { entity: "tags", page: 1, per_page: perPage },
    });
  }, []);

  return (
    <Card p="lg" withBorder radius="lg">
      <Group mb="md">
        <FiTrendingUp size={18} />
        <Title order={4} size="md">
          {title}
        </Title>
      </Group>

      <Stack gap="xs">
        {loading ? (
          <TagsSkeleton />
        ) : (
          response?.data?.tags?.map((tag: Tag) => (
            <Group key={tag.name} justify="space-between">
              <Badge
                variant="outline"
                color={getTagColor(tag.name)}
                component={Link}
                to={`/tags/${tag.name}`}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                # {tag.name}
              </Badge>
              <Group gap={4}>
                <Text size="xs" c="dimmed">
                  {tag.projects_count} projects
                </Text>
              </Group>
            </Group>
          ))
        )}
      </Stack>
    </Card>
  );
}

const TagsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Group key={index} justify="space-between" mb="xs">
          {/* Badge skeleton */}
          <Skeleton height={24} width={Math.random() * 40 + 80} radius="xl" />

          {/* Project count skeleton */}
          <Skeleton height={12} width={Math.random() * 20 + 60} />
        </Group>
      ))}
    </>
  );
};
