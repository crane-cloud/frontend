import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
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
  return axios.get(`/clusters/${clusterId}/services`)
    .then((response) => dispatch(getServicesSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login
        
        redirectToLogin(dispatch);
      }
      dispatch(getServicesFailed(error));
    });
};

export default getServices;
