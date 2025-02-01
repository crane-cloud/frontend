import React, { useState } from "react";
import {
  Avatar,
  Group,
  Image,
  Menu,
  MenuDivider,
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
import cx from "clsx";
import classes from "../styles/UserDropDown.module.css";
import { useColorScheme, useDisclosure } from "@mantine/hooks";

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
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const user = {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
  };
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
        //   className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={30} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <FiChevronDown size={16} />
            {/* <IconChevronDown size={12} stroke={1.5} /> */}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
          leftSection={
            colorScheme === "dark" ? (
              <IoSunnyOutline
                size={16}
                // stroke={1.5}
              />
            ) : (
              <IoMoonOutline size={16} />
            )
          }
        >
          Theme
        </Menu.Item>
        <MenuDivider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <IoSettingsOutline
              size={16}

              // stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <GoArrowSwitch
              size={16}
              //   stroke={1.5}
            />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IoLogOutOutline
              size={16}
              // stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
