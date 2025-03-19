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
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  HiLockClosed,
  HiLockOpen,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";
import { FiCalendar } from "react-icons/fi";
import { LiaDocker } from "react-icons/lia";

import { useNavigate, useParams } from "react-router-dom";
import { TbCheck, TbCopy } from "react-icons/tb";
import { useClipboard } from "@mantine/hooks";
import { useAuth } from "@/utils/AuthContext";

const AppSettingsPage = () => {
  const { app_id } = useParams();
  const { app, setRefresh } = useGetApp(app_id || "");
  return (
    <div>
      <Tabs defaultValue="ci/cd">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="ci/cd">CI / CD</Tabs.Tab>
          <Tabs.Tab value="deployments">Deployments</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt={10}>
          <GeneralTab app={app} setRefresh={setRefresh} />
        </Tabs.Panel>
        <Tabs.Panel value="deployments" pt={10}>
          <DeploymentsTab app={app} setRefresh={setRefresh} />
        </Tabs.Panel>
        <Tabs.Panel value="ci/cd" pt={10}>
          <CICDTab app={app} setRefresh={setRefresh} />
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
    convertObjectToArray(app?.env_vars) || [{ key: "", value: "" }]
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

  const appSingleInfo = [
    {
      label: "Application Link",
      value: app?.url || "N/A",
    },
    {
      label: "Internal Link",
      value: app?.internal_url || "N/A",
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
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <Divider />
            </Grid.Col>
            {appSingleInfo.map((info) => (
              <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                <Flex gap={20}>
                  <Text className="subtitle">{info.label}</Text>
                  <Text size="sm" flex={1}>
                    {info.value}
                  </Text>
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
        <TitleText>Danger Zone</TitleText>
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

const DeploymentsTab = ({
  app,
  setRefresh,
}: {
  app: any;
  setRefresh: (refresh: boolean) => void;
}) => {
  const { data: revisionsData, getData: getRevisions, loading } = useGet();

  useEffect(() => {
    if (app?.id) {
      getRevisions({
        api: `${API_APPS}/${app?.id}/revisions`,
      });
    }
  }, [app]);

  const tableColumns = [
    { id: "revision_id", header: "Revision ID" },
    { id: "image", header: "Image" },
    { id: "replicas", header: "Replicas" },
    { id: "created_at", header: "Created At" },
  ];
  const tableData = (data: any) => {
    return data?.map((item: any) => ({
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
        <Stack gap={0} align="flex-end">
          <Flex gap={5} align="center">
            <FiCalendar size={13} />
            <Text className="subtext">{dateFormat(item.created_at)}</Text>
          </Flex>
          <Text className="subtext" c="dimmed">
            {dateFormat(item.created_at, "HH:mm A")}
          </Text>
        </Stack>
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

const CICDTab = ({
  app,
  setRefresh,
}: {
  app: any;
  setRefresh: (refresh: boolean) => void;
}) => {
  const clipboard = useClipboard();
  const { user } = useAuth();
  let hook = "https://crane.cloud/apps/1234567890/ci";
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
                            onClick={() => clipboard.copy(hook)}
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
                1. To add the webhook, copy the generated link above and head to
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
