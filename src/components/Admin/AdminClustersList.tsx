import useGet from "@/utils/useGet";
import React, { useEffect } from "react";
import TitleText from "../TitleText";
import {
  Button,
  Group,
  Stack,
  SimpleGrid,
  Card,
  Text,
  Badge,
  Skeleton,
  Container,
  ThemeIcon,
} from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineServer } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { beautify } from "@/utils/helpers";

const ClusterCard = ({ cluster }: { cluster: any }) => {
  const isDisabled = cluster.disabled;
  const isML = cluster.supports_ml;
  const navigate = useNavigate();

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      h="100%"
      onClick={() => navigate(`/admin/clusters/${cluster?.id}`)}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        opacity: isDisabled ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Group justify="space-between" align="flex-start" mb="sm" wrap="nowrap">
        <ThemeIcon
          size={42}
          radius="md"
          variant={isDisabled ? "default" : "light"}
          color={isDisabled ? "gray" : "blue"}
        >
          <HiOutlineServer size={22} />
        </ThemeIcon>

        <Group gap={6} wrap="wrap" justify="flex-end">
          {isML && (
            <Badge color="blue" variant="light" size="sm" radius="sm">
              Supports ML
            </Badge>
          )}
          {isDisabled && (
            <Badge color="red" variant="dot" size="sm" radius="sm">
              Disabled
            </Badge>
          )}
        </Group>
      </Group>

      <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
        <Text fw={600} size="lg" lineClamp={2} mb="xs">
          {cluster.name}
        </Text>

        <Text size="sm" c="dimmed" lineClamp={2} mt="auto">
          {beautify(cluster.description) || "No description provided."}
        </Text>
      </Stack>
    </Card>
  );
};

const AdminClustersList = () => {
  const { getData: getClusters, data: clusters, loading } = useGet();
  const navigate = useNavigate();
  useEffect(() => {
    getClusters({ api: `/clusters` });
  }, []);

  if (loading) {
    return (
      <Container size="1070" mt="sm">
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="md">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={100} radius="md" />
          ))}
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <Container size="1070" mt="sm">
      <Stack gap={0}>
        <TitleText
          rightSection={
            <Button
              leftSection={<FaPlus />}
              variant="filled"
              onClick={() => navigate("/admin/clusters/create")}
            >
              Add Cluster
            </Button>
          }
        >
          Clusters
        </TitleText>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="md">
          {clusters?.data?.clusters?.map((cluster: any) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default AdminClustersList;
