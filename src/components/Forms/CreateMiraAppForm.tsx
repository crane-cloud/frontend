import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";
import useForm from "@/hooks/generic/useForm";
import usePost from "@/utils/usePost";
import { MIRA_API_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  TextInput,
  Alert,
  Fieldset,
  ActionIcon,
} from "@mantine/core";
import { FaGithub, FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { HiTrash } from "react-icons/hi2";
import TitleText from "../TitleText";
import { FRAMEWORKS } from "@/utils/constants";
import { IoRocketSharp } from "react-icons/io5";
import BuildLogsTerminal from "../BuildLogsTerminal";

const CreateMiraAppForm = (props: { project: any }) => {
  const { project } = props;
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);
  const [_deploymentComplete, setDeploymentComplete] = useState(false);
  const { form: gitRepoForm, onChange: gitRepoOnChange } = useForm();
  const { form, onChange, updateFormValue, updateFormValues } = useForm();
  const {
    uploadData,
    submitting,
    error,
    success: deploymentSuccess,
    data: deploymentResponse,
  } = usePost();
  const {
    uploadData: gitRepoDetect,
    submitting: gitRepoDetectSubmitting,
    error: gitRepoDetectError,
    success: gitRepoDetectSuccess,
    data: gitRepoDetectData,
  } = usePost();

  useEffect(() => {
    updateFormValues({
      envVars: envVariables,
    });
  }, [envVariables]);

  useEffect(() => {
    if (gitRepoDetectSuccess) {
      updateFormValues({
        build_command: gitRepoDetectData?.command,
        output_directory: gitRepoDetectData?.build_dir,
        framework: gitRepoDetectData?.framework,
        install_command: gitRepoDetectData?.install_command,
      });
    }
  }, [gitRepoDetectData, gitRepoDetectSuccess]);

  useEffect(() => {
    updateFormValue("repo", gitRepoForm?.repo as string);
  }, [gitRepoForm?.repo]);

  // Handle deployment completion and redirect
  const handleDeploymentComplete = (appId?: string) => {
    setDeploymentComplete(true);
    // Use the app_id from the response if available, otherwise use the app name
    const appIdentifier = appId || deploymentResponse?.data?.name || form?.name;
    if (appIdentifier && project?.id) {
      navigate(`/projects/${project.id}/apps`);
    }
  };

  // Environment variables management
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

    // Convert env variables to object
    const envObject = envVariables.reduce(
      (acc, env) => {
        if (env.key && env.value) {
          acc[env.key] = env.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    uploadData({
      api: `${MIRA_API_URL}/api/images/containerize`,
      params: {
        ...form,
        project_id: project?.id,
        access_token: authToken,
        env_vars: envObject,
      },
      isExternal: true,
    });
  };

  const handleGitRepoDetect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gitRepoDetect({
      api: `${MIRA_API_URL}/api/images/detect`,
      params: {
        repo_url: gitRepoForm?.repo as string,
      },
      isExternal: true,
    });
  };

  return (
    <div>
      <TitleText>Deploy with MIRA</TitleText>
      <Paper p="lg" radius="md">
        <form onSubmit={handleGitRepoDetect}>
          <Stack>
            {!gitRepoDetectData && (
              <Alert
                icon={<FaGithub size={16} />}
                title="Deploy from Git Repository"
                color="blue"
                variant="light"
              >
                Connect your Git repository to deploy your application directly
                from source code.
              </Alert>
            )}

            <TextInput
              label="Repository URL"
              name="repo"
              placeholder="https://github.com/username/repo.git"
              description="Enter your Git repository URL (GitHub, GitLab, etc.)"
              required
              value={gitRepoForm?.repo as string}
              onChange={gitRepoOnChange}
              error={gitRepoDetectError?.repo}
              leftSection={<FaGithub />}
            />
            <Group justify="flex-end">
              <Button
                type="submit"
                leftSection={<IoRocketSharp />}
                loading={gitRepoDetectSubmitting}
                disabled={!gitRepoForm?.repo}
                color="gray.9"
              >
                Detect Repository
              </Button>
            </Group>
          </Stack>
        </form>
        {gitRepoDetectSuccess && (
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Application Name"
                name="name"
                placeholder="my-awesome-app"
                description="Name for your deployed application"
                required
                value={form?.name as string}
                onChange={onChange}
                error={error?.name}
              />

              <Flex gap="md">
                <Select
                  label="Select Framework"
                  name="framework"
                  placeholder="Select framework"
                  required
                  data={FRAMEWORKS}
                  value={form?.framework as string}
                  onChange={(value) => updateFormValue("framework", value)}
                  error={error?.framework}
                  flex={1}
                  leftSection={
                    form?.framework
                      ? (() => {
                          const framework = FRAMEWORKS.find(
                            (f) => f.value === form?.framework,
                          );
                          const IconComponent = framework?.icon;
                          return IconComponent ? (
                            <IconComponent size={13} />
                          ) : undefined;
                        })()
                      : undefined
                  }
                  renderOption={({ option, checked }) => {
                    const framework = FRAMEWORKS.find(
                      (f) => f.value === option.value,
                    );
                    const IconComponent = framework?.icon;

                    return (
                      <Group flex="1" gap="xs">
                        {IconComponent && <IconComponent size={16} />}
                        <span>{option.label}</span>
                        {checked && <FaCheck size={14} />}
                      </Group>
                    );
                  }}
                />
              </Flex>

              <Fieldset legend="Build Configuration">
                <Stack gap="md">
                  <TextInput
                    label="Build Command"
                    name="build_command"
                    placeholder="Build command"
                    description="The command your frontend framework provides for compiling your code."
                    value={form?.build_command as string}
                    onChange={onChange}
                    error={error?.build_command}
                    flex={1}
                    variant="filled"
                    required
                  />
                  <TextInput
                    label="Output Directory"
                    name="output_directory"
                    placeholder="build"
                    description="The directory where the compiled output is located."
                    value={form?.output_directory as string}
                    onChange={onChange}
                    error={error?.output_directory}
                    flex={1}
                    variant="filled"
                    required
                  />
                  <TextInput
                    label="Install Command"
                    name="install_command"
                    description="The command to install the dependencies."
                    value={form?.install_command as string}
                    onChange={onChange}
                    error={error?.install_command}
                    flex={1}
                    variant="filled"
                  />
                </Stack>
              </Fieldset>

              <Fieldset legend="Environment Variables">
                <Stack gap="sm">
                  {envVariables.map((env, index) => (
                    <Flex key={index} gap="md" align="flex-end">
                      <TextInput
                        label="Key"
                        placeholder="ENV_KEY"
                        value={env.key}
                        onChange={(e) =>
                          handleEnvChange(index, "key", e.target.value)
                        }
                        flex={1}
                        size="sm"
                      />
                      <TextInput
                        label="Value"
                        placeholder="value"
                        value={env.value}
                        onChange={(e) =>
                          handleEnvChange(index, "value", e.target.value)
                        }
                        flex={1}
                        size="sm"
                      />
                      {envVariables.length > 1 && (
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => removeEnvVariable(index)}
                          size="lg"
                        >
                          <HiTrash size={16} />
                        </ActionIcon>
                      )}
                    </Flex>
                  ))}
                  <Group justify="flex-end">
                    <Button
                      variant="outline"
                      leftSection={<IoMdAdd />}
                      onClick={addEnvVariable}
                      size="sm"
                    >
                      Add Variable
                    </Button>
                  </Group>
                </Stack>
              </Fieldset>

              <Divider />

              <Group justify="flex-end">
                <Button
                  type="submit"
                  leftSection={<IoRocketSharp />}
                  loading={submitting}
                  disabled={
                    !form?.build_command ||
                    !form?.output_directory ||
                    !form?.name
                  }
                  color="gray.9"
                  variant="filled"
                >
                  Deploy Application
                </Button>
              </Group>
            </Stack>
          </form>
        )}
      </Paper>

      {/* Build Logs Terminal */}
      {deploymentSuccess && deploymentResponse && (
        <>
          <TitleText>Deployment Started</TitleText>
          <Paper radius="md" mt="md">
            <BuildLogsTerminal
              logsSocketUrl={deploymentResponse.data.logs_socket_url}
              buildId={deploymentResponse.data.build_id}
              onDeploymentComplete={handleDeploymentComplete}
            />
          </Paper>
        </>
      )}
    </div>
  );
};

export default CreateMiraAppForm;
