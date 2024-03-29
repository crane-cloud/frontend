import axios from "../../axios";
import {
  IS_FETCHING,
  FETCH_NAMESPACES_SUCCESS,
  FETCH_NAMESPACES_FAILED,
} from "./actionTypes";

export const initiateFetch = () => ({
  type: IS_FETCHING,
});

export const getNamespacesSuccess = (response) => ({
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

const getNamespaces = (clusterID) => (dispatch) => {
  dispatch(initiateFetch());
  return axios
    .get(`/clusters/${clusterID}/namespaces`)
    .then((response) => dispatch(getNamespacesSuccess(response)))
    .catch((error) => {
      dispatch(getNamespacesFailed(error));
    });
};

export default getNamespaces;
