import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY
} from './actionTypes';

const startFetchingMemoryMetrics = () => ({
  type: IS_FETCHING_PROJECT_MEMORY,
});

const getMemoryMetricsSuccess = (ID, response) => (
  {
    type: FETCH_PROJECT_MEMORY_SUCCESS,
    payload: {
      project: ID,
      metrics: response.data.data.values
    },
  });

export const getMemoryMetricsFailed = (ID, error) => ({
  type: FETCH_PROJECT_MEMORY_FAILED,
  payload: {
    project: ID,
    metrics: [],
    error: error.status,
  },
});

const getProjectMemory = (projectID, params) => (dispatch) => {
  dispatch(startFetchingMemoryMetrics());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios.post(`${API_BASE_URL}/projects/${projectID}/metrics/memory`, params)
    .then((response) => {
      dispatch(getMemoryMetricsSuccess(projectID, response));
    })
    .catch((error) => {
      dispatch(getMemoryMetricsFailed(projectID, error));
    });
};


export default getProjectMemory;
