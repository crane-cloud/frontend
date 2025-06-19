import { DATABASE_API_URL } from "@/config";
import useGet from "@/utils/useGet";
import {
  Box,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Text,
  Skeleton,
} from "@mantine/core";
import { useEffect, useState } from "react";
// import classes from "./StatsGrid.module.css";
import { GoPerson, GoProject, GoDatabase } from "react-icons/go";
import styled from "styled-components";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import TitleText from "../TitleText";
import { Link } from "react-router-dom";

// Types
interface StatChild {
  name: string;
  value: number;
}

interface StatCategory {
  total_count: number;
  children: StatChild[];
  link?: string;
}

interface StatsData {
  [key: string]: StatCategory;
}

interface SummaryData {
  Users?: {
    total_count: number;
    verified: number;
  };
  Projects?: {
    total_count: number;
    disabled: number;
  };
  Apps?: {
    total_count: number;
    stopped: number;
  };
}

interface DatabaseStats {
  databases?: {
    total_database_count: number;
    dbs_stats_per_flavour?: {
      postgres_db_count: number;
      mysql_db_count: number;
    };
  };
}

// Constants
const ICONS = {
  Users: GoPerson,
  Projects: GoProject,
  Apps: AiOutlineAppstoreAdd,
  Databases: GoDatabase,
} as const;

const COLORS = {
  Users: {
    total: "#47d6ab",
    verified: "#228be6",
    beta: "#fa5252",
  },
  Projects: {
    total: "#47d6ab",
    disabled: "#fa5252",
  },
  Apps: {
    total: "#47d6ab",
  },
  Databases: {
    total: "#47d6ab",
    mysql: "#228be6",
    postgres: "#fa5252",
  },
} as const;

function SummaryComponent() {
  const {
    getData: getSummary,
    data: summaryData,
    loading: summaryLoading,
  } = useGet();
  const {
    getData: getDatabaseStats,
    data: databaseStats,
    loading: databaseLoading,
  } = useGet();
  const [statsData, setStatsData] = useState<StatsData>({});

  useEffect(() => {
    getSummary({ api: `/system_summary` });
    getDatabaseStats({
      api: `${DATABASE_API_URL}/databases/stats`,
      isExternal: true,
    });
  }, []);

  useEffect(() => {
    if (!summaryData?.data && !databaseStats?.data) {
      return;
    }

    const data = summaryData?.data as SummaryData;
    const databaseData = databaseStats?.data as DatabaseStats;

    const newStatsData: StatsData = {
      Users: {
        total_count: data?.Users?.total_count || 0,
        children: [
          { name: "Verified", value: data?.Users?.verified || 0 },
          {
            name: "Unverified",
            value:
              (data?.Users?.total_count || 0) - (data?.Users?.verified || 0),
          },
        ],
        link: "/admin/users/list",
      },
      Projects: {
        total_count: data?.Projects?.total_count || 0,
        children: [
          {
            name: "Active",
            value:
              (data?.Projects?.total_count || 0) -
              (data?.Projects?.disabled || 0),
          },
          {
            name: "Disabled",
            value: data?.Projects?.disabled || 0,
          },
        ],
        link: "/admin/projects/list",
      },
      Apps: {
        total_count: data?.Apps?.total_count || 0,
        children: [
          {
            name: "Running",
            value: (data?.Apps?.total_count || 0) - (data?.Apps?.stopped || 0),
          },
          {
            name: "Stopped",
            value: data?.Apps?.stopped || 0,
          },
        ],
        link: "/admin/apps/list",
      },
      Databases: {
        total_count: databaseData?.databases?.total_database_count || 0,
        children: [
          {
            name: "Postgres",
            value:
              databaseData?.databases?.dbs_stats_per_flavour
                ?.postgres_db_count || 0,
          },
          {
            name: "Mysql",
            value:
              databaseData?.databases?.dbs_stats_per_flavour?.mysql_db_count ||
              0,
          },
        ],
        link: "/admin/databases/list",
      },
    };

    setStatsData(newStatsData);
  }, [summaryData, databaseStats]);

  const renderStatCard = (key: string, value: StatCategory) => {
    const Icon = ICONS[key as keyof typeof ICONS] || GoPerson;
    const statColors = COLORS[key as keyof typeof COLORS];

    const segments = value.children.map((child, index) => {
      const percentage = (child.value / value.total_count) * 100;
      const color =
        Object.values(statColors)[index % Object.values(statColors).length];

      return (
        <Progress.Section value={percentage} color={color} key={child.name}>
          {percentage > 10 && (
            <Progress.Label>{Math.round(percentage)}%</Progress.Label>
          )}
        </Progress.Section>
      );
    });

    const details = value.children.map((child, index) => {
      const color =
        Object.values(statColors)[index % Object.values(statColors).length];

      return (
        <StatDetail key={child.name} color={color}>
          <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
            {child.name}
          </Text>
          <Group justify="space-between" align="flex-end" gap={0}>
            <Text fw={700}>{child.value.toLocaleString()}</Text>
          </Group>
        </StatDetail>
      );
    });

    return (
      <StyledPaper key={key}>
        <Group justify="space-between">
          <Link to={value?.link || ""}>
            <StatLabel>{key}</StatLabel>
          </Link>
          <Icon size={22} color="dimmed" />
        </Group>

        <Group align="flex-end" gap="xs">
          <Link to={value?.link || ""}>
            <StatValue>{value.total_count.toLocaleString()}</StatValue>
          </Link>
        </Group>

        <StyledProgress size={34} mt={15}>
          {segments}
        </StyledProgress>

        <SimpleGrid cols={{ base: 1, xs: 2 }} mt={15}>
          {details}
        </SimpleGrid>
      </StyledPaper>
    );
  };

  if (summaryLoading || databaseLoading) {
    return (
      <div>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={200} radius="md" />
          ))}
        </SimpleGrid>
      </div>
    );
  }

  return (
    <div>
      <TitleText>Summary</TitleText>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {Object.entries(statsData).map(([key, value]) =>
          renderStatCard(key, value),
        )}
      </SimpleGrid>
    </div>
  );
}

export default SummaryComponent;

// Styled Components
const StyledProgress = styled(Progress.Root)`
  font-family: Outfit, var(--mantine-font-family);
  line-height: 1;
  font-size: var(--mantine-font-size-sm);
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--mantine-color-gray-3);
` as typeof Paper;

const StatValue = styled(Text)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--mantine-color-primary);
`;

const StatLabel = styled(Text)`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--mantine-color-dimmed);
  font-weight: 700;
`;

const StatDetail = styled(Box)<{ color: string }>`
  border-bottom: 3px solid ${(props) => props.color};
  padding-bottom: 5px;
` as typeof Box;
