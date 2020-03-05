import axios from 'axios';
import { API_BASE_URL } from '../../config';

import { GET_STORAGE_CLASS_SUCCESS, GET_STORAGE_CLASS_FAIL, START_GETTING_STORAGE_CLASS } from './actionTypes';

export const startFetchingStorageClass = () => ({
  type: START_GETTING_STORAGE_CLASS,
});

export const getStorageClassSuccess = (response) => ({
  type: GET_STORAGE_CLASS_SUCCESS,
  payload: response.data.data,
});

export const getStorageClassFail = (error) => ({
  type: GET_STORAGE_CLASS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getStorageClassList = (clusterId) => (dispatch) => {
  dispatch(startFetchingStorageClass());

  return axios.get(`${API_BASE_URL}/clusters/${clusterId}/storage_classes`)
    .then((response) => dispatch(getStorageClassSuccess(response)))
    .catch((error) => {
      dispatch(getStorageClassFail(error));
    });
};

export default getStorageClassList;
