import axios from "../../axios";

import {
  GET_PODS_SUCCESS,
  GET_PODS_FAIL,
  START_GETTING_PODS,
} from "./actionTypes";

export const startFetchingPods = () => ({
  type: START_GETTING_PODS,
});

export const getPodsSuccess = (response) => ({
  type: GET_PODS_SUCCESS,
  payload: response.data.data,
});

export const getPodsFail = (error) => ({
  type: GET_PODS_FAIL,
  payload: {
    status: false,
    error: error.status,
  },
});

const getPodsList = (clusterId,page) => (dispatch) => {
  dispatch(startFetchingPods());

  return axios
    .get(`/clusters/${clusterId}/pods?page=${page}`)
    .then((response) => dispatch(getPodsSuccess(response)))
    .catch((error) => {
      dispatch(getPodsFail(error));
    });
};

export default getPodsList;
