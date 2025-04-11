import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
// import {
//   IconBook,
//   IconChartPie3,
//   IconChevronDown,
//   IconCode,
//   IconCoin,
//   IconFingerprint,
//   IconNotification,
// } from "@tabler/icons-react";

import { FiBookOpen, FiChevronDown, FiSearch } from "react-icons/fi";
import { Logo, UserDropDown } from "./Common";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const DashboardHeader = ({ opened, toggle }: HeaderProps) => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" py={10} justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Logo />
        </Group>
        <Group>
          <TextInput
            placeholder="Search"
            radius="xl"
            leftSection={<FiSearch />}
            miw={{ base: "auto", sm: 300 }}
            display={{ base: "none", sm: "block" }}
          />
          <UserDropDown />
        </Group>
      </Group>
    </AppShell.Header>
  );
};

const mockdata = [
  {
    // icon: IconCode,
    icon: FiBookOpen,
    title: "Open source",
    description: "This Pokémon's cry is very loud and distracting",
  },
  {
    // icon: IconCoin,
    icon: FiBookOpen,
    title: "Free for everyone",
    description: "The fluid of Smeargle's tail secretions changes",
  },
  {
    // icon: IconBook,
    icon: FiBookOpen,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    // icon: IconFingerprint,
    icon: FiBookOpen,
    title: "Security",
    description: "The shell's rounded shape and the grooves on its.",
  },
  {
    // icon: IconChartPie3,
    icon: FiBookOpen,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    // icon: IconNotification,
    icon: FiBookOpen,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HomeHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const links = mockdata.map((item: any) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Logo />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link to="/" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    {/* <IconChevronDown size={16} color={theme.colors.blue[6]} /> */}
                    <FiChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link to="/" className={classes.link}>
              Learn
            </Link>
            <Link to="/" className={classes.link}>
              Academy
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        padding="md"
        title="Options"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Anchor href="#" className={classes.link} my="sm">
            Home
          </Anchor>
          <UnstyledButton
            className={classes.link}
            onClick={toggleLinks}
            my="sm"
          >
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <FiChevronDown size={16} />
              {/* <IconChevronDown size={16} color={theme.colors.blue[6]} /> */}
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Anchor href="#" className={classes.link} my="sm">
            Learn
          </Anchor>
          <Anchor href="#" className={classes.link} my="sm">
            Academy
          </Anchor>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

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
