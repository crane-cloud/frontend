import axios from "../../axios";
import {
  FETCH_APP_CPU_SUCCESS,
  FETCH_APP_CPU_FAILED,
  IS_FETCHING_APP_CPU,
  CLEAR_APP_CPU,
} from "./actionTypes";

const startFetchingCPUMetrics = () => ({
  type: IS_FETCHING_APP_CPU,
});

const getAppCPUMetricsSuccess = (ID, response) => ({
  type: FETCH_APP_CPU_SUCCESS,
  payload: {
    app: ID,
    metrics: response.data.data.values,
  },
});

const getAppCPUMetricsFailed = (ID, error) => ({
  type: FETCH_APP_CPU_FAILED,
  payload: {
    app: ID,
    metrics: [],
    error: error.status,
  },
});

const clearAppCPU = () => ({
  type: CLEAR_APP_CPU,
});

const getAppCPU = (projectID, appID, params) => (dispatch) => {
  dispatch(startFetchingCPUMetrics());

  return axios
    .post(`/projects/${projectID}/apps/${appID}/metrics/cpu`, params)
    .then((response) => {
      dispatch(getAppCPUMetricsSuccess(appID, response));
    })
    .catch((error) => {
      dispatch(getAppCPUMetricsFailed(appID, error));
    });
};

export default getAppCPU;
export { clearAppCPU };
