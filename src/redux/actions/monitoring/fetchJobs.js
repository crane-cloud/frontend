import axios from 'axios';
import { FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILED } from '../actionTypes';
import { BASE_URL, PROXY_URL } from '../../../config';

// actions for fetching existing jobs stats -

// export function fetchPosts() {
//     return function(dispatch) {
// in ES6 we'd write this stuff (above) like this (below)

export const fetchJobsSuccess = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/jobs/succeeded/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_JOBS_SUCCESS,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};


export const fetchJobsFailed = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/job/failed/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_JOBS_FAILED,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};
