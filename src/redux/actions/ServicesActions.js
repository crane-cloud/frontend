import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { IS_FETCHING, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILED } from './actionTypes';

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getServicesSuccess = (response) => (
  {
    type: FETCH_SERVICES_SUCCESS,
    payload: response.data.data.services,
  });

export const getServicesFailed = (error) => ({
  type: FETCH_SERVICES_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getServices = (clusterId) => (dispatch) => {
  dispatch(startTheFetch());
  return axios.get(`${API_BASE_URL}/clusters/${clusterId}/services`)
    .then((response) => dispatch(getServicesSuccess(response)))
    .catch((error) => {
      dispatch(getServicesFailed(error));
    });
};

export default getServices;
