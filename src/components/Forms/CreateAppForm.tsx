import {
  ActionIcon,
  Alert,
  Button,
  Code,
  Divider,
  Fieldset,
  Flex,
  Group,
  Input,
  List,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import TitleText from "../TitleText";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { useGetProject, useSetContainerSize } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { HiCommandLine, HiTrash } from "react-icons/hi2";
import usePost from "@/utils/usePost";
import { API_APPS, API_PROJECTS } from "@/utils/apis";
import { useNavigate, useParams } from "react-router-dom";
import { IoRocketSharp } from "react-icons/io5";
import { FaDocker } from "react-icons/fa";
import {
  TbCopy,
  TbUpload,
  TbX,
  TbFileZip,
  TbPlugConnected,
} from "react-icons/tb";
import { LuLink, LuScreenShare, LuServer } from "react-icons/lu";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {
  FRAMEWORKS,
  MODAL_API_TYPES,
  MODAL_SERVERS,
  REGISTRIES,
} from "@/utils/constants";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useAuth } from "@/utils/AuthContext";
import { MIRA_API_URL } from "@/config";
import { Table } from "../Elements/CustomTable";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import useForm from "@/hooks/generic/useForm";
import { useHuggingFaceTasks } from "@/hooks/useHuggingFaceTasks";
import { SiMlflow, SiScikitlearn } from "react-icons/si";

const CreateAppForm = () => {
  useSetContainerSize("sm");
  const { project_id } = useParams();
  const { project } = useGetProject(project_id || "");
  return (
    <div>
      <Tabs defaultValue="single">
        <Tabs.List>
          <Tabs.Tab value="single">Single App</Tabs.Tab>
          <Tabs.Tab value="mira">Deploy with MIRA</Tabs.Tab>
          {/* <Tabs.Tab value="multiple">Multiple Apps</Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="single" pt={10}>
          <CreateSingleAppForm project={project} />
        </Tabs.Panel>

        <Tabs.Panel value="mira" pt={10}>
          <CreateMIRAAppForm project={project} />
        </Tabs.Panel>

        {/* <Tabs.Panel value="multiple" pt={10}>
          Still in progress
        </Tabs.Panel> */}
      </Tabs>
    </div>
  );
};

export default CreateAppForm;

export const CreateSingleAppForm = (props: {
  project?: any;
  app?: any;
  showTitle?: boolean;
  showEnvs?: boolean;
  onCancel?: () => void;
  refresh?: () => void;
}) => {
  const {
    project,
    app,
    showTitle = true,
    showEnvs = true,
    onCancel = false,
    refresh = () => {},
  } = props;
  const { form, onChange, updateFormValue, updateFormValues, editedForm } =
    useForm();
  const { uploadData, submitting, error, success } = usePost();
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);

  const navigate = useNavigate();
  useEffect(() => {
    updateFormValues({
      envVars: envVariables,
    });
  }, [envVariables]);

  const addEnvVariable = () => {
    setEnvVariables([...envVariables, { key: "", value: "" }]);
  };

  const removeEnvVariable = (index: number) => {
    const updated = envVariables.filter((_, i) => i !== index);
    setEnvVariables(updated);
  };

  const handleEnvChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...envVariables];
    updated[index][field] = value;
    setEnvVariables(updated);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (app) {
      uploadData({
        api: API_APPS,
        id: app?.id,
        params: editedForm,
      });
      return;
    }

    uploadData({
      api: `${API_PROJECTS}/${project?.id}/apps`,
      params: form,
    });
  };

  useEffect(() => {
    if (app) {
      updateFormValues({
        ...app,
      });
    }
  }, []);

  useEffect(() => {
    if (success) {
      if (onCancel) {
        onCancel();
        if (refresh) {
          refresh();
        }
      } else {
        navigate(`/projects/${project?.id}/apps`);
      }
    }
  }, [success]);

  return (
    <div style={{ marginTop: showTitle ? 10 : 0 }}>
      {showTitle && (
        <TitleText>
          <Flex align="center" gap="xs">
            <IoRocketSharp size={15} />
            Deploy Application
          </Flex>
        </TitleText>
      )}

      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Application Name"
              name="name"
              placeholder="Enter application name"
              description="Enter the name of the application"
              required
              value={form?.name as string}
              onChange={onChange}
              error={error?.name}
              leftSection={<MdDriveFileRenameOutline />}
            />

            <TextInput
              label="Image"
              name="image"
              placeholder="Enter image"
              description="Image URI e.g for docker: ngnixdemos/hello, for gcr: gcr.io/hello"
              flex={1}
              required
              value={form?.image as string}
              onChange={onChange}
              error={error?.image}
              leftSection={<FaDocker />}
            />
            <Flex gap="md">
              <TextInput
                label="Port"
                name="port"
                placeholder="Enter port - default 80"
                description="The exposed port number for the application"
                type="number"
                value={form?.port as number}
                onChange={onChange}
                error={error?.port}
                leftSection={<LuScreenShare />}
                flex={1}
              />
              <Select
                label="Number of replicas"
                name="replicas"
                data={[1, 2, 3, 4].map(String)}
                description="Select the number of replicas for the application"
                defaultValue="1"
                rightSection={<IoIosArrowDown />}
                value={form?.replicas as string}
                onChange={(value) => updateFormValue("replicas", value)}
                error={error?.replicas}
                leftSection={<TbCopy />}
                flex={1}
              />
            </Flex>
            <TextInput
              label="Entry Command"
              name="entry_command"
              placeholder="Enter entry command"
              description="Entry point or command for the application"
              value={form?.entry_command as string}
              onChange={onChange}
              error={error?.entry_command}
              leftSection={<HiCommandLine />}
            />
            {showEnvs && (
              <Fieldset
                legend="Environment Variables"
                // description="Add environment variables for your application"
              >
                <Stack gap="sm">
                  {envVariables.map((env, index) => (
                    <Flex key={index} gap="md" align="flex-end">
                      <TextInput
                        label="Key"
                        labelProps={{ size: "xs" }}
                        size="xs"
                        variant="filled"
                        placeholder="ENV_KEY"
                        value={env.key}
                        onChange={(e) =>
                          handleEnvChange(index, "key", e.target.value)
                        }
                        flex={1}
                        //   required
                      />
                      <TextInput
                        label="Value"
                        labelProps={{ size: "xs" }}
                        size="xs"
                        variant="filled"
                        placeholder="value"
                        value={env.value}
                        onChange={(e) =>
                          handleEnvChange(index, "value", e.target.value)
                        }
                        flex={1}
                        //   required
                      />
                      {envVariables.length > 1 && (
                        <Button
                          variant="subtle"
                          color="red"
                          onClick={() => removeEnvVariable(index)}
                          leftSection={<HiTrash size={14} />}
                          size="compact-xs"
                          style={{ marginBottom: 5 }}
                        >
                          Remove
                        </Button>
                      )}
                    </Flex>
                  ))}
                  <Button
                    variant="outline"
                    leftSection={<IoMdAdd />}
                    onClick={addEnvVariable}
                    mt="sm"
                  >
                    Add Variable
                  </Button>
                </Stack>
              </Fieldset>
            )}
            <Divider mt="md" />
            <Group justify="flex-end">
              <Button
                type="submit"
                variant="filled"
                loading={submitting}
                leftSection={<IoRocketSharp />}
                color="gray.9"
              >
                {app ? "Update App" : "Deploy App"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

const CreateMIRAAppForm = (props: { project: any }) => {
  const { project } = props;
  const { authToken } = useAuth();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { form, onChange, updateFormValue, updateFormValues } = useForm();
  const { uploadData, submitting, error } = usePost();

  useEffect(() => {
    updateFormValues({
      files,
    });
  }, [files]);

  useEffect(() => {
    updateFormValues({
      project: project?.id,
      token: authToken,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: `${MIRA_API_URL}/containerize`,
      params: form,
      isExternal: true,
      type: "multipart/form-data",
    });
  };

  const Previews = files.map((file, index) => (
    <Flex key={index} gap="xs" align="center">
      <TbFileZip size={24} />
      <Text size="sm" lineClamp={1}>
        {file.name}
      </Text>
    </Flex>
  ));

  return (
    <div>
      <TitleText>Deploy with MIRA</TitleText>
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Select
              label="Select Framework"
              name="framework"
              placeholder="Select framework"
              required
              data={FRAMEWORKS}
              value={form?.framework as string}
              onChange={(value) => updateFormValue("framework", value)}
              error={error?.framework}
            />
            <Select
              label="Select Registry"
              name="registry"
              placeholder="Select registry"
              description="Select the registry to deploy the application to"
              required
              data={REGISTRIES}
              value={form?.registry as string}
              onChange={(value) => updateFormValue("registry", value)}
              error={error?.registry}
            />
            <TextInput
              label="Image"
              name="image"
              placeholder="Enter image"
              description="Enter the image to deploy the application to"
              required
              value={form?.image as string}
              onChange={onChange}
              error={error?.image}
            />
            <TextInput
              label="Version"
              name="tag"
              placeholder="Enter version"
              description="This is the preffered tag for the image"
              value={form?.tag as string}
              onChange={onChange}
              error={error?.tag}
            />
            <Stack gap={2}>
              <Text className="subtitle">Zip File</Text>
              {files.length > 0 && (
                <Flex gap="xs" align="center">
                  {Previews}
                  <Button
                    variant="subtle"
                    color="red"
                    onClick={() => setFiles([])}
                    size="compact-xs"
                    leftSection={<TbX size={14} />}
                  >
                    Remove
                  </Button>
                </Flex>
              )}
            </Stack>

            <Dropzone
              name="file"
              onDrop={(files) => setFiles(files)}
              accept={[MIME_TYPES.zip, MIME_TYPES.rar]}
              maxFiles={1}
              maxSize={3 * 1024 ** 2}
            >
              <Group
                justify="center"
                gap="xl"
                mih={120}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <TbUpload size={52} color="var(--mantine-color-blue-6)" />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <TbX size={52} color="var(--mantine-color-red-6)" />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <TbFileZip size={52} color="var(--mantine-color-dimmed)" />
                </Dropzone.Idle>
                <div>
                  <Text size="xl" inline>
                    Drag zip/rar here or click to select
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Single archive file, not exceeding 3MB
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Divider />
            <Group justify="flex-end">
              <Button
                variant="filled"
                type="submit"
                leftSection={<IoRocketSharp />}
                disabled={submitting || files.length === 0}
                loading={submitting}
              >
                Deploy App
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

interface EnvVariable {
  key: string;
  value: any;
}

interface EnvironmentVariablesSectionProps {
  envVariables: any[];
  setEnvVariables: React.Dispatch<React.SetStateAction<any[]>>;
  showTitle?: boolean;
  loading?: boolean;
}

export const EnvironmentVariablesForm: React.FC<
  EnvironmentVariablesSectionProps
> = ({ envVariables, setEnvVariables, showTitle = true, loading = false }) => {
  const addEnvVariable = () => {
    setEnvVariables([...envVariables, { key: "", value: "" }]);
  };

  const removeEnvVariable = (index: number) => {
    const updated = envVariables.filter((_, i) => i !== index);
    setEnvVariables(updated);
  };

  const handleEnvChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const updated = [...envVariables];
    updated[index][field] = value;
    setEnvVariables(updated);
  };

  return (
    <div className="env-variables-section">
      {showTitle && <h3>Environment Variables</h3>}

      <Stack gap="sm">
        {envVariables.map((env, index) => (
          <Flex key={index} gap="md" align="flex-end">
            <TextInput
              label="Key"
              labelProps={{ size: "xs" }}
              size="xs"
              variant="filled"
              placeholder="ENV_KEY"
              value={env.key}
              onChange={(e) => handleEnvChange(index, "key", e.target.value)}
              flex={1}
              required
            />
            <TextInput
              label="Value"
              labelProps={{ size: "xs" }}
              size="xs"
              variant="filled"
              placeholder="value"
              value={env.value}
              onChange={(e) => handleEnvChange(index, "value", e.target.value)}
              flex={1}
              required
            />
            {envVariables.length > 1 && (
              <Button
                variant="subtle"
                color="red"
                onClick={() => removeEnvVariable(index)}
                leftSection={<HiTrash size={14} />}
                size="compact-xs"
                style={{ marginBottom: 5 }}
              >
                Remove
              </Button>
            )}
          </Flex>
        ))}
        <Flex justify="flex-end">
          <Button
            variant="outline"
            leftSection={<IoMdAdd />}
            onClick={addEnvVariable}
            mt="sm"
            loading={loading}
          >
            Add Variable
          </Button>
        </Flex>
      </Stack>
    </div>
  );
};

export const EnvironmentVariablesTable = ({
  envVariables,
}: {
  envVariables: EnvVariable[];
}) => {
  const columns = [
    {
      id: "key",
      header: "Key",
    },
    {
      id: "value",
      header: "Value",
    },
    {
      id: "",
      header: "",
    },
  ];
  const ValueView = (item: any) => {
    const [showFields, setShowFields] = useState<Record<string, boolean>>({});
    return (
      <Flex justify="space-between" align="center" w="100%" gap={5}>
        <Tooltip
          label={showFields[item.value] ? "Hide" : "Show"}
          withArrow
          position="left"
        >
          <ActionIcon
            variant="default"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setShowFields((prev) => ({
                ...prev,
                [item.value]: !prev[item.value],
              }))
            }
          >
            {showFields[item.value] ? (
              <AiOutlineEyeInvisible size={16} />
            ) : (
              <AiOutlineEye size={16} />
            )}
          </ActionIcon>
        </Tooltip>
        <Input
          value={item.value}
          readOnly
          variant="filled"
          style={{ flex: 1 }}
          styles={{
            input: {
              cursor: "pointer",
              outline: "none",
              border: "none",
            },
          }}
          type={showFields[item.value] ? "text" : "password"}
          onClick={() => {
            setShowFields((prev) => ({
              ...prev,
              [item.value]: !prev[item.value],
            }));
          }}
        />
      </Flex>
    );
  };
  const tableData = (data: EnvVariable[]) => {
    return data.map((item) => ({
      key: item?.key,
      value: <ValueView value={item?.value} />,
      action: (
        <Button
          variant="subtle"
          color="red"
          size="compact-xs"
          leftSection={<HiTrash size={14} />}
        >
          Remove
        </Button>
      ),
    }));
  };
  return (
    <Table
      columns={columns}
      data={tableData(envVariables)}
      props={{
        verticalSpacing: "sm",
      }}
      showIndex={false}
      striped={false}
    />
  );
};

interface DeployNotebookFormProps {
  project: any;
  showTitle?: boolean;
  onCancel?: () => void;
  refresh?: () => void;
}

export const DeployNotebookForm = ({
  showTitle = true,
  project,
  onCancel = () => {},
  refresh = () => {},
}: DeployNotebookFormProps) => {
  const { uploadData, submitting, error, success } = usePost();
  const { form, onChange } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadData({
      api: `${API_PROJECTS}/${project?.id}/apps/ml`,
      params: {
        ...form,
        is_notebook: true,
      },
    });
  };

  useEffect(() => {
    if (success) {
      onCancel?.();
      if (onCancel) {
        onCancel();
      }
      if (refresh) {
        refresh();
      }
    }
  }, [success]);

  return (
    <div style={{ marginTop: showTitle ? 10 : 0 }}>
      {showTitle && (
        <TitleText>
          <Flex align="center" gap="xs">
            <IoRocketSharp size={15} />
            Deploy a Notebook
          </Flex>
        </TitleText>
      )}
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Application Name"
              name="name"
              placeholder="Enter application name"
              description="Enter the name of the application"
              required
              value={form?.name as string}
              onChange={onChange}
              error={error?.name}
              leftSection={<MdDriveFileRenameOutline />}
            />
            <Divider mt="md" />
            <Group justify="flex-end">
              <Button
                type="submit"
                variant="filled"
                loading={submitting}
                leftSection={<IoRocketSharp />}
                color="gray.9"
              >
                Deploy Notebook
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export const DeployAppModalForm = ({
  showTitle = true,
  project,
  onCancel = () => {},
  refresh = () => {},
}: DeployNotebookFormProps) => {
  const {
    tasks: hfTasks,
    loading: loadingTasks,
    fetchTasks,
  } = useHuggingFaceTasks();
  const { uploadData, submitting, error, success } = usePost();
  const { form, onChange, updateFormValue } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadData({
      api: `${API_PROJECTS}/${project?.id}/apps/ml`,
      params: {
        ...form,
        is_notebook: false,
        is_modal: true,
      },
    });
  };

  useEffect(() => {
    if (success) {
      onCancel?.();
      if (onCancel) {
        onCancel();
      }
      if (refresh) {
        refresh();
      }
    }
  }, [success]);

  // Check if the form is for Hugging Face, MLflow, or Sklearn
  const isHuggingFace = form.model_server === "HUGGINGFACE_SERVER";
  const isMLflow = form.model_server === "MLFLOW_SERVER";
  const isSklearn = form.model_server === "SKLEARN_SERVER";

  useEffect(() => {
    if (isHuggingFace) {
      fetchTasks();
    }
  }, [isHuggingFace]);

  return (
    <div style={{ marginTop: showTitle ? 10 : 0 }}>
      {showTitle && (
        <TitleText>
          <Flex align="center" gap="xs">
            <RiRobot2Line size={15} />
            Deploy a Trained Model
          </Flex>
        </TitleText>
      )}
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Select
              label="Model Server"
              name="model_server"
              placeholder="Select the server that hosts your model"
              description="Choose where your model is hosted"
              required
              value={form.model_server as string}
              onChange={(value) => updateFormValue("model_server", value)}
              error={error?.model_server}
              data={MODAL_SERVERS.map((server) => ({
                ...server,
                leftSection: server.icon ? (
                  <server.icon size={16} />
                ) : undefined,
              }))}
              leftSection={<LuServer />}
            />

            {/* Hugging Face Guidelines */}
            {isHuggingFace && (
              <Alert
                icon={<RiRobot2Line size={24} />}
                color="blue"
                variant="light"
                radius="md"
              >
                <Text size="sm" fw={500} mb="xs">
                  Hugging Face Model Deployment
                </Text>
                <Text size="sm" mb="xs">
                  You're deploying from Hugging Face Hub. Here's what you need
                  to know:
                </Text>
                <List size="sm">
                  <List.Item>
                    Use the full model path (e.g.,{" "}
                    <Code>microsoft/DialoGPT-medium</Code>)
                  </List.Item>
                  <List.Item>Ensure the model supports inference API</List.Item>
                  <List.Item>
                    Some models may require authentication tokens
                  </List.Item>
                  <List.Item>
                    Check model compatibility with transformers library
                  </List.Item>
                </List>
              </Alert>
            )}

            {/* MLflow Guidelines */}
            {isMLflow && (
              <Alert
                icon={<SiMlflow size={24} />}
                color="blue"
                variant="light"
                radius="md"
              >
                <Text size="sm" fw={500} mb="xs">
                  MLflow Model Deployment
                </Text>
                <Text size="sm" mb="xs">
                  You're deploying from MLflow Model Registry. Here's what you
                  need to know:
                </Text>
                <List size="sm">
                  <List.Item>
                    Use the run ID format: <Code>runs:/run_id/model</Code>
                  </List.Item>
                  <List.Item>
                    Ensure MLflow tracking server is accessible
                  </List.Item>
                  <List.Item>
                    Model must be logged with MLflow tracking
                  </List.Item>
                  <List.Item>
                    Supports multiple ML frameworks (sklearn, pytorch, etc.)
                  </List.Item>
                </List>
              </Alert>
            )}

            {/* Sklearn Guidelines */}
            {isSklearn && (
              <Alert
                icon={<SiScikitlearn size={24} />}
                color="orange"
                variant="light"
                radius="md"
              >
                <Text size="sm" fw={500} mb="xs">
                  Scikit-learn Model Deployment
                </Text>
                <Text size="sm" mb="xs">
                  You're deploying a scikit-learn model. Here's what you need to
                  know:
                </Text>
                <List size="sm">
                  <List.Item>
                    Model should be saved as pickle file: <Code>model.pkl</Code>
                  </List.Item>
                  <List.Item>
                    Or use joblib format: <Code>model.joblib</Code>
                  </List.Item>
                  <List.Item>Ensure sklearn version compatibility</List.Item>
                  <List.Item>
                    Include preprocessing pipeline if needed
                  </List.Item>
                  <List.Item>Model must implement predict() method</List.Item>
                </List>
              </Alert>
            )}

            <TextInput
              label="Model Name"
              name="name"
              placeholder="Enter model name"
              description="Enter a descriptive name for your model"
              required
              value={form?.name as string}
              onChange={onChange}
              error={error?.name}
              leftSection={<MdDriveFileRenameOutline />}
            />

            <TextInput
              label={
                isHuggingFace
                  ? "Model Repository"
                  : isMLflow
                    ? "Model URI"
                    : isSklearn
                      ? "Model File Path"
                      : "Model URL"
              }
              name="model_image_uri"
              placeholder={
                isHuggingFace
                  ? "e.g., microsoft/DialoGPT-medium"
                  : isMLflow
                    ? "e.g., models:/my_model/1 or runs:/abc123/model"
                    : isSklearn
                      ? "e.g., /path/to/model.pkl or https://example.com/model.pkl"
                      : "Enter model URL"
              }
              description={
                isHuggingFace
                  ? "Enter the Hugging Face model repository path"
                  : isMLflow
                    ? "Enter the MLflow model URI (models:/ or runs:/ format)"
                    : isSklearn
                      ? "Enter the path to your sklearn model file"
                      : "Enter the URL where the model is hosted"
              }
              required
              value={form?.model_image_uri as string}
              onChange={onChange}
              error={error?.model_image_uri}
              leftSection={<LuLink />}
            />

            {isHuggingFace && (
              <Stack gap="sm">
                <Select
                  label="Task Type"
                  name="task"
                  placeholder="Select model task"
                  description="What task is this model designed for?"
                  value={form.task as string}
                  onChange={(value) => updateFormValue("task", value)}
                  data={hfTasks}
                  leftSection={<TbPlugConnected />}
                  disabled={loadingTasks}
                  rightSection={
                    loadingTasks ? (
                      <Text size="xs">Loading tasks...</Text>
                    ) : undefined
                  }
                  searchable
                  clearable
                />
              </Stack>
            )}

            <Select
              label="API Type"
              name="api_type"
              placeholder="Select API framework"
              description="Choose the API framework for your model"
              required
              value={form.api_type as string}
              onChange={(value) => updateFormValue("api_type", value)}
              error={error?.api_type}
              data={MODAL_API_TYPES}
              defaultValue={MODAL_API_TYPES[0].value}
              leftSection={<TbPlugConnected />}
            />

            <Divider mt="md" />
            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                {isHuggingFace
                  ? "Deploying from Hugging Face Hub"
                  : "Ready to deploy your model"}
              </Text>
              <Button
                type="submit"
                variant="filled"
                loading={submitting}
                leftSection={<RiRobot2Line />}
                color="gray.9"
              >
                Deploy Model
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};
