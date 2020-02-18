import axios from 'axios';
import { GET_RESOURCES_COUNT, GET_RESOURCES_COUNT_FAILED, START_GETTING_RESOURCES_COUNT } from './actionTypes';

export const startFetchingResources = () => ({
  type: START_GETTING_RESOURCES_COUNT,
});

export const getResourcesSuccess = (response) => ({
  type: GET_RESOURCES_COUNT,
  payload: response.data.items,
});

export const getResourcesFail = (error) => ({
  type: GET_RESOURCES_COUNT_FAILED,
  payload: {
    status: false,
    error: error.response.status,
  },
});

const getClusterResourcesCount = () => (dispatch) => {
  dispatch(startFetchingResources());

  return axios.get('https://ah-backend-realers-staging.herokuapp.com/api/articles/')
    .then((response) => dispatch(getResourcesSuccess(response)))
    .catch((error) => {
      dispatch(getResourcesFail(error));
    });
};

export default getClusterResourcesCount;
