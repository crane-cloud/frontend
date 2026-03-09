import { Group, Text, Pagination } from "@mantine/core";

interface PaginationInfoProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export default function PaginationInfo({
  total,
  limit,
  page,
  setPage,
}: PaginationInfoProps) {
  if (!total || total === 0) {
    return null;
  }

  const totalPages = Math.ceil(total / limit);
  const message = `Showing ${limit * (page - 1) + 1} – ${Math.min(
    total,
    limit * page,
  )} of ${total}`;

  return (
    <Group gap="sm" align="center">
      <Text size="sm" c="dimmed" fw={500}>
        {message}
      </Text>
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        withControls
        withPages={false}
        color="blue"
        radius="md"
      />
    </Group>
  );
}
