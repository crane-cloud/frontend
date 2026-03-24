import React, { useEffect, useState } from "react";
import TitleText from "@/components/TitleText";
import { useGetAdminCluster } from "@/utils/helpers";
import { Button, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ClusterDetailsCard } from "./ClustersDashboard";
import { ModalConfirm } from "@/components/Elements/Modals";
import CreateClusters from "../CreateClusters";
import { HiTrash } from "react-icons/hi2";
import usePost from "@/utils/usePost";
import { MdEdit } from "react-icons/md";

const ClusterSettingsPage = () => {
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [updateConfirmOpened, setUpdateConfirmOpened] = useState(false);
  const { cluster_id } = useParams();
  const { cluster, clusterData, loading, setRefresh } = useGetAdminCluster(
    cluster_id || "",
  );
  const {
    uploadData: deleteCluster,
    submitting: deletingCluster,
    success: deletedClusterSuccess,
  } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if (deletedClusterSuccess) {
      navigate("/admin/clusters");
    }
  }, [deletedClusterSuccess]);

  const handleDelete = () => {
    deleteCluster({
      id: cluster?.id,
      api: "/clusters",
      method: "DELETE",
    });
  };

  return (
    <Stack>
      <TitleText>Cluster Settings</TitleText>
      <ClusterDetailsCard clusterData={clusterData} loading={loading} />
      <Stack gap={0}>
        <TitleText>Danger Zone</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10}>
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Update Cluster</Text>
                <Text className="subtext">Modify the cluster information</Text>
              </Stack>
              <Button
                variant="outline"
                onClick={() => setUpdateConfirmOpened(true)}
                leftSection={<MdEdit />}
              >
                Update
              </Button>
            </Group>
            <Divider />

            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Delete Cluster</Text>
                <Text className="subtext">
                  This action is irreversible and will delete the cluster
                  permanently.
                </Text>
              </Stack>
              <Button
                variant="outline"
                color="red"
                onClick={() => setDeleteConfirmOpened(true)}
                leftSection={<HiTrash />}
              >
                Delete
              </Button>
            </Group>
          </Stack>
          <ModalConfirm
            opened={deleteConfirmOpened}
            onClose={() => setDeleteConfirmOpened(false)}
            title="Delete Cluster"
            buttonColor="red"
            buttonText="Delete"
            onConfirm={handleDelete}
            loading={deletingCluster}
            leftSection={<HiTrash />}
          >
            Are you sure you want to delete <b>{cluster?.name}</b> cluster
            permanently? This action cannot be undone.
          </ModalConfirm>

          <ModalConfirm
            opened={updateConfirmOpened}
            onClose={() => setUpdateConfirmOpened(false)}
            title="Update Cluster"
            buttonText="Update"
            onConfirm={() => {}}
            size="xl"
            showFooterActions={false}
          >
            <CreateClusters
              cluster={cluster}
              showTitle={false}
              onCancel={() => setUpdateConfirmOpened(false)}
              refresh={() => setRefresh(true)}
            />
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};

export default ClusterSettingsPage;
