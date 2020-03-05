import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_NODES_SUCCESS, GET_NODES_FAIL, START_GETTING_NODES } from './actionTypes';

export const startFetchingNodes = () => ({
  type: START_GETTING_NODES,
});

export const getNodesSuccess = (response) => ({
  type: GET_NODES_SUCCESS,
  payload: response.data.data,
});

export const getNodesFail = (error) => ({
  type: GET_NODES_FAIL,
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
