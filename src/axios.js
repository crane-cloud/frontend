import axios from "axios"
import {
   API_BASE_URL
} from './config';

const instance = axios.create({
   baseURL: API_BASE_URL,
});

instance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
instance.interceptors.response.use(response => {
   return response;
}, error => {
   if (error.response.status === 401) {
      //function to logout user and redirect user to login
   }
   return error;
});

export default instance;