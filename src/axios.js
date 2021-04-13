
import axios from 'axios';
import {
  API_BASE_URL
} from './config';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

instance.interceptors.response.use((response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('state');
      localStorage.removeItem('token');
      localStorage.removeItem('project');

      window.location.href = '/login';
    }
    return Promise.reject(error);
  });

export default instance;
