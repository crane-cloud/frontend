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
  Loader,
  Center,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useEffect } from "react";
import { FaChartLine, FaEye, FaEyeSlash } from "react-icons/fa";
import ChartTooltip from "./ChartTooltip";

type TLineMetricChart = {
  title: string;
  data: any;
  valueFormatter: (value: number) => string;
  showAllXValues?: boolean;
  height?: number;
  setBigChart?: (chartType: "cpu" | "memory" | "network") => void;
  chartType?: "cpu" | "memory" | "network";
  currentChart?: "cpu" | "memory" | "network";
  isLoading?: boolean;
};

export const LineMetricChart = ({
  title,
  data,
  valueFormatter,
  showAllXValues = true,
  height = 250,
  setBigChart,
  chartType,
  currentChart,
  isLoading = false,
}: TLineMetricChart) => {
  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];

  const renderChartContent = () => {
    if (isLoading) {
      return (
        <Center h={height}>
          <Loader />
        </Center>
      );
    }

    if (!data || data.length === 0) {
      return (
        <Center h={height}>
          <Text c="dimmed">No data available</Text>
        </Center>
      );
    }

    return (
      <LineChart
        h={height}
        w="100%"
        data={data}
        series={[{ name: "value", label: "Usage" }]}
        dataKey="timestamp"
        dotProps={{ r: 2 }}
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
          content: ({ label, payload }) => (
            <ChartTooltip
              label={label}
              payload={payload}
              chartType={chartType!}
            />
          ),
        }}
        xAxisProps={{
          tickFormatter: formatTimestamp,
          ...returnObject(showAllXValues, { ticks: xAxisTicks }),
        }}
      />
    );
  };

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
        {renderChartContent()}
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
  currentChart?: "cpu" | "memory" | "network";
};

export const LineLargeMetricChart = ({
  title,
  data,
  valueFormatter,
  showAllXValues = false,
  height = 250,
  filters,
  setFilters,
  currentChart,
  isLoading = false,
}: TLineLargeMetricChart) => {
  const { startDate, endDate } = filters;
  const [filteredData, setFilteredData] = useState(data);
  const [activePreset, setActivePreset] = useState<
    "1D" | "7D" | "30D" | "90D" | "Today" | null
  >("Today");

  const xAxisTicks =
    data?.length > 0
      ? [data[0].timestamp, data[data.length - 1].timestamp]
      : [];

  const handlePresetClick = (range: "1D" | "7D" | "30D" | "90D" | "Today") => {
    const now = new Date();

    if (range === "Today") {
      setFilters({
        startDate: null,
        endDate: null,
      });
    } else {
      const daysMap = {
        "1D": 1,
        "7D": 7,
        "30D": 30,
        "90D": 90,
      };

      const daysToGoBack = daysMap[range];
      const startDate = new Date(
        now.getTime() - daysToGoBack * 24 * 60 * 60 * 1000,
      );

      setFilters({
        startDate,
        endDate: now,
      });
    }

    setActivePreset(range);
  };

  const renderChartContent = () => {
    if (isLoading) {
      return (
        <Center h={height}>
          <Loader />
        </Center>
      );
    }

    if (!filteredData || filteredData.length === 0) {
      return (
        <Center h={height}>
          <Text c="dimmed">No data available</Text>
        </Center>
      );
    }

    return (
      <LineChart
        h={height}
        w="100%"
        data={filteredData}
        series={[{ name: "value", label: "Usage" }]}
        dataKey="timestamp"
        dotProps={{ r: 2 }}
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
          content: ({ label, payload }) => (
            <ChartTooltip
              label={label}
              payload={payload}
              chartType={currentChart!}
            />
          ),
        }}
        xAxisProps={{
          tickFormatter: formatTimestamp,
          ...returnObject(showAllXValues, { ticks: xAxisTicks }),
        }}
      />
    );
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const filtered = data.filter((item: any) => {
      if (!startDate && !endDate) {
        return true;
      }

      const itemDate = new Date(item.timestamp * 1000);
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
              {(["1D", "7D", "30D", "90D", "Today"] as const).map((range) => (
                <Button
                  key={range}
                  variant={activePreset === range ? "solid" : "outline"}
                  size="xs"
                  onClick={() => handlePresetClick(range)}
                >
                  {range}
                </Button>
              ))}
            </Group>
            <Group>
              <DatePickerInput
                placeholder="Start date"
                value={startDate}
                onChange={(date) => {
                  setFilters({ ...filters, startDate: date });
                  setActivePreset(null);
                }}
                mx="auto"
                size="xs"
              />
              <DatePickerInput
                placeholder="End date"
                value={endDate}
                onChange={(date) => {
                  setFilters({ ...filters, endDate: date });
                  setActivePreset(null);
                }}
                mx="auto"
                size="xs"
              />
            </Group>
          </Flex>
        </Stack>
        {renderChartContent()}
      </Stack>
    </Card>
  );
};
