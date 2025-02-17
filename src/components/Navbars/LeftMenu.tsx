import {
  AppShell,
  NavLink,
  Text,
  Group,
  ThemeIcon,
  UnstyledButton,
  rem,
  ScrollArea,
  Stack,
  Divider,
  Title,
  Pill,
} from "@mantine/core";
import {
  HiOutlineSquares2X2,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
  HiOutlineCircleStack,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { PiCubeLight } from "react-icons/pi";
import { LuLogs } from "react-icons/lu";

export type TLeftMenuType = "home" | "project" | "admin" | "app";

interface ILeftMenuProps {
  menuType: TLeftMenuType;
  projectId: string;
  title?: string;
  subtitle?: string;
  appId?: string;
}
interface INavLink {
  label: string;
  icon: React.ComponentType;
  key: string;
  link: string;
  description?: string;
}

const LeftMenu = ({
  menuType,
  projectId,
  title,
  subtitle,
  appId,
}: ILeftMenuProps) => {
  const location = useLocation();
  const [navbarLinks, setNavbarLinks] = useState<INavLink[]>([]);
  const [showProjectHeader, setShowProjectHeader] = useState(false);
  const navigate = useNavigate();

  const homeNavbarLinks: INavLink[] = [
    {
      label: "Home",
      icon: HiOutlineSquares2X2,
      key: "home",
      link: "/",
    },

    {
      label: "Settings",
      icon: HiOutlineCog6Tooth,
      key: "settings",
      link: "/settings",
    },
  ];
  const projectNavbarLinks: INavLink[] = [
    {
      label: "Dashboard",
      icon: HiOutlineSquares2X2,
      key: "dashboard",
      link: `/projects/${projectId}`,
    },
    {
      label: "Applications",
      icon: PiCubeLight,
      key: "applications",
      link: `/projects/${projectId}/apps`,
    },
    {
      label: "Databases",
      icon: HiOutlineCircleStack,
      key: "databases",
      link: `/projects/${projectId}/databases`,
    },
    {
      label: "Users",
      icon: HiOutlineUsers,
      key: "users",
      link: `/projects/${projectId}/users`,
    },
    {
      label: "Metrics",
      icon: HiOutlineChartBar,
      key: "metrics",
      link: `/projects/${projectId}/metrics`,
    },
    {
      label: "Settings",
      icon: HiOutlineCog6Tooth,
      key: "settings",
      link: `/projects/${projectId}/settings`,
    },
  ];

  const appsNavbarLinks: INavLink[] = [
    {
      label: "Dashboard",
      icon: HiOutlineSquares2X2,
      key: "dashboard",
      link: `/projects/${projectId}/apps/${appId}`,
    },
    {
      label: "Logs",
      icon: LuLogs,
      key: "logs",
      link: `/projects/${projectId}/apps/${appId}/logs`,
    },
    {
      label: "Metrics",
      icon: HiOutlineChartBar,
      key: "metrics",
      link: `/projects/${projectId}/apps/${appId}/metrics`,
    },
    {
      label: "Settings",
      icon: HiOutlineCog6Tooth,
      key: "settings",
      link: `/projects/${projectId}/apps/${appId}/settings`,
    },
  ];
  const adminNavbarLinks: INavLink[] = [
    {
      label: "Users",
      icon: HiOutlineUsers,
      key: "users",
      link: "/users",
    },
  ];
  useEffect(() => {
    switch (menuType) {
      case "home":
        setNavbarLinks(homeNavbarLinks);
        setShowProjectHeader(false);
        break;
      case "project":
        setNavbarLinks(projectNavbarLinks);
        setShowProjectHeader(true);
        break;
      case "app":
        setNavbarLinks(appsNavbarLinks);
        setShowProjectHeader(true);
        break;
      default:
        setNavbarLinks(adminNavbarLinks);
        setShowProjectHeader(false);
        break;
    }
  }, [menuType]);

  const backNavigation = () => {
    navigate(-1);
  };

  return (
    <AppShell.Navbar p="5px">
      <AppShell.Section grow component={ScrollArea}>
        {showProjectHeader && (
          <Stack>
            <Group justify="space-between" align="center">
              <UnstyledButton
                onClick={backNavigation}
                mx="md"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <IoArrowBack />
                <Title order={4}>{title}</Title>
              </UnstyledButton>
              {subtitle && (
                <Pill size="sm" c="gray">
                  {subtitle}
                </Pill>
              )}
            </Group>
            <Divider my="md" />
          </Stack>
        )}
        {navbarLinks.map((link: INavLink) => (
          <NavLink
            component={Link}
            key={link.key}
            label={link.label}
            leftSection={<link.icon />}
            active={!!matchPath({ path: link.link }, location.pathname)}
            to={link.link}
            styles={{
              root: {
                borderRadius: "0.4rem",
              },
            }}
          />
        ))}
      </AppShell.Section>

      {/* Optional: Footer section */}
      <AppShell.Section>
        <UnstyledButton
          style={{
            padding: rem(8),
            borderRadius: rem(4),
            "&:hover": {
              backgroundColor: "#f8f9fa",
            },
          }}
        >
          <Group>
            <ThemeIcon variant="light" color="gray" size="sm">
              <HiOutlineCog6Tooth size="1rem" />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              Account Settings
            </Text>
          </Group>
        </UnstyledButton>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default LeftMenu;
