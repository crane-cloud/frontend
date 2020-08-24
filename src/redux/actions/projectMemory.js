import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY_METRICS
} from './actionTypes';

const clearMemoryMetrics = () => ({
  type: CLEAR_PROJECT_MEMORY_METRICS,
});

const startFetchingMemoryMetrics = () => ({
  type: IS_FETCHING_PROJECT_MEMORY,
});

const getMemoryMetricsSuccess = (response) => (
  {
    type: FETCH_PROJECT_MEMORY_SUCCESS,
    payload: response.data.data.values,
  });

export const getMemoryMetricsFailed = (error) => ({
  type: FETCH_PROJECT_MEMORY_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getProjectMemory = (projectID, params) => (dispatch) => {
  dispatch(clearMemoryMetrics());

  dispatch(startFetchingMemoryMetrics());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return axios.post(`${API_BASE_URL}projects/${projectID}/metrics/memory`, params)
    .then((response) => dispatch(getMemoryMetricsSuccess(response)))
    .catch((error) => {
      dispatch(getMemoryMetricsFailed(error));
    });
};


export default getProjectMemory;
