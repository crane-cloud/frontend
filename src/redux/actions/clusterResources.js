import axios from "../../axios";
import {
  GET_RESOURCES_COUNT,
  GET_RESOURCES_COUNT_FAILED,
  START_GETTING_RESOURCES_COUNT,
} from "./actionTypes";

export const startFetchingResources = () => ({
  type: START_GETTING_RESOURCES_COUNT,
});

export const getResourcesSuccess = (response) => ({
  type: GET_RESOURCES_COUNT,
  payload: response.data.data.resource_count,
  clusterName: response.data.data.cluster.name,
});

export const getResourcesFail = (error) => ({
  type: GET_RESOURCES_COUNT_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getClusterResourcesCount = (clusterID) => (dispatch) => {
  dispatch(startFetchingResources());
  return axios
    .get(`/clusters/${clusterID}`)
    .then((response) => dispatch(getResourcesSuccess(response)))
    .catch((error) => {
      dispatch(getResourcesFail(error));
    });
};

export default getClusterResourcesCount;
