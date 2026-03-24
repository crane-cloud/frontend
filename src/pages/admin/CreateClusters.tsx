import React, { useEffect } from "react";
import TitleText from "@/components/TitleText";
import {
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import usePost from "@/utils/usePost";
import useForm from "@/hooks/generic/useForm";
import { useNavigate } from "react-router-dom";
import { API_CLUSTERS } from "@/utils/apis";
import { useSetAdminContainerSize } from "@/utils/helpers";

const CreateClusters = ({
  cluster,
  onCancel,
  refresh = () => {},
  showTitle = true,
}: {
  cluster?: any;
  onCancel?: () => void;
  refresh?: () => void;
  showTitle?: boolean;
}) => {
  const { uploadData, submitting, error, success } = usePost();
  const { form, onChange, editedForm, updateFormValues } = useForm();
  const navigate = useNavigate();
  useSetAdminContainerSize("sm");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cluster) {
      uploadData({
        api: API_CLUSTERS,
        id: cluster?.id,
        params: editedForm,
      });
      return;
    }
    uploadData({
      api: API_CLUSTERS,
      params: editedForm,
    });
  };
  useEffect(() => {
    if (success) {
      if (onCancel) {
        onCancel();
        if (refresh) {
          refresh();
        }
      } else {
        navigate(`/admin/clusters`);
      }
    }
  }, [success]);

  useEffect(() => {
    if (cluster) {
      updateFormValues({
        ...cluster,
      });
    }
  }, []);

  return (
    <Container size="1070" mt="sm">
      <Stack>
        {showTitle && <TitleText>Create Cluster</TitleText>}
        <Paper px="lg" radius="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Cluster Name"
                name="name"
                placeholder="Enter cluster name"
                description="Enter the name of the cluster"
                required
                value={form?.name as string}
                onChange={onChange}
                error={error?.name}
                // leftSection={<MdDriveFileRenameOutline />}
              />

              <TextInput
                label="Host"
                name="host"
                placeholder="Enter host"
                description="Host URL"
                flex={1}
                required
                value={form?.host as string}
                onChange={onChange}
                error={error?.host}
                // leftSection={<FaDocker />}
              />
              <TextInput
                label="Sub Domain"
                name="sub_domain"
                placeholder="Enter Sub Domain"
                description="Clusters Subdomain"
                flex={1}
                required
                value={form?.sub_domain as string}
                onChange={onChange}
                error={error?.sub_domain}
                // leftSection={<FaDocker />}
              />
              <Textarea
                label="Description"
                name="description"
                placeholder="Enter description"
                description="Description"
                flex={1}
                required
                value={form?.description as string}
                onChange={onChange}
                error={error?.description}
                // leftSection={<FaDocker />}
              />
              <Textarea
                label="Token"
                name="token"
                placeholder="Enter token"
                description="Token"
                flex={1}
                required={!cluster}
                value={form?.token as string}
                onChange={onChange}
                error={error?.token}
                // leftSection={<FaDocker />}
              />
              <Divider mt="md" />
              <Group justify="flex-end">
                <Button
                  type="submit"
                  variant="filled"
                  loading={submitting}
                  // leftSection={<IoRocketSharp />}
                  color="gray.9"
                >
                  {cluster ? "Update Cluster" : "Create Cluster"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CreateClusters;
