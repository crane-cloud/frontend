// import axios from 'axios';
// import { API_BASE_URL } from '../../config';
import axios from '../../axios';
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

  // axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return axios.post(`/projects/${projectID}/metrics/memory`, params)
    .then((response) => {
      dispatch(getMemoryMetricsSuccess(projectID, response));
    })
    .catch((error) => {
      // if (error.response.status === 401) {
      //   //function to logout user and redirect user to login
        
      //   removeUser();
      //   localStorage.removeItem('state');
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('project');
        
      //   window.location.href = '/login';
      //   // Go to login
      //   // browserHistory.push('/login')
      //   // console.log(error.response);
      // }
      dispatch(getMemoryMetricsFailed(projectID, error));
    });
};


export default getProjectMemory;
export { clearProjectMemory };
