import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, createContext } from "react";

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
});

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();

  const [menuType, setMenuType] = useState<TLeftMenuType>("home");
  const [projectId, setProjectId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [containerSize, setContainerSize] = useState<string>("xl");
  const [subtitle, setSubtitle] = useState<string>("");

  return (
    <MenuContext.Provider
      value={{
        menuType,
        setMenuType,
        projectId,
        setProjectId,
        title,
        setTitle,
        subtitle,
        setSubtitle,
        setContainerSize,
      }}
    >
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <DashboardHeader opened={opened} toggle={toggle} />
        <LeftMenu
          menuType={menuType}
          projectId={projectId}
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
