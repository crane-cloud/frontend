import { formatTimestamp, returnObject } from "@/utils/helpers";
import { LineChart } from "@mantine/charts";
import { Card, Stack, Text, Button, Group, Flex } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";

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

type TLineLargeMetricChart = TLineMetricChart & {
  filters: {
    startDate: Date | null;
    endDate: Date | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
    }>
  >;
};

export const LineLargeMetricChart = ({
  title,
  data,
  valueFormatter,
  showAllXValues = false,
  height = 250,
  filters,
  setFilters,
}: TLineLargeMetricChart) => {
  const { startDate, endDate } = filters;
  const [filteredData, setFilteredData] = useState(data);

  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];

  const setLast7Days = () => {
    setFilters({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
  };

  const setLast30Days = () => {
    setFilters({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
  };

  const setLast1Day = () => {
    setFilters({
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
  };

  useEffect(() => {
    const filtered = data?.filter((item: any) => {
      const itemDate = new Date(item.timestamp);
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  }, [startDate, endDate, data]);

  return (
    <Card withBorder p="md" radius="md" w="100%">
      <Stack gap="lg">
        <Stack>
          <Group justify="space-between">
            <Text className="title">{title}</Text>
          </Group>
          <Flex justify="space-between" gap="xs">
            <Group gap="xs">
              <Button variant="solid" size="xs" onClick={setLast1Day}>
                1D
              </Button>
              <Button variant="outline" size="xs" onClick={setLast7Days}>
                7D
              </Button>
              <Button variant="outline" size="xs" onClick={setLast30Days}>
                30D
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => {
                  setFilters({
                    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                    endDate: new Date(),
                  });
                }}
              >
                90D
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={() => {
                  setFilters({
                    startDate: null,
                    endDate: null,
                  });
                }}
              >
                All Time
              </Button>
            </Group>
            <Group>
              <DatePickerInput
                placeholder="Start date"
                value={startDate}
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    startDate: value,
                  })
                }
                mx="auto"
                size="xs"
              />
              <DatePickerInput
                placeholder="End date"
                value={endDate}
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    endDate: value,
                  })
                }
                mx="auto"
                size="xs"
              />
            </Group>
          </Flex>
        </Stack>
        <LineChart
          h={height}
          w="100%"
          data={filteredData}
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
