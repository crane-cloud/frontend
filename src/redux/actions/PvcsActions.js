import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_PVCS_SUCCESS, FETCH_PVCS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getPvcsSuccess = (response) => (
  {
    type: FETCH_PVCS_SUCCESS,
    payload: response.data.data.pvcs,
  });

export const getPvcsFailed = (error) => ({
  type: FETCH_PVCS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPvcs = (params) => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/clusters/${params.clusterID}/pvcs`)
    .then((response) => dispatch(getPvcsSuccess(response)))
    .catch((error) => {
      dispatch(getPvcsFailed(error));
    });
};

export default getPvcs;
