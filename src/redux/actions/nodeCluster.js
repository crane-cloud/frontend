import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';

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

  return axios.get(`/clusters/${clusterID}/nodes`)
    .then((response) => dispatch(getNodesSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login  
        redirectToLogin(dispatch);
      }
      dispatch(getNodesFail(error));
    });
};

export default getNodesList;
