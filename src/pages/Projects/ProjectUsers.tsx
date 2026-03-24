import { useGetProject } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Select,
  Stack,
  Text,
  TextInput,
  Modal,
} from "@mantine/core";
import { HiDotsVertical } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import {
  MdEdit,
  MdOutlineEmail,
  MdOutlineSecurity,
  MdTransferWithinAStation,
} from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TitleText from "@/components/TitleText";
import { MenuContext } from "../../components/Layouts/DashboardLayout";
import { Table } from "@/components/Elements/CustomTable";
import usePost from "@/utils/usePost";
import { useAuth } from "@/utils/AuthContext";
import { ProjectUserRecord } from "@/components/Cards/ProjectsCard";

const ProjectUsers = () => {
  const { project_id } = useParams();
  const { project } = useGetProject(project_id || "");
  const { setContainerSize } = useContext(MenuContext);

  useEffect(() => {
    setContainerSize("md");
    return () => {
      setContainerSize("xl");
    };
  }, [setContainerSize]);
  return (
    <div>
      <MembersSection project={project} />
    </div>
  );
};

export default ProjectUsers;

export const MembersSection = ({ project }: { project: any }) => {
  const { user } = useAuth();
  const { data: membersData, getData: getMembers, success } = useGet();
  const {
    uploadData: sendInvitation,
    submitting: invitingMember,
    success: invitationSuccess,
    resetSuccess,
  } = usePost();
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [modal, setModal] = useState<{ type: string; member: any } | null>(
    null,
  );
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    getMembers({
      api: `/projects/${project?.id}/users`,
    });
  }, [project]);

  useEffect(() => {
    if (success) {
      setMembers(membersData?.data?.project_users);
    }
  }, [success, membersData]);

  useEffect(() => {
    if (invitationSuccess) {
      getMembers({
        api: `/projects/${project?.id}/users`,
      });
      setEmail("");
      setRole("member");
      resetSuccess();
    }
  }, [invitationSuccess, getMembers, project]);

  const handleInviteMember = () => {
    sendInvitation({
      api: `/projects/${project?.id}/users`,
      params: { email, role, resend: false },
    });
  };

  const handleTransferOwnership = () => {
    if (!selectedMemberId) {
      return;
    }

    const selectedMember = members.find(
      (member) => member?.user?.id === selectedMemberId,
    );

    if (!selectedMember?.user?.email) {
      return;
    }

    sendInvitation({
      api: `/projects/${project?.id}/users/transfer`,
      params: { email: selectedMember?.user?.email },
    });
    getMembers({ api: `/projects/${project?.id}/users` });
    setModal(null);
    setSelectedMemberId(null);
  };

  const handleChangeRole = () => {
    if (!selectedRole) {
      return;
    }

    sendInvitation({
      api: `/projects/${project?.id}/users`,
      method: "PATCH",
      params: { email: modal?.member?.user?.email, role: selectedRole },
    });
    getMembers({ api: `/projects/${project?.id}/users` });
    setModal(null);
    setSelectedRole(null);
  };

  const updateRoleValue = (string: string[]) => {
    const role = string[1];
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const columns = [
    { id: "name", header: "Name" },
    { id: "status", header: "Status" },
    { id: "role", header: "Role" },
    { id: "actions", header: "Actions" },
  ];

  const memberActions = (member: ProjectUserRecord) => {
    const role = member.role.split(".")[1];
    const isSelf = member?.user?.id === user?.id;
    const myRole = allMembers
      .find((m) => m?.user?.id === user?.id)
      ?.role.split(".")[1];

    const acceptedMembers = members.filter(
      (m) => m.accepted_collaboration_invite === true && m.user.id !== user?.id,
    );

    const actions = [];

    if (isSelf) {
      if (role === "owner") {
        actions.push({
          label: "Transfer",
          icon: <MdTransferWithinAStation />,
          onClick: () => setModal({ type: "transfer", member }),
          disabled: acceptedMembers.length === 0,
        });
      }
    } else if (myRole === "owner") {
      actions.push(
        {
          label: "Change Role",
          icon: <MdEdit />,
          onClick: () => setModal({ type: "changeRole", member }),
        },
        {
          label: "Remove",
          color: "red",
          onClick: () => setModal({ type: "remove", member }),
          icon: <HiTrash />,
        },
      );
    } else if (myRole === "admin" && role !== "owner") {
      actions.push(
        {
          label: "Change Role",
          icon: <MdEdit />,
          onClick: () => setModal({ type: "changeRole", member }),
        },
        {
          label: "Remove",
          color: "red",
          onClick: () => setModal({ type: "remove", member }),
          icon: <HiTrash />,
        },
      );
    }
    return actions;
  };
  const allMembers = [
    ...(membersData?.data?.project_users || []),
    ...(membersData?.data?.project_anonymous_users?.map((user: any) => ({
      user: { name: user.email, email: user.email },
      role: `project.${user.role}`,
      isAnonymous: true,
    })) || []),
  ].sort((a, b) => {
    if (a.role === "RolesList.owner") {
      return -1;
    }
    if (b.role === "RolesList.owner") {
      return 1;
    }
    return 0;
  });

  const tableData = (data: any) => {
    return data?.map((member: any) => ({
      name: (
        <Flex gap={10} wrap="nowrap" align="center">
          <Avatar
            alt={member?.user?.name}
            name={member?.user?.name}
            radius="xl"
            color="initials"
          />
          <Stack gap={0}>
            <Flex align="center" gap={6}>
              <Text className="subtitle">{member?.user?.name}</Text>
            </Flex>
            <Text size="xs">{member?.user?.email}</Text>
          </Stack>
        </Flex>
      ),
      status:
        member.accepted_collaboration_invite === false ? (
          <Text size="xs" color="dimmed">
            Pending Invitation
          </Text>
        ) : member.isAnonymous ? (
          <Text size="xs" color="dimmed">
            Pending Invitation
          </Text>
        ) : (
          ""
        ),
      role: updateRoleValue(member.role.split(".")),
      actions: (
        <Group gap={10}>
          {/* Only show menu if there are actions */}
          {memberActions(member).length > 0 && (
            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <HiDotsVertical />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {memberActions(member).map((action) => (
                  <Menu.Item
                    color={action.color}
                    onClick={() => action.onClick()}
                    leftSection={action?.icon}
                    key={action.label}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      ),
    }));
  };

  const tableHeader = () => {
    return (
      <Stack gap={0}>
        <Text className="subtitle">
          Project has {members?.length} team member
          {members?.length > 1 ? "s" : ""}
        </Text>
        <Text className="subtext">
          Members that have accounts on crane cloud can perform different
          operations on the project depending on their permission.
        </Text>
      </Stack>
    );
  };

  const handleRemoveMember = (email: string) => {
    if (!email) {
      return;
    }

    sendInvitation({
      api: `/projects/${project?.id}/users`,
      method: "DELETE",
      params: { email },
    });
    getMembers({ api: `/projects/${project?.id}/users` });
    setModal(null);
  };

  const handleLeaveProject = (email: string) => {
    if (!email) {
      return;
    }

    sendInvitation({
      api: `/projects/${project?.id}/users`,
      method: "DELETE",
      params: { email },
    });
    getMembers({ api: `/projects/${project?.id}/users` });
    setModal(null);
  };
  const member = members.find((m) => m?.user?.id === user?.id);
  const isSelf = member?.user?.id === user?.id;
  const myRole = allMembers
    .find((m) => m?.user?.id === user?.id)
    ?.role.split(".")[1];
  return (
    <>
      <TitleText>Members</TitleText>
      <Stack gap={20}>
        {isSelf && (myRole === "owner" || myRole === "admin") && (
          <Card p="lg" radius="md" withBorder>
            <Stack gap={20}>
              <Text className="title">Invite New Member</Text>
              <Flex gap={10} align="end">
                <TextInput
                  placeholder="Enter email address"
                  label="Email Address"
                  leftSection={<MdOutlineEmail />}
                  required
                  variant="filled"
                  flex={1}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={invitingMember}
                />
                <Select
                  label="Role"
                  variant="filled"
                  placeholder="Select Role"
                  data={["admin", "member"]}
                  required
                  flex={1}
                  leftSection={<MdOutlineSecurity />}
                  onChange={(value) => setRole(value || "member")}
                  value={role}
                />
              </Flex>
              <Group justify="start" mt={10}>
                <Button
                  radius="md"
                  color="var(--mantine-color-text)"
                  leftSection={<IoMdSend />}
                  onClick={handleInviteMember}
                  disabled={invitingMember}
                  loading={invitingMember}
                >
                  Invite
                </Button>
              </Group>
            </Stack>
          </Card>
        )}
        <Table
          striped={false}
          verticalSpacing="md"
          columns={columns}
          data={tableData(allMembers)}
          header={tableHeader}
          noHeader
        />
      </Stack>
      <Modal
        opened={!!modal}
        onClose={() => {
          setModal(null);
          setSelectedMemberId(null);
        }}
        title={
          modal?.type === "transfer"
            ? "Transfer Ownership"
            : modal?.type === "changeRole"
              ? "Change Role"
              : modal?.type === "remove"
                ? "Remove Member"
                : modal?.type === "leave"
                  ? "Leave Project"
                  : ""
        }
        centered
      >
        {modal?.type === "transfer" && (
          <Stack gap="md">
            <Text>Select a member to transfer ownership to:</Text>
            <Select
              placeholder="Select Member"
              data={members
                .filter(
                  (member) => member.accepted_collaboration_invite === true,
                )
                .map((member) => ({
                  value: member?.user?.id,
                  label: member?.user?.name,
                }))}
              onChange={(value) => setSelectedMemberId(value)}
            />
            <Group mt="md">
              <Button variant="default" onClick={() => setModal(null)}>
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={handleTransferOwnership}
                disabled={!selectedMemberId}
              >
                Confirm
              </Button>
            </Group>
          </Stack>
        )}
        {modal?.type === "changeRole" && (
          <>
            <Stack gap="md">
              <Text>
                Change role for <b>{modal.member?.user?.name}</b>:
              </Text>
              <Select
                placeholder="Select Role"
                data={[
                  { value: "admin", label: "Admin" },
                  { value: "member", label: "Member" },
                ]}
                onChange={(value) => setSelectedRole(value || "member")}
              />
            </Stack>
            <Group mt="md">
              <Button variant="default" onClick={() => setModal(null)}>
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  setModal(null);
                  handleChangeRole();
                }}
              >
                Confirm
              </Button>
            </Group>
          </>
        )}
        {modal?.type === "remove" && (
          <>
            <Text>
              Are you sure you want to remove <b>{modal.member?.user?.name}</b>{" "}
              from the project?
            </Text>
            <Group mt="md">
              <Button variant="default" onClick={() => setModal(null)}>
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  setModal(null);
                  handleRemoveMember(modal.member?.user?.email); // Trigger removal logic
                }}
              >
                Confirm
              </Button>
            </Group>
          </>
        )}
        {modal?.type === "leave" && (
          <>
            <Text>Are you sure you want to leave this project?</Text>
            <Group mt="md">
              <Button variant="default" onClick={() => setModal(null)}>
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  setModal(null);
                  handleLeaveProject(modal.member?.user?.email);
                }}
              >
                Confirm
              </Button>
            </Group>
          </>
        )}
      </Modal>
    </>
  );
};
