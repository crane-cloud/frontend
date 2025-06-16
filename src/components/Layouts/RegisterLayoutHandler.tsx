import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { registerHooks } from "../../hooks/handlers/useRegisterHandler";
import { TGeneralHookParams } from "../../types/common";
import { beautify, returnObject } from "../../utils/helpers";
import useGet from "@/utils/useGet";
import { sourceApis } from "../../hooks/handlers/useApiHandler";
import { IoAdd } from "react-icons/io5";
import { Table } from "../Elements/CustomTable";
import { Button, Stack } from "@mantine/core";
import TitleText from "../TitleText";
import { SimpleDetailsCard } from "../Cards/DetailsCard";
// import DetailsCard from "../common/DetailsCards";
// import { TableFilter } from "../common/TableFilter";
// interface TExportData {
//   api: string;
//   fileName: string;
// }
const RegisterLayoutHandler = (props: any) => {
  const {
    source_id,
    register_status,
    api,
    rootData,
    title,
    register_params,

    // showTotals,
  } = props;
  let { source_id: source, status } = useParams<keyof TGeneralHookParams>();
  if (source_id) {
    source = source_id;
  }
  if (register_status) {
    status = register_status;
  }

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newParams = Object.fromEntries(searchParams.entries());
    setFilter((prevFilters: any) => ({ ...prevFilters, ...newParams }));
  }, [searchParams, source]);

  const navigate = useNavigate();

  // destucture register hooks using source id
  const {
    tableData,
    tableColumns,
    tableTitle,
    formRoute,
    createTitle,
    metaData,
    tableTotals,
    // externalFilters,
    initialFilters,
    isExternalRoute,
    showTitle,
  } =
    source && registerHooks[source]
      ? registerHooks[source]({ status, ...register_params })
      : [];
  // Convert searchParams to an object and add it to the initial filters
  const searchFilters = Object.fromEntries(searchParams.entries()) || {};
  const [filters, setFilter] = useState({
    ...searchFilters,
    ...initialFilters,
    status,
  });

  // load hooks data
  const { getData: getRegisterData, data: registerData, loading } = useGet();

  function getData(filters: any) {
    const apiToUse = api || (source && sourceApis[source]);
    if (apiToUse) {
      getRegisterData({
        api: apiToUse,
        params: filters,
        ...returnObject(isExternalRoute === true, {
          isExternal: true,
        }),
      });
    }
  }

  // get register data from api
  useEffect(() => {
    const searchFilters = Object.fromEntries(searchParams.entries()) || {};
    if (!status && filters.status) {
      status = filters.status;
    }
    getData({ ...filters, ...searchFilters, status });
  }, [status, filters, source]);

  useEffect(() => {
    setFilter({ ...filters, status });
  }, [status]);

  useEffect(() => {
    setFilter({ ...filters, ...initialFilters, status });
  }, []);

  // const onFilterChange = (key: string, value: string | number) => {
  //   const updatedFilters = { ...filters, page: 1 };
  //   if (value === "" || value === null || value === undefined) {
  //     delete updatedFilters[key];
  //     setFilter(updatedFilters);
  //   } else {
  //     setFilter({ ...updatedFilters, [key]: value });
  //   }
  // };

  function getTitle() {
    return `${tableTitle || beautify(source)} ${filters?.stringValue || "List"} `;
  }

  let tableDataResults =
    registerData?.data?.[source || ""] || registerData || [];
  const pagination = registerData?.data?.pagination || {};
  if (rootData) {
    tableDataResults = registerData || [];
  }

  return (
    <Stack gap={20}>
      {/* {externalFilters && externalFilters.length > 0 && (
        <div style={{ display: "flex", gap: 30, marginBottom: 30 }}>
          {externalFilters.map((row: any) => (
            <TableFilter
              key={row.id}
              name={row.id}
              onChange={onFilterChange}
              filters={filters}
              updateFilterValues={setFilter}
              selectOptions={row?.options}
              {...row}
              showHeaders
            />
          ))}
        </div>
      )} */}
      {/* {showTotals && totalsData && ( */}
      {showTitle && (
        <TitleText
          rightSection={
            formRoute && (
              <Button
                className="capitalize"
                leftSection={<IoAdd fontSize="small" />}
                onClick={() => navigate(formRoute)}
                size="sm"
              >
                {createTitle || `New ${beautify(source)}`}
              </Button>
            )
          }
        >
          {title || getTitle()}
        </TitleText>
      )}

      {metaData && registerData && (
        <SimpleDetailsCard data={metaData(registerData?.data?.meta_data)} />
      )}

      <Table
        title={title || getTitle()}
        loading={loading}
        columns={tableColumns ? tableColumns(tableDataResults) : []}
        data={tableData ? tableData(tableDataResults) : []}
        tableTotals={tableTotals ? tableTotals(registerData) : {}}
        pagination={pagination}
        filters={filters}
        onFilterChange={setFilter}
        striped
        showPagination
      />
    </Stack>
  );
};

export default RegisterLayoutHandler;
