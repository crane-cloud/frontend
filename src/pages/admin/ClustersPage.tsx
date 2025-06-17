import React from "react";
import { Stack } from "@mantine/core";
import AdminClustersList from "@/components/Admin/AdminClustersList";
import { useSetAdminHomeSidebar } from "@/utils/helpers";

const ClustersPage = () => {
  useSetAdminHomeSidebar();
  return (
    <Stack>
      <AdminClustersList />
    </Stack>
  );
};

export default ClustersPage;
