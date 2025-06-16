import React from "react";
import { Stack } from "@mantine/core";
import AdminClustersList from "@/components/Admin/AdminClustersList";

const ClustersPage = () => {
  return (
    <Stack>
      <AdminClustersList />
    </Stack>
  );
};

export default ClustersPage;
