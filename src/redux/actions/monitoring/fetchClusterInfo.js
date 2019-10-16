import axios from 'axios';
import {
  FETCH_CLUSTER_CPU_USAGE,
  FETCH_CLUSTER_MEMORY_USAGE,
  FETCH_CLUSTER_DISK_USAGE,
  FETCH_CLUSTER_PODS
} from '../actionTypes';

import { BASE_URL, PROXY_URL } from '../../../config';

const roundToTwo = (num) => +(`${Math.round(`${num}e+2`)}e-2`);

export const fetchClusterCpuUsage = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/cluster/cpu`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_CLUSTER_CPU_USAGE,
      payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchClusterMemoryUsage = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/cluster/memory`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_CLUSTER_MEMORY_USAGE,
      payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchClusterDiskUsage = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/cluster/disk`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_CLUSTER_DISK_USAGE,
      payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};

export const fetchClusterPods = () => (dispatch) => {
  // this is where we create our fetch.. the one to be used in the jobs component
  const apiRoute = `${BASE_URL}/monitor/cluster/cpu`;

  axios.get(PROXY_URL + apiRoute)
    .then((response) => dispatch({
      type: FETCH_CLUSTER_PODS,
      payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
    }))
    .catch((error) => console.log(`Can't access ${apiRoute}`, error));
};
