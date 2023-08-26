import axios from "../../axios";
import { REVERTING_URL, REVERT_SUCCESS, REVERT_FAIL, CLEAR_REVERT_STATE } from "./actionTypes";

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
    errorCode: error,
  },
});

const clearUrlRevertState = () => ({
  type: CLEAR_REVERT_STATE,
});

const revertUrl = (appID) => (dispatch) => {
  dispatch(revertingUrl());

  return axios
    .patch(`/apps/${appID}/revert_url`)
    .then((response) => {
      
      dispatch(revertUrlSuccess(response))
    })
    .catch((error) => {
      dispatch(revertUrlFail(error));
    });
};

export { clearUrlRevertState };

export default revertUrl;
