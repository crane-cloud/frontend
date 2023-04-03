import axios from "../../axios";
import {
  IS_FETCHING,
  FETCH_PVS_SUCCESS,
  FETCH_PVS_FAILED,
} from "./actionTypes";

export const startTheFetch = () => ({
  type: IS_FETCHING,
});

export const getPvsSuccess = (response) => ({
  type: FETCH_PVS_SUCCESS,
  payload: response.data.data,
});

export const getPvsFailed = (error) => ({
  type: FETCH_PVS_FAILED,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPvs = (clusterId,page) => (dispatch) => {
  dispatch(startTheFetch());
  return axios
    .get(`/clusters/${clusterId}/pvs?page=${page}`)
    .then((response) => dispatch(getPvsSuccess(response)))
    .catch((error) => {
      dispatch(getPvsFailed(error));
    });
};

export default getPvs;
