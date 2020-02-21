import axios from 'axios';
// import { API_BASE_URL } from '../../config';
import { GET_RESOURCES_COUNT, GET_RESOURCES_COUNT_FAILED, START_GETTING_RESOURCES_COUNT } from './actionTypes';

export const startFetchingResources = () => ({
  type: START_GETTING_RESOURCES_COUNT,
});

export const getResourcesSuccess = (response) => (
  {
    type: GET_RESOURCES_COUNT,
    payload: response.data.data.resource_count,
    clusterName: response.data.data.name,
  });

export const getResourcesFail = (error) => ({
  type: GET_RESOURCES_COUNT_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getClusterResourcesCount = () => (dispatch) => {
  dispatch(startFetchingResources());

  return axios.get('http://crane-mak-w1.cranecloud.io:30895/clusters/0f1a47b9-3d50-4a8f-916b-eb16d0cb7ce7')
    .then((response) => dispatch(getResourcesSuccess(response)))
    .catch((error) => {
      dispatch(getResourcesFail(error));
    });
};

export default getClusterResourcesCount;
