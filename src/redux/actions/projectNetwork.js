import axios from "../../axios";
import {
  FETCH_PROJECT_NETWORK_SUCCESS,
  FETCH_PROJECT_NETWORK_FAILED,
  IS_FETCHING_PROJECT_NETWORK,
  CLEAR_PROJECT_NETWORK,
} from "./actionTypes";

const startFetchingNetworkMetrics = () => ({
  type: IS_FETCHING_PROJECT_NETWORK,
});

const getNetworkMetricsSuccess = (ID, response) => ({
  type: FETCH_PROJECT_NETWORK_SUCCESS,
  payload: {
    project: ID,
    metrics: response.data.data.values,
  },
});

const getNetworkMetricsFailed = (ID, error) => ({
  type: FETCH_PROJECT_NETWORK_FAILED,
  payload: {
    project: ID,
    metrics: [],
    error: error.status,
  },
});

const clearProjectNetwork = () => ({
  type: CLEAR_PROJECT_NETWORK,
});

const getProjectNetwork = (projectID, params) => (dispatch) => {
  dispatch(startFetchingNetworkMetrics());

  return axios
    .post(`/projects/${projectID}/metrics/network`, params)
    .then((response) => {
      dispatch(getNetworkMetricsSuccess(projectID, response));
    })
    .catch((error) => {
      dispatch(getNetworkMetricsFailed(projectID, error));
    });
};

export default getProjectNetwork;
export { clearProjectNetwork };
