import {
    FETCH_CLUSTER_CPU_USAGE,
    FETCH_CLUSTER_MEMORY_USAGE,
    FETCH_CLUSTER_DISK_USAGE,
    FETCH_CLUSTER_PODS
} from '../actionTypes';

import axios from 'axios';
import { PROXY_URL } from "../../../config";

export const fetchClusterCpuUsage = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/cpu';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CLUSTER_CPU_USAGE,
            payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchClusterMemoryUsage = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/memory';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CLUSTER_MEMORY_USAGE,
            payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchClusterDiskUsage = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/disk';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CLUSTER_DISK_USAGE,
            payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchClusterPods = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/cluster/cpu';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CLUSTER_PODS,
            payload: roundToTwo((response.data.data.result[0].value[1]) * 100)
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}