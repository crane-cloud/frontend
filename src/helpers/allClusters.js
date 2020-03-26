
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function availableClusters() {
  return axios.get(`${API_BASE_URL}/clusters`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => response.data);
}
