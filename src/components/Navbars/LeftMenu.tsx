import {
  AppShell,
  NavLink,
  Text,
  Group,
  UnstyledButton,
  rem,
  ScrollArea,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import {
  HiOutlineSquares2X2,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
  HiOutlineCircleStack,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineCube,
  HiOutlineArchiveBox,
  HiOutlineServerStack,
  HiOutlineServer,
  HiOutlineDocumentDuplicate,
  HiOutlineCloud,
  HiOutlineGlobeAlt,
  HiOutlineArrowPath,
  HiOutlineUserMinus,
  HiOutlineFolder,
} from "react-icons/hi2";
import { GiNetworkBars } from "react-icons/gi";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoMoonOutline,
  IoReturnUpBack,
  IoSunnyOutline,
} from "react-icons/io5";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LuLogs } from "react-icons/lu";
import { PiFlask } from "react-icons/pi";
import { SelectProject } from "../Elements/Elements";
import { HiOutlineDatabase } from "react-icons/hi";
import { FiLayers } from "react-icons/fi";

export type TLeftMenuType =
  | "home"
  | "project"
  | "admin"
  | "app"
  | "mlops"
  | "cluster"
  | "admin"
  | "noSidebar";

interface ILeftMenuProps {
  menuType: TLeftMenuType;
  projectId?: string;
  title?: string;
  subtitle?: string;
  appId?: string;
  project?: any;
  clusterId?: string;
}
interface INavLink {
  label: string;
  icon: React.ComponentType;
  key: string;
  link?: string;
  description?: string;
  children?: INavLink[];
}

const LeftMenu = React.memo(
  ({ menuType, projectId, appId, title, clusterId }: ILeftMenuProps) => {
    const location = useLocation();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

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
      const clusterMatch = matchPath(
        {
          path: "/clusters/:cluster_id",
          end: false,
        },
        location.pathname,
      );
      return {
        projectId: pathMatch?.params?.project_id || projectId,
        appId: pathMatch?.params?.app_id || appId,
        clusterId: clusterMatch?.params?.cluster_id || clusterId,
      };
    };

    const homeNavbarLinks = useMemo(
      () => [
        { label: "Home", icon: HiOutlineSquares2X2, key: "home", link: "/" },
        {
          label: "Clusters",
          icon: HiOutlineServer,
          key: "clusters",
          link: "/admin/clusters",
        },
        {
          label: "Users",
          icon: HiOutlineUsers,
          key: "users",
          children: [
            {
              label: "User List",
              icon: HiOutlineUsers,
              key: "user_list",
              link: `/admin/users/list`,
            },
            {
              label: "Inactive Users",
              icon: HiOutlineUserMinus,
              key: "inactive_users",
              link: `/admin/inactive_users/list`,
            },
          ],
        },
        {
          label: "Projects",
          icon: HiOutlineFolder,
          key: "projects",
          link: "/admin/projects/list",
        },
        {
          label: "Applications",
          icon: FiLayers,
          key: "applications",
          link: "/admin/apps/list",
        },
        {
          label: "Databases",
          icon: HiOutlineDatabase,
          key: "databases",
          link: "/admin/databases/list",
        },
      ],
      [],
    );

    const getClusterNavbarLinks = useCallback(
      (cluster_id: string) => [
        {
          label: "Back",
          icon: IoReturnUpBack,
          key: "back",
          link: `/admin/clusters`,
        },
        {
          label: "Dashboard",
          icon: HiOutlineSquares2X2,
          key: "home",
          link: `/admin/clusters/${cluster_id}`,
        },
        {
          label: "Projects",
          icon: HiOutlineCube,
          key: "projects",
          link: `/admin/clusters/${cluster_id}/projects/list`,
        },
        {
          label: "Activity Logs",
          icon: HiOutlineDocumentText,
          key: "activity_logs",
          link: `/admin/clusters/${cluster_id}/activity_logs/list`,
        },
        {
          label: "Infrastructure",
          icon: HiOutlineServerStack,
          key: "infrastructure",
          children: [
            {
              label: "Nodes",
              icon: HiOutlineServer,
              key: "nodes",
              link: `/admin/clusters/${cluster_id}/nodes/list`,
            },
            {
              label: "Namespaces",
              icon: HiOutlineArchiveBox,
              key: "namespaces",
              link: `/admin/clusters/${cluster_id}/namespaces/list`,
            },
            {
              label: "Deployments",
              icon: HiOutlineArrowPath,
              key: "deployments",
              link: `/admin/clusters/${cluster_id}/deployments/list`,
            },
            {
              label: "Jobs",
              icon: HiOutlineDocumentDuplicate,
              key: "jobs",
              link: `/admin/clusters/${cluster_id}/jobs/list`,
            },
            {
              label: "Pods",
              icon: HiOutlineCircleStack,
              key: "pods",
              link: `/admin/clusters/${cluster_id}/pods/list`,
            },
          ],
        },
        {
          label: "Network",
          icon: HiOutlineGlobeAlt,
          key: "network",
          children: [
            {
              label: "Services",
              icon: HiOutlineGlobeAlt,
              key: "services",
              link: `/admin/clusters/${cluster_id}/services/list`,
            },
            {
              label: "Ingresses",
              icon: GiNetworkBars,
              key: "ingresses",
              link: `/admin/clusters/${cluster_id}/ingresses/list`,
            },
          ],
        },
        {
          label: "Storage",
          icon: HiOutlineDatabase,
          key: "storage",
          children: [
            {
              label: "Volumes",
              icon: HiOutlineDatabase,
              key: "volumes",
              link: `/admin/clusters/${cluster_id}/volumes/list`,
            },
            {
              label: "Volume Claims",
              icon: HiOutlineDocumentDuplicate,
              key: "volume_claims",
              link: `/admin/clusters/${cluster_id}/volume_claims/list`,
            },
            {
              label: "Storage Classes",
              icon: HiOutlineCloud,
              key: "storage_classes",
              link: `/admin/clusters/${cluster_id}/storage_classes/list`,
            },
          ],
        },
        {
          label: "Settings",
          icon: HiOutlineCog6Tooth,
          key: "settings",
          link: `/admin/clusters/${cluster_id}/settings`,
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
          icon: FiLayers,
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
          label: "Build Logs",
          icon: HiOutlineArrowPath,
          key: "build_logs",
          link: `/projects/${project_id}/apps/${app_id}/build_logs`,
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
      const {
        projectId: project_id,
        appId: app_id,
        clusterId: cluster_id,
      } = getPathIds();

      // Clear links first to prevent stale state
      setNavbarLinks([]);

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
        case "cluster":
          if (cluster_id) {
            const clusterLinks = getClusterNavbarLinks(cluster_id);
            setNavbarLinks(clusterLinks as INavLink[]);
            setShowProjectHeader(false);
          }
          break;
        default:
          setNavbarLinks(homeNavbarLinks);
          setShowProjectHeader(false);
          break;
      }
    }, [menuType, projectId, appId, clusterId, location.pathname]);

    // const HeaderIcon = () => {
    //   switch (menuType) {
    //     case "project":
    //       return <RiBookLine />;
    //     case "app":
    //       return <IoRocketOutline />;
    //     case "mlops":
    //       return <PiFlask />;
    //     default:
    //       return <></>;
    //       break;
    //   }
    // };

    // const backNavigation = () => {
    //   const { projectId: project_id, appId: app_id } = getPathIds();
    //   if (app_id) {
    //     navigate(`/projects/${project_id}`);
    //   } else if (project_id) {
    //     navigate("/");
    //   } else {
    //     navigate(-1);
    //   }
    // };
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
    useEffect(() => {}, [navbarLinks]);
    return (
      <AppShell.Navbar
        p="5px"
        style={{ display: menuType === "noSidebar" ? "none" : "flex" }}
        w={280}
      >
        <AppShell.Section grow component={ScrollArea}>
          {showProjectHeader && (
            <Stack pb={20} gap={30}>
              <SelectProject project_id={projectId} />
              {["app", "mlops"].includes(menuType) && (
                <Stack gap={5} ml={10}>
                  <Text fz="xs" fw={500} opacity={0.5}>
                    App Name
                  </Text>
                  <Group justify="space-between" align="center">
                    <UnstyledButton
                      onClick={() => navigate(`/projects/${projectId}`)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        justifyContent: "start",
                      }}
                    >
                      <IoArrowBack />
                      <Text fz="sm" fw={700}>
                        {title}
                      </Text>
                    </UnstyledButton>
                  </Group>
                </Stack>
              )}
            </Stack>
          )}
          {navbarLinks.map((link: INavLink) => (
            <React.Fragment key={link.key}>
              {link.children ? (
                <Stack gap={5} my={2} mx={10} mt={20}>
                  <Text key={link.key} className="subtitle" c="dimmed">
                    {link.label}
                  </Text>
                </Stack>
              ) : (
                link.link && (
                  <NavLink
                    component={Link}
                    key={link.key}
                    label={link.label}
                    leftSection={<link.icon />}
                    active={
                      link.link
                        ? !!matchPath({ path: link.link }, location.pathname)
                        : false
                    }
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
                )
              )}
              {link.children && (
                <Stack gap={5}>
                  {link.children.map((child) =>
                    child.link ? (
                      <NavLink
                        component={Link}
                        key={child.key}
                        label={child.label}
                        leftSection={<child.icon />}
                        active={
                          !!matchPath({ path: child.link }, location.pathname)
                        }
                        to={child.link}
                        styles={{
                          root: {
                            borderRadius: "0.4rem",
                            paddingLeft: "1.5rem",
                          },
                          label: {
                            fontSize: "0.8rem",
                          },
                        }}
                        className="navlink"
                      />
                    ) : null,
                  )}
                </Stack>
              )}
            </React.Fragment>
          ))}
        </AppShell.Section>

        <AppShell.Section>
          <UnstyledButton
            style={{
              padding: rem(8),
              borderRadius: rem(4),
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            }}
            onClick={() =>
              setColorScheme(colorScheme === "dark" ? "light" : "dark")
            }
          >
            <Group gap={8}>
              {colorScheme === "dark" ? (
                <IoSunnyOutline size={16} color="gray" />
              ) : (
                <IoMoonOutline size={16} color="gray" />
              )}
              <Text size="sm" c="dimmed">
                Theme
              </Text>
            </Group>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>
    );
  },
);

export default LeftMenu;
