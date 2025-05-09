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
import { IoArrowBack, IoRocketOutline } from "react-icons/io5";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LuLogs } from "react-icons/lu";
import { RiBookLine } from "react-icons/ri";
import { PiCubeLight, PiFlask } from "react-icons/pi";

export type TLeftMenuType = "home" | "project" | "admin" | "app" | "mlops";

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

const LeftMenu = React.memo(
  ({ menuType, projectId, title, subtitle, appId }: ILeftMenuProps) => {
    const location = useLocation();
    const [navbarLinks, setNavbarLinks] = useState<INavLink[]>([]);
    const [showProjectHeader, setShowProjectHeader] = useState(false);

    const navigate = useNavigate();

    // Get IDs from URL as fallback
    const getPathIds = () => {
      const pathMatch = matchPath(
        {
          path: "/projects/:project_id/apps/:app_id",
          end: false,
        },
        location.pathname,
      );
      return {
        projectId: pathMatch?.params?.project_id || projectId,
        appId: pathMatch?.params?.app_id || appId,
      };
    };

    const homeNavbarLinks = useMemo(
      () => [
        { label: "Home", icon: HiOutlineSquares2X2, key: "home", link: "/" },
        {
          label: "Settings",
          icon: HiOutlineCog6Tooth,
          key: "settings",
          link: "/settings",
        },
      ],
      [],
    );

    const getProjectNavbarLinks = useCallback(
      (project_id: string) => [
        {
          label: "Dashboard",
          icon: HiOutlineSquares2X2,
          key: "dashboard",
          link: `/projects/${project_id}`,
        },
        {
          label: "Applications",
          icon: PiCubeLight,
          key: "applications",
          link: `/projects/${project_id}/apps`,
        },
        {
          label: "Databases",
          icon: HiOutlineCircleStack,
          key: "databases",
          link: `/projects/${project_id}/databases`,
        },
        {
          label: "Users",
          icon: HiOutlineUsers,
          key: "users",
          link: `/projects/${project_id}/users`,
        },
        {
          label: "Metrics",
          icon: HiOutlineChartBar,
          key: "metrics",
          link: `/projects/${project_id}/metrics`,
        },
        {
          label: "Settings",
          icon: HiOutlineCog6Tooth,
          key: "settings",
          link: `/projects/${project_id}/settings`,
        },
      ],
      [],
    );

    const getAppNavbarLinks = useCallback(
      (project_id: string, app_id: string) => [
        {
          label: "Dashboard",
          icon: HiOutlineSquares2X2,
          key: "dashboard",
          link: `/projects/${project_id}/apps/${app_id}`,
        },
        {
          label: "Logs",
          icon: LuLogs,
          key: "logs",
          link: `/projects/${project_id}/apps/${app_id}/logs`,
        },
        {
          label: "Metrics",
          icon: HiOutlineChartBar,
          key: "metrics",
          link: `/projects/${project_id}/apps/${app_id}/metrics`,
        },
        {
          label: "Settings",
          icon: HiOutlineCog6Tooth,
          key: "settings",
          link: `/projects/${project_id}/apps/${app_id}/settings`,
        },
      ],
      [],
    );

    const getMLOpsNavbarLinks = useCallback(
      (project_id: string, app_id: string) => [
        {
          label: "Dashboard",
          icon: HiOutlineSquares2X2,
          key: "dashboard",
          link: `/projects/${project_id}/apps/${app_id}`,
        },
        {
          label: "Experiments",
          icon: PiFlask,
          key: "experiments",
          link: `/projects/${project_id}/apps/${app_id}/experiments`,
        },
        {
          label: "Metrics",
          icon: HiOutlineChartBar,
          key: "metrics",
          link: `/projects/${project_id}/apps/${app_id}/metrics`,
        },
        {
          label: "Settings",
          icon: HiOutlineCog6Tooth,
          key: "settings",
          link: `/projects/${project_id}/apps/${app_id}/settings`,
        },
      ],
      [],
    );

    useEffect(() => {
      const { projectId: project_id, appId: app_id } = getPathIds();

      switch (menuType) {
        case "home":
          setNavbarLinks(homeNavbarLinks);
          setShowProjectHeader(false);
          break;
        case "project":
          if (project_id) {
            setNavbarLinks(getProjectNavbarLinks(project_id));
            setShowProjectHeader(true);
          }
          break;
        case "app":
          if (project_id && app_id) {
            setNavbarLinks(getAppNavbarLinks(project_id, app_id));
            setShowProjectHeader(true);
          }
          break;
        case "mlops":
          if (project_id && app_id) {
            setNavbarLinks(getMLOpsNavbarLinks(project_id, app_id));
            setShowProjectHeader(true);
          }
          break;
        default:
          setNavbarLinks(homeNavbarLinks);
          setShowProjectHeader(false);
          break;
      }
    }, [menuType, projectId, appId, location.pathname]);

    const HeaderIcon = () => {
      switch (menuType) {
        case "project":
          return <RiBookLine />;
        case "app":
          return <IoRocketOutline />;
        case "mlops":
          return <PiFlask />;
        default:
          return <></>;
          break;
      }
    };

    const backNavigation = () => {
      const { projectId: project_id, appId: app_id } = getPathIds();
      if (app_id) {
        navigate(`/projects/${project_id}`);
      } else if (project_id) {
        navigate("/");
      } else {
        navigate(-1);
      }
    };
    // const backNavigation = () => {
    //   if (appId) {
    //     navigate(`/projects/${projectId}`);
    //   } else if (projectId) {
    //     navigate("/");
    //   } else {
    //     navigate(-1);
    //   }
    // };
    // useEffect(() => {
    // }, [appId, projectId]);

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
                  <HeaderIcon />
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
                label: {
                  fontSize: "0.8rem",
                },
              }}
              className="navlink"
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
  },
);

export default LeftMenu;
