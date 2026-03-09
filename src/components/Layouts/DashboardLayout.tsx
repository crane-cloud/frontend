import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Box, Container, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, createContext, useMemo } from "react";

export interface TMenuContextType {
  menuType: TLeftMenuType;
  setMenuType: (type: TLeftMenuType) => void;
  projectId: string;
  setProjectId: (id: string) => void;
  title?: string;
  setTitle?: (title: string) => void;
  subtitle?: string;
  setSubtitle?: (subtitle: string) => void;
  setContainerSize: (size: string) => void;
  appId?: string;
  setAppId?: (id: string) => void;
  project?: any;
  setProject?: (project: any) => void;
}

export const MenuContext = createContext<TMenuContextType>({
  menuType: "home",
  setMenuType: () => {},
  projectId: "",
  setProjectId: () => {},
  title: "",
  setTitle: () => {},
  subtitle: "",
  setSubtitle: () => {},
  setContainerSize: () => {},
  appId: "",
  setAppId: () => {},
  project: {},
  setProject: () => {},
});

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();

  const [menuType, setMenuType] = useState<TLeftMenuType>("home");
  const [projectId, setProjectId] = useState<string>("");
  const [project, setProject] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [containerSize, setContainerSize] = useState<string>("lg");
  const [subtitle, setSubtitle] = useState<string>("");
  const [appId, setAppId] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      menuType,
      setMenuType,
      projectId,
      setProjectId,
      title,
      setTitle,
      subtitle,
      setSubtitle,
      setContainerSize,
      appId,
      setAppId,
      project,
      setProject,
    }),
    [menuType, projectId, appId, title, subtitle, containerSize, project],
  );
  return (
    <MenuContext.Provider value={contextValue}>
      <AppShell
        navbar={{
          width: menuType === "noSidebar" ? 0 : 250,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        py="md"
        className="container"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--mantine-color-body)",
          backgroundImage: `
    radial-gradient(circle, light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.1)) 1px, transparent 1px),
    radial-gradient(circle, light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.1)) 1px, transparent 1px)
  `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      >
        <DashboardHeader opened={opened} toggle={toggle} />

        <Container size="xl" pt="md">
          <Flex gap="lg" align="flex-start" wrap="nowrap">
            <Box
              w={280}
              style={{
                flexShrink: 0,
                display: menuType === "noSidebar" ? "none" : "block",
                position: "sticky",
                top: 85,
                height: "calc(100vh - 100px)",
              }}
            >
              <LeftMenu
                menuType={menuType}
                projectId={projectId}
                project={project}
                appId={appId}
                title={title}
                subtitle={subtitle}
              />
            </Box>

            <Box
              component="main"
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
              }}
            >
              {children}
            </Box>
          </Flex>
        </Container>
      </AppShell>
    </MenuContext.Provider>
  );
};
