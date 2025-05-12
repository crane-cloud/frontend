import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../config";

interface RequestParams {
  api: string;
  methodName?: AxiosRequestConfig["method"];
  loader?: (isLoading: boolean) => void;
  successHandler?: (data: unknown) => void;
  errorHandler?: (error: string | any) => void;
  params?: object;
  isExternal?: boolean;
  type?: "application/json" | "multipart/form-data";
}

interface ErrorResponse {
  message?: string;
  data?: any;
}

function useAxios() {
  const { authToken, logout } = useAuth();

  const handleResponse = (resp: AxiosResponse, options: RequestParams) => {
    if (options.successHandler) {
      options.successHandler(resp.data);
    }
    options.loader?.(false);
  };

  const handleError = (
    error: AxiosError<ErrorResponse>,
    options: RequestParams,
  ) => {
    let message: string | unknown = "An unknown error occurred";

    if (error.response?.status === 401) {
      logout();
      message =
        error.response.data?.message || getStatusMessage(error.response.status);
    } else if (error.response) {
      message =
        error.response.data?.message || getStatusMessage(error.response.status);
    }

    options.errorHandler?.(message);
    options.loader?.(false);
  };

  const getStatusMessage = (status: number): string => {
    const statusMessages: Record<number, string> = {
      500: "Internal server error",
      502: "Bad gateway",
      503: "Service unavailable",
      504: "Gateway timeout",
      402: "Payment required", // Consider if 402 is the correct status to handle
    };
    return statusMessages[status] || "An unknown error occurred";
  };

  const createRequestConfig = (
    options: RequestParams,
    method: AxiosRequestConfig["method"],
  ): AxiosRequestConfig => {
    const headers = new AxiosHeaders({
      "Content-Type": options.type ?? "application/json",
      // ...(options.isExternal ? {} : { Authorization: `Bearer ${authToken}` })
      ...{ Authorization: `Bearer ${authToken}` },
    });

    return {
      method,
      headers,
      url: options.isExternal ? options.api : `${API_BASE_URL}${options.api}`,
      [method === "get" ? "params" : "data"]: options.params,
    };
  };

  const request = async (
    method: AxiosRequestConfig["method"],
    options: RequestParams,
  ) => {
    try {
      options.loader?.(true);
      const response = await axios(createRequestConfig(options, method));
      handleResponse(response, options);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError<ErrorResponse>, options);
      // throw error;
    }
  };

  const get = (options: RequestParams) => request("get", options);
  const post = (options: RequestParams) =>
    request(options.methodName || "post", options);
  const del = (options: RequestParams) => request("delete", options);

  return { get, post, del };
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (
      error.response &&
      error.response.config.url !== "/api/auth/login/" &&
      error.response.status === 401
    ) {
      localStorage.removeItem("token");
      const loginUrl = "/login";
      if (window.location.href !== loginUrl) {
        window.location.href = loginUrl;
        return;
      }
    }
    return Promise.reject(error);
  },
);

export default useAxios;
