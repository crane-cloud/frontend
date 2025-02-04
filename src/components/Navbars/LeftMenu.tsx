import {
  AppShell,
  NavLink,
  Text,
  Group,
  ThemeIcon,
  UnstyledButton,
  rem,
  ScrollArea,
} from "@mantine/core";
import {
  HiOutlineSquares2X2,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
  HiOutlineCircleStack,
} from "react-icons/hi2";
import { Link, matchPath, useLocation } from "react-router-dom";

export type TLeftMenuType = "home" | "project" | "admin";

interface ILeftMenuProps {
  menuType: TLeftMenuType;
  projectId: string;
}
interface INavLink {
  label: string;
  icon: React.ComponentType;
  key: string;
  link: string;
  description?: string;
}

const LeftMenu = ({ menuType, projectId }: ILeftMenuProps) => {
  const location = useLocation();
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
  ];
  const adminNavbarLinks: INavLink[] = [
    {
      label: "Users",
      icon: HiOutlineUsers,
      key: "users",
      link: "/users",
    },
  ];
  let navbarLinks;
  switch (menuType) {
    case "home":
      navbarLinks = homeNavbarLinks;
      break;
    case "project":
      navbarLinks = projectNavbarLinks;
      break;
    default:
      navbarLinks = adminNavbarLinks;
      break;
  }

  console.log(location.pathname);

  return (
    <AppShell.Navbar p="5px">
      <AppShell.Section grow component={ScrollArea}>
        {navbarLinks.map((link: INavLink) => (
          <NavLink
            component={Link}
            key={link.key}
            label={link.label}
            leftSection={<link.icon />}
            // active={location.pathname === link.link}
            active={!!matchPath({ path: link.link }, location.pathname)}
            // description={link?.description}
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
