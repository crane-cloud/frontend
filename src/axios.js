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
    let e = error;
    // this checks for when a token is not verified and logs you out
    if (error.response.status === 401 || error.response.status === 422) {
      localStorage.clear();
      window.location.href = "/";
    } else if (error.response.status === 502) {
      e = "Your request too long possible Server Error.";
      window.location.href = "/projects";
    }
    return Promise.reject(e);
  }
);

export default instance;
