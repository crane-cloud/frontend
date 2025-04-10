import { Card, Flex, Grid, Stack, Text } from "@mantine/core";
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
