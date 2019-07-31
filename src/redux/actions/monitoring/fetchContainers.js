import {
    FETCH_CONTAINERS_RUNNING,
    FETCH_CONTAINERS_WAITING,
    FETCH_CONTAINERS_TERMINATED,
    FETCH_CONTAINER_RESTARTS,
    FETCH_CONTAINER_CPU_CORES,
    FETCH_CONTAINER_MEMORY_REQUESTS
} from "../actionTypes";

import axios from 'axios';
import { PROXY_URL } from "../../../config";

export const fetchContainersRunning = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/containers/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINERS_RUNNING,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}


export const fetchContainersWaiting = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/containers/wainting/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINERS_WAITING,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchContainersTerminated = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/containers/terminated/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINERS_TERMINATED,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchContainerRestarts = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/containers/restarts/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINER_RESTARTS,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchContainerCpuRequests = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/containers/cpu/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINER_CPU_CORES,
            payload: Math.round(response.data.data.result[0].value[1])
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchContainerMemoryRequests = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/coontainers/memory/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONTAINER_MEMORY_REQUESTS,
            payload: roundToTwo((response.data.data.result[0].value[1]) / 1000000000)
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
}