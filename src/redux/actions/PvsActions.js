import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_PVS_SUCCESS, FETCH_PVS_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getPvsSuccess = (response) => (
  {
    type: FETCH_PVS_SUCCESS,
    payload: response.data.data.pvs,
  });

export const getPvsFailed = (error) => ({
  type: FETCH_PVS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPvs = (clusterId) => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/clusters/${clusterId}/pvs`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then((response) => dispatch(getPvsSuccess(response)))
    .catch((error) => {
      dispatch(getPvsFailed(error));
    });
};

export default getPvs;
