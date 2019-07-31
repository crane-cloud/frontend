import { FETCH_DEPLOYMENTS } from "../actionTypes";
import axios from 'axios';
import { PROXY_URL } from "../../../config";

export const fetchDeployments = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = 'http://54.84.186.47:31765/monitor/deployment/replicas/info/all';

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_DEPLOYMENTS,
            payload: response.data.data.result
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}