import { formatMetricValue, formatTimestamp } from "@/utils/helpers";
import { Paper, Text } from "@mantine/core";
import moment from "moment";

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

  const getTimeLabel = () => {
    if (label) {
      return formatTimestamp(Number(label));
    }
    const firstPayload = payload[0]?.payload;
    if (firstPayload) {
      return moment([firstPayload.year, firstPayload.month - 1]).format(
        "MMM YYYY",
      );
    }
    return null;
  };

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {getTimeLabel()}
        {/* {formatTimestamp(Number(label))} */}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {formatMetricValue(chartType, item.value)}
        </Text>
      ))}
    </Paper>
  );
}
