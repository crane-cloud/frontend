import React, { useEffect, useState } from "react";
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
  Text,
  Alert,
} from "@mantine/core";
import {
  InvalidFeedback,
  sanitizeTags,
  useSetContainerSize,
  validateProjectName,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { API_CLUSTERS, API_PROJECTS, API_TAGS } from "@/utils/apis";
import { NO, ORGANISATIONS, PROJECT_TYPES, YES } from "@/utils/constants";
import usePost from "@/utils/usePost";
import { useAuth } from "@/utils/AuthContext";
import { useNavigate } from "react-router-dom";
import useForm from "@/hooks/generic/useForm";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type TCreateProjectForm = {
  project?: any;
  showTitle?: boolean;
  isUpdatingProject?: boolean;
  onCancel?: () => void;
  refresh?: () => void;
  shouldRedirect?: boolean;
  setContainerSize?: boolean;
};

const CreateProjectForm = (props: TCreateProjectForm) => {
  const {
    project,
    isUpdatingProject = false,
    showTitle = true,
    onCancel = false,
    refresh = () => {},
    shouldRedirect = false,
    setContainerSize = true,
  } = props;
  if (setContainerSize) {
    useSetContainerSize("sm");
  }
  const { form, onChange, updateFormValue, updateFormValues, editedForm } =
    useForm();
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

  const [nameValid, setNameValid] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<InvalidFeedback>({});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const value = e.target.value.trimStart();
    setNameValid(value.length > 0 ? validateProjectName(value) : null);
  };

  useEffect(() => {
    getClusters({
      api: `${API_CLUSTERS}`,
      params: { disabled: false },
    });
    getTags({
      api: API_TAGS,
    });
    if (project) {
      updateFormValues({
        ...project,
        supports_ml: project?.supports_ml ? "Yes" : "No",
        tags_add: project?.tags?.map((tag: any) => tag.name),
      });
    }
  }, []);

  // useEffect(() => {
  //   if (project && clustersData) {
  //     updateFormValues({
  //       ...project,
  //       ...project,
  //       supports_ml: ml_clusters?.some((cluster: any) => cluster.value === project.cluster),
  //       tags_add: project?.tags?.map((tag: any) => tag.name),
  //     });
  //   }
  // }, [project, clustersData]);

  const clusters = clustersData?.data?.clusters
    ?.filter((cluster: any) => !cluster.supports_ml)
    .map((cluster: any) => ({
      label: cluster.name,
      value: cluster.id,
    }));
  const ml_clusters = clustersData?.data?.clusters
    ?.filter((cluster: any) => cluster.supports_ml)
    .map((cluster: any) => ({
      label: cluster.name,
      value: cluster.id,
    }));
  const tags = tagsData?.data?.map((tag: any) => tag.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: API_PROJECTS,
      id: project?.id || null,
      params: project?.id
        ? editedForm
        : {
            ...form,
            owner_id: user?.id,
          },
    });
  };
  useEffect(() => {
    if (success && project_data) {
      if (shouldRedirect) {
        navigate(`/projects/${project_data?.data?.project?.id}`);
      } else if (onCancel) {
        onCancel();
        refresh();
      } else {
        navigate(`/projects/${project_data?.data?.project?.id}`);
      }
    }
  }, [success, project_data]);

  const handleTagChange = (values: string[]) => {
    const { validTags, invalid } = sanitizeTags(values);
    setFeedback(invalid);
    updateFormValue("tags_add", validTags);
  };

  const hasFeedback =
    feedback.hashtags?.length ||
    feedback.commas?.length ||
    feedback.numbers?.length;

  return (
    <div>
      {showTitle && <TitleText>Create new Project</TitleText>}
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Project Name"
              description="Helps you identify your application."
              name="name"
              placeholder="My-Project"
              required
              value={form.name as string}
              onChange={handleNameChange}
              error={
                nameValid === false
                  ? "Max 30 characters. Only letters, numbers, and hyphens allowed (no spaces, symbols, or leading/trailing/consecutive hyphens)."
                  : error?.name
              }
              rightSection={
                nameValid === null ? null : nameValid ? (
                  <FaCheckCircle color="green" />
                ) : (
                  <FaTimesCircle color="red" />
                )
              }
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
              name="project_type"
              value={form.project_type as string}
              searchable
              onChange={(value) => updateFormValue("project_type", value)}
              error={error?.project_type}
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
            {!isUpdatingProject && (
              <>
                <Select
                  label="Is it an Machine Learning Project?"
                  description="Tick if it is a machine learning project"
                  placeholder="Enter project location"
                  data={[YES, NO]}
                  name="supports_ml"
                  defaultValue={NO}
                  value={form?.supports_ml as string}
                  onChange={(value) => updateFormValue("supports_ml", value)}
                  required
                  error={error?.supports_ml}
                  disabled={project?.id}
                />
                <Select
                  label={
                    project?.supports_ml === true
                      ? "Machine Learning Project Location"
                      : "Project Location"
                  }
                  description={
                    project?.supports_ml === true
                      ? "Select where your machine learning project will be deployed"
                      : "Select where your project will be deployed"
                  }
                  placeholder="Enter project location"
                  data={form.supports_ml === YES ? ml_clusters : clusters}
                  name="cluster_id"
                  rightSection={clustersLoading ? <Loader size="xs" /> : null}
                  searchable
                  value={form.cluster_id as string}
                  onChange={(value) => updateFormValue("cluster_id", value)}
                  required
                  error={error?.cluster_id}
                  disabled={project?.id}
                />
              </>
            )}
            <TagsInput
              label="Tags"
              description="Press Enter after typing a tag to add another. Keep them short and relevant, e.g. 'python', 'ai2', 'frontend'."
              placeholder="Add tags"
              name="tags_add"
              data={Array.from(new Set(tags as string[]))}
              rightSection={tagsLoading ? <Loader size="xs" /> : null}
              value={form.tags_add as string[]}
              error={error?.tags_add}
              onChange={handleTagChange}
            />

            {hasFeedback && (
              <div>
                {feedback.hashtags?.length ? (
                  <Text size="xs" c="red">
                    Tags can’t start with “#”. Remove the symbol and just type:
                    <br />
                    <b>
                      {feedback.hashtags
                        .map((t) => t.replace(/^#+/, ""))
                        .join(", ")}
                    </b>
                  </Text>
                ) : null}

                {feedback.commas?.length ? (
                  <Text size="xs" c="red" mt={4}>
                    Tags can’t contain commas. Enter each tag separately:
                    <br />
                    <b>{feedback.commas.join(", ")}</b>
                  </Text>
                ) : null}

                {feedback.numbers?.length ? (
                  <Text size="xs" c="red" mt={4}>
                    Single numbers are not allowed. Use words or combine with
                    letters:
                    <br />
                    <b>
                      {feedback.numbers
                        .map((n) => `${n} → web3, ai2`)
                        .join(", ")}
                    </b>
                  </Text>
                ) : null}
              </div>
            )}

            <Group justify="flex-end">
              {onCancel && (
                <Button variant="default" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button
                variant="filled"
                color={project ? "blue" : "gray.9"}
                type="submit"
                leftSection={submitting ? <Loader size="xs" /> : null}
                disabled={
                  submitting ||
                  (project?.id && Object.keys(editedForm).length <= 0)
                }
              >
                {project ? "Update Project" : "Create Project"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default CreateProjectForm;

export const MigrateProjectForm = (props: {
  project: any;
  showTitle?: boolean;
  onCancel?: () => void;
  refresh?: () => void;
}) => {
  const { project, onCancel = false, refresh = () => {} } = props;
  useSetContainerSize("sm");
  const { form, updateFormValue, updateFormValues, editedForm } = useForm();

  const navigate = useNavigate();
  const {
    data: clustersData,
    getData: getClusters,
    loading: clustersLoading,
  } = useGet();
  const {
    uploadData,
    submitting,
    error,
    success,
    data: project_data,
  } = usePost();

  useEffect(() => {
    getClusters({
      api: `${API_CLUSTERS}`,
      params: { disabled: false },
    });
    if (project) {
      updateFormValues({
        supports_ml: project?.supports_ml ? "Yes" : "No",
        cluster_id: project?.cluster_id,
      });
    }
  }, []);

  const clusters = clustersData?.data?.clusters
    ?.filter((cluster: any) => !cluster.supports_ml)
    .map((cluster: any) => ({
      label: cluster.name,
      value: cluster.id,
    }));
  const ml_clusters = clustersData?.data?.clusters
    ?.filter((cluster: any) => cluster.supports_ml)
    .map((cluster: any) => ({
      label: cluster.name,
      value: cluster.id,
    }));

  const availableClusters =
    project?.supports_ml === true ? ml_clusters : clusters;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: `${API_PROJECTS}/${project?.id}/migrate`,
      params: {
        new_cluster_id: form.cluster_id,
      },
    });
  };
  useEffect(() => {
    if (success && project_data) {
      if (onCancel) {
        onCancel();
        refresh();
      } else {
        navigate(`/projects/${project_data?.data?.project?.id}`);
      }
    }
  }, [success, project_data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Alert
            title="Important migration notes"
            color="blue"
            withCloseButton={false}
            variant="light"
          >
            <Text size="md">
              • <strong>Environment variables</strong> are not saved by Crane
              Cloud — they will be pulled from the new server automatically.
              <br />• <strong>App URLs will change</strong> — all app
              deployments within this project will receive new URLs based on the
              destination server.
              <br />
              We recommend saving critical environment variables and settings
              (e.g., in a simple text file) before proceeding. You can add them
              back when the project migration is complete.
            </Text>
          </Alert>

          <Select
            label="Is it an Machine Learning Project?"
            description="Tick if it is a machine learning project"
            placeholder="Does this project use machine learning?"
            data={[YES, NO]}
            name="supports_ml"
            defaultValue={NO}
            value={form?.supports_ml as string}
            onChange={(value) => updateFormValue("supports_ml", value)}
            required
            error={error?.supports_ml}
            disabled={project?.id}
          />
          <Select
            label={
              project?.supports_ml === true
                ? "Machine Learning Project Location"
                : "Project Location"
            }
            description={
              project?.supports_ml === true
                ? "Select where your machine learning project will be deployed"
                : "Select where your project will be deployed"
            }
            placeholder="Enter project location"
            data={availableClusters}
            name="cluster_id"
            rightSection={clustersLoading ? <Loader size="xs" /> : null}
            searchable
            value={form.cluster_id as string}
            onChange={(value) => updateFormValue("cluster_id", value)}
            required
            error={error?.cluster_id}
          />

          <Group justify="flex-end">
            {onCancel && (
              <Button variant="default" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              variant="filled"
              color={project ? "blue" : "gray.9"}
              type="submit"
              leftSection={submitting ? <Loader size="xs" /> : null}
              disabled={
                submitting ||
                (project?.id && Object.keys(editedForm).length <= 0)
              }
            >
              Migrate Project
            </Button>
          </Group>
        </Stack>
      </form>
    </div>
  );
};
