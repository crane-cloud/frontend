import React from "react";
import {
  Avatar,
  Group,
  Image,
  Menu,
  MenuDivider,
  Stack,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import CraneCloudLogo from "../assets/images/logo.svg";
import { FiChevronDown } from "react-icons/fi";
import {
  IoLogOutOutline,
  IoMoonOutline,
  IoSettingsOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { GoArrowSwitch } from "react-icons/go";
import { useAuth } from "@/utils/AuthContext";

export const Logo = () => {
  return (
    <Group wrap="nowrap" gap={10} h="100%">
      <Image src={CraneCloudLogo} alt="Crane Cloud Logo" w={35} />
      <Text fw={700} size="xl" c="#008AC1">
        Crane Cloud
      </Text>
    </Group>
  );
};

export const UserDropDown = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { logout, user } = useAuth();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          px={5}
          py={5}
          bg={
            colorScheme === "dark"
              ? "var(--mantine-color-dark-7)"
              : "var(--mantine-color-gray-2)"
          }
          style={{ borderRadius: "100px" }}
        >
          <Group gap={10} display={{ base: "none", sm: "flex" }}>
            <Group gap={7}>
              <Avatar
                alt={user.username}
                name={user.name}
                radius="xl"
                size={30}
                color="initials"
              />
              <Text
                fw={500}
                size="sm"
                lh={1}
                display={{ base: "none", sm: "block" }}
              >
                {user.username}
              </Text>
            </Group>
            <FiChevronDown size={16} />
          </Group>
          <Group display={{ base: "flex", sm: "none" }}>
            <Avatar
              alt={user.username}
              name={user.name}
              radius="xl"
              size={30}
              color="initials"
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Group gap={10}>
            <Avatar
              alt={user.username}
              name={user.name}
              radius="xl"
              size={30}
              color="initials"
            />
            <Stack gap={0}>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.username}
              </Text>
              <Text size="xs" c="dimmed">
                {user.email}
              </Text>
            </Stack>
          </Group>
        </Menu.Item>

        <MenuDivider />
        <Menu.Item
          onClick={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
          leftSection={
            colorScheme === "dark" ? (
              <IoSunnyOutline size={16} />
            ) : (
              <IoMoonOutline size={16} />
            )
          }
        >
          Theme
        </Menu.Item>
        <MenuDivider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item leftSection={<IoSettingsOutline size={16} />}>
          Account settings
        </Menu.Item>
        <Menu.Item leftSection={<GoArrowSwitch size={16} />}>
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={<IoLogOutOutline size={16} />}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
