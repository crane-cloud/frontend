import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Stack,
  Card,
  Grid,
  Flex,
  Text,
  Button,
  Group,
  Divider,
  Input,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { HiLockOpen, HiLockClosed, HiTrash } from "react-icons/hi";
import TitleText from "@/components/TitleText";
import { ModalConfirm } from "@/components/Elements/Modals";
import useGet from "@/utils/useGet";
import { DATABASE_API_URL } from "@/config";
import usePost from "@/utils/usePost";
import { RiResetLeftLine } from "react-icons/ri";
import { LiaExchangeAltSolid } from "react-icons/lia";
import {
  beautify,
  getConnectionString,
  getDatabaseStatus,
  numberFormat,
  useGetProject,
  useSetContainerSize,
} from "@/utils/helpers";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandMysql, TbCopy } from "react-icons/tb";
import moment from "moment";
import { useClipboard } from "@mantine/hooks";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const DatabaseDetails = () => {
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [disableConfirmOpened, setDisableConfirmOpened] = useState(false);
  const [enableConfirmOpened, setEnableConfirmOpened] = useState(false);
  const [updateConfirmOpened, setUpdateConfirmOpened] = useState(false);
  const [resetConfirmOpened, setResetConfirmOpened] = useState(false);
  const { database_id, project_id } = useParams();
  const clipboard = useClipboard({ timeout: 500 });
  const [database, setDatabase] = useState<any>({});
  const [showFields, setShowFields] = useState<Record<string, boolean>>({});
  const [databaseConnection, setDatabaseConnection] = useState<any>({});
  useSetContainerSize("md");
  useGetProject(project_id || "");

  const {
    getData: getDatabase,
    data: databaseData,
    loading: isLoadingDatabase,
    success: successDatabase,
  } = useGet();

  const {
    uploadData: deleteProject,
    submitting: deletingProject,
    success: deletedProjectSuccess,
  } = usePost();

  const {
    uploadData: disableProject,
    submitting: disablingProject,
    success: disabledProjectSuccess,
  } = usePost();

  const {
    uploadData: enableProject,
    submitting: enablingProject,
    success: enabledProjectSuccess,
  } = usePost();

  const {
    uploadData: resetProject,
    submitting: resettingDatabase,
    success: resetProjectSuccess,
  } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    getDatabase({
      api: `${DATABASE_API_URL}/databases/${database_id}`,
      isExternal: true,
    });
  }, [database_id]);

  useEffect(() => {
    if (deletedProjectSuccess || disabledProjectSuccess) {
      navigate("/");
    }
  }, [deletedProjectSuccess, disabledProjectSuccess]);

  useEffect(() => {
    if (enabledProjectSuccess) {
      navigate(`/database/${database?.id}`);
    }
  }, [enabledProjectSuccess]);

  useEffect(() => {
    if (successDatabase) {
      setDatabase(databaseData?.data?.database);
      setDatabaseConnection(getConnectionString(databaseData?.data?.database));
    }
  }, [successDatabase]);

  const handleDelete = () => {
    deleteProject({
      id: database?.id,
      api: `${DATABASE_API_URL}/databases/${database?.id}`,
      method: "DELETE",
      isExternal: true,
    });
  };

  const handleDisable = () => {
    disableProject({
      api: `${DATABASE_API_URL}/databases/${database?.id}/disable`,
      isExternal: true,
    });
  };

  const handleEnable = () => {
    enableProject({
      api: `${DATABASE_API_URL}/databases/${database?.id}/enable`,
      isExternal: true,
    });
  };

  const handleReset = () => {
    resetProject({
      api: `${DATABASE_API_URL}/databases/${database?.id}/reset`,
      isExternal: true,
    });
  };

  const projectInfo = [
    {
      label: "Name",
      value: database?.name,
    },
    {
      label: "Type",
      value: (
        <Group gap="xs" align="center">
          {database?.database_flavour_name === "postgres" ? (
            <BiLogoPostgresql size={16} color="#0064a5" />
          ) : (
            <TbBrandMysql size={16} color="#00758f" />
          )}
          <Text size="sm" fw={500}>
            {beautify(database?.database_flavour_name)}
          </Text>
        </Group>
      ),
    },
    {
      label: "Status",
      value: getDatabaseStatus(database?.db_status),
    },
    {
      label: "Age",
      value: moment(database?.date_created).fromNow(),
    },
    {
      label: "Used",
      value: database?.default_storage_kb || "N/A",
    },
    {
      label: "Allocated",
      value: database?.allocated_size_kb
        ? `${numberFormat(database?.allocated_size_kb)} KB`
        : "N/A",
    },
  ];

  const connectionInfo = [
    {
      label: "Host",
      value: database?.host,
    },
    {
      label: "Port",
      value: database?.port,
    },
    {
      label: "Database",
      value: database?.name,
    },
    {
      label: "User",
      value: database?.user,
    },
    {
      label: "Password",
      value: database?.password,
      hidden: true,
    },
    {
      label: "Connection String",
      value: databaseConnection,
      hidden: true,
    },
  ];

  return (
    <Stack gap={30}>
      <Stack gap={0}>
        <TitleText>Database Details</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Grid>
            {projectInfo.map((info) => (
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
        <TitleText>Database Connection</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap="sm">
            {connectionInfo.map((info) => (
              <Flex
                key={info.label}
                justify="space-between"
                align="center"
                w="100%"
              >
                <Text className="subtitle" w="20%">
                  {info.label}
                </Text>
                <Group gap="xs" w="80%">
                  {info.hidden && (
                    <Tooltip
                      label={showFields[info.label] ? "Hide" : "Show"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        variant="default"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setShowFields((prev) => ({
                            ...prev,
                            [info.label]: !prev[info.label],
                          }))
                        }
                      >
                        {showFields[info.label] ? (
                          <AiOutlineEyeInvisible size={16} />
                        ) : (
                          <AiOutlineEye size={16} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                  <Tooltip
                    label={clipboard.copied ? "Copied" : "Copy"}
                    position="right"
                    withArrow
                  >
                    <Input
                      value={info.value}
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
                      type={
                        info.hidden
                          ? showFields[info.label]
                            ? "text"
                            : "password"
                          : "text"
                      }
                      rightSection={<TbCopy />}
                      rightSectionProps={{
                        onClick: () => {
                          clipboard.copy(info.value);
                        },
                      }}
                      onClick={() => {
                        clipboard.copy(info.value);
                      }}
                    />
                  </Tooltip>
                </Group>
              </Flex>
            ))}
          </Stack>
        </Card>
      </Stack>
      <Stack gap={0}>
        <TitleText>Danger Zone</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10}>
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Change Password</Text>
                <Text className="subtext">
                  Update the password for the database
                </Text>
              </Stack>
              <Button
                variant="outline"
                onClick={() => setUpdateConfirmOpened(true)}
                leftSection={<LiaExchangeAltSolid />}
              >
                Change Password
              </Button>
            </Group>
            <Divider />
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Reset Database</Text>
                <Text className="subtext">
                  Delete all data inside this database and restore it to its
                  initial state.
                </Text>
              </Stack>
              <Button
                variant="outline"
                color="red"
                onClick={() => setResetConfirmOpened(true)}
                leftSection={<RiResetLeftLine />}
              >
                Reset
              </Button>
            </Group>
            <Divider />
            {database?.status === "disabled" ? (
              <Group justify="space-between" align="center">
                <Stack gap={0}>
                  <Text className="title">Enable Database</Text>
                  <Text className="subtext">
                    Enable the database to allow access to resources.
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
                  <Text className="title">Disable Database</Text>
                  <Text className="subtext">
                    This will temporary disable the database. .
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
                <Text className="title">Delete Project</Text>
                <Text className="subtext">
                  This action is irreversible and will delete the project
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
            title="Delete Database"
            buttonColor="red"
            buttonText="Delete"
            onConfirm={handleDelete}
            loading={deletingProject}
            leftSection={<HiTrash />}
          >
            Are you sure you want to delete <b>{database?.name}</b> database
            permanently? Destroy the entire database, delete all tables and data
            inside them.
          </ModalConfirm>
          <ModalConfirm
            opened={disableConfirmOpened}
            onClose={() => setDisableConfirmOpened(false)}
            title="Disable Database"
            buttonText="Disable"
            onConfirm={handleDisable}
            loading={disablingProject}
            buttonColor="red"
            leftSection={<HiLockClosed />}
          >
            Are you sure you want to disable <b>{database?.name}</b> database?
            This action will prevent the database contents from being accessed.
          </ModalConfirm>
          <ModalConfirm
            opened={enableConfirmOpened}
            onClose={() => setEnableConfirmOpened(false)}
            title="Enable Database"
            buttonText="Enable"
            buttonColor="green"
            onConfirm={handleEnable}
            loading={enablingProject}
            leftSection={<HiLockOpen />}
          >
            Are you sure you want to enable <b>{database?.name}</b> database?
            This action will allow the database contents to be accessed.
          </ModalConfirm>
          <ModalConfirm
            opened={resetConfirmOpened}
            onClose={() => setResetConfirmOpened(false)}
            title="Reset Database"
            buttonText="Reset"
            buttonColor="red"
            leftSection={<RiResetLeftLine />}
            onConfirm={handleReset}
            loading={resettingDatabase}
          >
            Are you sure you want to reset <b>{database?.name}</b> database?
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};

export default DatabaseDetails;
