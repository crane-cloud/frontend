import { useEffect, useRef, useState } from "react";
import { Paper, Text, ScrollArea, Group, Badge, Pill } from "@mantine/core";

interface BuildLogsTerminalProps {
  logsSocketUrl: string;
  buildId: string;
  onDeploymentComplete?: (appId?: string) => void;
}

const BuildLogsTerminal = ({
  logsSocketUrl,
  buildId,
  onDeploymentComplete,
}: BuildLogsTerminalProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simple function to check if a log line contains an error
  const isErrorLog = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return (
      lowerMessage.includes("error") ||
      lowerMessage.includes("failed") ||
      lowerMessage.includes("exception") ||
      lowerMessage.includes("fatal") ||
      lowerMessage.includes("panic")
    );
  };

  // Function to check if deployment is complete
  const isDeploymentComplete = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return (
      lowerMessage.includes("deployment completed") ||
      lowerMessage.includes("deployment successful") ||
      lowerMessage.includes("app deployed successfully") ||
      lowerMessage.includes("build completed successfully") ||
      lowerMessage.includes("deployment finished") ||
      lowerMessage.includes("app is live") ||
      lowerMessage.includes("ready to serve traffic") ||
      lowerMessage.includes("deployed successfully")
    );
  };

  // Function to extract app ID from log messages
  const extractAppId = (message: string): string | null => {
    // Look for patterns like "app_id: 123", "App ID: abc-123", etc.
    const patterns = [
      /app[_\s]?id[:\s]+([a-zA-Z0-9\-_]+)/i,
      /application[_\s]?id[:\s]+([a-zA-Z0-9\-_]+)/i,
      /deployed[_\s]?app[_\s]?id[:\s]+([a-zA-Z0-9\-_]+)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!logsSocketUrl) {
      return;
    }

    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(logsSocketUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          setError(null);
          setLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Connected to build logs...`,
          ]);
        };

        ws.onmessage = (event) => {
          const logLine = `[${new Date().toLocaleTimeString()}] ${event.data}`;
          setLogs((prev) => [...prev, logLine]);

          // Check if deployment is complete
          if (isDeploymentComplete(event.data)) {
            const appId = extractAppId(event.data);
            if (onDeploymentComplete) {
              // Add a small delay to allow users to see the completion message
              setTimeout(() => {
                onDeploymentComplete(appId || undefined);
              }, 2000);
            }
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          setLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Connection closed`,
          ]);
        };

        ws.onerror = () => {
          setError("WebSocket connection error");
          setIsConnected(false);
        };

        return () => {
          ws.close();
        };
      } catch (err) {
        setError("Failed to connect to build logs");
        setIsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [logsSocketUrl]);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Paper p="md" radius="md" withBorder>
      <Group mb="sm">
        <Text fw={600} size="sm">
          Build Logs
        </Text>
        <Badge color={isConnected ? "green" : "red"} variant="light" size="sm">
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
        <Pill variant="light" size="sm">
          Build ID: {buildId}
        </Pill>
      </Group>

      {error && (
        <Text c="red" size="sm" mb="sm">
          {error}
        </Text>
      )}

      <ScrollArea
        ref={scrollAreaRef}
        h={400}
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
        {logs.length === 0 ? (
          <div style={{ color: "#7d8590", fontStyle: "italic" }}>
            Waiting for build logs...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              style={{
                color: isErrorLog(log) ? "#f85149" : "#f0f6fc",
                marginBottom: "0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: "1.45",
              }}
            >
              {log}
            </div>
          ))
        )}
      </ScrollArea>
    </Paper>
  );
};

export default BuildLogsTerminal;
