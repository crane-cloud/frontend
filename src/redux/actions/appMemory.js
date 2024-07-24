import { monitoringAxios } from "../../axios";
import {
  FETCH_APP_MEMORY_SUCCESS,
  FETCH_APP_MEMORY_FAILED,
  IS_FETCHING_APP_MEMORY,
  CLEAR_APP_MEMORY,
} from "./actionTypes";

const startFetchingAppMemoryMetrics = () => ({
  type: IS_FETCHING_APP_MEMORY,
});

const getAppMemoryMetricsSuccess = (ID, response) => ({
  type: FETCH_APP_MEMORY_SUCCESS,
  payload: {
    app: ID,
    metrics: response.data.data.values,
  },
});

const getAppMemoryMetricsFailed = (ID, error) => ({
  type: FETCH_APP_MEMORY_FAILED,
  payload: {
    app: ID,
    metrics: [],
    error: error.status,
  },
});

const clearAppMemory = () => ({
  type: CLEAR_APP_MEMORY,
});

const getAppMemory = (projectID, appID, params) => (dispatch) => {
  dispatch(startFetchingAppMemoryMetrics());

  return monitoringAxios
    .post(`/apps/memory/metrics`, {
      ...params,
      project_id: projectID,
      app_id: appID,
    })
    .then((response) => {
      dispatch(getAppMemoryMetricsSuccess(appID, response));
    })
    .catch((error) => {
      dispatch(getAppMemoryMetricsFailed(appID, error));
    });
};

export default getAppMemory;
export { clearAppMemory };
