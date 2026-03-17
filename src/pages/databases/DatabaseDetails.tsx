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
  Skeleton,
  PasswordInput,
  Container,
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
import { showNotification } from "@mantine/notifications";
import { MdOutlineLock } from "react-icons/md";
import useForm from "@/hooks/generic/useForm";

const DatabaseDetails = () => {
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [disableConfirmOpened, setDisableConfirmOpened] = useState(false);
  const [enableConfirmOpened, setEnableConfirmOpened] = useState(false);
  const [resetConfirmOpened, setResetConfirmOpened] = useState(false);
  const [changePasswordConfirmOpened, setChangePasswordConfirmOpened] =
    useState(false);
  const { form: changePasswordForm, onChange: changePasswordOnChange } =
    useForm();

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
    uploadData: deleteDatabase,
    submitting: deletingDatabase,
    success: deletedDatabaseSuccess,
  } = usePost();

  const {
    uploadData: disableDatabase,
    submitting: disablingDatabase,
    success: disabledDatabaseSuccess,
  } = usePost();

  const {
    uploadData: enableDatabase,
    submitting: enablingDatabase,
    success: enabledDatabaseSuccess,
  } = usePost();

  const {
    uploadData: resetDatabase,
    submitting: resettingDatabase,
    success: resetDatabaseSuccess,
  } = usePost();

  const {
    uploadData: changePasswordDatabase,
    submitting: changingPasswordDatabase,
    success: changedPasswordDatabaseSuccess,
  } = usePost();

  const navigate = useNavigate();

  useEffect(() => {
    getDatabase({
      api: `${DATABASE_API_URL}/databases/${database_id}`,
      isExternal: true,
    });
  }, [
    database_id,
    changedPasswordDatabaseSuccess,
    resetDatabaseSuccess,
    disabledDatabaseSuccess,
    enabledDatabaseSuccess,
  ]);

  useEffect(() => {
    if (successDatabase) {
      setDatabase(databaseData?.data?.database);
      setDatabaseConnection(getConnectionString(databaseData?.data?.database));
    }
  }, [successDatabase]);

  const handleDelete = () => {
    deleteDatabase({
      id: database?.id,
      api: `${DATABASE_API_URL}/databases`,
      method: "DELETE",
      isExternal: true,
      successMessage: "Database deleted successfully",
    });
  };

  const handleDisable = () => {
    disableDatabase({
      api: `${DATABASE_API_URL}/databases/${database?.id}/disable`,
      isExternal: true,
    });
  };

  const handleEnable = () => {
    enableDatabase({
      api: `${DATABASE_API_URL}/databases/${database?.id}/enable`,
      isExternal: true,
    });
  };
  const handleReset = () => {
    resetDatabase({
      api: `${DATABASE_API_URL}/databases/${database?.id}/reset`,
      isExternal: true,
      successMessage: "Database reset successfully",
    });
  };

  const handleChangePassword = () => {
    if (changePasswordForm.password !== changePasswordForm.confirm_password) {
      showNotification({
        title: "Opps!",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }
    changePasswordDatabase({
      api: `${DATABASE_API_URL}/databases/${database?.id}/reset_password`,
      params: { password: changePasswordForm.password },
      isExternal: true,
      successMessage: "Password changed successfully",
    });
  };

  useEffect(() => {
    if (deletedDatabaseSuccess) {
      navigate(`/projects/${project_id}/databases`);
    }
  }, [deletedDatabaseSuccess]);

  useEffect(() => {
    if (changedPasswordDatabaseSuccess) {
      setChangePasswordConfirmOpened(false);
    }
    if (resetDatabaseSuccess) {
      setResetConfirmOpened(false);
    }
    if (disabledDatabaseSuccess) {
      setDisableConfirmOpened(false);
    }
    if (enabledDatabaseSuccess) {
      setEnableConfirmOpened(false);
    }
  }, [
    changedPasswordDatabaseSuccess,
    resetDatabaseSuccess,
    disabledDatabaseSuccess,
    enabledDatabaseSuccess,
  ]);

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
    <Container size="1070" mt="sm">
      <Stack gap={30}>
        <Stack gap={0}>
          <TitleText>Database Details</TitleText>
          {isLoadingDatabase ? (
            <DatabaseDetailsSkeleton />
          ) : (
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
          )}
        </Stack>
        <Stack gap={0}>
          <TitleText>Database Connection</TitleText>
          {isLoadingDatabase ? (
            <DatabaseConnectionSkeleton />
          ) : (
            <Card p="lg" radius="md" withBorder>
              <Stack gap="sm">
                {connectionInfo.map((info) => (
                  <Flex
                    key={info.label}
                    justify="space-between"
                    align="center"
                    w="100%"
                    gap={5}
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
          )}
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
                  onClick={() => setChangePasswordConfirmOpened(true)}
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
                  <Text className="title">Delete Database</Text>
                  <Text className="subtext">
                    This action is irreversible and will delete the database
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
              loading={deletingDatabase}
              leftSection={<HiTrash />}
            >
              Are you sure you want to delete <b>{database?.name}</b> database
              permanently? Destroy the entire database, delete all tables and
              data inside them.
            </ModalConfirm>
            <ModalConfirm
              opened={disableConfirmOpened}
              onClose={() => setDisableConfirmOpened(false)}
              title="Disable Database"
              buttonText="Disable"
              onConfirm={handleDisable}
              loading={disablingDatabase}
              buttonColor="red"
              leftSection={<HiLockClosed />}
            >
              Are you sure you want to disable <b>{database?.name}</b> database?
              This action will prevent the database contents from being
              accessed.
            </ModalConfirm>
            <ModalConfirm
              opened={enableConfirmOpened}
              onClose={() => setEnableConfirmOpened(false)}
              title="Enable Database"
              buttonText="Enable"
              buttonColor="green"
              onConfirm={handleEnable}
              loading={enablingDatabase}
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
            <ModalConfirm
              opened={changePasswordConfirmOpened}
              onClose={() => setChangePasswordConfirmOpened(false)}
              title="Change Password"
              buttonText="Change"
              buttonColor="red"
              onConfirm={handleChangePassword}
              loading={changingPasswordDatabase}
            >
              <form onSubmit={handleChangePassword}>
                <Stack gap={20}>
                  <PasswordInput
                    placeholder="New Password"
                    label="New Password"
                    name="password"
                    required
                    onChange={changePasswordOnChange}
                    leftSection={<MdOutlineLock />}
                  />
                  <PasswordInput
                    placeholder="Confirm New Password"
                    label="Confirm New Password"
                    name="confirm_password"
                    required
                    onChange={changePasswordOnChange}
                    leftSection={<MdOutlineLock />}
                  />
                </Stack>
              </form>
            </ModalConfirm>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DatabaseDetails;

const DatabaseDetailsSkeleton = () => (
  <Card p="lg" radius="md" withBorder>
    <Grid>
      {[...Array(6)].map((_, i) => (
        <Grid.Col key={i} span={{ base: 6, md: 4, lg: 4 }}>
          <Flex>
            <Stack gap={7}>
              <Skeleton height={18} width={60} />
              <Skeleton height={14} width={150} />
            </Stack>
          </Flex>
        </Grid.Col>
      ))}
    </Grid>
  </Card>
);

const DatabaseConnectionSkeleton = () => (
  <Card p="lg" radius="md" withBorder>
    <Stack gap="sm">
      {[...Array(6)].map((_, i) => (
        <Flex key={i} justify="space-between" align="center" w="100%" gap={20}>
          <Skeleton height={20} width="20%" />
          <Group gap="xs" w="80%">
            <Skeleton height={36} width="100%" />
          </Group>
        </Flex>
      ))}
    </Stack>
  </Card>
);
