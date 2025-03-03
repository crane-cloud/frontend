import { LineMetricChart } from "@/components/Elements/Charts";
import TitleText from "@/components/TitleText";
import { useGetProject } from "@/utils/helpers";
import { Grid } from "@mantine/core";
import { useParams } from "react-router-dom";

const ProjectMetrics = () => {
  const { project_id } = useParams();
  useGetProject(project_id || "");
  return (
    <div>
      <TitleText>Project Metrics</TitleText>
      <Grid>
        <Grid.Col span={6}>
          <LineMetricChart title="CPU Usage" />
        </Grid.Col>
        <Grid.Col span={6}>
          <LineMetricChart title="Network Usage" />
        </Grid.Col>
        <Grid.Col span={12}>
          <LineMetricChart title="Memory Usage" />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProjectMetrics;
