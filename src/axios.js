import axios from "axios";
import { API_BASE_URL, DATABASE_API_URL } from "./config";

const databaseAxios = axios.create({
  baseURL: DATABASE_API_URL,
});

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("token");
instance.defaults.headers.Authorization = `Bearer ${token}`;
databaseAxios.defaults.headers.Authorization = `Bearer ${token}`;

const responseInterceptor = (response) => response;

const errorInterceptor = (error) => {
  let e = error;
  // this checks for when a token is not verified and logs you out
  if (error.response.status === 401 || error.response.status === 422) {
    localStorage.clear();
    window.location.href = "/";
  } else if (error.response.status === 502) {
    e = "Your request took too long, possibly a Server Error.";
    window.location.href = "/projects";
  }
  return Promise.reject(e);
};

// response interceptors to both instances
instance.interceptors.response.use(responseInterceptor, errorInterceptor);
databaseAxios.interceptors.response.use(responseInterceptor, errorInterceptor);

export { instance, databaseAxios };
export default instance;
