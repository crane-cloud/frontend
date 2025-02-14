import React, { useEffect } from "react";
import TitleText from "../TitleText";
import {
  Button,
  Group,
  Loader,
  Paper,
  Select,
  Stack,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useSetContainerSize } from "@/utils/helpers";
import useForm from "@/hooks/useForm";
import useGet from "@/utils/useGet";
import { API_CLUSTERS, API_PROJECTS, API_TAGS } from "@/utils/apis";
import { ORGANISATIONS, PROJECT_TYPES } from "@/utils/constants";
import usePost from "@/utils/usePost";
import { useAuth } from "@/utils/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateProjectForm = () => {
  useSetContainerSize("sm");
  const { form, onChange, updateFormValue } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: clustersData,
    getData: getClusters,
    loading: clustersLoading,
  } = useGet();

  const { data: tagsData, getData: getTags, loading: tagsLoading } = useGet();
  const {
    uploadData,
    submitting,
    error,
    success,
    data: project_data,
  } = usePost();

  useEffect(() => {
    getClusters({
      api: API_CLUSTERS,
    });
    getTags({
      api: API_TAGS,
    });
  }, []);

  const clusters = clustersData?.data?.clusters?.map((cluster: any) => ({
    label: cluster.name,
    value: cluster.id,
  }));
  const tags = tagsData?.data?.map((tag: any) => tag.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: API_PROJECTS,
      params: {
        ...form,
        owner_id: user?.id,
      },
    });
  };
  useEffect(() => {
    if (success && project_data) {
      navigate(`/projects/${project_data?.data?.project?.id}`);
    }
  }, [success, project_data]);

  return (
    <div>
      <TitleText>Create new Project</TitleText>
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Project Name"
              description="Helps you identify your application."
              name="name"
              placeholder="My Project"
              required
              value={form.name as string}
              onChange={onChange}
              error={error?.name}
            />
            <Textarea
              label="Project Description"
              placeholder="Enter project description"
              value={form.description as string}
              name="description"
              onChange={onChange}
              required
              error={error?.description}
            />
            <Select
              label="Type of Project"
              description="Select the type of project you are creating"
              placeholder="Select project type"
              data={PROJECT_TYPES}
              name="type"
              value={form.type as string}
              searchable
              onChange={(value) => updateFormValue("type", value)}
              error={error?.type}
            />
            <Select
              label="Organisation Name"
              placeholder="Enter organisation"
              name="organisation"
              searchable
              data={ORGANISATIONS}
              value={form.organisation as string}
              onChange={(value) => updateFormValue("organisation", value)}
              error={error?.organisation}
            />
            <Select
              label="Project Location"
              description="Select where your project will be deployed"
              placeholder="Enter project location"
              data={clusters}
              name="cluster_id"
              rightSection={clustersLoading ? <Loader size="xs" /> : null}
              searchable
              value={form.cluster_id as string}
              onChange={(value) => updateFormValue("cluster_id", value)}
              required
              error={error?.cluster_id}
            />
            <TagsInput
              label="Tags"
              description="Add tags to help identify your project"
              placeholder="Add tags"
              name="tags"
              data={Array.from(new Set(tags))}
              rightSection={tagsLoading ? <Loader size="xs" /> : null}
              onChange={(value) => updateFormValue("tags", value)}
              value={form.tags as string[]}
              error={error?.tags}
            />
            <Group justify="flex-end">
              <Button
                variant="filled"
                color="gray.9"
                type="submit"
                leftSection={submitting ? <Loader size="xs" /> : null}
              >
                Create Project
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default CreateProjectForm;
