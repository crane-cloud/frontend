import React from "react";
import SummaryComponent from "@/components/Admin/SummaryComponent";
import AdminClustersList from "@/components/Admin/AdminClustersList";
import { Stack } from "@mantine/core";

const DashboardPage = () => {
  return (
    <Stack gap="xl">
      <SummaryComponent />
      <AdminClustersList />
    </Stack>
  );
};

export default DashboardPage;
