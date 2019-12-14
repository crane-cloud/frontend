import axios from 'axios';
import {
  FETCH_PODS_RUNNING,
  FETCH_PODS_PENDING,
  FETCH_PODS_SUCCESS,
  FETCH_PODS_FAILED,
  FETCH_PODS_TABLE
} from '../actionTypes';

import { BASE_URL, PROXY_URL } from '../../../config';

// export function fetchPosts() {
//     return function(dispatch) {
// in ES6 we'd write this stuff (above) like this (below)

export const fetchPodsTable = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/pods`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_PODS_TABLE,
      payload: response.data.items
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchPodsRunning = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/pods/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_PODS_RUNNING,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchPodsPending = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/pods/pending/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_PODS_PENDING,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchPodsSuccess = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/pods/succeeded/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_PODS_SUCCESS,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchPodsFailed = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/pods/failed/all`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_PODS_FAILED,
      payload: response.data.data.result[0].value[1]
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};
