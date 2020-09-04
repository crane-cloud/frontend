import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
  FETCH_APP_MEMORY_SUCCESS,
  FETCH_APP_MEMORY_FAILED,
  IS_FETCHING_APP_MEMORY,
  CLEAR_APP_MEMORY
} from './actionTypes';

const startFetchingMemoryMetrics = () => ({
  type: IS_FETCHING_APP_MEMORY,
});

const getMemoryMetricsSuccess = (ID, response) => (
  {
    type: FETCH_APP_MEMORY_SUCCESS,
    payload: {
      app: ID,
      metrics: response.data.data.values
    },
  });

const getMemoryMetricsFailed = (ID, error) => ({
  type: FETCH_APP_MEMORY_FAILED,
  payload: {
    app: ID,
    metrics: [],
    error: error.status,
  },
});

const clearAppMemory = () => ({
  type: CLEAR_APP_MEMORY
});

const getAppMemory = (projectID, appID, params) => (dispatch) => {
  dispatch(startFetchingMemoryMetrics());

  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios.post(`${API_BASE_URL}/projects/${projectID}/apps/${appID}/metrics/memory`, params)
    .then((response) => console.log(response)
      // dispatch(getMemoryMetricsSuccess(appID, response));
    )
    .catch((error) => {
      dispatch(getMemoryMetricsFailed(appID, error));
    });
};


export default getAppMemory;
export { clearAppMemory };
