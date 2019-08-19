import { FETCH_PERSISTENT_VOLUMES } from "../actionTypes";
import axios from 'axios';
import { BASE_URL, PROXY_URL } from "../../../config";

export const fetchPersistentVolumes = () => dispatch => {
    // this is where we create our fetch.. the one to be used in the jobs component
    const apiRoute = `${BASE_URL}/monitor/persistent-volumes/info/all`;

    axios.get(PROXY_URL + apiRoute)
        .then(response => dispatch({
            type: FETCH_PERSISTENT_VOLUMES,
            payload: response.data.data.result
        }))
        .catch(error => console.log("Can't access " + apiRoute, error));
}