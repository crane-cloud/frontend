import { formatMetricValue, formatTimestamp } from "@/utils/helpers";
import { Paper, Text } from "@mantine/core";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  chartType: string;
}

export default function ChartTooltip({
  label,
  payload,
  chartType,
}: ChartTooltipProps) {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {formatTimestamp(Number(label))}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          Usage: {formatMetricValue(chartType, item.value)}
        </Text>
      ))}
    </Paper>
  );
}
