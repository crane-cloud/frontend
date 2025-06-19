import { NumberInput, Select, TextInput } from "@mantine/core";
import styled from "styled-components";
import { TColumn } from "./CustomTable";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

interface TTableFilterProps {
  column: TColumn;
  value: any;
  onChange: (
    key: string,
    value: string | number | { start: string; end: string } | null,
  ) => void;
}

const FilterInput = styled.div`
  margin-top: 4px;
`;

const TableFilter = ({ column, value, onChange }: TTableFilterProps) => {
  if (!column.filter) {
    return null;
  }

  const filterKey = column.filter.key || column.id;

  switch (column.filter.type) {
    case "select":
      return (
        <FilterInput>
          <Select
            placeholder={column.filter.placeholder || "Select"}
            data={
              column.filter.options?.map((opt) => ({
                value: opt.value,
                label: opt.label,
              })) || []
            }
            value={value}
            onChange={(v) => onChange(filterKey, v || "")}
            clearable
            size="xs"
            style={{ width: "100%" }}
            fw={500}
          />
        </FilterInput>
      );
    case "number":
      return (
        <FilterInput>
          <NumberInput
            placeholder={column.filter.placeholder || "Enter Number"}
            value={value}
            onChange={(v) => onChange(filterKey, v || "")}
            hideControls
            size="xs"
            style={{ width: "100%" }}
            fw={500}
          />
        </FilterInput>
      );
    case "date":
      return (
        <FilterInput>
          <DatePickerInput
            placeholder={column.filter.placeholder || "Select Date"}
            value={value ? new Date(value) : null}
            onChange={(date) =>
              onChange(filterKey, date ? date.toISOString() : "")
            }
            size="xs"
            style={{ width: "100%", whiteSpace: "nowrap" }}
            clearable
            fw={500}
          />
        </FilterInput>
      );
    case "date_range": {
      const [dateValue, setDateValue] = useState<[any, any]>([null, null]);

      useEffect(() => {
        if (dateValue[0] && dateValue[1]) {
          onChange("start", dateValue[0] || "");
          onChange("end", dateValue[1] || "");
        }
      }, [dateValue]);

      return (
        <FilterInput>
          <DatePickerInput
            placeholder={column.filter.placeholder || "Select Dates"}
            type="range"
            value={
              value ? [new Date(value.start), new Date(value.end)] : undefined
            }
            onChange={setDateValue}
            size="xs"
            style={{ width: "100%", whiteSpace: "nowrap" }}
            clearable
            fw={500}
            numberOfColumns={2}
          />
        </FilterInput>
      );
    }

    default:
      return (
        <FilterInput>
          <TextInput
            placeholder={column.filter.placeholder}
            value={value}
            onChange={(e) => onChange(filterKey, e.target.value)}
            size="xs"
            style={{ width: "100%" }}
            fw={500}
          />
        </FilterInput>
      );
  }
};

export default TableFilter;
