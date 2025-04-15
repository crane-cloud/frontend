import { formatTimestamp, returnObject } from "@/utils/helpers";
import { LineChart } from "@mantine/charts";
import { Card, Stack, Text } from "@mantine/core";

type TLineMetricChart = {
  title: string;
  data: any;
  valueFormatter: (value: number) => string;
  showAllXValues?: boolean;
  height?: number;
};

export const LineMetricChart = ({
  title,
  data,
  valueFormatter,
  showAllXValues = false,
  height = 250,
}: TLineMetricChart) => {
  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];
  return (
    <Card withBorder p="md" radius="md" w="100%">
      <Stack gap="lg">
        <Text className="title">{title}</Text>
        <LineChart
          h={height}
          w="100%"
          data={data}
          series={[{ name: "value", label: "Usage" }]}
          dataKey="timestamp"
          dotProps={{
            r: 2,
          }}
          type="gradient"
          gradientStops={[
            { offset: 0, color: "red.6" },
            { offset: 20, color: "orange.6" },
            { offset: 40, color: "yellow.5" },
            { offset: 70, color: "lime.5" },
            { offset: 80, color: "cyan.5" },
            { offset: 100, color: "blue.5" },
          ]}
          strokeWidth={2}
          curveType="natural"
          valueFormatter={valueFormatter}
          tooltipProps={{
            labelFormatter: (value) => formatTimestamp(value),
          }}
          xAxisProps={{
            tickFormatter: formatTimestamp,
            ...returnObject(showAllXValues, {
              ticks: xAxisTicks,
            }),
          }}
        />
      </Stack>
    </Card>
  );
};
