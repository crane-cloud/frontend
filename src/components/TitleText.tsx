import React from "react";
import { Divider, Skeleton, Text, TextProps } from "@mantine/core";

interface TitleTextProps extends TextProps {
  children: React.ReactNode;
  loading: boolean;
}

const TitleText: React.FC<TitleTextProps> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <Skeleton height={30} width={300} radius="xs" />
      ) : (
        <Text
          variant="gradient"
          gradient={{ from: "black", to: "blue" }}
          fw={700}
          fz="1.1rem"
        >
          {children}
        </Text>
      )}
      <Divider my="5" />
    </>
  );
};

export default TitleText;
