import { useState } from "react";
import useAxios from "./useAxios";
import { TError } from "@/types/common";
import { showNotification } from "@mantine/notifications";

type UploadDataParams = {
  api: string;
  params?: any;
  id?: number;
  type?: "application/json" | "multipart/form-data";
  method?: string;
  successMessage?: string;
  errorMessage?: string;
};

const usePost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<TError>({});
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<any>();
  const { post } = useAxios();

  const uploadData = (options: UploadDataParams) => {
    const { api, params, method, type, id, successMessage, errorMessage } = options;
    const extras = {};

    // If id is passed get single instance, other fetch list
    setError({});
    setSuccess(false);
    setSubmitting(true);
    post({
      api: id ? `${api}${id}/` : api,
      loader: setSubmitting,
      errorHandler: (err: TError) => {
        setError(err);
        showNotification({
          title: 'Error',
          message: errorMessage || err.message || 'Something went wrong!',
          color: 'red',
        });
      },
      successHandler: (res: any) => {
        setData(res);
        setSuccess(true);
        showNotification({
          title: 'Success',
          message: successMessage || 'Operation completed successfully!',
          color: 'teal',
        });
      },
      methodName: method || (id ? "PATCH" : "POST"),
      params: { ...params, ...extras },
      type,
    });
  };

  const updateErrors = (err: TError) => {
    setError(err ? { ...error, ...err } : {});
  };

  return {
    submitting,
    error,
    data,
    success,
    uploadData,
    updateErrors,
    setError,
    setSuccess,
  };
};

export default usePost;
