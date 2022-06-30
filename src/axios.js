import axios from "axios";
import { API_BASE_URL } from "./config";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // this checks for when a token is not verified and logs you out
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
