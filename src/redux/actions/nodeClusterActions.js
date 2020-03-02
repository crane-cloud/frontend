import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_RESOURCE_SUCCESS, GET_RESOURCE_FAIL, START_GETTING_RESOURCE } from './actionTypes';

export const startFetchingNodes = () => ({
  type: START_GETTING_RESOURCE,
});

export const getNodesSuccess = (response) => ({
  type: GET_RESOURCE_SUCCESS,
  payload: response.data.data,
});

export const getNodesFail = (error) => ({
  type: GET_RESOURCE_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getNodesList = (clusterID) => (dispatch) => {
  dispatch(startFetchingNodes());

  return axios.get(`${API_BASE_URL}/clusters/${clusterID}/nodes`)
    .then((response) => dispatch(getNodesSuccess(response)))
    .catch((error) => {
      dispatch(getNodesFail(error));
    });
};

export default getNodesList;
