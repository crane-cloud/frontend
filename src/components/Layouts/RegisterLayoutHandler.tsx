import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  registerHooks,
  sourceApis,
} from "../../hooks/handlers/useRegisterHandler";
import { TGeneralHookParams } from "../../types/common";
import { beautify, returnObject } from "../../utils/helpers";
import useGet from "@/utils/useGet";
import { IoAdd } from "react-icons/io5";
import { Table } from "../Elements/CustomTable";
import { Button, Stack } from "@mantine/core";
import TitleText from "../TitleText";
import { SimpleDetailsCard } from "../Cards/DetailsCard";
import { BarMetricChart } from "../Elements/Charts";
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
  const params = useParams<keyof TGeneralHookParams>();
  let { source_id: source, status } = params;
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
    rowActions,
    // externalFilters,
    initialFilters,
    isExternalRoute,
    showTitle,
    apiRoute,
    dataParent,
    graphTitle,
    graphApi,
  } =
    source && registerHooks[source]
      ? registerHooks[source]({ ...register_params, ...params, status })
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
  const {
    getData: getGraphData,
    data: graphData,
    loading: fetchingGraphData,
  } = useGet();
  const [graphDataResults, setGraphDataResults] = useState([]);

  function getData(filters: any) {
    const apiToUse = api || apiRoute || (source && sourceApis[source]);
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

  function getSeriesData(filters: any) {
    if (graphApi) {
      getGraphData({
        api: graphApi,
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
    getSeriesData({ ...filters, ...searchFilters, status });
  }, [status, filters, source]);

  useEffect(() => {
    setFilter({ ...filters, status });
  }, [status]);

  useEffect(() => {
    setFilter({ ...filters, ...initialFilters, status });
  }, []);

  useEffect(() => {
    setGraphDataResults(
      graphData?.data?.[dataParent || source] ||
        graphData?.data?.graph_data ||
        [],
    );
  }, [graphData]);

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
    if (tableTitle) {
      return tableTitle;
    }
    return `${tableTitle || beautify(source)} ${filters?.stringValue || "List"} `;
  }

  let tableDataResults =
    registerData?.data?.[dataParent || source || ""] || registerData || [];

  const pagination = registerData?.data?.pagination || {};
  if (rootData) {
    tableDataResults = registerData || [];
  }

  return (
    <>
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
          <SimpleDetailsCard
            data={metaData(
              registerData?.data?.meta_data || registerData?.data?.metadata,
            )}
          />
        )}

        {graphData && (
          <BarMetricChart
            title={graphTitle || getTitle()}
            data={graphDataResults}
            showAllXValues
            filters={filters}
            setFilters={(data) => {
              setFilter({ ...filters, ...data });
            }}
            height={250}
            valueFormatter={(value) => `${value}`}
            isLoading={fetchingGraphData}
          />
        )}
        <Table
          title={title || getTitle()}
          loading={loading}
          columns={tableColumns ? tableColumns(tableDataResults) : []}
          data={tableData ? tableData(tableDataResults) : []}
          tableTotals={tableTotals ? tableTotals(registerData) : {}}
          pagination={pagination}
          filters={filters}
          onFilterChange={(data) => {
            setFilter({ filters, ...data });
          }}
          striped
          showPagination
          rowActions={rowActions}
          hideActions={false}
        />
      </Stack>
    </>
  );
};

export default RegisterLayoutHandler;
