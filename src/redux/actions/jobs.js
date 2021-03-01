import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
import { IS_FETCHING, FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getJobsSuccess = (response) => (
  {
    type: FETCH_JOBS_SUCCESS,
    payload: response.data.data.jobs,
  });

export const getJobsFailed = (error) => ({
  type: FETCH_JOBS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getJobs = (clusterId) => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`/clusters/${clusterId}/jobs`)
    .then((response) => dispatch(getJobsSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login 
        redirectToLogin(dispatch);
      }
      dispatch(getJobsFailed(error));
    });
};

export default getJobs;
