import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, createContext, useMemo } from "react";
export interface TAdminMenuContextType {
  menuType: TLeftMenuType;
  setMenuType: (type: TLeftMenuType) => void;
  clusterId: string;
  setClusterId: (id: string) => void;
  title?: string;
  setTitle?: (title: string) => void;
  subtitle?: string;
  setSubtitle?: (subtitle: string) => void;
  setContainerSize: (size: string) => void;
}
export const AdminMenuContext = createContext<TAdminMenuContextType>({
  menuType: "home",
  setMenuType: () => {},
  clusterId: "",
  setClusterId: () => {},
  title: "",
  setTitle: () => {},
  subtitle: "",
  setSubtitle: () => {},
  setContainerSize: () => {},
});

export const AdminDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();

  const [menuType, setMenuType] = useState<TLeftMenuType>("home");
  const [clusterId, setClusterId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [containerSize, setContainerSize] = useState<string>("lg");
  const [subtitle, setSubtitle] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      menuType,
      setMenuType,
      clusterId,
      setClusterId,
      title,
      setTitle,
      subtitle,
      setSubtitle,
      setContainerSize,
    }),
    [menuType, clusterId, title, subtitle, containerSize],
  );
  return (
    <AdminMenuContext.Provider value={contextValue}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: {
            mobile: !opened,
            desktop: menuType === "noSidebar",
          },
        }}
        padding="md"
      >
        <DashboardHeader opened={opened} toggle={toggle} />

        <LeftMenu
          menuType={menuType}
          clusterId={clusterId}
          title={title}
          subtitle={subtitle}
        />
        <AppShell.Main>
          <Container size={1400} w="100%">
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </AdminMenuContext.Provider>
  );
};
