import {
  AppShell,
  Box,
  Burger,
  Group,
  Pill,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "./Header.module.css";

import { Logo, UserDropDown } from "./Common";
import { Link } from "react-router-dom";
import Search from "./Elements/Search";
import { useAuth } from "@/utils/AuthContext";
import { DOCS_URL } from "@/config";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const DashboardHeader = ({ opened, toggle }: HeaderProps) => {
  const { user } = useAuth();

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AppShell.Header
      style={{
        backgroundColor: isDark
          ? "rgba(26, 27, 30, 0.75)"
          : "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Group h="100%" px="md" py="sm" justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link to="/">
            <Logo />
          </Link>
          {user?.is_admin && (
            <Pill
              size="sm"
              style={{
                backgroundColor: "var(--mantine-primary-color-2)",
                color: "var(--mantine-primary-color-9)",
              }}
            >
              Admin
            </Pill>
          )}

          {!user?.is_admin && (
            <>
              <Link
                to="/explore"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                <Group gap={5}>
                  <Text fw={700}>Explore</Text>
                </Group>
              </Link>
              <a
                href={`${DOCS_URL}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                <Group gap={5}>
                  <Text fw={700}>Docs</Text>
                </Group>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", paddingLeft: "10px" }}
              >
                <Group gap={5}>
                  <Text fw={700}>Status</Text>
                </Group>
              </a>
            </>
          )}
        </Group>
        <Group>
          <Search />
          <UserDropDown />
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export const GuestHeader = () => {
  return (
    <Box>
      <header className={classes.guestHeader}>
        <Group justify="space-between" h="100%">
          <Logo />
        </Group>
      </header>
    </Box>
  );
};
