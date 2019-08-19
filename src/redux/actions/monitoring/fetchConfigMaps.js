import { FETCH_CONFIG_MAPS } from "../actionTypes";
import axios from 'axios';
import { BASE_URL, PROXY_URL } from "../../../config";

export const fetchConfigMaps = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/config-maps/all`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_CONFIG_MAPS,
            payload: response.data.data.result
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}