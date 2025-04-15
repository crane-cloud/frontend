import { LineMetricChart } from "@/components/Elements/Charts";
import TitleText from "@/components/TitleText";
import { MONITORING_API_URL } from "@/config";
import { useGetProject } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import { Grid } from "@mantine/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectMetrics = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");
  const { uploadData: getCPUMetrics, data: cpuMetricsData } = usePost();
  const { uploadData: getMemoryMetrics, data: memoryMetricsData } = usePost();
  const { uploadData: getNetworkMetrics, data: networkMetricsData } = usePost();

  useEffect(() => {
    getCPUMetrics({
      api: `${MONITORING_API_URL}projects/cpu/metrics`,
      params: {
        project_id,
      },
      isExternal: true,
    });
    getMemoryMetrics({
      api: `${MONITORING_API_URL}projects/memory/metrics`,
      params: {
        project_id,
      },
      isExternal: true,
    });
    getNetworkMetrics({
      api: `${MONITORING_API_URL}projects/network/metrics`,
      params: {
        project_id,
      },
      isExternal: true,
    });
  }, [project_id]);

  return (
    <div>
      <TitleText>Project Metrics</TitleText>
      <Grid>
        <Grid.Col span={4}>
          <LineMetricChart
            title="CPU Usage"
            data={cpuMetricsData?.data?.values}
            valueFormatter={(value) => `${value}%`}
            showAllXValues
            height={200}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="Memory Usage"
            data={memoryMetricsData?.data?.values}
            valueFormatter={(value) => `${value} KBS`}
            height={200}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <LineMetricChart
            title="Network Usage"
            data={networkMetricsData?.data?.values}
            valueFormatter={(value) => `${value} KBS`}
            height={200}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProjectMetrics;
