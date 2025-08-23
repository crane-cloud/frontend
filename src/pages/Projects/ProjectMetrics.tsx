import {
  LineLargeMetricChart,
  LineMetricChart,
} from "@/components/Elements/Charts";
import TitleText from "@/components/TitleText";
import { MONITORING_API_URL } from "@/config";
import { bytesToMB, useGetProject, useSetContainerSize } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import { Grid } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectMetrics = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");
  useSetContainerSize("xl");
  const {
    uploadData: getCPUMetrics,
    data: cpuMetricsData,
    submitting: gettingCPUMetrics,
  } = usePost();
  const {
    uploadData: getMemoryMetrics,
    data: memoryMetricsData,
    submitting: gettingMemoryMetrics,
  } = usePost();
  const {
    uploadData: getNetworkMetrics,
    data: networkMetricsData,
    submitting: gettingNetworkMetrics,
  } = usePost();
  const {
    uploadData: getGPUMetrics,
    data: gpuMetricsData,
    submitting: gettingGPUMetrics,
  } = usePost();
  const [bigChart, setBigChart] = useState<
    "cpu" | "memory" | "network" | "gpu"
  >("cpu");

  const [filters, setFilters] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  useEffect(() => {
    const fetchMetrics = () => {
      const baseBody = {
        project_id,
        step: "5h",
      };

      const requestBody =
        filters.start && filters.end
          ? {
              ...baseBody,
              start: filters.start ? new Date(filters.start).getTime() : null,
              end: filters.end ? new Date(filters.end).getTime() : null,
            }
          : baseBody;

      getCPUMetrics({
        api: `${MONITORING_API_URL}/projects/cpu/metrics`,
        params: requestBody,
        isExternal: true,
        showNotifications: false,
      });
      getMemoryMetrics({
        api: `${MONITORING_API_URL}/projects/memory/metrics`,
        params: requestBody,
        isExternal: true,
        showNotifications: false,
      });
      getNetworkMetrics({
        api: `${MONITORING_API_URL}/projects/network/metrics`,
        params: requestBody,
        isExternal: true,
        showNotifications: false,
      });
      getGPUMetrics({
        api: `${MONITORING_API_URL}/projects/gpu/metrics`,
        params: requestBody,
        isExternal: true,
        showNotifications: false,
      });
    };

    fetchMetrics();
  }, [filters, project_id]);

  const bigChartData = useMemo(() => {
    if (bigChart === "cpu") {
      return {
        data: cpuMetricsData?.data?.values,
        title: "CPU Usage",
        unit: "cores",
        numberOfDecimals: 4,
      };
    }
    if (bigChart === "memory") {
      return {
        data: memoryMetricsData?.data?.values,
        title: "Memory Usage",
        unit: "MB/s",
        numberOfDecimals: 0,
      };
    }
    if (bigChart === "gpu") {
      return {
        data: gpuMetricsData?.data?.values,
        title: "GPU Usage",
        unit: "GPU",
        numberOfDecimals: 0,
      };
    }
    return {
      data: networkMetricsData?.data?.values,
      title: "Network Usage",
      unit: "KB/s",
      numberOfDecimals: 0,
    };
  }, [
    bigChart,
    cpuMetricsData,
    memoryMetricsData,
    networkMetricsData,
    gpuMetricsData,
  ]);
  return (
    <div>
      <TitleText>Project Metrics</TitleText>
      <Grid>
        <Grid.Col span={12}>
          <LineLargeMetricChart
            title={bigChartData.title}
            data={bigChartData.data}
            valueFormatter={(value) =>
              `${bigChartData.title === "Memory Usage" ? bytesToMB(value).toFixed(2) : value.toFixed(bigChartData.numberOfDecimals)} ${bigChartData.unit}`
            }
            showAllXValues
            filters={filters}
            setFilters={(data) => {
              setFilters({ ...filters, ...data });
            }}
            height={250}
            currentChart={bigChart}
            isLoading={
              gettingCPUMetrics ||
              gettingMemoryMetrics ||
              gettingNetworkMetrics ||
              gettingGPUMetrics
            }
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="CPU Usage"
            data={cpuMetricsData?.data?.values}
            valueFormatter={(value) => `${value.toFixed(4)} cores`}
            showAllXValues
            height={180}
            setBigChart={setBigChart}
            chartType="cpu"
            currentChart={bigChart}
            isLoading={gettingCPUMetrics}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="Memory Usage"
            data={memoryMetricsData?.data?.values}
            valueFormatter={(value) => `${bytesToMB(value).toFixed(2)} MB/s`}
            height={180}
            setBigChart={setBigChart}
            chartType="memory"
            currentChart={bigChart}
            isLoading={gettingMemoryMetrics}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="Network Usage"
            data={networkMetricsData?.data?.values}
            valueFormatter={(value) => `${value.toFixed(0)} KB/s`}
            height={180}
            setBigChart={setBigChart}
            chartType="network"
            currentChart={bigChart}
            isLoading={gettingNetworkMetrics}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="GPU Usage"
            data={gpuMetricsData?.data?.values}
            valueFormatter={(value) => `${value.toFixed(0)} GPU`}
            height={180}
            setBigChart={setBigChart}
            chartType="gpu"
            currentChart={bigChart}
            isLoading={gettingGPUMetrics}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProjectMetrics;
