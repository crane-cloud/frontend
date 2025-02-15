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
} from "@mantine/core";
import { HiDotsVertical } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdEdit, MdOutlineEmail, MdOutlineSecurity } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TitleText from "@/components/TitleText";
import { Table } from "@/components/Elements/Table";
import { MenuContext } from "../../components/Layouts/DashboardLayout";

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
  const { data: membersData, getData: getMembers, success } = useGet();
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getMembers({
      api: `projects/${project?.id}/users`,
    });
  }, [project]);

  useEffect(() => {
    if (success) {
      setMembers(membersData?.data?.project_users);
    }
  }, [success, membersData]);

  const updateRoleValue = (string: string[]) => {
    const role = string[1];
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const columns = [
    { id: "name", header: "Name" },
    { id: "role", header: "Role" },
    { id: "actions", header: "Actions" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const memberActions = (member: any) => {
    return [
      {
        label: "Leave",
        onClick: () => {},
        icon: <RiLogoutBoxLine />,
      },
      {
        label: " Change Role",
        icon: <MdEdit />,
        onClick: () => {},
      },
      {
        label: "Remove",
        color: "red",
        onClick: () => {},
        icon: <HiTrash />,
      },
    ];
  };

  const tableData = (data: any) => {
    return data?.map((member: any) => ({
      name: (
        <Flex gap={10} wrap="nowrap">
          <Avatar
            alt={member?.user?.name}
            name={member?.user?.name}
            radius="xl"
            color="initials"
          />
          <Stack gap={0}>
            <Text className="subtitle">{member?.user?.name}</Text>
            <Text size="xs">{member?.user?.email}</Text>
          </Stack>
        </Flex>
      ),
      email: member?.user?.email,
      role: updateRoleValue(member.role.split(".")),
      actions: (
        <Group gap={10}>
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
                >
                  {action.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
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

  return (
    <div>
      <TitleText>Members</TitleText>
      <Stack gap={20}>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10}>
            <Text className="title">Invite New Member</Text>
            <Flex gap={10} align="end">
              <TextInput
                placeholder="Enter email address"
                label="Email Address"
                leftSection={<MdOutlineEmail />}
                required
                variant="filled"
                flex={1}
              />
              <Select
                label="Role"
                variant="filled"
                placeholder="Select Role"
                data={["admin", "member"]}
                required
                flex={1}
                leftSection={<MdOutlineSecurity />}
              />
            </Flex>
            <Group justify="start" mt={10}>
              <Button
                color="var(--mantine-color-black)"
                leftSection={<IoMdSend />}
              >
                Invite
              </Button>
            </Group>
          </Stack>
        </Card>
        <Table
          striped={false}
          verticalSpacing="md"
          columns={columns}
          data={tableData(members)}
          header={tableHeader}
          noHeader
        />
      </Stack>
    </div>
  );
};
