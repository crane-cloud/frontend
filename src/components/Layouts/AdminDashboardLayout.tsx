import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Box, Container, Flex } from "@mantine/core";
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
          width: menuType === "noSidebar" ? 0 : 250,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        py="md"
        className="container"
      >
        <DashboardHeader opened={opened} toggle={toggle} />

        <Container size="xl" pt="md">
          <Flex gap="lg" align="flex-start" wrap="nowrap">
            <Box
              w={280}
              style={{
                flexShrink: 0,
                display: menuType === "noSidebar" ? "none" : "block",
              }}
            >
              <LeftMenu
                menuType={menuType}
                clusterId={clusterId}
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
    </AdminMenuContext.Provider>
  );
};
