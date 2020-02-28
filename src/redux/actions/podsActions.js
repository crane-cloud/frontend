import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_PODS_SUCCESS, GET_PODS_FAIL, START_GETTING_PODS } from './actionTypes';

export const startFetchingPods = () => ({
  type: START_GETTING_PODS,
});

export const getPodsSuccess = (response) => ({
  type: GET_PODS_SUCCESS,
  payload: response.data.data,
});

export const getPodsFail = (error) => ({
  type: GET_PODS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPodsList = () => (dispatch) => {
  dispatch(startFetchingPods());

  return axios.get(`${API_BASE_URL}/clusters/dd66c9a7-dd48-4616-9438-166258e77453/pods`)
    .then((response) => dispatch(getPodsSuccess(response)))
    .catch((error) => {
      dispatch(getPodsFail(error));
    });
};

export default getPodsList;
