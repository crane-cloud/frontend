import { Table } from "@/components/Elements/CustomTable";
import { ModalConfirm } from "@/components/Elements/Modals";
import {
  CreateSingleAppForm,
  EnvironmentVariablesForm,
  EnvironmentVariablesTable,
} from "@/components/Forms/CreateAppForm";
import TitleText from "@/components/TitleText";
import { API_APPS } from "@/utils/apis";
import {
  convertArrayToObject,
  convertObjectToArray,
  dateFormat,
  useGetApp,
} from "@/utils/helpers";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  Stack,
  Tabs,
  Text,
  Tooltip,
  TextInput,
  Table as MantineTable,
  Alert,
  ActionIcon,
  CopyButton,
  Paper,
  Modal,
  Code,
  List,
  ThemeIcon,
  Textarea,
  Collapse,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import {
  HiLockClosed,
  HiLockOpen,
  HiOutlineXCircle,
  HiPencil,
  HiPlus,
  HiTrash,
  HiPencil as IconEdit,
  HiCheck as IconCheck,
  HiExclamationTriangle as IconAlertTriangle,
  HiGlobeAlt as IconWorld,
  HiArrowPath as IconRotateClockwise,
  HiXMark as IconX,
} from "react-icons/hi2";
import { FiCalendar, FiExternalLink } from "react-icons/fi";
import { LiaDocker } from "react-icons/lia";
import { FaCheck } from "react-icons/fa6";

import { Link, useNavigate, useParams } from "react-router-dom";
import { TbCheck, TbCopy } from "react-icons/tb";
import { useClipboard } from "@mantine/hooks";
import { useAuth } from "@/utils/AuthContext";
import { MenuContext } from "@/components/Layouts/DashboardLayout";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { CUSTOM_DOMAIN_IP } from "@/config";

const AppSettingsPage = () => {
  const { app_id } = useParams();
  const { app, setRefresh } = useGetApp(app_id || "");
  const { setContainerSize } = useContext(MenuContext);

  useEffect(() => {
    setContainerSize("md");
    return () => {
      setContainerSize("xl");
    };
  }, [setContainerSize]);
  useEffect(() => {}, [app]);
  return (
    <div>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="ci/cd">CI / CD</Tabs.Tab>
          <Tabs.Tab value="deployments">Deployments</Tabs.Tab>
          <Tabs.Tab value="domains">Domains</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt={10}>
          <GeneralTab app={app} setRefresh={setRefresh} />
        </Tabs.Panel>
        <Tabs.Panel value="deployments" pt={10}>
          <DeploymentsTab app={app} />
        </Tabs.Panel>
        <Tabs.Panel value="ci/cd" pt={10}>
          <CICDTab app={app} />
        </Tabs.Panel>
        <Tabs.Panel value="domains" pt={10}>
          <DomainsTab app={app} setRefresh={setRefresh} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AppSettingsPage;

const GeneralTab = ({
  app,
  setRefresh,
}: {
  app: any;
  setRefresh: (refresh: boolean) => void;
}) => {
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [disableConfirmOpened, setDisableConfirmOpened] = useState(false);
  const [enableConfirmOpened, setEnableConfirmOpened] = useState(false);
  const [updateConfirmOpened, setUpdateConfirmOpened] = useState(false);
  const [envVariablesConfirmOpened, setEnvVariablesConfirmOpened] =
    useState(false);
  const [envVariables, setEnvVariables] = useState(
    convertObjectToArray(app?.env_vars) || [{ key: "", value: "" }],
  );

  const {
    uploadData: deleteApp,
    submitting: deletingApp,
    success: deletedAppSuccess,
  } = usePost();
  const {
    uploadData: disableApp,
    submitting: disablingApp,
    success: disabledAppSuccess,
  } = usePost();
  const {
    uploadData: enableApp,
    submitting: enablingApp,
    success: enabledAppSuccess,
  } = usePost();
  const {
    uploadData: addEnvVariables,
    submitting: addingEnvVariables,
    success: addedEnvVariablesSuccess,
  } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    if (deletedAppSuccess) {
      navigate(`/projects/${app?.project_id}/apps`);
    }
  }, [deletedAppSuccess]);

  useEffect(() => {
    if (enabledAppSuccess || disabledAppSuccess) {
      navigate(`/projects/${app?.project_id}/apps/${app?.id}`);
    }
  }, [enabledAppSuccess, disabledAppSuccess]);

  useEffect(() => {
    setRefresh(true);
  }, [addedEnvVariablesSuccess]);

  const submitEnvVariables = () => {
    const envObject = convertArrayToObject(envVariables);
    addEnvVariables({
      api: "apps",
      id: app?.id,
      method: "PATCH",
      params: {
        env_vars: envObject,
      },
    });
    setEnvVariablesConfirmOpened(false);
  };

  useEffect(() => {
    setEnvVariables(convertObjectToArray(app?.env_vars));
  }, [app]);

  const handleDelete = () => {
    deleteApp({
      id: app?.id,
      api: API_APPS,
      method: "DELETE",
    });
  };

  const handleDisable = () => {
    disableApp({
      api: `${API_APPS}/${app?.id}/disable`,
    });
  };

  const handleEnable = () => {
    enableApp({
      api: `${API_APPS}/${app?.id}/enable`,
    });
  };

  const appInfo = [
    {
      label: "Application Name",
      value: app?.name,
    },
    {
      label: "Alias",
      value: app?.alias || "N/A",
    },
    {
      label: "Image",
      value: app?.image || "N/A",
    },
    {
      label: "Application Status",
      value: app?.app_status?.[0]?.status || "N/A",
    },
    {
      label: "Replicas",
      value: app?.replicas || "N/A",
    },
    {
      label: "Age",
      value: app?.age || "N/A",
    },
    {
      label: "Port",
      value: app?.port || "N/A",
    },
    {
      label: "Entry Command",
      value: app?.entry_command || "N/A",
    },
  ];

  return (
    <Stack gap={30}>
      <Stack gap={0}>
        <TitleText>App Details</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Grid>
            {appInfo.map((info) => (
              <Grid.Col span={{ base: 6, md: 4, lg: 4 }}>
                <Flex>
                  <Stack gap={1}>
                    <Text className="subtitle">{info.label}</Text>
                    <Text size="sm">{info.value}</Text>
                  </Stack>
                </Flex>
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      </Stack>
      <Stack gap={0}>
        <TitleText>Environment Variables</TitleText>
        {Object.keys(app?.env_vars || {}).length > 0 ? (
          <EnvironmentVariablesTable
            envVariables={convertObjectToArray(app?.env_vars)}
          />
        ) : (
          <Text className="subtext">
            Use environment variables to store API keys or secrets.
          </Text>
        )}
        <Flex justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => setEnvVariablesConfirmOpened(true)}
            leftSection={
              Object.keys(app?.env_vars || {}).length > 0 ? (
                <HiPencil />
              ) : (
                <HiPlus />
              )
            }
          >
            {Object.keys(app?.env_vars || {}).length > 0
              ? "Update Environment Variables"
              : "Add Environment Variables"}
          </Button>
        </Flex>
      </Stack>
      <Stack gap={0}>
        <TitleText>Manage App</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10}>
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Update App</Text>
                <Text className="subtext">
                  Modify the app name and description
                </Text>
              </Stack>
              <Button
                variant="outline"
                onClick={() => setUpdateConfirmOpened(true)}
              >
                Update
              </Button>
            </Group>
            <Divider />
            {app.disabled ? (
              <Group justify="space-between" align="center">
                <Stack gap={0}>
                  <Text className="title">Enable App</Text>
                  <Text className="subtext">
                    Enable app to allow access to resources.
                  </Text>
                </Stack>
                <Button
                  variant="outline"
                  color="green"
                  onClick={() => setEnableConfirmOpened(true)}
                  leftSection={<HiLockOpen />}
                >
                  Enable
                </Button>
              </Group>
            ) : (
              <Group justify="space-between" align="center">
                <Stack gap={0}>
                  <Text className="title">Disable App</Text>
                  <Text className="subtext">
                    Prevent app from being billed by blocking access to it's
                    resources.
                  </Text>
                </Stack>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => setDisableConfirmOpened(true)}
                  leftSection={<HiLockClosed />}
                >
                  Disable
                </Button>
              </Group>
            )}
            <Divider />
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Delete App</Text>
                <Text className="subtext">
                  This action is irreversible and will delete the app
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
            title="Delete App"
            buttonColor="red"
            buttonText="Delete"
            onConfirm={handleDelete}
            loading={deletingApp}
            leftSection={<HiTrash />}
          >
            Are you sure you want to delete <b>{app?.name}</b> app permanently?
            This action cannot be undone.
          </ModalConfirm>
          <ModalConfirm
            opened={disableConfirmOpened}
            onClose={() => setDisableConfirmOpened(false)}
            title="Disable App"
            buttonText="Disable"
            onConfirm={handleDisable}
            loading={disablingApp}
            buttonColor="red"
            leftSection={<HiLockClosed />}
          >
            Are you sure you want to disable <b>{app?.name}</b> app? This action
            will prevent the app contents from being accessed.
          </ModalConfirm>
          <ModalConfirm
            opened={enableConfirmOpened}
            onClose={() => setEnableConfirmOpened(false)}
            title="Enable App"
            buttonText="Enable"
            buttonColor="green"
            onConfirm={handleEnable}
            loading={enablingApp}
            leftSection={<HiLockOpen />}
          >
            Are you sure you want to enable <b>{app?.name}</b> app? This action
            will allow the app contents to be accessed.
          </ModalConfirm>
          <ModalConfirm
            opened={updateConfirmOpened}
            onClose={() => setUpdateConfirmOpened(false)}
            title="Update App"
            buttonText="Update"
            onConfirm={() => {}}
            size="xl"
            showFooterActions={false}
          >
            <CreateSingleAppForm
              app={app}
              showEnvs={false}
              showTitle={false}
              onCancel={() => setUpdateConfirmOpened(false)}
              refresh={() => setRefresh(true)}
            />
          </ModalConfirm>

          <ModalConfirm
            opened={envVariablesConfirmOpened}
            onClose={() => setEnvVariablesConfirmOpened(false)}
            title="Environment Variables"
            buttonText="Add Variables"
            size="xl"
            onConfirm={submitEnvVariables}
          >
            <EnvironmentVariablesForm
              envVariables={envVariables}
              setEnvVariables={setEnvVariables}
              loading={addingEnvVariables}
              showTitle={false}
            />
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};

const DeploymentsTab = ({ app }: { app: any }) => {
  const { data: revisionsData, getData: getRevisions, loading } = useGet();
  const {
    uploadData: reviseApp,
    submitting,
    success: reviseAppSuccess,
  } = usePost();

  const [revisionID, setRevisionID] = useState("");
  const [openReviseAppModel, setOpenReviseAppModel] = useState(false);

  useEffect(() => {
    if (app?.id) {
      getRevisions({
        api: `${API_APPS}/${app?.id}/revisions`,
      });
    }
  }, [app]);

  useEffect(() => {
    if (reviseAppSuccess) {
      setRevisionID("");
      setOpenReviseAppModel(false);
      getRevisions({
        api: `${API_APPS}/${app?.id}/revisions`,
      });
    }
  }, [reviseAppSuccess]);

  const handleReviseApp = () => {
    reviseApp({
      api: `${API_APPS}/${app?.id}/revise/${revisionID}`,
      successMessage: "Revised app successfully",
      errorMessage: "Failed to revise app",
    });
  };

  const tableColumns = [
    { id: "revision_id", header: "Revision ID" },
    { id: "image", header: "Image" },
    { id: "replicas", header: "Replicas" },
    { id: "created_at", header: "Created At" },
    { id: "actions", header: "Actions" },
  ];
  const tableData = (data: any) => {
    if (!data) {
      return [];
    }
    const sortedData = [...data].sort(
      (a, b) => (b.current ? 1 : 0) - (a.current ? 1 : 0),
    );

    return sortedData?.map((item: any) => ({
      ...item,
      replicas: item.replicas || 1,
      revision_id: (
        <Stack gap={0} align="flex-start">
          <Text className="subtext">{item.revision_id}</Text>
          {item.current && (
            <Badge color="green" size="xs" leftSection={<TbCheck />}>
              Current
            </Badge>
          )}
        </Stack>
      ),
      image: (
        <Flex gap={5} align="center">
          <LiaDocker size={16} />
          <Text className="subtext">{item.image}</Text>
        </Flex>
      ),
      created_at: (
        <Stack gap={0} align="flex-start">
          <Flex gap={5} align="center">
            <FiCalendar size={13} />
            <Text className="subtext">{dateFormat(item.created_at)}</Text>
          </Flex>
          <Text className="subtext" c="dimmed">
            {dateFormat(item.created_at, "HH:mm A")}
          </Text>
        </Stack>
      ),
      actions: (
        <>
          <Stack gap={0} align="flex-end">
            <Text
              className={`subtext ${item.current ? "disabled" : ""}`}
              c={item.current ? "gray" : "dimmed"}
              onClick={() => {
                if (item.current) {
                  return;
                }
                setRevisionID(item.revision_id);
                setOpenReviseAppModel(true);
              }}
              style={{ cursor: item.current ? "not-allowed" : "pointer" }}
            >
              <span>{item.current ? "Rollback here" : "Rollback here"}</span>
            </Text>
          </Stack>
          <ModalConfirm
            opened={openReviseAppModel}
            onClose={() => setOpenReviseAppModel(false)}
            title="Revise App"
            buttonColor="black"
            buttonText="Revise"
            onConfirm={handleReviseApp}
            loading={submitting}
            leftSection={<HiOutlineXCircle />}
          >
            Are you sure you want to rollback this revision on{" "}
            <b>{app?.name}</b>? Doing so will replace the current version with
            selected one.
          </ModalConfirm>
        </>
      ),
    }));
  };

  return (
    <div>
      <TitleText>Deployments</TitleText>
      <Table
        verticalSpacing="sm"
        columns={tableColumns}
        data={tableData(revisionsData?.data?.revisions)}
        props={{
          verticalSpacing: "sm",
        }}
        showIndex={false}
        rowHover
        loading={loading}
      />
    </div>
  );
};

const CICDTab = ({ app }: { app: any }) => {
  const clipboard = useClipboard();
  const { user } = useAuth();
  const [imageTag, setImageTag] = useState("");
  const [webhookUrl, setwebhookUrl] = useState("");

  const isStaging = /localhost|staging/.test(window.location.href);

  const generateWebhook = () => {
    const tag = imageTag || "latest";
    const defaultUrl = isStaging
      ? `https://staging-api.cranecloud.io/apps/${app?.id}/${user?.id}/docker`
      : `https://api.cranecloud.io/apps/${app?.id}/${user?.id}/docker`;
    if (app?.id && user?.id) {
      setwebhookUrl(`${defaultUrl}/docker/${tag}/webhook`);
    }
  };

  return (
    <div>
      <Stack gap={30}>
        <Stack gap={10}>
          <TitleText>Set up Continous Integration</TitleText>
          <Card p="lg" radius="md" withBorder>
            <Stack gap={20}>
              <Stack gap={1}>
                <Text size="md" fw={700}>
                  Specify Image Tag
                </Text>
                <Text size="sm">
                  Specify Image Tag for your image and if none is provided{" "}
                  <b>"Latest"</b> will be chosen as the default tag.
                </Text>
              </Stack>
              <TextInput
                placeholder="Enter Image Tag"
                value={imageTag}
                onChange={(e) => setImageTag(e.target.value)}
              />
              <Stack gap={10}>
                <Divider />
                <Flex justify="space-between" gap={20}>
                  <Stack gap={1}>
                    <Text size="md" fw={700}>
                      Generate Link
                    </Text>
                    <Text size="sm">
                      To Generate a link with a token click the Generate link
                      button.
                    </Text>
                  </Stack>
                  <Button variant="outline" onClick={generateWebhook}>
                    Generate Link
                  </Button>
                </Flex>
                {webhookUrl && (
                  <Stack gap={10}>
                    <Flex
                      justify="space-between"
                      align="center"
                      gap={30}
                      mt={10}
                    >
                      <Text className="subtitle">Webhook URL</Text>
                      <Text size="sm" flex={1}>
                        {imageTag}
                      </Text>
                    </Flex>
                    <Flex justify="space-between" align="center" gap={30}>
                      <Text className="subtitle">Image Tag</Text>
                      <Text size="sm" flex={1}>
                        <Tooltip
                          label={clipboard.copied ? "Copied" : "Copy"}
                          position="bottom"
                          withArrow
                        >
                          <Input
                            value={webhookUrl}
                            readOnly
                            variant="filled"
                            style={{ flex: 1 }}
                            styles={{
                              input: {
                                cursor: "pointer",
                                outline: "none",
                                border: "none",
                                wrap: "wrap",
                              },
                            }}
                            rightSection={<TbCopy />}
                            onClick={() => clipboard.copy(webhookUrl)}
                          />
                        </Tooltip>
                      </Text>
                    </Flex>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Card>
        </Stack>
        <Stack gap={10}>
          <TitleText>Add link to Dockerhub</TitleText>
          <Card p="lg" radius="md" withBorder>
            <Stack gap={10}>
              <Text size="sm">
                1. To add the webhook, copy the generated link above and head to{" "}
                <b>dockerhub.com</b> under the repository of your docker image.
              </Text>
              <Text size="sm">
                2. On the image repository click the <b>Webhooks</b> tab.
              </Text>
              <Text size="sm">
                3. Under new Webhook give your webhook any name of your choice
                and add the genereated URL token from Crane Cloud and click
                create.
              </Text>
              <Text size="sm">
                4. Continous Integration has been successfully been added for
                your application.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
};

const DomainsTab = ({
  app,
  setRefresh,
}: {
  app: any;
  setRefresh: (refresh: boolean) => void;
}) => {
  const [newDomain, setNewDomain] = useState("");
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [isEditingCustomDomain, setIsEditingCustomDomain] = useState(false);
  const [customDomainValue, setCustomDomainValue] = useState(app?.url || "");
  const [isDnsInstructionsOpen, setIsDnsInstructionsOpen] = useState(false);

  const {
    uploadData: addCustomDomain,
    submitting: addingCustomDomain,
    success: addedCustomDomainSuccess,
    error: addCustomDomainError,
  } = usePost();
  const {
    uploadData: revertCustomDomain,
    submitting: revertingCustomDomain,
    success: revertedCustomDomainSuccess,
    error: verificationError,
  } = usePost();

  useEffect(() => {
    if (addedCustomDomainSuccess) {
      setRefresh(true);
      setNewDomain("");
      setCustomDomainValue("");
      setIsAddingDomain(false);
      setIsEditingCustomDomain(false);
    }
  }, [addedCustomDomainSuccess]);

  useEffect(() => {
    if (revertedCustomDomainSuccess) {
      setRefresh(true);
      setCustomDomainValue(app?.url || "");
    }
  }, [revertedCustomDomainSuccess]);

  interface DnsRecord {
    type: string;
    name: string;
    value: string;
    ttl: string;
    description: string;
  }

  const dnsInstructions = [
    {
      title: "Record Type",
      value: "A",
      description: "Select A-record type",
    },
    {
      title: "Host",
      value: "app",
      description: "This will point to your domain",
    },
    {
      title: "Address/Value",
      value: CUSTOM_DOMAIN_IP,
      description: "IP address we provide",
    },
    {
      title: "TTL",
      value: "1 Hour",
      description: "Time to live setting",
    },
  ];

  const dnsRecords: DnsRecord[] = [
    {
      type: "A",
      name: "app",
      value: CUSTOM_DOMAIN_IP,
      ttl: "1 Hour",
      description: "Points to your domain",
    },
    {
      type: "A",
      name: "@",
      value: CUSTOM_DOMAIN_IP,
      ttl: "1 Hour",
      description: "Root domain pointer",
    },
  ];

  const handleAddDomain = async () => {
    if (!app?.id || (!newDomain.trim() && !customDomainValue.trim())) {
      return;
    }

    addCustomDomain({
      api: "apps",
      id: app?.id,
      method: "PATCH",
      params: {
        custom_domain: newDomain.trim() || customDomainValue.trim(),
      },
    });
  };

  const handleRevertDomain = async () => {
    if (!app?.id) {
      return;
    }

    revertCustomDomain({
      api: `apps/${app?.id}/revert_url`,
      method: "PATCH",
    });
  };

  const renderDnsInstructions = () => (
    <Stack gap="md" mt="md">
      <Group justify="flex-start">
        <Button
          variant="subtle"
          color="blue"
          size="sm"
          leftSection={
            isDnsInstructionsOpen ? (
              <FaArrowUp size={16} />
            ) : (
              <FaArrowDown size={16} />
            )
          }
          onClick={() => setIsDnsInstructionsOpen(!isDnsInstructionsOpen)}
        >
          {isDnsInstructionsOpen
            ? "Hide DNS Setup Instructions"
            : "View DNS Setup Instructions"}
        </Button>
      </Group>

      <Collapse in={isDnsInstructionsOpen}>
        <Paper p="md" withBorder radius="md">
          <Alert
            icon={<IconAlertTriangle size={16} />}
            color="blue"
            variant="light"
            radius="md"
            mb="md"
          >
            <Text size="sm" fw={500}>
              DNS Configuration Required
            </Text>
            <Text size="sm" c="dimmed" mt={4}>
              Configure your DNS provider with the following settings to connect
              your custom domain
            </Text>
          </Alert>

          <Tabs defaultValue="dns-records" variant="outline">
            <Tabs.List>
              <Tabs.Tab value="dns-records">Required DNS Records</Tabs.Tab>
              <Tabs.Tab value="instructions">Step-by-Step Guide</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="dns-records" pt="md">
              <Text size="sm" c="dimmed" mb="md">
                Add these DNS records to your domain provider to connect your
                custom domain.
              </Text>

              <MantineTable>
                <MantineTable.Thead>
                  <MantineTable.Tr>
                    <MantineTable.Th>Type</MantineTable.Th>
                    <MantineTable.Th>Name</MantineTable.Th>
                    <MantineTable.Th>Value</MantineTable.Th>
                    <MantineTable.Th>TTL</MantineTable.Th>
                    <MantineTable.Th>Action</MantineTable.Th>
                  </MantineTable.Tr>
                </MantineTable.Thead>
                <MantineTable.Tbody>
                  {dnsRecords.map((record, index) => (
                    <MantineTable.Tr key={index}>
                      <MantineTable.Td>
                        <Badge variant="light" color="blue">
                          {record.type}
                        </Badge>
                      </MantineTable.Td>
                      <MantineTable.Td>
                        <Code>{record.name}</Code>
                      </MantineTable.Td>
                      <MantineTable.Td>
                        <Code>{record.value}</Code>
                      </MantineTable.Td>
                      <MantineTable.Td>
                        <Text size="sm">{record.ttl}</Text>
                      </MantineTable.Td>
                      <MantineTable.Td>
                        <CopyButton value={record.value}>
                          {({ copied, copy }) => (
                            <Tooltip label={copied ? "Copied" : "Copy Value"}>
                              <ActionIcon
                                variant="subtle"
                                color={copied ? "green" : "gray"}
                                onClick={copy}
                                size="sm"
                              >
                                {copied ? (
                                  <IconCheck size={14} />
                                ) : (
                                  <TbCopy size={14} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                      </MantineTable.Td>
                    </MantineTable.Tr>
                  ))}
                </MantineTable.Tbody>
              </MantineTable>
            </Tabs.Panel>

            <Tabs.Panel value="instructions" pt="md">
              <Text size="sm" fw={500} mb="md">
                Follow these steps in your DNS provider dashboard:
              </Text>

              <List spacing="xs" size="sm">
                {dnsInstructions.map((instruction, index) => (
                  <List.Item key={index}>
                    <Group gap="xs">
                      <Text fw={500}>{instruction.title}:</Text>
                      <Code>{instruction.value}</Code>
                      <Text c="dimmed" size="xs">
                        {instruction.description}
                      </Text>
                    </Group>
                  </List.Item>
                ))}
              </List>

              <Alert color="blue" variant="light" mt="md">
                <Text size="sm">
                  After configuring your DNS records, it may take up to 24 hours
                  for changes to propagate. You can verify your domain
                  configuration once the DNS changes are active.
                </Text>
              </Alert>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Collapse>
    </Stack>
  );

  return (
    <div>
      <TitleText>Domains</TitleText>

      <Card p="lg" radius="md" withBorder mb={20}>
        <Stack gap="md">
          <Group gap="sm">
            <Text className="subtitle" size="sm">
              Application URL:
            </Text>
            <Text
              component={Link}
              size="sm"
              to={app?.url}
              target="_blank"
              className="link"
            >
              {app?.url}
              <FiExternalLink />
            </Text>
          </Group>
          <Group gap="sm">
            <Text className="subtitle" size="sm">
              Internal URL:
            </Text>
            <Text size="sm">{app?.internal_url || "N/A"}</Text>
          </Group>
        </Stack>
      </Card>

      {/* Custom Domain Section */}
      {app?.has_custom_domain ? (
        <Card p="md" withBorder radius="md">
          <Group justify="space-between" align="flex-start" mb="md">
            <Text fw={500} size="lg">
              Custom Domain
            </Text>
            <Group gap="sm">
              <Button
                variant="subtle"
                color="blue"
                size="sm"
                leftSection={<IconEdit size={16} />}
                onClick={() => setIsEditingCustomDomain(!isEditingCustomDomain)}
              >
                Edit Domain
              </Button>
              <Button
                variant="subtle"
                color="blue"
                size="sm"
                leftSection={<IconRotateClockwise size={16} />}
                onClick={handleRevertDomain}
                loading={revertingCustomDomain}
              >
                Revert to Default
              </Button>
            </Group>
          </Group>

          {isEditingCustomDomain ? (
            <Stack gap="md">
              <Textarea
                label="Domain Name"
                placeholder="Enter your custom domain here"
                value={customDomainValue}
                onChange={(e) => setCustomDomainValue(e.currentTarget.value)}
                error={verificationError.data?.message}
                autosize
                minRows={1}
              />
              <Group gap="sm">
                <Button
                  leftSection={<FaCheck size={16} />}
                  onClick={handleAddDomain}
                  loading={addingCustomDomain}
                  disabled={!customDomainValue.trim()}
                >
                  Save Changes
                </Button>
                <Button
                  variant="subtle"
                  leftSection={<IconX size={16} />}
                  onClick={() => {
                    setIsEditingCustomDomain(false);
                    setCustomDomainValue(app?.url || "");
                  }}
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          ) : (
            <Stack gap="md">
              <Card p="sm" withBorder radius="sm">
                <Text size="sm" c="dimmed" mb="xs">
                  Current Custom Domain:
                </Text>
                <Text>{app?.url || "N/A"}</Text>
              </Card>
            </Stack>
          )}

          {renderDnsInstructions()}
        </Card>
      ) : (
        <Card
          p="xl"
          withBorder
          radius="md"
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #dee2e6",
          }}
        >
          <Stack align="center" gap="md">
            <ThemeIcon size="xl" variant="light" color="gray">
              <IconWorld size={24} />
            </ThemeIcon>
            <Text size="lg" c="dimmed" ta="center">
              No custom domain configured
            </Text>
            <Text size="sm" c="dimmed" ta="center" maw={400}>
              Add a custom domain to make your application accessible through
              your own domain name.
            </Text>
            <Button
              variant="light"
              leftSection={<HiPlus size={16} />}
              onClick={() => setIsAddingDomain(true)}
            >
              Add Custom Domain
            </Button>
          </Stack>
        </Card>
      )}

      <Modal
        opened={isAddingDomain}
        onClose={() => setIsAddingDomain(false)}
        title="Add Custom Domain"
        size="lg"
      >
        <Stack gap="md">
          <Alert
            icon={<IconAlertTriangle size={16} />}
            color="blue"
            variant="light"
            radius="md"
          >
            <Text size="sm" fw={500} mb="xs">
              Accepted Domain Formats
            </Text>
            <List size="sm" spacing="xs">
              <List.Item>
                <Code>example.com</Code> - Root domain
              </List.Item>
              <List.Item>
                <Code>www.example.com</Code> - Subdomain with www
              </List.Item>
              <List.Item>
                <Code>app.example.com</Code> - Custom subdomain
              </List.Item>
              <List.Item>
                <Code>my-app.example.com</Code> - Subdomain with hyphens
              </List.Item>
            </List>
            <Text size="xs" c="dimmed" mt="xs">
              Note: Do not include http:// or https:// in your domain name
            </Text>
          </Alert>

          <TextInput
            label="Domain Name"
            placeholder="Enter your domain here"
            value={newDomain}
            onChange={(e) => setNewDomain(e.currentTarget.value)}
            error={addCustomDomainError?.data?.message}
          />

          <Group justify="flex-end">
            <Button variant="subtle" onClick={() => setIsAddingDomain(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDomain}
              loading={addingCustomDomain}
              disabled={!newDomain.trim()}
            >
              {addingCustomDomain ? "Adding..." : "Add Domain"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
};
