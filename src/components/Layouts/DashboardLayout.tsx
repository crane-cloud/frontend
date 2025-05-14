import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, createContext, useMemo } from "react";

export const MenuContext = createContext<{
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
}>({
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
        header={{ height: 60 }}
        navbar={{
          width: menuType === "noSidebar" ? 0 : 250,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        py="md"
        className="container"
      >
        <DashboardHeader opened={opened} toggle={toggle} />
        <LeftMenu
          menuType={menuType}
          projectId={projectId}
          project={project}
          appId={appId}
          title={title}
          subtitle={subtitle}
        />
        <AppShell.Main>
          <Container size={containerSize}>{children}</Container>
        </AppShell.Main>
      </AppShell>
    </MenuContext.Provider>
  );
};
