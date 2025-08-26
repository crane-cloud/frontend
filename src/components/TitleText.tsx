import React from "react";
import { Divider, Flex, Skeleton, Stack, Text, TextProps } from "@mantine/core";

interface TitleTextProps extends TextProps {
  children: React.ReactNode;
  loading?: boolean;
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
          <div style={{ fontWeight: 600, fontSize: "1.2rem" }}>{children}</div>
        )}
        {rightSection}
      </Flex>
      <Divider mb="md" />
    </Stack>
  );
};

export default TitleText;

interface CustomTextProps extends TextProps {
  leftSection?: React.ReactNode;
  children: React.ReactNode;
}

export const CustomText = React.forwardRef<
  HTMLParagraphElement,
  CustomTextProps
>(({ leftSection, children, ...props }, ref) => (
  <Text ref={ref} {...props}>
    <Flex align="center" gap={4}>
      {leftSection}
      {children}
    </Flex>
  </Text>
));
