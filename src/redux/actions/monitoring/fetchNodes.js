import {
    FETCH_NODES_TABLE,
    FETCH_TOTAL_NODES,
    FETCH_NODES_OUTOFDISK,
    FETCH_NODES_UNAVAILABLE
} from "../../actions/actionTypes";

import axios from 'axios';
import { BASE_URL, PROXY_URL } from "../../../config";

export const fetchNodesTable = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/nodes/info`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_NODES_TABLE,
            payload: response.data.data.result
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchTotalNodes = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/nodes`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_TOTAL_NODES,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchNodesOutOfDisk = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/nodes/outofdisk`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_NODES_OUTOFDISK,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}

export const fetchNodesUnavailable = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/nodes/unavailable`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_NODES_UNAVAILABLE,
            payload: response.data.data.result[0].value[1]
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}