import { useEffect } from "react";
import { Card, Group, Title, Stack, Badge, Skeleton } from "@mantine/core";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import useGet from "@/utils/useGet";
import { API_SOCIALS } from "@/utils/apis";
import { Tag } from "@/types/tag";
import { IoTrendingUp } from "react-icons/io5";

interface TrendingTagsProps {
  title?: string;
  perPage?: number;
}

export default function TrendingTags({
  title = "Trending Tags",
  perPage = 14,
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
          <Group gap="xs">
            {response?.data?.tags?.map((tag: Tag) => (
              <Badge
                key={tag.id}
                variant="default"
                component={Link}
                to={`/tags/${tag.name}`}
                size="md"
                radius="md"
                pr={4}
                tt="capitalize"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                rightSection={
                  <Badge
                    variant="light"
                    color="gray"
                    size="sm"
                    radius="sm"
                    style={{
                      padding: "0 6px",
                      height: 13,
                      minWidth: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--mantine-color-dimmed)",
                    }}
                    leftSection={<IoTrendingUp />}
                  >
                    {tag.projects_count}
                  </Badge>
                }
              >
                {tag.name}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>
    </Card>
  );
}

const TagsSkeleton = () => {
  return (
    <Group gap="xs">
      {Array.from({ length: 14 }).map((_, index) => (
        <Skeleton
          key={index}
          height={24}
          width={Math.random() * 40 + 60}
          radius="xl"
        />
      ))}
    </Group>
  );
};
