import axios from "../../axios";
import {
  IS_FETCHING,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILED,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getServicesSuccess = (response) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: response.data.data,
});

export const getServicesFailed = (error) => ({
  type: FETCH_SERVICES_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getServices = (clusterId,page) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/clusters/${clusterId}/services?page=${page}`)
    .then((response) => dispatch(getServicesSuccess(response)))
    .catch((error) => {
      dispatch(getServicesFailed(error));
    });
};

export default getServices;
