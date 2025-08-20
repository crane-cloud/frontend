import React from "react";
import { Card, Group, Title, Stack, Badge, Text } from "@mantine/core";
import { FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

interface TrendingTag {
  name: string;
  projects: number;
  trend: string;
}

interface TrendingTagsProps {
  tags?: TrendingTag[];
  title?: string;
  showTrend?: boolean;
}

const defaultTags: TrendingTag[] = [
  { name: "kubernetes", projects: 450, trend: "+12%" },
  { name: "react", projects: 380, trend: "+8%" },
  { name: "machine-learning", projects: 290, trend: "+15%" },
  { name: "devops", projects: 240, trend: "+5%" },
  { name: "microservices", projects: 180, trend: "+9%" },
];

export default function TrendingTags({
  tags = defaultTags,
  title = "Trending Tags",
  showTrend = true,
}: TrendingTagsProps) {
  return (
    <Card p="lg" withBorder radius="lg">
      <Group mb="md">
        <FiTrendingUp size={20} />
        <Title order={4}>{title}</Title>
      </Group>
      <Stack gap="xs">
        {tags.map((tag) => (
          <Group key={tag.name} justify="space-between">
            <Badge
              variant="light"
              component={Link}
              to={`/tags/${tag.name}`}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              #{tag.name}
            </Badge>
            <Group gap={4}>
              <Text size="xs" c="dimmed">
                {tag.projects}
              </Text>
              {showTrend && (
                <Text size="xs" c="green">
                  {tag.trend}
                </Text>
              )}
            </Group>
          </Group>
        ))}
      </Stack>
    </Card>
  );
}
