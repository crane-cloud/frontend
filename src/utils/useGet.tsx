import { useState } from "react";
import useAxios from "./useAxios";
import { TError } from "@/types/common";

export type TLoadDataParams = {
  id?: string | number;
  api: string;
  params?: any;
  isExternal?: boolean;
  method?: string;
};

const useGet = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<TError>({});
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>();
  const { get } = useAxios();

  const getData = (options: TLoadDataParams) => {
    const { api, params, method, id, isExternal } = options;
    const extras = {};

    // If id is passed get single instance, other fetch list
    setError({});
    setSuccess(false);
    setLoading(true);
    get({
      api: id ? `${api}/${id}` : api,
      loader: setLoading,
      errorHandler: (err: TError) => {
        setError(err);
      },
      successHandler: (res: any) => {
        setData(res);
        setSuccess(true);
      },
      isExternal,
      methodName: method,
      params: { ...params, ...extras },
    });
  };

  const refreshData = (options: TLoadDataParams) => {
    const { id, api, isExternal, params } = options;
    setData(null);
    setRefreshing(true);
    // If id is passed get single instance, other fetch list
    get({
      api: id ? `${api}${id}/` : api,
      isExternal,
      loader: setRefreshing,
      errorHandler: setError,
      successHandler: setData,
      params,
    });
  };

  return { loading, refreshing, error, data, success, getData, refreshData };
};

export default useGet;
