import axios from '../../axios';
import redirectToLogin from '../../helpers/redirectToLogin';
import { IS_FETCHING, FETCH_NAMESPACES_SUCCESS, FETCH_NAMESPACES_FAILED } from './actionTypes';

export const initiateFetch = () => ({
  type: IS_FETCHING,
});

export const getNamespacesSuccess = (response) => (
  {
    type: FETCH_NAMESPACES_SUCCESS,
    payload: response.data.data.namespaces,
  });

export const getNamespacesFailed = (error) => ({
  type: FETCH_NAMESPACES_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getNamespaces = (params) => (dispatch) => {
  dispatch(initiateFetch());
  return axios.get(`/clusters/${params.clusterID}/namespaces`)
    .then((response) => dispatch(getNamespacesSuccess(response)))
    .catch((error) => {
      if (error.response.status === 401) {
        // function to logout user and redirect user to login 
        redirectToLogin(dispatch);
      }
      dispatch(getNamespacesFailed(error));
    });
};

export default getNamespaces;
