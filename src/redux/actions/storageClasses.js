import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
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

  return axios.get(`/clusters/${clusterId}/storage_classes`)
    .then((response) => dispatch(getStorageClassSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      dispatch(getStorageClassFail(error));
    });
};

export default getStorageClassList;
