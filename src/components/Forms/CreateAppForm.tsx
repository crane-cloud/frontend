import {
  Button,
  Divider,
  Fieldset,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import TitleText from "../TitleText";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { useGetProject, useSetContainerSize } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { HiCommandLine, HiTrash } from "react-icons/hi2";
import useForm from "@/hooks/useForm";
import usePost from "@/utils/usePost";
import { API_APPS, API_PROJECTS } from "@/utils/apis";
import { useNavigate, useParams } from "react-router-dom";
import { IoRocketSharp } from "react-icons/io5";
import { FaDocker } from "react-icons/fa";
import { TbCopy, TbUpload, TbX, TbFileZip } from "react-icons/tb";
import { LuScreenShare } from "react-icons/lu";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FRAMEWORKS, REGISTRIES } from "@/utils/constants";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useAuth } from "@/utils/AuthContext";
import { MIRA_API_URL } from "@/config";

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
          <Tabs.Tab value="multiple">Multiple Apps</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="single" pt={10}>
          <CreateSingleAppForm project={project} />
        </Tabs.Panel>

        <Tabs.Panel value="mira" pt={10}>
          <CreateMIRAAppForm project={project} />
        </Tabs.Panel>

        <Tabs.Panel value="multiple" pt={10}>
          Still in progress
        </Tabs.Panel>
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
  const { form, onChange, updateFormValue, updateFormValues, editedForm } = useForm();
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
    value: string
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
      return
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
