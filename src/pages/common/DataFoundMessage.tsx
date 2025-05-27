import { Stack, Text } from "@mantine/core";
import { TbFolderOff } from "react-icons/tb";
import React from "react";

interface DataNotFoundMessageProps {
  title: string;
  helpText: string;
  helpLink?: string;
  children?: React.ReactNode;
}

const DataNotFoundMessage: React.FC<DataNotFoundMessageProps> = ({
  title = "Nothing found",
  helpText = "No data available.",
  helpLink,
  children,
}) => {
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Stack align="center" gap="xs">
        <TbFolderOff size={48} color="gray" />
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text c="dimmed" maw={360}>
          {helpText}{" "}
          {helpLink && (
            <a
              href={helpLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#228be6", textDecoration: "underline" }}
            >
              Learn more
            </a>
          )}
        </Text>
        {children}
      </Stack>
    </div>
  );
};

export default DataNotFoundMessage;
