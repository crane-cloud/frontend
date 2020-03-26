
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default async function availableClusters() {
  const response = await axios.get(`${API_BASE_URL}/clusters`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
}
