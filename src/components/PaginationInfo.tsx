import { useState } from "react";
import { Group, Pagination, Text } from "@mantine/core";

export default function PaginationInfo({
  total,
  limit,
}: {
  total: number;
  limit: number;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / limit);
  const message = `Showing ${limit * (page - 1) + 1} – ${Math.min(
    total,
    limit * page,
  )} of ${total}`;

  return (
    <Group gap="sm">
      <Text size="sm">{message}</Text>
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        withControls
        withPages={false}
      />
    </Group>
  );
}
