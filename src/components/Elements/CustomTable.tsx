import {
  Table as MantineTable,
  Text,
  Skeleton,
  Card,
  Stack,
} from "@mantine/core";
import styled from "styled-components";

export interface Column {
  id: string;
  header: string;
  noWrap?: boolean;
  filter?: {
    key?: string;
    options?: any[];
    // Add other filter props as needed
  };
}

interface TableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  hideFilters?: boolean;
  startValue?: number;
  tableTotals?: Record<string, any>;
  tableFooter?: Record<string, any>;
  noEmptyText?: boolean;
  onFilterChange?: (values: any) => void;
  filters?: any;
  verticalSpacing?: string;
  striped?: boolean | "odd" | "even";
  noHeader?: boolean;
  header?: () => React.ReactNode;
  props?: any;
  showIndex?: boolean;
  rowHover?: boolean;
  rowClick?: (item: any) => void;
}

export const Table = ({
  columns,
  data,
  loading = false,
  startValue = 1,
  tableTotals,
  tableFooter,
  noEmptyText = false,
  verticalSpacing = "xs",
  striped = true,
  noHeader = false,
  header,
  props,
  showIndex = true,
  rowHover = false,
  rowClick,
}: TableProps) => {
  return (
    <Card withBorder p="md" radius="md">
      <Stack gap={10}>
        {header && header()}
        <MantineTable.ScrollContainer minWidth="100%">
          <MantineTable
            striped={striped}
            verticalSpacing={verticalSpacing}
            {...props}
          >
            {!noHeader && (
              <MantineTable.Thead>
                <MantineTable.Tr>
                  {showIndex && <MantineTable.Th>#</MantineTable.Th>}
                  {columns?.map((column, columnIndex) => (
                    <MantineTable.Th
                      key={column.id}
                      className={column.noWrap ? "no-wrap" : ""}
                      style={{
                        textAlign:
                          columnIndex === columns.length - 1 ? "right" : "left",
                      }}
                    >
                      <Text className="capitalize" size="md" fw={500}>
                        {column.header}
                      </Text>
                    </MantineTable.Th>
                  ))}
                </MantineTable.Tr>
              </MantineTable.Thead>
            )}

            <MantineTable.Tbody>
              {loading ? (
                <MantineTable.Tr>
                  <MantineTable.Td colSpan={columns.length + 1}>
                    <Skeleton height={50} animate />
                  </MantineTable.Td>
                </MantineTable.Tr>
              ) : data?.length ? (
                data.map((item, idx) => (
                  <StyledTableRow
                    key={item.id || idx}
                    onClick={() => rowClick && rowClick(item)}
                    $hover={rowHover}
                    $clickable={!!rowClick}
                  >
                    {showIndex && (
                      <MantineTable.Td>
                        {item?.index || startValue + idx}
                      </MantineTable.Td>
                    )}
                    {columns.map((column, columnIndex) => (
                      <MantineTable.Td
                        key={column.id}
                        className={column.noWrap ? "no-wrap" : ""}
                        style={{
                          textAlign:
                            columnIndex === columns.length - 1
                              ? "right"
                              : "left",
                        }}
                      >
                        {item[column.id] ||
                          (noEmptyText && <Text c="dimmed">Empty</Text>)}
                      </MantineTable.Td>
                    ))}
                  </StyledTableRow>
                ))
              ) : (
                <MantineTable.Tr>
                  <MantineTable.Td colSpan={columns.length + 1} ta="center">
                    No data available
                  </MantineTable.Td>
                </MantineTable.Tr>
              )}
            </MantineTable.Tbody>

            {tableTotals && Object.keys(tableTotals).length > 0 && (
              <MantineTable.Tfoot>
                <MantineTable.Tr>
                  <MantineTable.Th>Totals</MantineTable.Th>
                  {columns.map((column, columnIndex) => (
                    <MantineTable.Th
                      key={column.id}
                      style={{
                        textAlign:
                          columnIndex === columns.length - 1 ? "right" : "left",
                      }}
                    >
                      <Text fw={700}>{tableTotals[column.id]}</Text>
                    </MantineTable.Th>
                  ))}
                </MantineTable.Tr>
              </MantineTable.Tfoot>
            )}

            {tableFooter && (
              <MantineTable.Tfoot>
                <MantineTable.Tr>
                  <MantineTable.Th>#</MantineTable.Th>
                  {columns.map((column, columnIndex) => (
                    <MantineTable.Th
                      key={column.id}
                      style={{
                        textAlign:
                          columnIndex === columns.length - 1 ? "right" : "left",
                      }}
                    >
                      {tableFooter[column.id]}
                    </MantineTable.Th>
                  ))}
                </MantineTable.Tr>
              </MantineTable.Tfoot>
            )}
          </MantineTable>
        </MantineTable.ScrollContainer>
      </Stack>
    </Card>
  );
};

const StyledTableRow = styled(MantineTable.Tr)<{
  $hover: boolean;
  $clickable: boolean;
}>`
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:hover {
    ${(props) =>
      props.$hover &&
      `
      background-color: light-dark(var(--mantine-color-gray-2), var(--mantine-color-gray-7));
    `}
  }
`;
