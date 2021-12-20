import axios from "../../axios";
import { REVERTING_URL, REVERT_SUCCESS, REVERT_FAIL } from "./actionTypes";

const revertingUrl = () => ({
  type: REVERTING_URL,
});

export const revertUrlSuccess = (response) => ({
  type: REVERT_SUCCESS,
  payload: response.data,
});

export const revertUrlFail = (error) => ({
  type: REVERT_FAIL,
  payload: {
    status: false,
    errorCode: error.response.status,
  },
});

const revertUrl = (appID) => (dispatch) => {
  dispatch(revertingUrl());

  return axios
    .get(`/apps/${appID}/revert_url`)
    .then((response) => dispatch(revertUrlSuccess(response)))
    .catch((error) => {
      dispatch(revertUrlFail(error));
    });
};

export default revertUrl;
