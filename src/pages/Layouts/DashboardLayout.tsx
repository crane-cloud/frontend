import { DashboardHeader } from "@/components/Header";
import LeftMenu, { TLeftMenuType } from "@/components/Navbars/LeftMenu";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, createContext } from "react";

export const MenuContext = createContext<{
  menuType: TLeftMenuType;
  setMenuType: (type: TLeftMenuType) => void;
}>({
  menuType: "home",
  setMenuType: () => {},
});

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();

  const [menuType, setMenuType] = useState<TLeftMenuType>("home");

  return (
    <MenuContext.Provider value={{ menuType, setMenuType }}>
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
        <LeftMenu menuType={menuType} />
        <AppShell.Main>
          <Container>{children}</Container>
        </AppShell.Main>
      </AppShell>
    </MenuContext.Provider>
  );
};
