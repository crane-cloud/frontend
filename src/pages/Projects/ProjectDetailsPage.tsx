import { useParams } from "react-router-dom";
import TitleText from "@/components/TitleText";
import { useGetProject } from "@/utils/helpers";
import AppsList from "@/components/Lists/AppsList";
import { AddServiceButton } from "@/components/Elements/Elements";
import { useEffect, useState } from "react";
import useGet from "@/utils/useGet";
import { API_CLUSTERS } from "@/utils/apis";
import { MigrateProjectForm } from "@/components/Forms/CreateProjectForm";
import { ModalConfirm } from "@/components/Elements/Modals";
import { BiTransferAlt } from "react-icons/bi";

const ProjectDetailsPage = () => {
  const { project_id } = useParams();
  const { project, loading, success } = useGetProject(project_id || "");
  const {
    data: clustersData,
    getData: getClusters,
    loading: clustersLoading,
    success: getDisabledClustersSuccess,
  } = useGet();

  const [showProjectMigrateModal, setShowProjectMigrateModal] = useState(false);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getClusters({
      api: `${API_CLUSTERS}`,
      params: { disabled: true },
    });
  }, []);

  useEffect(() => {
    if (success && project && getDisabledClustersSuccess) {
      // check if clustersData is not empty
      if (clustersData?.data?.clusters?.length < 1) {
        setShowProjectMigrateModal(false);
      } else {
        // check if disabled cluster matches the one for the opened project
        const foundDisabledCluster = clustersData?.data?.clusters?.some(
          (cluster: any) => cluster.id === project.cluster_id,
        );

        // show modal to migrate the project if match is found
        if (foundDisabledCluster) {
          setShowProjectMigrateModal(true);
        } else {
          setShowProjectMigrateModal(false);
        }
      }
    }
  }, [getDisabledClustersSuccess, success, project]);

  return (
    <>
      {!clustersLoading && success && (
        <TitleText
          loading={loading}
          rightSection={
            <AddServiceButton project={project} setRefresh={setRefresh} />
          }
        >
          {project?.name} Dashboard
        </TitleText>
      )}

      <AppsList project_id={project_id} refresh={refresh} />
      {/* <DatabaseList project_id={id} /> */}

      {showProjectMigrateModal && (
        <ModalConfirm
          opened={showProjectMigrateModal}
          onClose={() => setShowProjectMigrateModal(false)}
          title="Server Cluster Unavailable - Migrate Project Now"
          buttonText="Migrate"
          // buttonColor="red"
          onConfirm={() => {}}
          size="xl"
          showFooterActions={false}
          leftSection={<BiTransferAlt />}
        >
          <MigrateProjectForm
            project={project}
            showTitle={false}
            onCancel={() => setShowProjectMigrateModal(false)}
            refresh={() => setRefresh(true)}
          />
        </ModalConfirm>
      )}
    </>
  );
};

export default ProjectDetailsPage;
