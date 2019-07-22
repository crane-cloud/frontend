import {
    FETCH_PODS_RUNNING,
    FETCH_PODS_PENDING,
    FETCH_PODS_SUCCESS,
    FETCH_PODS_FAILED
} from '../actionTypes';

import axios from 'axios';
import { PROXY_URL } from "../../../config";

// actions for fetching existing jobs stats - 

// export function fetchPosts() {
//     return function(dispatch) {
// in ES6 we'd write this stuff (above) like this (below)

export const fetchPodsRunning = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/pods';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_PODS_RUNNING,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchPodsPending = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/pods/pending';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_PODS_PENDING,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchPodsSuccess = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/pods/succeeded';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_PODS_SUCCESS,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchPodsFailed = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/pods/failed';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_PODS_FAILED,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}