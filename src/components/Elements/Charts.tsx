import { formatTimestamp, returnObject } from "@/utils/helpers";
import { LineChart } from "@mantine/charts";
import {
  Card,
  Stack,
  Text,
  Button,
  Group,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import { FaChartLine, FaEye, FaEyeSlash } from "react-icons/fa";

type TLineMetricChart = {
  title: string;
  data: any;
  valueFormatter: (value: number) => string;
  showAllXValues?: boolean;
  height?: number;
  setBigChart?: (chartType: "cpu" | "memory" | "network") => void;
  chartType?: "cpu" | "memory" | "network";
  currentChart?: "cpu" | "memory" | "network";
};

export const LineMetricChart = ({
  title,
  data,
  valueFormatter,
  showAllXValues = false,
  height = 250,
  setBigChart,
  chartType,
  currentChart,
}: TLineMetricChart) => {
  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];
  return (
    <Card withBorder p="md" radius="md" w="100%">
      <Stack gap="lg">
        <Group justify="space-between">
          <Group gap="xs">
            <FaChartLine size={13} />
            <Text className="title">{title}</Text>
          </Group>
          {setBigChart && chartType && (
            <ActionIcon
              variant="outline"
              onClick={() => setBigChart(chartType)}
            >
              {currentChart === chartType ? (
                <FaEye size={13} />
              ) : (
                <FaEyeSlash size={13} />
              )}
            </ActionIcon>
          )}
        </Group>
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
  setFilters: (filter: any) => void;
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
  const [activePreset, setActivePreset] = useState<
    "1D" | "7D" | "30D" | "90D" | "all" | null
  >("7D");

  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];

  const setLast7Days = () => {
    setFilters({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
    setActivePreset("7D");
  };

  const setLast30Days = () => {
    setFilters({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
    setActivePreset("30D");
  };

  const setLast1Day = () => {
    setFilters({
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
    setActivePreset("1D");
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
          <Flex justify="space-between" gap="xs" wrap="wrap">
            <Group gap="xs">
              <Button
                variant={activePreset === "1D" ? "solid" : "outline"}
                size="xs"
                onClick={setLast1Day}
              >
                1D
              </Button>
              <Button
                variant={activePreset === "7D" ? "solid" : "outline"}
                size="xs"
                onClick={setLast7Days}
              >
                7D
              </Button>
              <Button
                variant={activePreset === "30D" ? "solid" : "outline"}
                size="xs"
                onClick={setLast30Days}
              >
                30D
              </Button>
              <Button
                variant={activePreset === "90D" ? "solid" : "outline"}
                size="xs"
                onClick={() => {
                  setFilters({
                    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                    endDate: new Date(),
                  });
                  setActivePreset("90D");
                }}
              >
                90D
              </Button>
              <Button
                variant={activePreset === "all" ? "solid" : "outline"}
                size="xs"
                onClick={() => {
                  setFilters({
                    startDate: null,
                    endDate: null,
                  });
                  setActivePreset("all");
                }}
              >
                All Time
              </Button>
            </Group>
            <Group>
              <DatePickerInput
                placeholder="Start date"
                value={startDate}
                onChange={(date) => {
                  setFilters({
                    ...filters,
                    startDate: date,
                  });
                  setActivePreset(null);
                }}
                mx="auto"
                size="xs"
              />
              <DatePickerInput
                placeholder="End date"
                value={endDate}
                onChange={(date) => {
                  setFilters({
                    ...filters,
                    endDate: date,
                  });
                  setActivePreset(null);
                }}
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
