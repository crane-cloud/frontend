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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const menuItems = [
    {
      label: "Theme",
      icon:
        colorScheme === "dark" ? (
          <IoSunnyOutline size={16} />
        ) : (
          <IoMoonOutline size={16} />
        ),
      action: () => setColorScheme(colorScheme === "dark" ? "light" : "dark"),
    },
    {
      label: "Account settings",
      icon: <IoSettingsOutline size={16} />,
      action: () => navigate(`/profile/${user?.id}`),
    },
    {
      label: "Change account",
      icon: <GoArrowSwitch size={16} />,
    },
    {
      label: "Logout",
      icon: <IoLogOutOutline size={16} />,
      action: () => logout(),
    },
  ];

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
                {user.username || user.name}
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
        <Menu.Item onClick={() => navigate(`/profile/${user?.id}`)}>
          <Group gap={10}>
            <Avatar
              alt={user.username}
              name={user.name}
              radius="xl"
              color="initials"
            />
            <Stack gap={2}>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.username || user.name}
              </Text>
              <Text size="xs" c="dimmed">
                {user.email}
              </Text>
            </Stack>
          </Group>
        </Menu.Item>

        <MenuDivider />
        {menuItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <Menu.Item leftSection={item.icon} onClick={item.action}>
              {item.label}
            </Menu.Item>
            {index === 0 && <MenuDivider />}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
