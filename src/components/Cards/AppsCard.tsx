import React from "react";
import { beautify } from "@/utils/helpers";
import { MODAL_SERVERS } from "@/utils/constants";
import {
  Anchor,
  Card,
  Flex,
  Group,
  Badge,
  Stack,
  Text,
  Box,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import { FiLayers } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { HiMiniCubeTransparent } from "react-icons/hi2";
import { PiShareFatThin } from "react-icons/pi";
import { SiJupyter } from "react-icons/si";

const getStatusColor = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized === "running") {
    return "green";
  }
  if (normalized === "deployed") {
    return "blue";
  }
  if (normalized === "failed" || normalized === "error") {
    return "red";
  }
  return "gray";
};

const AppsCard = ({ app, project_id }: any) => {
  const modalServerEntry =
    app.model_server &&
    MODAL_SERVERS.find((server) => server.value === app.model_server);

  const modalServerIcon = modalServerEntry?.icon;
  const modalServerColor = modalServerEntry?.color || "gray";

  return (
    <Card
      p="md"
      radius="md"
      withBorder
      h="100%"
      style={{
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      className="app-card-hover"
    >
      <Group wrap="nowrap" gap={15} align="flex-start">
        <ThemeIcon
          size={48}
          radius="md"
          variant="light"
          color={app.is_notebook ? "orange" : modalServerColor}
        >
          {app.is_notebook ? (
            <SiJupyter size={24} />
          ) : modalServerIcon ? (
            React.createElement(modalServerIcon, { size: 24 })
          ) : (
            <FiLayers size={24} />
          )}
        </ThemeIcon>

        <Stack gap={4} flex={1} style={{ overflow: "hidden" }}>
          <Anchor
            fw={600}
            size="md"
            href={`/projects/${project_id}/apps/${app.id}`}
            truncate="end"
            c="var(--mantine-color-text)"
            className="no-scale"
          >
            {beautify(app.name)}
          </Anchor>

          {app.url && (
            <Anchor
              href={app.url}
              target="_blank"
              c="dimmed"
              className="no-scale"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <Text size="xs" truncate="end">
                {new URL(app.url).hostname}
              </Text>
              <PiShareFatThin size={14} style={{ flexShrink: 0 }} />
            </Anchor>
          )}
        </Stack>
      </Group>

      <Box style={{ flex: 1, minWidth: 0 }} mt="md">
        {app?.image && !app?.is_notebook && (
          <Badge
            variant="default"
            size="md"
            radius="sm"
            maw="100%"
            leftSection={<HiMiniCubeTransparent size={14} />}
            style={{
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {app?.image}
          </Badge>
        )}
      </Box>

      <Box mt="auto">
        <Divider my="sm" />
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap={8} align="center" wrap="nowrap">
            {app?.is_notebook && (
              <Badge
                tt="capitalize"
                variant="light"
                color="orange"
                size="md"
                radius="sm"
                leftSection={<SiJupyter size={10} />}
              >
                Notebook
              </Badge>
            )}

            {app.model_server && (
              <Badge
                tt="capitalize"
                variant="light"
                color={modalServerColor}
                size="sm"
                radius="sm"
                leftSection={
                  modalServerIcon &&
                  React.createElement(modalServerIcon, { size: 10 })
                }
              >
                {app.model_server === "HUGGINGFACE_SERVER"
                  ? beautify(app.task)
                  : modalServerEntry?.label}
              </Badge>
            )}

            <Flex gap={4} c="dimmed" align="center">
              <GoClock size={12} />
              <Text size="xs" fw={500}>
                {app.age}
              </Text>
            </Flex>
          </Group>

          <Badge
            size="md"
            tt="capitalize"
            variant="light"
            color={getStatusColor(app.app_running_status)}
            radius="xl"
          >
            {app.app_running_status}
          </Badge>
        </Group>
      </Box>
    </Card>
  );
};

export default AppsCard;
