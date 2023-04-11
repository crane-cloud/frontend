import axios from "../../axios";
import {
  IS_FETCHING,
  FETCH_PVCS_SUCCESS,
  FETCH_PVCS_FAILED,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getPvcsSuccess = (response) => ({
  type: FETCH_PVCS_SUCCESS,
  payload: response.data.data,
});

export const getPvcsFailed = (error) => ({
  type: FETCH_PVCS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPvcs = (clusterId, page) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/clusters/${clusterId}/pvcs?page=${page}`)
    .then((response) => dispatch(getPvcsSuccess(response)))
    .catch((error) => {
      dispatch(getPvcsFailed(error));
    });
};

export default getPvcs;
