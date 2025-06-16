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
} from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineServer } from "react-icons/hi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ClusterCard = ({ cluster }: { cluster: any }) => {
  const isDisabled = cluster.disabled;
  const isML = cluster.supports_ml;

  return (
    <StyledCard key={cluster.id} withBorder>
      <Group justify="space-between" align="flex-start">
        <Group gap="xs" align="flex-start">
          <HiOutlineServer size={25} />
          <Stack gap={0} align="flex-start">
            <Text fw={500} size="lg">
              {cluster.name}
            </Text>
            <Text size="sm" c="dimmed">
              {cluster.description}
            </Text>
          </Stack>
        </Group>
        <Group gap="xs">
          {isML && (
            <Badge color="blue" variant="light">
              supports ML
            </Badge>
          )}
          {isDisabled && (
            <Badge color="red" variant="light">
              Disabled
            </Badge>
          )}
        </Group>
      </Group>
    </StyledCard>
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
      <Stack gap={0}>
        <TitleText
          rightSection={
            <Button leftSection={<FaPlus />} variant="filled">
              Add Cluster
            </Button>
          }
        >
          Clusters
        </TitleText>

        <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="md">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height={100} radius="md" />
          ))}
        </SimpleGrid>
      </Stack>
    );
  }

  return (
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
  );
};

const StyledCard = styled(Card)`
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
` as typeof Card;

export default AdminClustersList;
