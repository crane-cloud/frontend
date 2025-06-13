import { Card, Flex, Grid, Group, Stack, Text } from "@mantine/core";
import React from "react";

interface TDetailsCardProps {
  data: { label: string; value: string | React.ReactNode }[];
}

const DetailsCard = ({ data }: TDetailsCardProps) => {
  return (
    <Card p="lg" radius="md" withBorder>
      <Grid>
        {data.map((info: any) => (
          <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
            <Flex>
              <Stack gap={1}>
                <Text className="subtitle">{info.label}</Text>
                <Text size="sm">{info.value}</Text>
              </Stack>
            </Flex>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
};

export default DetailsCard;

export const SimpleDetailsCard = ({ data }: TDetailsCardProps) => {
  return (
    <Group grow wrap="wrap" gap="md">
      {Object.entries(data).map(([key, value]) => (
        <Card
          key={key}
          p="md"
          radius="md"
          withBorder
          bg="transparent"
          style={{ flex: 1 }}
        >
          <Stack gap={1}>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
              {key}
            </Text>
            <Text fz={24} fw={700}>
              {value.toLocaleString()}
            </Text>
          </Stack>
        </Card>
      ))}
    </Group>
  );
};
