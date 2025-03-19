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
  useGetApp,
} from "@/utils/helpers";
import usePost from "@/utils/usePost";
import {
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  HiLockClosed,
  HiLockOpen,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

const AppSettingsPage = () => {
  const { app_id } = useParams();
  const { app, setRefresh } = useGetApp(app_id || "");
  return (
    <div>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt={10}>
          <GeneralTab app={app} setRefresh={setRefresh} />
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
