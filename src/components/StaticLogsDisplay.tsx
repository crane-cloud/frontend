import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  ScrollArea,
  Group,
  Badge,
  Pill,
  Select,
  TextInput,
  Flex,
  Button,
  ActionIcon,
  Tooltip,
  Card,
} from "@mantine/core";
import { TbSearch, TbRefresh, TbDownload, TbTerminal } from "react-icons/tb";
import moment from "moment";

// Type definitions for the logs data structure
interface LogEntry {
  build_id: string;
  level: "info" | "error" | "warning" | "debug";
  message: string;
  timestamp: string;
  step?: string;
}

interface LogsData {
  count: number;
  limit: number;
  logs: LogEntry[];
  page: number;
  pages: number;
  sort: "asc" | "desc";
  total: number;
}

interface StaticLogsDisplayProps {
  logsData: LogsData;
  buildId: string;
  onRefresh?: () => void;
}

const StaticLogsDisplay = ({
  logsData,
  buildId,
  onRefresh,
}: StaticLogsDisplayProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [stepFilter, setStepFilter] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Function to check if a log is an error
  const isErrorLog = (level: string, message: string): boolean => {
    if (level === "error") {
      return true;
    }
    const lowerMessage = message.toLowerCase();
    return (
      lowerMessage.includes("error") ||
      lowerMessage.includes("failed") ||
      lowerMessage.includes("exception") ||
      lowerMessage.includes("fatal") ||
      lowerMessage.includes("panic")
    );
  };

  // Function to strip ANSI escape codes
  const stripAnsiCodes = (str: string): string => {
    // eslint-disable-next-line no-control-regex
    return str.replace(/\x1b\[[0-9;]*m/g, "");
  };

  // Function to get log level color
  const getLogLevelColor = (level: string, message: string): string => {
    if (isErrorLog(level, message)) {
      return "#f85149";
    }

    switch (level) {
      case "error":
        return "#f85149";
      case "warning":
        return "#d29922";
      case "info":
        return "#79c0ff";
      case "debug":
        return "#8b949e";
      default:
        return "#f0f6fc";
    }
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp: string): string => {
    return moment(timestamp).format("HH:mm:ss");
  };

  // Get unique levels and steps for filtering
  const uniqueLevels = useMemo(() => {
    const levels = [...new Set(logsData.logs.map((log) => log.level))];
    return levels.map((level) => ({
      value: level,
      label: level.toUpperCase(),
    }));
  }, [logsData.logs]);

  const uniqueSteps = useMemo(() => {
    const steps = [
      ...new Set(logsData.logs.map((log) => log.step).filter(Boolean)),
    ];
    return steps.map((step) => ({ value: step!, label: step!.toUpperCase() }));
  }, [logsData.logs]);

  // Filter logs based on search term, level, and step
  const filteredLogs = useMemo(() => {
    return logsData.logs.filter((log) => {
      const matchesSearch = searchTerm
        ? stripAnsiCodes(log.message)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          log.build_id.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesLevel = levelFilter ? log.level === levelFilter : true;
      const matchesStep = stepFilter ? log.step === stepFilter : true;

      return matchesSearch && matchesLevel && matchesStep;
    });
  }, [logsData.logs, searchTerm, levelFilter, stepFilter]);

  // Auto-scroll to bottom when component mounts or logs change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [logsData.logs]);

  // Function to download logs as text file
  const downloadLogs = () => {
    const logsText = filteredLogs
      .map(
        (log) =>
          `[${formatTimestamp(log.timestamp)}] ${log.level.toUpperCase()}${
            log.step ? ` [${log.step}]` : ""
          }: ${stripAnsiCodes(log.message)}`,
      )
      .join("\n");

    const blob = new Blob([logsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `build-logs-${buildId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card p="md" radius="md" withBorder>
      {/* Header with controls */}
      <Group mb="sm" justify="space-between">
        <Group>
          <Group gap="xs">
            <TbTerminal size={16} color="var(--mantine-color-blue-6)" />
            <Text fw={600} size="sm">
              Build Logs
            </Text>
            <Badge color="blue" variant="light" size="sm">
              Static
            </Badge>
          </Group>
          <Pill variant="light" size="sm">
            Build ID: {buildId}
          </Pill>
          <Badge color="gray" variant="light" size="sm">
            {filteredLogs.length} / {logsData.total} logs
          </Badge>
        </Group>

        <Group gap="xs">
          {onRefresh && (
            <Tooltip label="Refresh logs">
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={onRefresh}
                size="sm"
              >
                <TbRefresh size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          <Tooltip label="Download logs">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={downloadLogs}
              size="sm"
            >
              <TbDownload size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {/* Filters */}
      <Flex gap="sm" mb="sm" wrap="wrap">
        <TextInput
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftSection={<TbSearch size={16} />}
          style={{ flex: 1, minWidth: 200 }}
          size="sm"
        />
        <Select
          placeholder="Filter by level"
          value={levelFilter}
          onChange={setLevelFilter}
          data={uniqueLevels}
          clearable
          style={{ minWidth: 120 }}
          size="sm"
        />
        <Select
          placeholder="Filter by step"
          value={stepFilter}
          onChange={setStepFilter}
          data={uniqueSteps}
          clearable
          style={{ minWidth: 120 }}
          size="sm"
        />
        {(searchTerm || levelFilter || stepFilter) && (
          <Button
            variant="light"
            color="gray"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setLevelFilter(null);
              setStepFilter(null);
            }}
          >
            Clear Filters
          </Button>
        )}
      </Flex>

      {/* Logs display */}
      <ScrollArea
        ref={scrollAreaRef}
        h={500}
        style={{
          backgroundColor: "#161b22",
          borderRadius: "6px",
          padding: "16px",
          fontFamily:
            "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          fontSize: "11px",
          lineHeight: "1.45",
          border: "1px solid #30363d",
          overflow: "auto",
        }}
      >
        {filteredLogs.length === 0 ? (
          <div style={{ color: "#7d8590", fontStyle: "italic" }}>
            {logsData.logs.length === 0
              ? "No logs available"
              : "No logs match the current filters"}
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={`${log.build_id}-${log.timestamp}-${index}`}
              style={{
                color: getLogLevelColor(log.level, log.message),
                marginBottom: "2px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: "1.45",
                display: "flex",
                gap: "8px",
              }}
            >
              <span style={{ color: "#7d8590", flexShrink: 0 }}>
                [{formatTimestamp(log.timestamp)}]
              </span>
              <span style={{ color: "#79c0ff", flexShrink: 0 }}>
                {log.level.toUpperCase()}
              </span>
              {log.step && (
                <span style={{ color: "#d29922", flexShrink: 0 }}>
                  [{log.step}]
                </span>
              )}
              <span style={{ flex: 1 }}>{stripAnsiCodes(log.message)}</span>
            </div>
          ))
        )}
      </ScrollArea>

      {/* Footer with pagination info */}
      {logsData.pages > 1 && (
        <Group mt="sm" justify="space-between">
          <Text size="xs" c="dimmed">
            Page {logsData.page} of {logsData.pages}
          </Text>
          <Text size="xs" c="dimmed">
            Showing {logsData.count} of {logsData.total} total logs
          </Text>
        </Group>
      )}
    </Card>
  );
};

export default StaticLogsDisplay;
