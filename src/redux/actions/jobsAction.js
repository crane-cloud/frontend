import { FETCH_JOBS_SUCCESS, FETCH_JOBS_FAILED } from '../actionTypes';
import axios from 'axios';
import { PROXY_URL } from '../../config';

// actions for fetching existing jobs stats - 

// export function fetchPosts() {
//     return function(dispatch) {
// in ES6 we'd write this stuff (above) like this (below)

export const fetchJobsSucceeded = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/jobs/suceeded';
    
    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_JOBS_SUCCESS,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}


export const fetchJobsFailed = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/job/failed';
    
    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_JOBS_FAILED,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}