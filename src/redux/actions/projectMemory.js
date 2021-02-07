import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
import {
  FETCH_PROJECT_MEMORY_SUCCESS,
  FETCH_PROJECT_MEMORY_FAILED,
  IS_FETCHING_PROJECT_MEMORY,
  CLEAR_PROJECT_MEMORY
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

const getMemoryMetricsFailed = (ID, error) => ({
  type: FETCH_PROJECT_MEMORY_FAILED,
  payload: {
    project: ID,
    metrics: [],
    error: error.status,
  },
});

const clearProjectMemory = () => ({
  type: CLEAR_PROJECT_MEMORY
});

const getProjectMemory = (projectID, params) => (dispatch) => {
  dispatch(startFetchingMemoryMetrics());

  return axios.post(`/projects/${projectID}/metrics/memory`, params)
    .then((response) => {
      dispatch(getMemoryMetricsSuccess(projectID, response));
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        redirectToLogin(dispatch);
      }
      dispatch(getMemoryMetricsFailed(projectID, error));
    });
};


export default getProjectMemory;
export { clearProjectMemory };
