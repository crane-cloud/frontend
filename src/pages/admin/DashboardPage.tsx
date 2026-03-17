import React from "react";
import SummaryComponent from "@/components/Admin/SummaryComponent";
import AdminClustersList from "@/components/Admin/AdminClustersList";
import { Container, Stack } from "@mantine/core";

const DashboardPage = () => {
  return (
    <Container size="1070" mt="sm">
      <Stack gap="xl">
        <SummaryComponent />
        <AdminClustersList />
      </Stack>
    </Container>
  );
};

export default DashboardPage;
