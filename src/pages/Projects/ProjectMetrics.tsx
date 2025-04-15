import { LineLargeMetricChart } from "@/components/Elements/Charts";
import TitleText from "@/components/TitleText";
import { MONITORING_API_URL } from "@/config";
import { useGetProject } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectMetrics = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");
  const { uploadData: getCPUMetrics, data: cpuMetricsData } = usePost();
  const { uploadData: getMemoryMetrics, data: memoryMetricsData } = usePost();
  const { uploadData: getNetworkMetrics, data: networkMetricsData } = usePost();

  const [filters, setFilters] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });
  useEffect(() => {
    getCPUMetrics({
      api: `${MONITORING_API_URL}projects/cpu/metrics`,
      params: {
        project_id,
        end: filters?.endDate?.getTime(),
        start: filters?.startDate?.getTime(),
      },
      isExternal: true,
    });
    // getMemoryMetrics({
    //   api: `${MONITORING_API_URL}projects/memory/metrics`,
    //   params: {
    //     project_id,
    //   },
    //   isExternal: true,
    // });
    // getNetworkMetrics({
    //   api: `${MONITORING_API_URL}projects/network/metrics`,
    //   params: {
    //     project_id,
    //   },
    //   isExternal: true,
    // });
  }, [project_id, filters]);

  return (
    <div>
      <TitleText>Project Metrics</TitleText>
      <Grid>
        <Grid.Col span={12}>
          <LineLargeMetricChart
            title="CPU Usage"
            data={cpuMetricsData?.data?.values}
            valueFormatter={(value) => `${value}%`}
            showAllXValues
            filters={filters}
            setFilters={setFilters}
            // height={200}
          />
        </Grid.Col>
        {/* <Grid.Col span={4}>
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
        </Grid.Col> */}
      </Grid>
    </div>
  );
};

export default ProjectMetrics;
