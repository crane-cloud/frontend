import React from "react";
import { Divider, Flex, Skeleton, Stack, Text, TextProps } from "@mantine/core";

interface TitleTextProps extends TextProps {
  children: React.ReactNode;
  loading: boolean;
  rightSection?: React.ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({
  children,
  loading,
  rightSection,
}) => {
  return (
    <Stack gap={5}>
      <Flex justify="space-between" align="center">
        {loading ? (
          <Skeleton height={30} width={300} radius="xs" />
        ) : (
          <Text
            variant="gradient"
            gradient={{ from: "black", to: "blue" }}
            fw={700}
            fz="1.2rem"
          >
            {children}
          </Text>
        )}
        {rightSection}
      </Flex>
      <Divider mb="md" />
    </Stack>
  );
};

export default TitleText;
