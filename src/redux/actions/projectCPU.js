import { monitoringAxios } from "../../axios";
import {
  FETCH_PROJECT_CPU_SUCCESS,
  FETCH_PROJECT_CPU_FAILED,
  IS_FETCHING_PROJECT_CPU,
  CLEAR_PROJECT_CPU,
} from "./actionTypes";

const startFetchingCPUMetrics = () => ({
  type: IS_FETCHING_PROJECT_CPU,
});

const getCPUMetricsSuccess = (ID, response) => ({
  type: FETCH_PROJECT_CPU_SUCCESS,
  payload: {
    project: ID,
    metrics: response.data.data.values,
  },
});

const getCPUMetricsFailed = (ID, error) => ({
  type: FETCH_PROJECT_CPU_FAILED,
  payload: {
    project: ID,
    metrics: [],
    error: error.status,
  },
});

const clearProjectCPU = () => ({
  type: CLEAR_PROJECT_CPU,
});

const getProjectCPU = (projectID, params) => (dispatch) => {
  dispatch(startFetchingCPUMetrics());

  return monitoringAxios
    .post(`/projects/cpu/metrics`, { ...params, project_id: projectID })
    .then((response) => {
      dispatch(getCPUMetricsSuccess(projectID, response));
    })
    .catch((error) => {
      dispatch(getCPUMetricsFailed(projectID, error));
    });
};

export default getProjectCPU;
export { clearProjectCPU };
