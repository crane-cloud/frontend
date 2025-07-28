import {
  ActionIcon,
  Box,
  Button,
  Chip,
  Divider,
  Fieldset,
  Flex,
  Group,
  Input,
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
import { useEffect, useRef, useState } from "react";
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
  MODAL_API_TYPES,
  MODAL_SERVERS,
} from "@/utils/constants";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useAuth } from "@/utils/AuthContext";
import { MIRA_API_URL } from "@/config";
import { Table } from "../Elements/CustomTable";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiRobot2Line } from "react-icons/ri";
import useForm from "@/hooks/generic/useForm";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { BiCode } from "react-icons/bi";

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
  const { uploadData, submitting, error, data } = usePost();
  const [webSocketPath, setWebSocketPath] = useState(null)
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const terminalRef = useRef(null);
  const [detectedFramework, setDetectedFramework] = useState([]);
  const [detecting, setDetecting] = useState(false);
  const { project_id } = useParams();


  useEffect(() => {
    updateFormValues({
      files,
    });
  }, [files]);

  useEffect(() => {
    if(data){
      console.log(data)
    if (data.message === "Image generation started") {
      
      setWebSocketPath(data.data.wspath)
    }}
  }, [data])

  useEffect(() => {
    console.log("Project ID:", project_id);
    updateFormValues({
      project: project_id,
      token: authToken,
      type: "git",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: `${MIRA_API_URL}/images/containerize`,
      params: form,
      isExternal: true,
      type: "multipart/form-data",
    });
  };


    function normalizeNewlines(str: string) {
      // Replace all lone \r with \r\n
      str = str.replace(/\r(?!\n)/g, '\r\n');
      // Replace all lone \n with \r\n
      str = str.replace(/(?<!\r)\n/g, '\r\n');
      return str;
    }
  
    useEffect(() => {
      if (webSocketPath) {
        console.log("WebSocket Path:", webSocketPath);
        // Initialize xterm terminal
        const term = new Terminal({});
  
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
  
        // Mount terminal to DOM
        if (terminalRef.current) {
          term.open(terminalRef.current);
          fitAddon.fit();
        }
  
        // Establish WebSocket connection
        const ws = new WebSocket(
          `wss://${webSocketPath}`
        );
  
        ws.onopen = () => {
          console.log("WebSocket connection established");
          term.writeln(`Connected`);
        };
  
        ws.onmessage = (event) => {
          console.log("Message from server:", event.data);
          const eventdata = JSON.parse(event.data);
          term.write(normalizeNewlines(eventdata[1]))
        };
  
        ws.onerror = (error) => {
          term.writeln(`WebSocket Error: ${error}`);
        };
  
  
        setTerminal(term);
        setSocket(ws);
  
        // Cleanup
        return () => {
          term.dispose();
          ws.close();
        };
      }
    }, [webSocketPath]);
  


    async function detectFramework() {
    

    setDetecting(true);

    try {
      const response = await fetch(MIRA_API_URL + "/images/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repo_url: form.repo }),
      });
      const data = await response.json();

      console.log("Framework Detection Response:", data.detected);

      setDetectedFramework(data.detected);
    } catch (err) {
      console.error("Error detecting framework:", err);
      //setError("Failed to detect framework. Please try again.");
    }
    setDetecting(false);
  }
  

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
              required
              label="Repository URL"
              name="repo"
              placeholder="Enter repository URL"
              description="Enter the URL of your Git repository"
              value={form?.repo as string}
              onChange={onChange}
              error={error?.repo}
              rightSection={
                          <Tooltip label="Detect Framework" position="top">
                            <ActionIcon
                              variant="default"
                              size="xs"
                              onClick={detectFramework}
                              loading={detecting}
                            >
                              <BiCode size={16} />
                            </ActionIcon>
                          </Tooltip>
                        }
            />
            {Array.isArray(detectedFramework) && (
            
            <div style={{
              display: "flex"
            }}>
              {
                detectedFramework.map((framework: string) => {
                  return <Chip style={{
                      marginLeft: "10px"
                    }}>{framework}</Chip>
                  })
                }
              </div>
            )}
            <TextInput
              label="Build Command"
              leftSection="npm run"
              name="build_command"
              leftSectionWidth={80}
              placeholder="Enter build command"
              description="Command to build your application (e.g., npm run build)"
              value={form?.build_command as string}
              onChange={onChange}
              error={error?.build_command}
            />
            
            <TextInput
              label="Output Directory"
              name="output_directory"
              leftSection="./"
              placeholder="Enter output directory (optional)"
              description="Directory where the built application will be located (e.g., dist, build)"
              value={form?.output_directory as string}
              onChange={onChange}
              error={error?.output_directory}
            />
            
            <Divider />
            <Group justify="flex-end">
              <Button
                variant="filled"
                type="submit"
                leftSection={<IoRocketSharp />}
                disabled={submitting}
                loading={submitting}
              >
                Deploy App
              </Button>
            </Group>
            
          </Stack>
        </form>
        <Divider my="md" />
        <Box ref={terminalRef} style={{
          width: "100%",
          padding: "20px",
          overflow: "auto",
        }} />
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

  return (
    <div style={{ marginTop: showTitle ? 10 : 0 }}>
      {showTitle && (
        <TitleText>
          <Flex align="center" gap="xs">
            <IoRocketSharp size={15} />
            Deploy a Trained Model
          </Flex>
        </TitleText>
      )}
      <Paper p="lg" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Model Name"
              name="name"
              placeholder="Enter model name"
              description="Enter the name of the model"
              required
              value={form?.name as string}
              onChange={onChange}
              error={error?.name}
              leftSection={<MdDriveFileRenameOutline />}
            />
            <TextInput
              label="Modal Url"
              name="model_image_uri"
              placeholder="Enter modal url"
              description="Enter the url to where the model is hosted"
              required
              value={form?.model_image_uri as string}
              onChange={onChange}
              error={error?.model_image_uri}
              leftSection={<LuLink />}
            />
            <Select
              label="Modal Api type"
              name="api_type"
              placeholder="Select framework"
              required
              value={form.api_type as string}
              onChange={(value) => updateFormValue("api_type", value)}
              error={error?.api_type}
              data={MODAL_API_TYPES}
              defaultValue={MODAL_API_TYPES[0].value}
              leftSection={<TbPlugConnected />}
            />
            <Select
              label="Modal Server"
              name="model_server"
              placeholder="Select the server that created the model"
              required
              value={form.model_server as string}
              onChange={(value) => updateFormValue("model_server", value)}
              error={error?.model_server}
              data={MODAL_SERVERS}
              leftSection={<LuServer />}
            />
            <Divider mt="md" />
            <Group justify="flex-end">
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
