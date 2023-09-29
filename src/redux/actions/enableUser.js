import axios from "../../axios";
import {
  ENABLE_USER_SUCCESS,
  ENABLING_USER,
  ENABLE_USER_FAIL
} from "./actionTypes";

const startDisablingUser = () => ({
  type: ENABLING_USER,
});

const enableUserSuccess = (response) => ({
  type: ENABLE_USER_SUCCESS,
  payload: response.data,
});

const enableUserFail = (error) => ({
  type: ENABLE_USER_FAIL,
  payload: {
    error: error.response,
  },
});

const enableUser = (userID) => (dispatch) => {
  dispatch(startDisablingUser());

  return axios
    .post(`/users/${userID}/enable`)
    .then((response) => dispatch(enableUserSuccess(response)))
    .catch((error) => {
      dispatch(enableUserFail(error));
    });
};

export default enableUser;
